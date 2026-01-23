/**
 * Web Developer Resume Template Configuration
 * 
 * Based on Novoresume best practices for web developer resumes.
 */

export const developerTemplateConfig = {
    id: 'developer',
    name: 'Web Developer',
    icon: '💻',

    // Platform Links
    platformLinks: [
        { id: 'github', label: 'GitHub', placeholder: 'github.com/username', icon: 'github' },
        { id: 'linkedin', label: 'LinkedIn', placeholder: 'linkedin.com/in/username', icon: 'linkedin' },
        { id: 'portfolio', label: 'Portfolio', placeholder: 'yourportfolio.com', icon: 'globe' },
        { id: 'stackoverflow', label: 'Stack Overflow', placeholder: 'stackoverflow.com/users/id', icon: 'stack' },
        { id: 'codeforces', label: 'Codeforces', placeholder: 'codeforces.com/profile/handle', icon: 'code' },
        { id: 'codechef', label: 'CodeChef', placeholder: 'codechef.com/users/handle', icon: 'code' },
        { id: 'leetcode', label: 'LeetCode', placeholder: 'leetcode.com/username', icon: 'code' },
    ],

    // Skill Categories (per Novoresume)
    skillCategories: {
        languages: [
            'JavaScript', 'TypeScript', 'Python', 'Java', 'C++',
            'PHP', 'Ruby', 'Go', 'Rust', 'HTML5', 'CSS3'
        ],
        frameworks: [
            'React', 'Vue.js', 'Angular', 'Next.js', 'Node.js',
            'Express', 'Django', 'Flask', 'Spring Boot', 'Laravel'
        ],
        tools: [
            'Git', 'Docker', 'Kubernetes', 'AWS', 'Azure',
            'Firebase', 'MongoDB', 'PostgreSQL', 'Redis', 'GraphQL'
        ],
        softSkills: [
            'Problem Solving', 'Team Collaboration', 'Communication',
            'Critical Thinking', 'Adaptability', 'Time Management'
        ],
    },

    // Required Sections
    sections: [
        'personalInfo',
        'summary',
        'experience',
        'projects',        // Important for developers
        'education',
        'skills',
        'certifications',
    ],

    // Field Labels
    labels: {
        experience: 'Work Experience',
        skills: 'Technical Skills',
        education: 'Education',
    },
};

export default developerTemplateConfig;
