# Generated by Django 4.1.7 on 2023-04-01 18:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('imobiliare', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='locuinta',
            name='price',
            field=models.IntegerField(default=0),
        ),
    ]
