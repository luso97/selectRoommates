# Generated by Django 2.2.13 on 2020-06-07 17:06

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Piso',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(default='', max_length=30)),
                ('habitantes', models.CharField(default='', max_length=202)),
            ],
        ),
    ]
