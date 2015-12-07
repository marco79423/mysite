# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('content_manager', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='categorymenu',
            name='category',
        ),
        migrations.RemoveField(
            model_name='webpagemenu',
            name='web_page',
        ),
        migrations.DeleteModel(
            name='CategoryMenu',
        ),
        migrations.DeleteModel(
            name='WebPageMenu',
        ),
    ]
