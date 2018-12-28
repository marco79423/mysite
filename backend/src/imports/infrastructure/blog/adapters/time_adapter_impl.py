import datetime as dt
import dateutil.tz
import injector

from imports.domains.blog.adapters import TimeAdapter


@injector.singleton
class TimeAdapterImpl(TimeAdapter):

    def get_utc_now(self) -> dt.datetime:
        return dt.datetime.now(dateutil.tz.tzutc())
