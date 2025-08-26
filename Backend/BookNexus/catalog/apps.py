from django.apps import AppConfig


class CatalogConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'catalog'  # This line is the most important!
