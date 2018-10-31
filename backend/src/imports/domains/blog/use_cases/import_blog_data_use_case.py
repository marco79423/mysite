import re
import typing

import injector

from imports.domains import base_types
from imports.domains.base_types import Request, Response, ResponseError
from imports.domains.blog.entities.article import Article
from imports.domains.blog.entities.category import Category
from imports.domains.blog.entities.web_page import WebPage
from imports.domains.blog.repositories import ArticleRepository, WebPageRepository
from imports.domains.blog.services import PathService, SlugService, AssetService, TruncateHTMLService
from imports.domains.rst_parser.use_cases.transform_rst_use_case import TransformRstUseCase


@injector.singleton
class ImportBlogDataUseCase(base_types.UseCase):

    @injector.inject
    def __init__(self,
                 transform_rst_uc: TransformRstUseCase,
                 article_repo: ArticleRepository,
                 web_page_repo: WebPageRepository,
                 path_serv: PathService,
                 slug_serv: SlugService,
                 asset_serv: AssetService,
                 truncate_html_serv: TruncateHTMLService):

        self.transform_rst_uc = transform_rst_uc
        self.article_repo = article_repo
        self.web_page_repo = web_page_repo
        self.path_serv = path_serv
        self.slug_serv = slug_serv
        self.asset_serv = asset_serv
        self.truncate_html_serv = truncate_html_serv

    def execute(self, request: Request = None) -> typing.Union[Response, ResponseError]:
        if not request or not isinstance(request, Request):
            return ResponseError('A request is required')

        if not isinstance(request.data, dict):
            return ResponseError('Invalid input')

        source_dir = request.data.get('source_dir')
        if not isinstance(source_dir, str):
            return ResponseError('Invalid input')

        max_summary_length = request.data.get('max_summary_length')
        if not isinstance(max_summary_length, int):
            return ResponseError('Invalid input')

        if not self.path_serv.exists(source_dir):
            return ResponseError('source_dir "{}" does not exist'.format(source_dir))

        try:
            for article_path in self.path_serv.get_all_article_paths(source_dir):
                article_data = self._parse_data(article_path)
                summary = self.truncate_html_serv.truncate(
                    html=article_data['content'],
                    max_length=max_summary_length,
                    without_tag=False
                )
                raw_summary = self.truncate_html_serv.truncate(
                    html=article_data['content'],
                    max_length=max_summary_length,
                    without_tag=True
                )
                self.article_repo.add(Article(
                    slug=self.slug_serv.to_slug(article_data['title']),
                    title=article_data['title'],
                    chicken_count=len(re.findall(r'(?:chicken|雞)', article_data['content'])),
                    content=article_data['content'],
                    categories=[
                        Category(
                            slug=self.slug_serv.to_slug(category),
                            name=category,
                        ) for category in article_data['categories']
                    ],
                    summary=summary,
                    raw_summary=raw_summary,
                    date=article_data['date'],
                    modified_date=article_data.get('modified_date', ''),
                ))

            for web_page_path in self.path_serv.get_all_web_page_paths(source_dir):
                web_page_data = self._parse_data(web_page_path)
                self.web_page_repo.add(WebPage(
                    app='me',
                    slug=self.slug_serv.to_slug(web_page_data['title']),
                    title=web_page_data['title'],
                    content=web_page_data['content'],
                ))

            return Response()
        except Exception as e:
            return ResponseError(str(e))

    def _parse_data(self, file_path):
        res = self.transform_rst_uc.execute(Request(file_path))
        if not res:
            return res

        data = res.data
        for item_image in data['item_images']:
            static_image_url = self.asset_serv.save_and_return_static_url(
                filename=item_image['basename'],
                data=item_image['data'],
                is_attachment=False,
            )
            data['content'] = data['content'].replace(item_image['url'], static_image_url)

        for item_file in data['item_files']:
            static_file_url = self.asset_serv.save_and_return_static_url(
                filename=item_file['basename'],
                data=item_file['data'],
                is_attachment=True,
            )
            data['content'] = data['content'].replace(item_file['url'], static_file_url)

        return data
