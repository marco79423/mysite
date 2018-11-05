FROM python:3.7

RUN mkdir /app
RUN mkdir /content

WORKDIR /app
COPY backend/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY backend/src .

COPY content /content
ARG STATIC_URL
ARG REPO_VERSION

RUN python manage.py import-blog-data /content

CMD ["gunicorn", "wsgi:app", "-b", ":8000"]
EXPOSE 8000
