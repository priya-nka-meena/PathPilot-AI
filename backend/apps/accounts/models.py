from django.db import models

# Placeholder models file for accounts app. Add user/profile related models later.

# Example placeholder to avoid empty-file issues
class Placeholder(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        abstract = True
