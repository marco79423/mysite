# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AppFile',
            fields=[
                ('id', models.AutoField(serialize=False, auto_created=True, verbose_name='ID', primary_key=True)),
                ('slug', models.CharField(max_length=128)),
                ('file', models.FileField(upload_to='appfiles')),
            ],
        ),
        migrations.CreateModel(
            name='Article',
            fields=[
                ('id', models.AutoField(serialize=False, auto_created=True, verbose_name='ID', primary_key=True)),
                ('slug', models.CharField(unique=True, max_length=128)),
                ('title', models.CharField(max_length=128)),
                ('date', models.DateTimeField()),
                ('modified_date', models.DateTimeField(null=True, blank=True)),
                ('content', models.TextField()),
                ('summary', models.TextField(null=True, blank=True)),
                ('cover', models.CharField(null=True, max_length=128, blank=True)),
            ],
            options={
                'ordering': ['date'],
            },
        ),
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(serialize=False, auto_created=True, verbose_name='ID', primary_key=True)),
                ('slug', models.CharField(max_length=128)),
                ('name', models.CharField(max_length=128)),
            ],
        ),
        migrations.CreateModel(
            name='CategoryMenu',
            fields=[
                ('id', models.AutoField(serialize=False, auto_created=True, verbose_name='ID', primary_key=True)),
                ('order', models.IntegerField(default=0)),
                ('category', models.OneToOneField(to='content_manager.Category')),
            ],
            options={
                'ordering': ['order'],
            },
        ),
        migrations.CreateModel(
            name='WebPage',
            fields=[
                ('id', models.AutoField(serialize=False, auto_created=True, verbose_name='ID', primary_key=True)),
                ('app', models.CharField(max_length=32)),
                ('slug', models.CharField(max_length=128)),
                ('title', models.CharField(max_length=128)),
                ('content', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='WebPageMenu',
            fields=[
                ('web_page', models.OneToOneField(to='content_manager.WebPage', serialize=False, primary_key=True)),
                ('order', models.IntegerField(default=0)),
            ],
            options={
                'ordering': ['order'],
            },
        ),
        migrations.AddField(
            model_name='article',
            name='category',
            field=models.ForeignKey(to='content_manager.Category'),
        ),
    ]
