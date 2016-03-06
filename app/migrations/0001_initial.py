# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AppFile',
            fields=[
                ('id', models.AutoField(verbose_name='ID', auto_created=True, serialize=False, primary_key=True)),
                ('slug', models.CharField(max_length=128)),
                ('file', models.FileField(upload_to='appfiles')),
            ],
        ),
        migrations.CreateModel(
            name='Article',
            fields=[
                ('id', models.AutoField(verbose_name='ID', auto_created=True, serialize=False, primary_key=True)),
                ('slug', models.CharField(max_length=128, unique=True)),
                ('title', models.CharField(max_length=128)),
                ('date', models.DateTimeField()),
                ('modified_date', models.DateTimeField(null=True, blank=True)),
                ('content', models.TextField()),
                ('summary', models.TextField(null=True, blank=True)),
                ('raw_summary', models.TextField(null=True, blank=True)),
                ('cover', models.CharField(null=True, blank=True, max_length=128)),
            ],
            options={
                'ordering': ['date'],
            },
        ),
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(verbose_name='ID', auto_created=True, serialize=False, primary_key=True)),
                ('slug', models.CharField(max_length=128)),
                ('name', models.CharField(max_length=128)),
            ],
        ),
        migrations.CreateModel(
            name='WebPage',
            fields=[
                ('id', models.AutoField(verbose_name='ID', auto_created=True, serialize=False, primary_key=True)),
                ('app', models.CharField(max_length=32)),
                ('slug', models.CharField(max_length=128)),
                ('title', models.CharField(max_length=128)),
                ('content', models.TextField()),
            ],
        ),
        migrations.AddField(
            model_name='article',
            name='categories',
            field=models.ManyToManyField(to='app.Category'),
        ),
    ]
