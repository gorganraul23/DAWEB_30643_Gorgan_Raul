# Generated by Django 4.1.7 on 2023-04-09 13:51

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('imobiliare', '0004_locuinta_user_id'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='locuinta',
            name='promoted',
        ),
    ]