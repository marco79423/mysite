import re
from django.core.paginator import Paginator


class CustomPaginator(Paginator):

    def page(self, number, show_page_num=10):
        page = super().page(number)
        page.page_range = self._get_custom_page_range(number, self, show_page_num=show_page_num)
        return page

    @staticmethod
    def _get_custom_page_range(page_num, paginator, show_page_num):
        start_num = page_num - 5
        if start_num < 1:
            start_num = 1

        end_num = start_num + show_page_num - 1
        if end_num > paginator.num_pages:
            end_num = paginator.num_pages

        if end_num - start_num + 1 < show_page_num:
            start_num = end_num - show_page_num + 1
            if start_num < 1:
                start_num = 1
        return list(range(start_num, end_num + 1))

