# Generated by Django 4.1.7 on 2023-04-04 17:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_alter_user_options_alter_user_managers_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='role',
            field=models.CharField(choices=[('agent', 'Agent'), ('customer', 'Customer')], default='customer', max_length=20),
        ),
    ]
