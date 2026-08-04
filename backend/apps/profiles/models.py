from django.db import models
from django.conf import settings
from django.utils import timezone


class Profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='profile')
    
    # Basic Information
    location = models.CharField(max_length=255, blank=True)
    college = models.CharField(max_length=255, blank=True)
    degree = models.CharField(max_length=255, blank=True)
    branch = models.CharField(max_length=255, blank=True)
    graduation_year = models.CharField(max_length=10, blank=True)
    cgpa = models.CharField(max_length=10, blank=True)
    
    # Career
    career_goal = models.TextField(blank=True)
    interested_roles = models.JSONField(default=list, blank=True)
    preferred_companies = models.JSONField(default=list, blank=True)
    work_preference = models.CharField(max_length=50, blank=True)
    
    # Skills
    skills = models.JSONField(default=list, blank=True)
    
    # Experience
    internships = models.JSONField(default=list, blank=True)
    projects = models.JSONField(default=list, blank=True)
    open_source_contributions = models.JSONField(default=list, blank=True)
    hackathons = models.JSONField(default=list, blank=True)
    experience_level = models.CharField(max_length=50, blank=True)
    
    # Social Links
    github = models.URLField(blank=True)
    linkedin = models.URLField(blank=True)
    
    # Resume
    resume = models.FileField(upload_to='resumes/', null=True, blank=True)
    
    # About
    bio = models.TextField(blank=True)
    
    # Preferences
    preferred_city = models.CharField(max_length=255, blank=True)
    preferred_country = models.CharField(max_length=255, blank=True)
    job_type = models.CharField(max_length=50, blank=True)
    internship_or_fulltime = models.CharField(max_length=50, blank=True)
    company_type = models.CharField(max_length=50, blank=True)
    
    # Privacy
    allow_personalization = models.BooleanField(default=True)
    allow_resume_analysis = models.BooleanField(default=False)
    
    # Onboarding
    onboarding_completed = models.BooleanField(default=False)
    
    # Timestamps
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Profile: {self.user.email}"
