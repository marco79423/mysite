import typing
import uuid

import injector

from domain import base_types
from domain.base_types import Request, Response, ResponseError
from domain.blog.models.article import Article, Type
from domain.blog.models.asset import Asset
from domain.blog.models.category import Category
from domain.blog.repositories.article_repository import ArticleRepository
from domain.blog.repositories.asset_repository import AssetRepository
from domain.blog.services.convert_to_slug_service import ConvertToSlugService
from domain.blog.services.get_source_path_service import GetSourcePathService
from domain.blog.services.truncate_html_word_service import TruncateHtmlWordsService
from domain.rst_parser.use_cases.transform_rst_to_html import TransformRstToHtmlUseCase


@injector.singleton
class GenerateBlogDataUseCase(base_types.UseCase):

    @injector.inject
    def __init__(self,
                 transform_rst_to_html_use_case: TransformRstToHtmlUseCase,
                 article_repo: ArticleRepository,
                 asset_repo: AssetRepository,
                 convert_to_slug_serv: ConvertToSlugService,
                 get_source_path_serv: GetSourcePathService,
                 truncate_html_words_serv: TruncateHtmlWordsService,
                 ):
        self.transform_rst_to_html_use_case = transform_rst_to_html_use_case

        self.article_repo = article_repo
        self.asset_repo = asset_repo
        self.convert_to_slug_serv = convert_to_slug_serv
        self.get_source_path_serv = get_source_path_serv
        self.truncate_html_words_serv = truncate_html_words_serv

    def execute(self, request: Request = None) -> typing.Union[Response, ResponseError]:
        try:
            source_dir = request.data
            if not source_dir.exists():
                return ResponseError('source_dir "{}" does not exist'.format(source_dir))

            self.article_repo.clean()
            self.asset_repo.clean()

            for article_path in self.get_source_path_serv.get_all_article_paths(source_dir):
                res = self.transform_rst_to_html_use_case.execute(Request(article_path))
                if not res:
                    return res

                article_data = res.data

                content = article_data['content']
                for image in article_data['images']:
                    basename = str(uuid.uuid1()) + '-' + image['basename']
                    content = content.replace(image['url'], self.asset_repo.get_base_url() + basename)
                    self.asset_repo.add(Asset(
                        filename=basename,
                        data=image['data'],
                    ))

                for file in article_data['files']:
                    basename = file['basename']
                    content = content.replace(file['url'], self.asset_repo.get_base_url() + basename)
                    self.asset_repo.add(Asset(
                        filename=basename,
                        data=file['data'],
                    ))

                self.article_repo.add(Article(
                    type=Type.NORMAL,
                    slug=self.convert_to_slug_serv.to_slug(article_data['title']),
                    title=article_data['title'],
                    content=content,
                    categories=[
                        Category(
                            slug=self.convert_to_slug_serv.to_slug(category),
                            name=category,
                        ) for category in article_data['categories']
                    ],
                    summary=self.truncate_html_words_serv.truncate(article_data['content'], 15),
                    date=article_data['date'],
                    modified_date=article_data.get('modified_date', ''),
                ))

            for page_path in self.get_source_path_serv.get_all_web_page_paths(source_dir):
                res = self.transform_rst_to_html_use_case.execute(Request(page_path))
                if not res:
                    return res

                page_data = res.data
                content = page_data['content']
                for image in page_data['images']:
                    basename = str(uuid.uuid1()) + '-' + image['basename']
                    content = content.replace(image['url'], self.asset_repo.get_base_url() + basename)
                    self.asset_repo.add(Asset(
                        filename=basename,
                        data=image['data'],
                    ))

                for file in page_data['files']:
                    basename = file['basename']
                    content = content.replace(file['url'], self.asset_repo.get_base_url() + basename)
                    self.asset_repo.add(Asset(
                        filename=basename,
                        data=file['data'],
                    ))

                self.article_repo.add(Article(
                    type=Type.WEB_PAGE,
                    slug=self.convert_to_slug_serv.to_slug(page_data['title']),
                    title=page_data['title'],
                    content=content,
                ))

            return Response()
        except Exception as e:
            return ResponseError(str(e))
