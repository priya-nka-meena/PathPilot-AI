from django.db import models

# Placeholder models for profiles app
class ProfilePlaceholder(models.Model):
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        abstract = True
