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
                ('id', models.AutoField(serialize=False, verbose_name='ID', primary_key=True, auto_created=True)),
                ('slug', models.CharField(max_length=128)),
                ('file', models.FileField(upload_to='appfiles')),
            ],
        ),
        migrations.CreateModel(
            name='Article',
            fields=[
                ('id', models.AutoField(serialize=False, verbose_name='ID', primary_key=True, auto_created=True)),
                ('slug', models.CharField(max_length=128, unique=True)),
                ('title', models.CharField(max_length=128)),
                ('date', models.DateTimeField()),
                ('modified_date', models.DateTimeField(null=True, blank=True)),
                ('content', models.TextField()),
                ('summary', models.TextField(null=True, blank=True)),
                ('cover', models.CharField(max_length=128, null=True, blank=True)),
            ],
            options={
                'ordering': ['date'],
            },
        ),
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(serialize=False, verbose_name='ID', primary_key=True, auto_created=True)),
                ('slug', models.CharField(max_length=128)),
                ('name', models.CharField(max_length=128)),
            ],
        ),
        migrations.CreateModel(
            name='CategoryMenu',
            fields=[
                ('id', models.AutoField(serialize=False, verbose_name='ID', primary_key=True, auto_created=True)),
                ('order', models.IntegerField(default=0)),
                ('category', models.OneToOneField(to='content_manager.Category')),
            ],
        ),
        migrations.CreateModel(
            name='WebPage',
            fields=[
                ('id', models.AutoField(serialize=False, verbose_name='ID', primary_key=True, auto_created=True)),
                ('app', models.CharField(max_length=32)),
                ('slug', models.CharField(max_length=128)),
                ('title', models.CharField(max_length=128)),
                ('content', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='WebPageMenu',
            fields=[
                ('web_page', models.OneToOneField(primary_key=True, serialize=False, to='content_manager.WebPage')),
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
