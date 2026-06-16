import { ProfileData } from "./types";

export const initialProfileData: ProfileData = {
  name: "Bandaru Malleswari",
  title: "AI & Data Science Student & Full-Stack Developer",
  email: "bandarumalliswari138@gmail.com",
  phone: "8555924342",
  location: "Andhra Pradesh, India",
  linkedin: "https://linkedin.com/in/bandarumalleswari",
  github: "https://github.com/Malleswari570",
  summary: "B.Tech student in Artificial Intelligence and Data Science with hands-on experience in Python development, web application development, and machine learning. Built practical projects using Python, Flask, HTML, CSS, and machine learning libraries. Completed internships and industry programs focused on software development, machine learning, and problem-solving while continuously strengthening full-stack development skills.",
  skills: [
    {
      id: "lang",
      name: "Programming Languages",
      skills: ["Python", "JavaScript", "SQL", "TypeScript", "HTML5", "CSS3"]
    },
    {
      id: "frontend",
      name: "Frontend Development",
      skills: ["React.js", "Tailwind CSS", "Vite", "Framer Motion", "DOM Manipulation"]
    },
    {
      id: "backend",
      name: "Backend & Databases",
      skills: ["Node.js", "Express.js", "Flask", "MySQL", "MongoDB", "REST APIs"]
    },
    {
      id: "ai-ml",
      name: "AI & Machine Learning",
      skills: ["Scikit-learn", "Pandas", "NumPy", "Exploratory Data Analysis", "Predictive Modeling", "Chatbots"]
    },
    {
      id: "tools",
      name: "Tools & Frameworks",
      skills: ["Git", "GitHub", "VS Code", "npm", "Postman"]
    }
  ],
  projects: [
    {
      id: "p1",
      title: "Chatbot Application",
      date: "Apr 2025 – May 2025",
      description: "A web-based interactive chatbot providing real-time user engagement and response automation.",
      bulletPoints: [
        "Developed a web-based chatbot using Python, Flask, and HTML to provide real-time user interaction.",
        "Designed an interactive user interface and integrated backend functionality to process user requests efficiently.",
        "Implemented Flask routing and response handling mechanisms for dynamic chatbot communication.",
        "Improved understanding of full-stack web development through frontend and backend integration."
      ],
      techStack: ["Python", "Flask", "HTML", "CSS", "JavaScript", "Chatbots"],
      githubUrl: "https://github.com/Malleswari570",
      category: "nlp"
    },
    {
      id: "p2",
      title: "Breast Cancer Prediction using Machine Learning",
      date: "Nov 2024",
      description: "A predictive analytics healthcare model utilizing machine learning classifiers to diagnose tumors.",
      bulletPoints: [
        "Built a machine learning model to classify tumors as benign or malignant using healthcare data.",
        "Performed data preprocessing, feature analysis, and model training using Python, Pandas, and Scikit-learn.",
        "Applied exploratory data analysis techniques to identify patterns and improve model understanding.",
        "Evaluated model performance using machine learning evaluation metrics."
      ],
      techStack: ["Python", "Scikit-learn", "Pandas", "NumPy", "Matplotlib"],
      githubUrl: "https://github.com/Malleswari570",
      category: "ml"
    }
  ],
  experiences: [
    {
      id: "exp1",
      role: "Machine Learning Intern",
      company: "Foundation for Machine Learning and Machine Intelligence (FMML), IIIT Hyderabad",
      location: "Hyderabad, India (Remote)",
      date: "Jan 2025 – Apr 2025",
      bulletPoints: [
        "Completed the Foundation of Modern Machine Learning program focused on core machine learning concepts and AI applications.",
        "Worked on practical learning activities involving data preprocessing, model development, and evaluation techniques.",
        "Applied Python-based tools and libraries to understand machine learning workflows and predictive modeling.",
        "Strengthened analytical thinking and problem-solving skills through structured assignments and hands-on exercises."
      ],
      techUsed: ["Python", "Machine Learning", "Data Preprocessing", "Pandas", "Scikit-learn"]
    }
  ],
  education: [
    {
      id: "edu1",
      degree: "Bachelor of Technology (B.Tech) in Artificial Intelligence and Data Science",
      institution: "Kakinada Institute of Engineering and Technology",
      location: "Andhra Pradesh, India",
      date: "Sep 2023 – May 2027",
      gradeLabel: "CGPA",
      gradeValue: "7.84"
    },
    {
      id: "edu2",
      degree: "Intermediate Education (MPC)",
      institution: "Srisiddhartha Junior College",
      location: "Andhra Pradesh, India",
      date: "Jun 2021 – May 2023",
      gradeLabel: "Percentage",
      gradeValue: "71%"
    },
    {
      id: "edu3",
      degree: "Secondary School Certificate (SSC)",
      institution: "Z.P.P High School",
      location: "Andhra Pradesh, India",
      date: "Completed Apr 2021",
      gradeLabel: "CGPA",
      gradeValue: "9.5"
    }
  ],
  certifications: [
    {
      id: "cert1",
      name: "Python Internship Completion Certificate",
      issuer: "HappieLoop"
    },
    {
      id: "cert2",
      name: "AI Careers for Women Program Completion",
      issuer: "Edunet Foundation"
    },
    {
      id: "cert3",
      name: "Foundation of Modern Machine Learning (FMML)",
      issuer: "IIIT Hyderabad"
    }
  ]
};
