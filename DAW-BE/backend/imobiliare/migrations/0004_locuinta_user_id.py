# Generated by Django 4.1.7 on 2023-04-05 18:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('imobiliare', '0003_locuinta_img_path'),
    ]

    operations = [
        migrations.AddField(
            model_name='locuinta',
            name='user_id',
            field=models.IntegerField(default=14),
        ),
    ]