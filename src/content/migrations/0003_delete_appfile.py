# -*- coding: utf-8 -*-
# Generated by Django 1.10.1 on 2017-05-06 11:58
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('content', '0002_auto_20170422_1652'),
    ]

    operations = [
        migrations.DeleteModel(
            name='AppFile',
        ),
    ]
