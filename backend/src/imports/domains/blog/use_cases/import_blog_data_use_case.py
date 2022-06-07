import injector
import re
import typing

from imports.domains import base_types
from imports.domains.base_types import Request, Response, ResponseError
from imports.domains.blog.adapters import SlugAdapter, EnvAdapter, TruncateHTMLAdapter, TimeAdapter, PathAdapter
from imports.domains.blog.entities.article import Article
from imports.domains.blog.entities.category import Category
from imports.domains.blog.entities.site_info import SiteInfo
from imports.domains.blog.entities.web_page import WebPage
from imports.domains.blog.repositories import ArticleRepository, WebPageRepository, SiteInfoRepository
from imports.domains.blog.services.asset_service import AssetService
from imports.domains.blog.services.source_path_service import SourcePathService
from imports.domains.rst_parser.use_cases.transform_rst_use_case import TransformRstUseCase


@injector.singleton
class ImportBlogDataUseCase(base_types.UseCase):

    @injector.inject
    def __init__(self,
                 transform_rst_uc: TransformRstUseCase,
                 site_info_repo: SiteInfoRepository,
                 article_repo: ArticleRepository,
                 web_page_repo: WebPageRepository,
                 env_adapter: EnvAdapter,
                 slug_adapter: SlugAdapter,
                 path_adapter: PathAdapter,
                 time_adapter: TimeAdapter,
                 truncate_html_adapter: TruncateHTMLAdapter,
                 source_path_serv: SourcePathService,
                 asset_serv: AssetService):

        self.transform_rst_uc = transform_rst_uc
        self.site_info_repo = site_info_repo
        self.article_repo = article_repo
        self.web_page_repo = web_page_repo
        self.env_adapter = env_adapter
        self.slug_adapter = slug_adapter
        self.path_adapter = path_adapter
        self.time_adapter = time_adapter
        self.truncate_html_adapter = truncate_html_adapter
        self.source_path_serv = source_path_serv
        self.asset_serv = asset_serv

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

        if not self.path_adapter.exists(source_dir):
            return ResponseError('source_dir "{}" does not exist'.format(source_dir))

        try:
            for article_path in self.source_path_serv.get_all_article_paths(source_dir):
                article_data = self._parse_data(article_path)
                summary = self.truncate_html_adapter.truncate(
                    html=article_data['content'],
                    max_length=max_summary_length,
                    without_tag=False
                )
                raw_summary = self.truncate_html_adapter.truncate(
                    html=article_data['content'],
                    max_length=max_summary_length,
                    without_tag=True
                )
                self.article_repo.add(Article(
                    slug=self.slug_adapter.to_slug(article_data['title']),
                    title=article_data['title'],
                    chicken_count=len(re.findall(r'(?:chicken|雞|hen)', article_data['content'])),
                    content=article_data['content'],
                    categories=[
                        Category(
                            slug=self.slug_adapter.to_slug(category),
                            name=category,
                        ) for category in article_data['categories']
                    ],
                    cover=article_data.get('cover'),
                    summary=summary,
                    raw_summary=raw_summary,
                    date=article_data['date'],
                    modified_date=article_data.get('modified_date', ''),
                ))

            self.site_info_repo.add(SiteInfo(
                updated_time=self.time_adapter.get_utc_now(),
                repo_version=self.env_adapter.get('REPO_VERSION', ''),
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

            if item_image['url'] == data['tags'].get('cover'):
                data['cover'] = static_image_url

        for item_file in data['item_files']:
            static_file_url = self.asset_serv.save_and_return_static_url(
                filename=item_file['basename'],
                data=item_file['data'],
                is_attachment=True,
            )
            data['content'] = data['content'].replace(item_file['url'], static_file_url)

        return data
