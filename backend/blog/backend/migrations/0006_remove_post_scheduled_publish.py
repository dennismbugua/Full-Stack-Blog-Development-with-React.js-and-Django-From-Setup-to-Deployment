# Generated by Django 4.1.2 on 2023-06-20 10:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0005_alter_post_author_alter_post_body_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='post',
            name='scheduled_publish',
        ),
    ]
