import abc
import typing


class Entity(abc.ABC):
    pass


class Repository(abc.ABC):
    pass


class Adapter(abc.ABC):
    pass


class Service(abc.ABC):
    pass


class Request(abc.ABC):
    def __init__(self, data=None):
        self.data = data

    def __eq__(self, request):
        return self.data == request.data


class Response(abc.ABC):
    def __init__(self, data=None):
        self.data = data

    def __bool__(self):
        return True


class ResponseError(abc.ABC):
    def __init__(self, reason):
        self.reason = reason

    def __bool__(self):
        return False


class UseCase(abc.ABC):

    @abc.abstractmethod
    def execute(self, request: Request = None) -> typing.Union[Response, ResponseError]:
        pass
