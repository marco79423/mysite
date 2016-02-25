# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('content_manager', '0003_auto_20151214_2218'),
    ]

    operations = [
        migrations.AddField(
            model_name='article',
            name='raw_summary',
            field=models.TextField(blank=True, null=True),
        ),
    ]
