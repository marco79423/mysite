FROM python:3.5

ARG BACKEND_SERVER_URL
ARG BACKEND_SECRET_KEY
ARG SITE_VERSION

ENV BACKEND_SERVER_URL $BACKEND_SERVER_URL
ENV BACKEND_SECRET_KEY $BACKEND_SECRET_KEY
ENV SITE_VERSION $SITE_VERSION

RUN mkdir /app
WORKDIR /app
COPY requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY src .

RUN python manage.py collectstatic --no-input
RUN python manage.py migrate
RUN python manage.py test

CMD ["python", "docker_entry.py"]
EXPOSE 8000
