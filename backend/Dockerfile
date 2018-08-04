FROM python:3.7

ARG BACKEND_SERVER_URL
ARG BACKEND_SECRET_KEY
ARG SITE_VERSION

ENV BACKEND_SERVER_URL $BACKEND_SERVER_URL
ENV BACKEND_SECRET_KEY $BACKEND_SECRET_KEY
ENV SITE_VERSION $SITE_VERSION

RUN mkdir /app && mkdir /content
COPY content /content

WORKDIR /app
COPY backend/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY backend/src .

RUN python manage.py collectstatic --no-input
RUN python manage.py migrate
RUN python manage.py test
RUN python manage.py build /content

CMD ["gunicorn", "mysite_backend.wsgi:application", "-b", ":8000"]
EXPOSE 8000
