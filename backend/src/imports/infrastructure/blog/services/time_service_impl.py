import datetime as dt

import dateutil.tz
import injector

from imports.domains.blog.services import TimeService


@injector.singleton
class TimeServiceImpl(TimeService):

    def get_utc_now(self) -> dt.datetime:
        return dt.datetime.now(dateutil.tz.tzutc())
