FROM python:3.8

RUN mkdir /app
RUN mkdir /content

WORKDIR /app
COPY backend .

RUN pip install --no-cache-dir -r requirements.txt

WORKDIR /app/src

ARG STATIC_URL
ARG REPO_VERSION

COPY content /content
RUN python manage.py import-blog-data /content

CMD ["gunicorn", "wsgi:app", "-b", ":8000"]
EXPOSE 8000
