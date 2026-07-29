# Student Profile Module
# PathPilot-AI

student_profile = {
    "name": "Priyanka Meena",
    "education": {
        "degree": "B.Tech",
        "branch": "Computer Science and Engineering",
        "graduation_year": 2028,
        "cgpa": 6.88
    },
    "skills": [
        "Python",
        "SQL",
        "PostgreSQL",
        "Pandas",
        "NumPy",
        "Git",
        "GitHub"
    ],
    "projects": [
        "PathPilot-AI",
        "Safe Travel & Personal Safety System"
    ],
    "experience": [
        "Open Source Contributor (GSSoC)"
    ],
    "interests": [
        "Backend Development",
        "Machine Learning",
        "Artificial Intelligence"
    ],
    "preferred_roles": [
        "Backend Developer",
        "Machine Learning Engineer",
        "Software Engineer"
    ],
    "preferred_locations": [
        "Delhi",
        "Bangalore",
        "Remote"
    ]
}


def display_profile(profile):
    print("\n========== Student Profile ==========\n")

    print(f"Name: {profile['name']}")
    print(f"Degree: {profile['education']['degree']}")
    print(f"Branch: {profile['education']['branch']}")
    print(f"Graduation Year: {profile['education']['graduation_year']}")
    print(f"CGPA: {profile['education']['cgpa']}")

    print("\nSkills:")
    for skill in profile["skills"]:
        print(f"- {skill}")

    print("\nProjects:")
    for project in profile["projects"]:
        print(f"- {project}")

    print("\nExperience:")
    for exp in profile["experience"]:
        print(f"- {exp}")

    print("\nInterests:")
    for interest in profile["interests"]:
        print(f"- {interest}")

    print("\nPreferred Roles:")
    for role in profile["preferred_roles"]:
        print(f"- {role}")

    print("\nPreferred Locations:")
    for location in profile["preferred_locations"]:
        print(f"- {location}")

    print("\n✅ Student Profile Loaded Successfully!")


if __name__ == "__main__":
    display_profile(student_profile)