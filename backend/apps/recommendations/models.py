from django.db import models

# Placeholder for recommendations models
class RecommendationPlaceholder(models.Model):
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        abstract = True
