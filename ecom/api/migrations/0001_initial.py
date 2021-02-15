from django.db import migrations
from api.user.models import CustomUser


class Migration(migrations.Migration):

    def seed_data(apps,schema_editor):
        user = CustomUser(
            name="Sanjay",
            email="sanjayprakashsm@gmail.com",
            phone="7871180941",
            gender="Male",
            country="India",
            is_staff=True,
            is_superuser=True,
        )
        user.set_password('Sanjay@55')
        user.save()

    dependencies=[

    ]

    operations = [
        migrations.RunPython(seed_data),
    ]