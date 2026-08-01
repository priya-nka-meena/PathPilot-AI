from django.db import models

# Placeholder models for jobs app
class JobPlaceholder(models.Model):
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        abstract = True
