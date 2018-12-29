from imports.applications.manage import config
from imports.domains.blog.adapters import ConfigAdapter


class ConfigAdapterImpl(ConfigAdapter):

    def get_base_static_url(self) -> str:
        return config.STATIC_URL
