from rest_framework import serializers
from .models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = [
            'user',
            # Basic Information
            'location',
            'college',
            'degree',
            'branch',
            'graduation_year',
            'cgpa',
            # Career
            'career_goal',
            'interested_roles',
            'preferred_companies',
            'work_preference',
            # Skills
            'skills',
            # Experience
            'internships',
            'projects',
            'open_source_contributions',
            'hackathons',
            'experience_level',
            # Social Links
            'github',
            'linkedin',
            # Resume
            'resume',
            # About
            'bio',
            # Preferences
            'preferred_city',
            'preferred_country',
            'job_type',
            'internship_or_fulltime',
            'company_type',
            # Privacy
            'allow_personalization',
            'allow_resume_analysis',
            # Onboarding
            'onboarding_completed',
            # Timestamps
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['user', 'created_at', 'updated_at']

    def validate_cgpa(self, value):
        """Validate CGPA is a valid number if provided"""
        if value and value.strip():
            try:
                cgpa_value = float(value)
                if cgpa_value < 0 or cgpa_value > 10:
                    raise serializers.ValidationError('CGPA must be between 0 and 10.')
            except ValueError:
                raise serializers.ValidationError('CGPA must be a valid number.')
        return value

    def validate_graduation_year(self, value):
        """Validate graduation year is a valid year if provided"""
        if value and value.strip():
            import re
            if not re.match(r'^(19|20)\d{2}$', value):
                raise serializers.ValidationError('Graduation year must be a valid year (e.g., 2024).')
        return value

    def to_representation(self, instance):
        data = super().to_representation(instance)
        # Include user email and full_name for frontend
        data['user'] = {
            'id': instance.user.id,
            'email': instance.user.email,
            'full_name': instance.user.full_name,
        }
        return data
