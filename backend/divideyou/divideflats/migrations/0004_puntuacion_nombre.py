# Generated by Django 2.2.13 on 2020-06-11 11:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('divideflats', '0003_piso_habitaciones'),
    ]

    operations = [
        migrations.AddField(
            model_name='puntuacion',
            name='nombre',
            field=models.CharField(default='', max_length=35),
            preserve_default=False,
        ),
    ]
