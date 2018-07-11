FROM python:3.7

RUN mkdir /app

WORKDIR /app
COPY backend/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY backend/src .

CMD ["gunicorn", "app:app", "-b", ":8000"]
EXPOSE 8000
