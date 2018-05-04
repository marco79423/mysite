FROM python:3.5 as build
MAINTAINER 兩大類 <marco79423@gmail.com>

RUN mkdir /app
WORKDIR /app

COPY requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY src .

RUN python manage.py migrate
RUN python manage.py collectstatic --no-input
RUN python manage.py test

FROM python:3.5

RUN mkdir /app
WORKDIR /app

COPY requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY src .

ENTRYPOINT ["python", "docker_entry.py"]
CMD ["--help"]
EXPOSE 8000
