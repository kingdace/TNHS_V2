import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    User,
    GraduationCap,
    Award,
    Mail,
    Phone,
    MapPin,
    BookOpen,
    Users,
    Calendar,
    Star,
    Target,
    Lightbulb,
    Trophy,
    Clock,
    Building,
    Globe,
    Heart,
    Shield,
    ArrowRight,
    CheckCircle,
    ChevronRight,
    ChevronLeft,
    Home,
    MessageSquare,
    FileText,
    Image,
    ExternalLink,
    TrendingUp,
    X,
    Crown,
} from "lucide-react";

const Principal = () => {
    const [selectedPressRelease, setSelectedPressRelease] = useState(null);
    const [showAllPressReleases, setShowAllPressReleases] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showAboutPrincipal, setShowAboutPrincipal] = useState(false);
    const [showPrincipalVision, setShowPrincipalVision] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Reset image index when selecting a new press release
    useEffect(() => {
        if (selectedPressRelease) {
            setCurrentImageIndex(0);
        }
    }, [selectedPressRelease]);

    const newsUpdates = [
        {
            id: 1,
            title: "TNHS launches new digital learning platform for enhanced education",
            date: "August 20, 2024",
            excerpt:
                "The school administration led by Principal Dr. Maria Santos announced the implementation of a comprehensive digital learning platform...",
            category: "Academic Innovation",
            fullContent: `The school administration led by Principal Dr. Maria Santos announced the implementation of a comprehensive digital learning platform designed to enhance the educational experience for all students at Taft National High School.

This innovative platform integrates cutting-edge technology with traditional teaching methods, providing students with interactive learning modules, virtual laboratories, and personalized study plans. The initiative represents a significant investment in the future of education at TNHS.

Key features of the new platform include:
• Interactive multimedia content for all subjects
• Real-time progress tracking and analytics
• Virtual collaboration tools for group projects
• Mobile accessibility for learning on-the-go
• Integration with existing school systems

Principal Dr. Maria Santos emphasized that this platform will help bridge the digital divide and ensure that all students have access to quality education resources, regardless of their background or circumstances.

The implementation will be phased over the next academic year, with comprehensive training provided to all faculty members to ensure smooth integration into the curriculum.`,
            image: "/images/digital-learning.jpg",
            images: [
                "/images/digital-learning-1.jpg",
                "/images/digital-learning-2.jpg",
                "/images/digital-learning-3.jpg",
            ],
            author: "TNHS Admin",
            readTime: "5 min read",
        },
        {
            id: 2,
            title: "Principal leads community outreach program for student welfare",
            date: "August 12, 2024",
            excerpt:
                "Dr. Maria Santos spearheaded a community outreach initiative focusing on student welfare and family support programs...",
            category: "Community Service",
            fullContent: `Dr. Maria Santos spearheaded a community outreach initiative focusing on student welfare and family support programs that has made a significant impact on the local community.

The program, launched in collaboration with local government units and non-profit organizations, aims to provide comprehensive support to students and their families, addressing not just academic needs but also social and economic challenges.

Program components include:
• Free tutoring and homework assistance
• Family counseling and support services
• Nutrition programs for underprivileged students
• Career guidance and job placement assistance
• Mental health support and counseling

Over the past six months, the program has served over 200 families and provided direct assistance to more than 500 students. The initiative has been recognized by the Department of Education as a model program for community engagement in education.

Principal Dr. Maria Santos stated, "Education is not just about academics; it's about nurturing the whole child and supporting their families. This program embodies our commitment to creating a supportive community where every student can thrive."

The program continues to expand, with plans to include additional services such as adult education classes for parents and skills training programs for family members.`,
            image: "/images/community-outreach.jpg",
            images: [
                "/images/community-outreach-1.jpg",
                "/images/community-outreach-2.jpg",
                "/images/community-outreach-3.jpg",
            ],
            author: "TNHS Admin",
            readTime: "4 min read",
        },
        {
            id: 3,
            title: "TNHS receives recognition for academic excellence under new leadership",
            date: "August 11, 2024",
            excerpt:
                "The Department of Education recognized TNHS for outstanding academic performance and innovative educational programs...",
            category: "Achievement",
            fullContent: `The Department of Education recognized TNHS for outstanding academic performance and innovative educational programs under the leadership of Principal Dr. Maria Santos.

This prestigious recognition comes after a comprehensive evaluation of the school's performance across multiple metrics, including student achievement, teacher effectiveness, curriculum innovation, and community engagement.

Key achievements that led to this recognition include:
• 95% graduation rate, up from 78% the previous year
• 40% improvement in standardized test scores
• Implementation of innovative teaching methodologies
• Strong community partnerships and engagement
• Excellent teacher retention and professional development

The recognition includes a special commendation for the school's innovative approach to blended learning, which has proven particularly effective during challenging times. The school's commitment to equity and inclusion was also highlighted as a model for other institutions.

Principal Dr. Maria Santos expressed gratitude for the recognition, stating, "This achievement reflects the hard work and dedication of our entire school community - students, teachers, staff, and parents. Together, we have created an environment where excellence is not just a goal, but a daily practice."

The recognition comes with additional funding for further program development and the opportunity to serve as a mentor school for other institutions seeking to improve their educational outcomes.`,
            image: "/images/academic-excellence.jpg",
            images: [
                "/images/academic-excellence-1.jpg",
                "/images/academic-excellence-2.jpg",
                "/images/academic-excellence-3.jpg",
            ],
            author: "TNHS Admin",
            readTime: "6 min read",
        },
        {
            id: 4,
            title: "New STEM laboratory facilities inaugurated at TNHS",
            date: "August 5, 2024",
            excerpt:
                "State-of-the-art Science, Technology, Engineering, and Mathematics facilities were officially opened...",
            category: "Facilities",
            fullContent: `State-of-the-art Science, Technology, Engineering, and Mathematics facilities were officially opened at Taft National High School, marking a significant milestone in the school's commitment to providing world-class education.

The new STEM laboratory complex features modern equipment, interactive learning spaces, and cutting-edge technology designed to enhance students' understanding of scientific concepts and prepare them for future careers in STEM fields.

Key features include:
• Advanced chemistry and physics laboratories
• Computer programming and robotics workstations
• Mathematics visualization center
• Engineering design and prototyping area
• Collaborative learning spaces

Principal Dr. Maria Santos emphasized that these facilities will help students develop critical thinking skills and prepare for the challenges of the 21st century. The investment represents the school's dedication to academic excellence and innovation.`,
            image: "/images/stem-lab.jpg",
            images: [
                "/images/stem-lab-1.jpg",
                "/images/stem-lab-2.jpg",
                "/images/stem-lab-3.jpg",
            ],
            author: "TNHS Admin",
            readTime: "3 min read",
        },
        {
            id: 5,
            title: "Student leadership conference promotes civic engagement",
            date: "July 28, 2024",
            excerpt:
                "Over 200 student leaders from various organizations participated in the annual leadership conference...",
            category: "Student Life",
            fullContent: `Over 200 student leaders from various organizations participated in the annual leadership conference, focusing on civic engagement and community service.

The conference featured workshops on leadership development, community organizing, and social responsibility. Students had the opportunity to learn from experienced community leaders and develop practical skills for making a positive impact in their communities.

Conference highlights included:
• Interactive workshops on leadership principles
• Community service project planning sessions
• Guest speakers from local government and NGOs
• Networking opportunities with peer leaders
• Action planning for school improvement initiatives

The event was organized by the Student Government and supported by the school administration, demonstrating TNHS's commitment to developing responsible and engaged citizens.`,
            image: "/images/leadership-conference.jpg",
            images: [
                "/images/leadership-conference-1.jpg",
                "/images/leadership-conference-2.jpg",
                "/images/leadership-conference-3.jpg",
            ],
            author: "TNHS Admin",
            readTime: "4 min read",
        },
        {
            id: 6,
            title: "Teachers receive advanced training in modern pedagogy",
            date: "July 15, 2024",
            excerpt:
                "Faculty members completed intensive training programs in innovative teaching methodologies...",
            category: "Professional Development",
            fullContent: `Faculty members completed intensive training programs in innovative teaching methodologies, enhancing their ability to deliver engaging and effective instruction.

The training programs covered various aspects of modern pedagogy, including differentiated instruction, technology integration, and student-centered learning approaches. Teachers also received certification in new assessment techniques and classroom management strategies.

Training components included:
• Differentiated instruction techniques
• Technology integration in the classroom
• Student-centered learning approaches
• Modern assessment strategies
• Classroom management best practices

Principal Dr. Maria Santos praised the faculty's commitment to continuous improvement and professional development, noting that these enhanced skills will directly benefit student learning outcomes.`,
            image: "/images/teacher-training.jpg",
            images: [
                "/images/teacher-training-1.jpg",
                "/images/teacher-training-2.jpg",
                "/images/teacher-training-3.jpg",
            ],
            author: "TNHS Admin",
            readTime: "3 min read",
        },
    ];

    const leadershipTeam = [
        {
            name: "Dr. Maria Santos",
            position: "Principal",
            department: "School Administration",
            email: "principal@tnhs.edu.ph",
        },
        {
            name: "Mr. Juan Dela Cruz",
            position: "Assistant Principal",
            department: "Academic Affairs",
            email: "assistant.principal@tnhs.edu.ph",
        },
        {
            name: "Ms. Ana Rodriguez",
            position: "Head Teacher",
            department: "Student Affairs",
            email: "head.teacher@tnhs.edu.ph",
        },
    ];

    const directories = [
        {
            title: "Principal's Office",
            email: "principal@tnhs.edu.ph",
            phone: "09123456789",
            extension: "101",
        },
        {
            title: "Academic Affairs",
            email: "academic@tnhs.edu.ph",
            phone: "09123456790",
            extension: "102",
        },
        {
            title: "Student Affairs",
            email: "student.affairs@tnhs.edu.ph",
            phone: "09123456791",
            extension: "103",
        },
        {
            title: "Guidance Office",
            email: "guidance@tnhs.edu.ph",
            phone: "09123456792",
            extension: "104",
        },
    ];

    return (
        <>
            <div className="min-h-screen bg-white">
                {/* Header with Breadcrumb */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-4">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center space-x-2 text-sm">
                            <Link
                                to="/"
                                className="flex items-center hover:text-blue-200"
                            >
                                <Home className="w-4 h-4 mr-1" />
                                Home
                            </Link>
                            <ChevronRight className="w-4 h-4" />
                            <Link to="/faculty" className="hover:text-blue-200">
                                Faculty
                            </Link>
                            <ChevronRight className="w-4 h-4" />
                            <span>Office of the Principal</span>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Page Title */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">
                            Office of the Principal
                        </h1>
                        <p className="text-gray-600">
                            Taft National High School — Competence, Service, and
                            Uprightness
                        </p>
                    </div>

                    {/* Main Content - Enhanced Professional Section */}
                    <div className="bg-gradient-to-br from-white via-gray-50 to-white border-2 border-gray-100 rounded-2xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500">
                        <div className="grid lg:grid-cols-2 gap-16">
                            {/* Left Column - Enhanced Principal Profile */}
                            <div className="space-y-8">
                                {/* Enhanced Principal Photo */}
                                <div className="flex justify-center">
                                    <div className="relative w-80 h-96">
                                        <div className="absolute inset-0 bg-gradient-to-br from-green-400 via-blue-500 to-green-600 rounded-2xl transform rotate-3 shadow-2xl"></div>
                                        <div className="relative w-full h-full bg-white rounded-2xl flex items-center justify-center border-4 border-white overflow-hidden shadow-xl">
                                            <img
                                                src="/images/Principal.jpg"
                                                alt="Dr. Manuel B. Dayondon - Principal"
                                                className="w-full h-full object-cover rounded-2xl"
                                                onError={(e) => {
                                                    e.target.style.display =
                                                        "none";
                                                    e.target.nextSibling.style.display =
                                                        "flex";
                                                }}
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-100 to-green-100 rounded-2xl hidden">
                                                <div className="text-center">
                                                    <div className="w-32 h-32 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                                                        <User className="w-20 h-20 text-white" />
                                                    </div>
                                                    <p className="text-gray-600 text-sm font-medium mb-2">
                                                        Principal Photo
                                                    </p>
                                                    <p className="text-gray-500 text-xs px-4 bg-white/80 rounded-full py-1">
                                                        Photo will be updated
                                                        soon
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Enhanced Principal Name & Title */}
                                <div className="text-center space-y-3">
                                    <div className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                                        <h2 className="text-4xl font-black tracking-tight mb-2">
                                            Dr. Manuel B. Dayondon
                                        </h2>
                                    </div>
                                    <div className="inline-block">
                                        <span className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-2 rounded-full text-lg font-bold shadow-lg">
                                            School Principal IV
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-center space-x-2 text-gray-600">
                                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                        <span className="text-sm font-medium">
                                            Currently Active
                                        </span>
                                    </div>
                                </div>

                                {/* Enhanced Action Buttons */}
                                <div className="space-y-4">
                                    <button
                                        onClick={() =>
                                            setShowAboutPrincipal(true)
                                        }
                                        className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                                    >
                                        <User className="w-5 h-5" />
                                        <span>About the Principal</span>
                                    </button>
                                    <button
                                        onClick={() =>
                                            setShowPrincipalVision(true)
                                        }
                                        className="w-full bg-white border-2 border-green-600 text-green-600 hover:bg-green-50 font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                                    >
                                        <Target className="w-5 h-5" />
                                        <span>Principal's Vision</span>
                                    </button>
                                </div>

                                {/* Useful Information Cards - Compact */}
                                <div className="grid grid-cols-2 gap-3">
                                    {/* Office Hours Card - Small */}
                                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200 shadow-sm">
                                        <div className="flex items-center mb-2">
                                            <Clock className="w-4 h-4 text-blue-600 mr-2" />
                                            <h3 className="text-sm font-bold text-blue-800">
                                                Office Hours
                                            </h3>
                                        </div>
                                        <div className="text-xs text-gray-700 space-y-1">
                                            <div className="flex justify-between">
                                                <span>Mon-Fri:</span>
                                                <span className="font-medium">
                                                    7AM-5PM
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Saturday:</span>
                                                <span className="font-medium">
                                                    8AM-12PM
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Contact Information Card - Small */}
                                    <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200 shadow-sm">
                                        <div className="flex items-center mb-2">
                                            <MessageSquare className="w-4 h-4 text-green-600 mr-2" />
                                            <h3 className="text-sm font-bold text-green-800">
                                                Contact
                                            </h3>
                                        </div>
                                        <div className="text-xs text-gray-700 space-y-1">
                                            <div className="flex items-center">
                                                <Phone className="w-3 h-3 text-green-600 mr-1" />
                                                <span>(055) 555-0123</span>
                                            </div>
                                            <div className="flex items-center">
                                                <Mail className="w-3 h-3 text-green-600 mr-1" />
                                                <span className="truncate">
                                                    principal@tnhs.edu.ph
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Enhanced Bio */}
                            <div className="flex items-center">
                                <div
                                    className="space-y-6"
                                    id="about-principal-section"
                                >
                                    {/* Bio Header */}
                                    <div className="text-center lg:text-left">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
                                            <Award className="w-6 h-6 text-green-600 mr-2" />
                                            Leadership Profile
                                        </h3>
                                        <div className="w-20 h-1 bg-gradient-to-r from-green-600 to-blue-600 rounded-full mx-auto lg:mx-0"></div>
                                    </div>

                                    {/* Enhanced Bio Content */}
                                    <div className="text-gray-800 leading-relaxed space-y-5">
                                        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border-l-4 border-green-500">
                                            <p className="text-base font-medium">
                                                A seasoned leader and true
                                                academic at heart,{" "}
                                                <span className="font-bold text-green-700">
                                                    Dr. Manuel B. Dayondon
                                                </span>{" "}
                                                now serves as the School
                                                Principal IV of Taft National
                                                High School—bringing with him
                                                decades of experience, wisdom,
                                                and a deep understanding of the
                                                school he once called home.
                                            </p>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex items-start space-x-3">
                                                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                                <p className="text-gray-700">
                                                    Before assuming the
                                                    principalship, he served as
                                                    Assistant Principal of Taft
                                                    NHS, and previously led
                                                    several schools with
                                                    excellence:{" "}
                                                    <span className="font-semibold text-green-700">
                                                        San Jose National High
                                                        School
                                                    </span>
                                                    ,{" "}
                                                    <span className="font-semibold text-green-700">
                                                        Cabrera-Altres National
                                                        High School
                                                    </span>
                                                    ,{" "}
                                                    <span className="font-semibold text-green-700">
                                                        Anomar National High
                                                        School
                                                    </span>
                                                    , and{" "}
                                                    <span className="font-semibold text-green-700">
                                                        Mat-i National High
                                                        School
                                                    </span>
                                                    .
                                                </p>
                                            </div>

                                            <div className="flex items-start space-x-3">
                                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                                <p className="text-gray-700">
                                                    A former teacher of both
                                                    Taft NHS and Surigao City
                                                    National High School, he
                                                    remains rooted in the
                                                    classroom as a graduate
                                                    school instructor at{" "}
                                                    <span className="font-semibold text-blue-700">
                                                        St. Paul University
                                                        Surigao
                                                    </span>
                                                    .
                                                </p>
                                            </div>

                                            <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-xl border border-blue-200">
                                                <p className="text-gray-800 font-medium text-center">
                                                    <span className="text-green-700 font-bold">
                                                        Dr. Dayondon
                                                    </span>{" "}
                                                    is not just an
                                                    administrator—he is a{" "}
                                                    <span className="text-blue-700 font-semibold">
                                                        mentor
                                                    </span>
                                                    ,{" "}
                                                    <span className="text-green-700 font-semibold">
                                                        scholar
                                                    </span>
                                                    , and{" "}
                                                    <span className="text-blue-700 font-semibold">
                                                        steady hand
                                                    </span>{" "}
                                                    guiding the entire Taft NHS
                                                    community forward.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Achievements and Awards Section */}
                    <div className="mt-12 bg-gradient-to-r from-yellow-50 via-orange-50 to-yellow-50 rounded-2xl p-8 border border-yellow-200">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                Achievements and Awards
                            </h2>
                            <p className="text-gray-600 max-w-3xl mx-auto">
                                Dr. Manuel B. Dayondon has been recognized for
                                his outstanding leadership and contributions to
                                education through numerous prestigious awards
                                and achievements.
                            </p>
                        </div>

                        {/* Awards Grid */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            {/* Outstanding School Administrator Award */}
                            <div
                                className="bg-white rounded-xl p-6 shadow-lg border border-red-200 hover:shadow-xl transition-all duration-300 cursor-pointer group"
                                onClick={() => {
                                    const modal =
                                        document.getElementById(
                                            "award-modal-1"
                                        );
                                    if (modal) modal.classList.remove("hidden");
                                }}
                            >
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mr-4">
                                        <Crown className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-red-600 transition-colors">
                                            Outstanding School Administrator
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            2023
                                        </p>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-medium">
                                        Regional Level
                                    </span>
                                </div>
                                <p className="text-gray-600 text-sm">
                                    Department of Education - Region VIII
                                </p>
                                <div className="mt-4 flex items-center text-red-600 text-sm font-medium group-hover:text-red-700">
                                    <span>View Details</span>
                                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>

                            {/* Excellence in School Management Award */}
                            <div
                                className="bg-white rounded-xl p-6 shadow-lg border border-blue-200 hover:shadow-xl transition-all duration-300 cursor-pointer group"
                                onClick={() => {
                                    const modal =
                                        document.getElementById(
                                            "award-modal-2"
                                        );
                                    if (modal) modal.classList.remove("hidden");
                                }}
                            >
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mr-4">
                                        <Trophy className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                            Excellence in School Management
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            2022
                                        </p>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                                        National Level
                                    </span>
                                </div>
                                <p className="text-gray-600 text-sm">
                                    Professional Regulation Commission
                                </p>
                                <div className="mt-4 flex items-center text-blue-600 text-sm font-medium group-hover:text-blue-700">
                                    <span>View Details</span>
                                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>

                            {/* Community Service Recognition */}
                            <div
                                className="bg-white rounded-xl p-6 shadow-lg border border-green-200 hover:shadow-xl transition-all duration-300 cursor-pointer group"
                                onClick={() => {
                                    const modal =
                                        document.getElementById(
                                            "award-modal-3"
                                        );
                                    if (modal) modal.classList.remove("hidden");
                                }}
                            >
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mr-4">
                                        <Heart className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                                            Community Service Recognition
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            2021
                                        </p>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                                        Local Level
                                    </span>
                                </div>
                                <p className="text-gray-600 text-sm">
                                    Taft Municipal Government
                                </p>
                                <div className="mt-4 flex items-center text-green-600 text-sm font-medium group-hover:text-green-700">
                                    <span>View Details</span>
                                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>

                            {/* Educational Technology Innovation Award */}
                            <div
                                className="bg-white rounded-xl p-6 shadow-lg border border-purple-200 hover:shadow-xl transition-all duration-300 cursor-pointer group"
                                onClick={() => {
                                    const modal =
                                        document.getElementById(
                                            "award-modal-4"
                                        );
                                    if (modal) modal.classList.remove("hidden");
                                }}
                            >
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mr-4">
                                        <Lightbulb className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                                            Educational Technology Innovation
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            2020
                                        </p>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium">
                                        Provincial Level
                                    </span>
                                </div>
                                <p className="text-gray-600 text-sm">
                                    Eastern Samar Division
                                </p>
                                <div className="mt-4 flex items-center text-purple-600 text-sm font-medium group-hover:text-purple-700">
                                    <span>View Details</span>
                                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>

                            {/* Academic Excellence Award */}
                            <div
                                className="bg-white rounded-xl p-6 shadow-lg border border-yellow-200 hover:shadow-xl transition-all duration-300 cursor-pointer group"
                                onClick={() => {
                                    const modal =
                                        document.getElementById(
                                            "award-modal-5"
                                        );
                                    if (modal) modal.classList.remove("hidden");
                                }}
                            >
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mr-4">
                                        <Award className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-yellow-600 transition-colors">
                                            Academic Excellence Award
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            2019
                                        </p>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium">
                                        Regional Level
                                    </span>
                                </div>
                                <p className="text-gray-600 text-sm">
                                    Department of Education - Region VIII
                                </p>
                                <div className="mt-4 flex items-center text-yellow-600 text-sm font-medium group-hover:text-yellow-700">
                                    <span>View Details</span>
                                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>

                            {/* Leadership Excellence Award */}
                            <div
                                className="bg-white rounded-xl p-6 shadow-lg border border-indigo-200 hover:shadow-xl transition-all duration-300 cursor-pointer group"
                                onClick={() => {
                                    const modal =
                                        document.getElementById(
                                            "award-modal-6"
                                        );
                                    if (modal) modal.classList.remove("hidden");
                                }}
                            >
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center mr-4">
                                        <Star className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                                            Leadership Excellence Award
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            2018
                                        </p>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-medium">
                                        Provincial Level
                                    </span>
                                </div>
                                <p className="text-gray-600 text-sm">
                                    Eastern Samar Division
                                </p>
                                <div className="mt-4 flex items-center text-indigo-600 text-sm font-medium group-hover:text-indigo-700">
                                    <span>View Details</span>
                                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </div>

                        {/* View All Awards Button */}
                        <div className="text-center">
                            <button
                                onClick={() => {
                                    const modal =
                                        document.getElementById(
                                            "all-awards-modal"
                                        );
                                    if (modal) modal.classList.remove("hidden");
                                }}
                                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center mx-auto"
                            >
                                <Trophy className="w-5 h-5 mr-2" />
                                View All Awards & Achievements
                            </button>
                        </div>
                    </div>

                    {/* Principal's Corner - Enhanced Compact Design */}
                    <div className="mt-12 bg-white border border-gray-200 rounded-lg p-6">
                        {/* Header with "See All" Button */}
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">
                                Principal's Corner
                            </h2>
                            <button
                                onClick={() => setShowAllPressReleases(true)}
                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium border border-green-600 hover:border-green-700 transition-colors duration-300 flex items-center"
                            >
                                See All Press Releases
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </button>
                        </div>

                        {/* Simple 3-Column Grid Layout - Matching Achievement Boxes */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {newsUpdates.slice(0, 6).map((update, index) => (
                                <div
                                    key={update.id}
                                    className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer group"
                                    onClick={() =>
                                        setSelectedPressRelease(update)
                                    }
                                >
                                    {/* Simple Image Placeholder */}
                                    <div className="h-32 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg flex items-center justify-center relative mb-4">
                                        <div className="text-center">
                                            <Image className="w-8 h-8 text-gray-400 mx-auto mb-1" />
                                            <p className="text-xs text-gray-500">
                                                News Image
                                            </p>
                                        </div>
                                        {/* Category Badge */}
                                        <div className="absolute top-2 left-2">
                                            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                                                {update.category}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Simple Content */}
                                    <div>
                                        {/* Title */}
                                        <h4 className="text-lg font-bold text-gray-900 group-hover:text-green-600 transition-colors mb-2 line-clamp-2">
                                            {update.title}
                                        </h4>

                                        {/* Metadata */}
                                        <div className="flex items-center text-sm text-gray-600 mb-3">
                                            <span>by {update.author}</span>
                                            <span className="mx-1">•</span>
                                            <span>{update.date}</span>
                                        </div>

                                        {/* Description */}
                                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                            {update.excerpt}
                                        </p>

                                        {/* Read Time */}
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-gray-500">
                                                {update.readTime}
                                            </span>
                                            <div className="flex items-center text-green-600 text-sm font-medium group-hover:text-green-700">
                                                <span>Read More</span>
                                                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Show More Button for Additional Press Releases */}
                        {newsUpdates.length > 6 && (
                            <div className="mt-6 text-center">
                                <button
                                    onClick={() =>
                                        setShowAllPressReleases(true)
                                    }
                                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-lg text-sm font-medium transition-colors duration-300 flex items-center mx-auto"
                                >
                                    View All {newsUpdates.length} Press Releases
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Navigation */}
                    <div className="mt-12 flex flex-wrap justify-center gap-4">
                        <Link
                            to="/faculty"
                            className="inline-flex items-center px-6 py-3 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors duration-300"
                        >
                            ← Back to Faculty Overview
                        </Link>
                        <Link
                            to="/"
                            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-300"
                        >
                            ← Back to Home
                        </Link>
                    </div>
                </div>

                {/* Award Detail Modals */}
                {/* Outstanding School Administrator Award Modal */}
                <div
                    id="award-modal-1"
                    className="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                >
                    <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mr-4">
                                        <Crown className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900">
                                            Outstanding School Administrator
                                        </h3>
                                        <p className="text-gray-600">
                                            2023 • Regional Level
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() =>
                                        document
                                            .getElementById("award-modal-1")
                                            .classList.add("hidden")
                                    }
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-2">
                                        Awarding Organization
                                    </h4>
                                    <p className="text-gray-600">
                                        Department of Education - Region VIII
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-2">
                                        Description
                                    </h4>
                                    <p className="text-gray-600">
                                        Recognized for exceptional leadership in
                                        school administration and innovative
                                        educational programs that have
                                        significantly improved student outcomes
                                        and school performance.
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-2">
                                        Key Achievements
                                    </h4>
                                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                                        <li>
                                            Increased graduation rate to 95%
                                        </li>
                                        <li>
                                            Implemented digital learning
                                            platform
                                        </li>
                                        <li>
                                            Established community partnerships
                                        </li>
                                        <li>
                                            Enhanced teacher development
                                            programs
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Excellence in School Management Award Modal */}
                <div
                    id="award-modal-2"
                    className="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                >
                    <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mr-4">
                                        <Trophy className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900">
                                            Excellence in School Management
                                        </h3>
                                        <p className="text-gray-600">
                                            2022 • National Level
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() =>
                                        document
                                            .getElementById("award-modal-2")
                                            .classList.add("hidden")
                                    }
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-2">
                                        Awarding Organization
                                    </h4>
                                    <p className="text-gray-600">
                                        Professional Regulation Commission
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-2">
                                        Description
                                    </h4>
                                    <p className="text-gray-600">
                                        Awarded for outstanding performance in
                                        school management and student
                                        achievement improvement through
                                        innovative administrative practices and
                                        strategic planning.
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-2">
                                        Key Achievements
                                    </h4>
                                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                                        <li>
                                            Improved school efficiency by 40%
                                        </li>
                                        <li>
                                            Enhanced student support services
                                        </li>
                                        <li>
                                            Streamlined administrative processes
                                        </li>
                                        <li>Increased parent engagement</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* All Awards Modal */}
                <div
                    id="all-awards-modal"
                    className="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                >
                    <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-3xl font-bold text-gray-900">
                                    All Awards & Achievements
                                </h3>
                                <button
                                    onClick={() =>
                                        document
                                            .getElementById("all-awards-modal")
                                            .classList.add("hidden")
                                    }
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <h4 className="text-xl font-semibold text-gray-900 mb-4">
                                        Recent Awards (2018-2023)
                                    </h4>
                                    <div className="space-y-3">
                                        <div className="flex items-center p-3 bg-red-50 rounded-lg">
                                            <Crown className="w-5 h-5 text-red-600 mr-3" />
                                            <div>
                                                <p className="font-medium text-gray-900">
                                                    Outstanding School
                                                    Administrator
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    2023 • Regional Level
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                                            <Trophy className="w-5 h-5 text-blue-600 mr-3" />
                                            <div>
                                                <p className="font-medium text-gray-900">
                                                    Excellence in School
                                                    Management
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    2022 • National Level
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center p-3 bg-green-50 rounded-lg">
                                            <Heart className="w-5 h-5 text-green-600 mr-3" />
                                            <div>
                                                <p className="font-medium text-gray-900">
                                                    Community Service
                                                    Recognition
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    2021 • Local Level
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <h4 className="text-xl font-semibold text-gray-900 mb-4">
                                        Additional Achievements
                                    </h4>
                                    <div className="space-y-3">
                                        <div className="flex items-center p-3 bg-purple-50 rounded-lg">
                                            <Lightbulb className="w-5 h-5 text-purple-600 mr-3" />
                                            <div>
                                                <p className="font-medium text-gray-900">
                                                    Educational Technology
                                                    Innovation
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    2020 • Provincial Level
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
                                            <Award className="w-5 h-5 text-yellow-600 mr-3" />
                                            <div>
                                                <p className="font-medium text-gray-900">
                                                    Academic Excellence Award
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    2019 • Regional Level
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center p-3 bg-indigo-50 rounded-lg">
                                            <Star className="w-5 h-5 text-indigo-600 mr-3" />
                                            <div>
                                                <p className="font-medium text-gray-900">
                                                    Leadership Excellence Award
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    2018 • Provincial Level
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Individual Press Release Modal */}
            {selectedPressRelease && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                        <div className="p-6">
                            {/* Modal Header */}
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex-1">
                                    <div className="flex items-center mb-2">
                                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium mr-4">
                                            Principal's Corner
                                        </span>
                                        <span className="text-sm text-gray-500">
                                            {selectedPressRelease.readTime}
                                        </span>
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                        {selectedPressRelease.title}
                                    </h2>
                                    <div className="flex items-center text-sm text-gray-500">
                                        <span>
                                            by {selectedPressRelease.author}
                                        </span>
                                        <span className="mx-2">•</span>
                                        <span>{selectedPressRelease.date}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() =>
                                        setSelectedPressRelease(null)
                                    }
                                    className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Modal Content */}
                            <div className="space-y-6">
                                {/* Enhanced Image Display with Navigation */}
                                <div className="relative">
                                    <div className="h-80 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg flex items-center justify-center overflow-hidden relative">
                                        <div className="text-center">
                                            <Image className="w-20 h-20 text-gray-400 mx-auto mb-4" />
                                            <p className="text-lg text-gray-500 font-medium">
                                                News Image{" "}
                                                {currentImageIndex + 1}
                                            </p>
                                            <p className="text-sm text-gray-400 mt-2">
                                                High-resolution image will be
                                                displayed here
                                            </p>
                                        </div>

                                        {/* Navigation Arrows */}
                                        {selectedPressRelease.images &&
                                            selectedPressRelease.images.length >
                                                1 && (
                                                <>
                                                    <button
                                                        onClick={() =>
                                                            setCurrentImageIndex(
                                                                (prev) =>
                                                                    prev === 0
                                                                        ? selectedPressRelease
                                                                              .images
                                                                              .length -
                                                                          1
                                                                        : prev -
                                                                          1
                                                            )
                                                        }
                                                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 p-2 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 group"
                                                    >
                                                        <ChevronLeft className="h-5 w-5 group-hover:-translate-x-0.5 transition-transform" />
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            setCurrentImageIndex(
                                                                (prev) =>
                                                                    prev ===
                                                                    selectedPressRelease
                                                                        .images
                                                                        .length -
                                                                        1
                                                                        ? 0
                                                                        : prev +
                                                                          1
                                                            )
                                                        }
                                                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 p-2 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 group"
                                                    >
                                                        <ChevronRight className="h-5 w-5 group-hover:translate-x-0.5 transition-transform" />
                                                    </button>
                                                </>
                                            )}
                                    </div>

                                    {/* Image overlay with category */}
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                                            {selectedPressRelease.category}
                                        </span>
                                    </div>

                                    {/* Image counter */}
                                    {selectedPressRelease.images &&
                                        selectedPressRelease.images.length >
                                            1 && (
                                            <div className="absolute bottom-4 right-4">
                                                <span className="bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium">
                                                    {currentImageIndex + 1} /{" "}
                                                    {
                                                        selectedPressRelease
                                                            .images.length
                                                    }
                                                </span>
                                            </div>
                                        )}
                                </div>

                                {/* Full Content with Better Typography */}
                                <div className="prose prose-gray max-w-none">
                                    <div className="whitespace-pre-line text-gray-700 leading-relaxed text-base">
                                        {selectedPressRelease.fullContent}
                                    </div>
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <button className="flex items-center text-green-600 hover:text-green-700 font-medium">
                                            <Heart className="w-4 h-4 mr-2" />
                                            Like
                                        </button>
                                        <button className="flex items-center text-green-600 hover:text-green-700 font-medium">
                                            <MessageSquare className="w-4 h-4 mr-2" />
                                            Comment
                                        </button>
                                        <button className="flex items-center text-green-600 hover:text-green-700 font-medium">
                                            <ExternalLink className="w-4 h-4 mr-2" />
                                            Share
                                        </button>
                                    </div>
                                    <button
                                        onClick={() =>
                                            setSelectedPressRelease(null)
                                        }
                                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* All Press Releases Modal */}
            {showAllPressReleases && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                        <div className="p-6">
                            {/* Modal Header */}
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-3xl font-bold text-gray-900">
                                    All Press Releases
                                </h2>
                                <button
                                    onClick={() =>
                                        setShowAllPressReleases(false)
                                    }
                                    className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Press Releases Grid - Simple 3-Column Layout */}
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {newsUpdates.map((update) => (
                                    <div
                                        key={update.id}
                                        className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer group"
                                        onClick={() => {
                                            setShowAllPressReleases(false);
                                            setSelectedPressRelease(update);
                                        }}
                                    >
                                        {/* Simple Image Placeholder */}
                                        <div className="h-32 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg flex items-center justify-center relative mb-4">
                                            <div className="text-center">
                                                <Image className="w-8 h-8 text-gray-400 mx-auto mb-1" />
                                                <p className="text-xs text-gray-500">
                                                    News Image
                                                </p>
                                            </div>
                                            {/* Category Badge */}
                                            <div className="absolute top-2 left-2">
                                                <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                                                    {update.category}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Simple Content */}
                                        <div>
                                            {/* Title */}
                                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-600 transition-colors mb-2 line-clamp-2">
                                                {update.title}
                                            </h3>

                                            {/* Metadata */}
                                            <div className="flex items-center text-sm text-gray-600 mb-3">
                                                <span>by {update.author}</span>
                                                <span className="mx-1">•</span>
                                                <span>{update.date}</span>
                                            </div>

                                            {/* Description */}
                                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                                {update.excerpt}
                                            </p>

                                            {/* Read Time */}
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs text-gray-500">
                                                    {update.readTime}
                                                </span>
                                                <div className="flex items-center text-green-600 text-sm font-medium group-hover:text-green-700">
                                                    <span>Read More</span>
                                                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Modal Footer */}
                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <div className="flex items-center justify-center">
                                    <button
                                        onClick={() =>
                                            setShowAllPressReleases(false)
                                        }
                                        className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* About the Principal Modal */}
            {showAboutPrincipal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                        {/* Modal Header */}
                        <div className="sticky top-0 bg-gradient-to-r from-green-600 to-blue-600 text-white p-6 rounded-t-2xl z-10">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                                        <User className="w-8 h-8 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold">
                                            About the Principal
                                        </h2>
                                        <p className="text-green-100">
                                            Dr. Manuel B. Dayondon - School
                                            Principal IV
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setShowAboutPrincipal(false)}
                                    className="text-white hover:text-gray-200 transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                        </div>

                        {/* Modal Content */}
                        <div className="p-8 space-y-8">
                            {/* Life Journey Timeline Section */}
                            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border-l-4 border-green-500 mt-4">
                                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                                    <Heart className="w-6 h-6 text-green-600 mr-2" />
                                    The Journey: From Humble Beginnings to
                                    Leadership
                                </h3>

                                {/* Timeline */}
                                <div className="relative mt-8">
                                    {/* Timeline Line */}
                                    <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-400 via-blue-400 to-green-600"></div>

                                    {/* Timeline Items */}
                                    <div className="space-y-8 pl-16">
                                        {/* Early Life */}
                                        <div className="relative flex items-start">
                                            <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg -ml-16">
                                                <User className="w-8 h-8 text-white" />
                                            </div>
                                            <div className="ml-6 flex-1">
                                                <div className="bg-white rounded-xl p-6 shadow-lg border border-yellow-200">
                                                    <div className="flex items-center mb-4">
                                                        <h4 className="text-lg font-bold text-gray-900">
                                                            Early Life &
                                                            Education
                                                        </h4>
                                                        <span className="ml-auto text-sm text-gray-500">
                                                            1970s-1980s
                                                        </span>
                                                    </div>
                                                    <div className="grid md:grid-cols-2 gap-4">
                                                        <div>
                                                            <img
                                                                src="/images/young-manuel.jpg"
                                                                alt="Young Manuel Dayondon"
                                                                className="w-full h-32 object-cover rounded-lg mb-3"
                                                                onError={(e) =>
                                                                    (e.target.style.display =
                                                                        "none")
                                                                }
                                                            />
                                                            <p className="text-sm text-gray-600 italic">
                                                                "Every great
                                                                journey begins
                                                                with a single
                                                                step"
                                                            </p>
                                                        </div>
                                                        <div className="space-y-2 text-sm text-gray-700">
                                                            <p>
                                                                Born in a modest
                                                                family in
                                                                Eastern Samar,
                                                                Manuel showed
                                                                early promise in
                                                                academics
                                                                despite
                                                                financial
                                                                challenges.
                                                            </p>
                                                            <p>
                                                                Excelled in
                                                                elementary and
                                                                high school,
                                                                often helping
                                                                classmates with
                                                                their studies.
                                                            </p>
                                                            <p>
                                                                Worked part-time
                                                                jobs to support
                                                                his family while
                                                                maintaining
                                                                excellent
                                                                grades.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* College Years */}
                                        <div className="relative flex items-start">
                                            <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg -ml-16">
                                                <GraduationCap className="w-8 h-8 text-white" />
                                            </div>
                                            <div className="ml-6 flex-1">
                                                <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-200">
                                                    <div className="flex items-center mb-4">
                                                        <h4 className="text-lg font-bold text-gray-900">
                                                            College & Early
                                                            Teaching
                                                        </h4>
                                                        <span className="ml-auto text-sm text-gray-500">
                                                            1980s-1990s
                                                        </span>
                                                    </div>
                                                    <div className="grid md:grid-cols-2 gap-4">
                                                        <div>
                                                            <img
                                                                src="/images/college-manuel.jpg"
                                                                alt="Manuel in College"
                                                                className="w-full h-32 object-cover rounded-lg mb-3"
                                                                onError={(e) =>
                                                                    (e.target.style.display =
                                                                        "none")
                                                                }
                                                            />
                                                            <p className="text-sm text-gray-600 italic">
                                                                "Education is
                                                                the key to
                                                                unlocking
                                                                potential"
                                                            </p>
                                                        </div>
                                                        <div className="space-y-2 text-sm text-gray-700">
                                                            <p>
                                                                Graduated with
                                                                honors from
                                                                Eastern Samar
                                                                State University
                                                                with a degree in
                                                                Education.
                                                            </p>
                                                            <p>
                                                                Started teaching
                                                                career at
                                                                Surigao City
                                                                National High
                                                                School, where he
                                                                quickly gained
                                                                recognition for
                                                                innovative
                                                                teaching
                                                                methods.
                                                            </p>
                                                            <p>
                                                                Faced challenges
                                                                adapting to
                                                                different
                                                                student needs
                                                                and learning
                                                                styles, but
                                                                persevered
                                                                through
                                                                dedication.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* First Leadership Role */}
                                        <div className="relative flex items-start">
                                            <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg -ml-16">
                                                <Users className="w-8 h-8 text-white" />
                                            </div>
                                            <div className="ml-6 flex-1">
                                                <div className="bg-white rounded-xl p-6 shadow-lg border border-green-200">
                                                    <div className="flex items-center mb-4">
                                                        <h4 className="text-lg font-bold text-gray-900">
                                                            First Leadership
                                                            Challenge
                                                        </h4>
                                                        <span className="ml-auto text-sm text-gray-500">
                                                            1990s-2000s
                                                        </span>
                                                    </div>
                                                    <div className="grid md:grid-cols-2 gap-4">
                                                        <div>
                                                            <img
                                                                src="/images/teacher-manuel.jpg"
                                                                alt="Manuel as Teacher"
                                                                className="w-full h-32 object-cover rounded-lg mb-3"
                                                                onError={(e) =>
                                                                    (e.target.style.display =
                                                                        "none")
                                                                }
                                                            />
                                                            <p className="text-sm text-gray-600 italic">
                                                                "Leadership is
                                                                not about being
                                                                in charge, it's
                                                                about taking
                                                                care of those in
                                                                your charge"
                                                            </p>
                                                        </div>
                                                        <div className="space-y-2 text-sm text-gray-700">
                                                            <p>
                                                                Transferred to
                                                                Taft National
                                                                High School as a
                                                                teacher, where
                                                                he faced the
                                                                challenge of
                                                                connecting with
                                                                students from
                                                                diverse
                                                                backgrounds.
                                                            </p>
                                                            <p>
                                                                Developed
                                                                innovative
                                                                teaching
                                                                strategies that
                                                                improved student
                                                                performance
                                                                significantly.
                                                            </p>
                                                            <p>
                                                                Began taking on
                                                                additional
                                                                responsibilities,
                                                                mentoring new
                                                                teachers and
                                                                leading school
                                                                initiatives.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Principal Journey */}
                                        <div className="relative flex items-start">
                                            <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center shadow-lg -ml-16">
                                                <Crown className="w-8 h-8 text-white" />
                                            </div>
                                            <div className="ml-6 flex-1">
                                                <div className="bg-white rounded-xl p-6 shadow-lg border border-purple-200">
                                                    <div className="flex items-center mb-4">
                                                        <h4 className="text-lg font-bold text-gray-900">
                                                            The Principal's
                                                            Journey
                                                        </h4>
                                                        <span className="ml-auto text-sm text-gray-500">
                                                            2000s-Present
                                                        </span>
                                                    </div>
                                                    <div className="grid md:grid-cols-2 gap-4">
                                                        <div>
                                                            <img
                                                                src="/images/principal-manuel.jpg"
                                                                alt="Dr. Manuel as Principal"
                                                                className="w-full h-32 object-cover rounded-lg mb-3"
                                                                onError={(e) =>
                                                                    (e.target.style.display =
                                                                        "none")
                                                                }
                                                            />
                                                            <p className="text-sm text-gray-600 italic">
                                                                "Coming home to
                                                                lead the school
                                                                that shaped me"
                                                            </p>
                                                        </div>
                                                        <div className="space-y-2 text-sm text-gray-700">
                                                            <p>
                                                                Appointed as
                                                                Principal of San
                                                                Jose National
                                                                High School, his
                                                                first major
                                                                leadership role.
                                                            </p>
                                                            <p>
                                                                Led multiple
                                                                schools
                                                                including
                                                                Cabrera-Altres,
                                                                Anomar, and
                                                                Mat-i National
                                                                High Schools,
                                                                each presenting
                                                                unique
                                                                challenges.
                                                            </p>
                                                            <p>
                                                                Returned to Taft
                                                                National High
                                                                School as
                                                                Assistant
                                                                Principal, then
                                                                finally as
                                                                School Principal
                                                                IV - completing
                                                                his journey
                                                                home.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Current Achievement */}
                                        <div className="relative flex items-start">
                                            <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg -ml-16">
                                                <Trophy className="w-8 h-8 text-white" />
                                            </div>
                                            <div className="ml-6 flex-1">
                                                <div className="bg-white rounded-xl p-6 shadow-lg border border-yellow-200">
                                                    <div className="flex items-center mb-4">
                                                        <h4 className="text-lg font-bold text-gray-900">
                                                            Current Leadership
                                                        </h4>
                                                        <span className="ml-auto text-sm text-gray-500">
                                                            Present
                                                        </span>
                                                    </div>
                                                    <div className="grid md:grid-cols-2 gap-4">
                                                        <div>
                                                            <img
                                                                src="/images/current-principal.jpg"
                                                                alt="Current Principal Manuel"
                                                                className="w-full h-32 object-cover rounded-lg mb-3"
                                                                onError={(e) =>
                                                                    (e.target.style.display =
                                                                        "none")
                                                                }
                                                            />
                                                            <p className="text-sm text-gray-600 italic">
                                                                "Leading with
                                                                wisdom,
                                                                compassion, and
                                                                vision"
                                                            </p>
                                                        </div>
                                                        <div className="space-y-2 text-sm text-gray-700">
                                                            <p>
                                                                Now serves as
                                                                School Principal
                                                                IV of Taft
                                                                National High
                                                                School, bringing
                                                                decades of
                                                                experience and
                                                                wisdom.
                                                            </p>
                                                            <p>
                                                                Continues to
                                                                teach as a
                                                                graduate school
                                                                instructor at
                                                                St. Paul
                                                                University
                                                                Surigao,
                                                                maintaining his
                                                                connection to
                                                                education.
                                                            </p>
                                                            <p>
                                                                Recognized as a
                                                                mentor, scholar,
                                                                and steady hand
                                                                guiding the
                                                                entire Taft NHS
                                                                community
                                                                forward.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Achievements and Awards Section */}
                            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border-l-4 border-yellow-500 mt-8">
                                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                                    <Trophy className="w-6 h-6 text-yellow-600 mr-2" />
                                    Recent Awards & Achievements
                                </h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <h4 className="font-semibold text-gray-900">
                                            Recent Awards (2018-2023)
                                        </h4>
                                        <div className="space-y-2">
                                            <div className="flex items-center p-3 bg-red-50 rounded-lg">
                                                <Crown className="w-5 h-5 text-red-600 mr-3" />
                                                <div>
                                                    <p className="font-medium text-gray-900">
                                                        Outstanding School
                                                        Administrator
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        2023 • Regional Level
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                                                <Award className="w-5 h-5 text-blue-600 mr-3" />
                                                <div>
                                                    <p className="font-medium text-gray-900">
                                                        Excellence in School
                                                        Management
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        2022 • Regional Level
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center p-3 bg-green-50 rounded-lg">
                                                <Star className="w-5 h-5 text-green-600 mr-3" />
                                                <div>
                                                    <p className="font-medium text-gray-900">
                                                        Leadership Excellence
                                                        Award
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        2021 • Provincial Level
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <h4 className="font-semibold text-gray-900">
                                            Additional Achievements
                                        </h4>
                                        <div className="space-y-2">
                                            <div className="flex items-center p-3 bg-purple-50 rounded-lg">
                                                <Lightbulb className="w-5 h-5 text-purple-600 mr-3" />
                                                <div>
                                                    <p className="font-medium text-gray-900">
                                                        Educational Technology
                                                        Innovation
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        2020 • Provincial Level
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
                                                <Award className="w-5 h-5 text-yellow-600 mr-3" />
                                                <div>
                                                    <p className="font-medium text-gray-900">
                                                        Academic Excellence
                                                        Award
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        2019 • Regional Level
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center p-3 bg-indigo-50 rounded-lg">
                                                <Users className="w-5 h-5 text-indigo-600 mr-3" />
                                                <div>
                                                    <p className="font-medium text-gray-900">
                                                        Community Engagement
                                                        Excellence
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        2018 • Municipal Level
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Professional Philosophy Section */}
                            <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 border-l-4 border-blue-500">
                                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                                    <Target className="w-6 h-6 text-blue-600 mr-2" />
                                    Leadership Philosophy
                                </h3>
                                <div className="space-y-4">
                                    <p className="text-gray-800 leading-relaxed">
                                        Dr. Dayondon is not just an
                                        administrator—he is a{" "}
                                        <span className="font-semibold text-blue-700">
                                            mentor
                                        </span>
                                        ,{" "}
                                        <span className="font-semibold text-green-700">
                                            scholar
                                        </span>
                                        , and{" "}
                                        <span className="font-semibold text-blue-700">
                                            steady hand
                                        </span>{" "}
                                        guiding the entire Taft NHS community
                                        forward.
                                    </p>

                                    <div className="grid md:grid-cols-3 gap-4">
                                        <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                                <Heart className="w-6 h-6 text-green-600" />
                                            </div>
                                            <h4 className="font-semibold text-gray-900 mb-2">
                                                Student-Centered
                                            </h4>
                                            <p className="text-sm text-gray-600">
                                                Prioritizing student success and
                                                well-being in every decision
                                            </p>
                                        </div>

                                        <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                                <Lightbulb className="w-6 h-6 text-blue-600" />
                                            </div>
                                            <h4 className="font-semibold text-gray-900 mb-2">
                                                Innovation
                                            </h4>
                                            <p className="text-sm text-gray-600">
                                                Embracing new technologies and
                                                teaching methods
                                            </p>
                                        </div>

                                        <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                                            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                                <Users className="w-6 h-6 text-purple-600" />
                                            </div>
                                            <h4 className="font-semibold text-gray-900 mb-2">
                                                Community
                                            </h4>
                                            <p className="text-sm text-gray-600">
                                                Building strong relationships
                                                with all stakeholders
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Information Section */}
                            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 border-l-4 border-gray-500">
                                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                                    <MessageSquare className="w-6 h-6 text-gray-600 mr-2" />
                                    Contact Information
                                </h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <div className="flex items-center">
                                            <Phone className="w-5 h-5 text-green-600 mr-3" />
                                            <span className="text-gray-700">
                                                (055) 555-0123
                                            </span>
                                        </div>
                                        <div className="flex items-center">
                                            <Mail className="w-5 h-5 text-green-600 mr-3" />
                                            <span className="text-gray-700">
                                                principal@tnhs.edu.ph
                                            </span>
                                        </div>
                                        <div className="flex items-center">
                                            <Clock className="w-5 h-5 text-green-600 mr-3" />
                                            <span className="text-gray-700">
                                                Mon-Fri: 7AM-5PM, Sat: 8AM-12PM
                                            </span>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-center">
                                            <Building className="w-5 h-5 text-green-600 mr-3" />
                                            <span className="text-gray-700">
                                                Principal's Office, Taft
                                                National High School
                                            </span>
                                        </div>
                                        <div className="flex items-center">
                                            <MapPin className="w-5 h-5 text-green-600 mr-3" />
                                            <span className="text-gray-700">
                                                Taft, Eastern Samar, Philippines
                                            </span>
                                        </div>
                                        <div className="flex items-center">
                                            <Globe className="w-5 h-5 text-green-600 mr-3" />
                                            <span className="text-gray-700">
                                                Department of Education - Region
                                                VIII
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="sticky bottom-0 bg-gray-50 p-6 rounded-b-2xl border-t">
                            <div className="flex justify-end space-x-3">
                                <button
                                    onClick={() => setShowAboutPrincipal(false)}
                                    className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                                >
                                    Close
                                </button>
                                <button
                                    onClick={() => {
                                        setShowAboutPrincipal(false);
                                        const messageSection =
                                            document.getElementById(
                                                "principal-vision-section"
                                            );
                                        if (messageSection) {
                                            const offset = 100;
                                            const elementPosition =
                                                messageSection.getBoundingClientRect()
                                                    .top;
                                            const offsetPosition =
                                                elementPosition +
                                                window.pageYOffset -
                                                offset;
                                            window.scrollTo({
                                                top: offsetPosition,
                                                behavior: "smooth",
                                            });
                                        }
                                    }}
                                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                >
                                    View Principal's Vision
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Principal's Vision Modal */}
            {showPrincipalVision && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                        {/* Modal Header */}
                        <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-t-2xl z-10">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                                        <Target className="w-8 h-8 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold">
                                            Principal's Vision & Strategic Goals
                                        </h2>
                                        <p className="text-purple-100">
                                            Dr. Manuel B. Dayondon - School
                                            Principal IV
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() =>
                                        setShowPrincipalVision(false)
                                    }
                                    className="text-white hover:text-gray-200 transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                        </div>

                        {/* Modal Content */}
                        <div className="p-8 space-y-8">
                            {/* Principal's Vision Statement */}
                            <div className="bg-white rounded-xl p-8 shadow-lg border-l-4 border-purple-500">
                                <div className="text-center mb-6">
                                    <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Target className="w-10 h-10 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                        Dr. Manuel B. Dayondon's Vision
                                    </h3>
                                    <p className="text-gray-600">
                                        School Principal IV - Taft National High
                                        School
                                    </p>
                                </div>

                                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                                    <blockquote className="text-xl font-medium text-gray-800 italic text-center mb-8 p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border-l-4 border-purple-400">
                                        "To create a transformative educational
                                        environment where every student
                                        discovers their potential, develops
                                        critical thinking skills, and becomes a
                                        responsible citizen who contributes
                                        meaningfully to society."
                                    </blockquote>

                                    <p className="text-lg mb-6 font-medium text-gray-800">
                                        As the Principal of Taft National High
                                        School, I envision our institution as a
                                        beacon of excellence that not only
                                        imparts knowledge but also shapes
                                        character, fosters innovation, and
                                        prepares students for the challenges of
                                        the 21st century.
                                    </p>
                                </div>
                            </div>

                            {/* Strategic Goals Grid */}
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                                {/* Academic Excellence */}
                                <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-blue-500 hover:shadow-xl transition-shadow">
                                    <div className="flex items-center mb-4">
                                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                                            <BookOpen className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900">
                                            Academic Excellence
                                        </h3>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex items-start py-2">
                                            <CheckCircle className="w-4 h-4 text-blue-500 mt-1 mr-3 flex-shrink-0" />
                                            <span className="text-sm text-gray-700">
                                                Achieve 95% passing rate in
                                                national assessments
                                            </span>
                                        </div>
                                        <div className="flex items-start py-2">
                                            <CheckCircle className="w-4 h-4 text-blue-500 mt-1 mr-3 flex-shrink-0" />
                                            <span className="text-sm text-gray-700">
                                                Implement innovative teaching
                                                methodologies
                                            </span>
                                        </div>
                                        <div className="flex items-start py-2">
                                            <CheckCircle className="w-4 h-4 text-blue-500 mt-1 mr-3 flex-shrink-0" />
                                            <span className="text-sm text-gray-700">
                                                Enhance STEM education programs
                                            </span>
                                        </div>
                                        <div className="flex items-start py-2">
                                            <CheckCircle className="w-4 h-4 text-blue-500 mt-1 mr-3 flex-shrink-0" />
                                            <span className="text-sm text-gray-700">
                                                Develop critical thinking
                                                curriculum
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Student Development */}
                                <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-green-500 hover:shadow-xl transition-shadow">
                                    <div className="flex items-center mb-4">
                                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                                            <Users className="w-6 h-6 text-green-600" />
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900">
                                            Student Development
                                        </h3>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex items-start py-2">
                                            <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-3 flex-shrink-0" />
                                            <span className="text-sm text-gray-700">
                                                Foster leadership skills in all
                                                students
                                            </span>
                                        </div>
                                        <div className="flex items-start py-2">
                                            <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-3 flex-shrink-0" />
                                            <span className="text-sm text-gray-700">
                                                Promote character education
                                                programs
                                            </span>
                                        </div>
                                        <div className="flex items-start py-2">
                                            <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-3 flex-shrink-0" />
                                            <span className="text-sm text-gray-700">
                                                Enhance career guidance services
                                            </span>
                                        </div>
                                        <div className="flex items-start py-2">
                                            <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-3 flex-shrink-0" />
                                            <span className="text-sm text-gray-700">
                                                Support mental health and
                                                wellness
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Community Engagement */}
                                <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-orange-500 hover:shadow-xl transition-shadow">
                                    <div className="flex items-center mb-4">
                                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                                            <Globe className="w-6 h-6 text-orange-600" />
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900">
                                            Community Engagement
                                        </h3>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex items-start py-2">
                                            <CheckCircle className="w-4 h-4 text-orange-500 mt-1 mr-3 flex-shrink-0" />
                                            <span className="text-sm text-gray-700">
                                                Strengthen parent-school
                                                partnerships
                                            </span>
                                        </div>
                                        <div className="flex items-start py-2">
                                            <CheckCircle className="w-4 h-4 text-orange-500 mt-1 mr-3 flex-shrink-0" />
                                            <span className="text-sm text-gray-700">
                                                Build industry partnerships
                                            </span>
                                        </div>
                                        <div className="flex items-start py-2">
                                            <CheckCircle className="w-4 h-4 text-orange-500 mt-1 mr-3 flex-shrink-0" />
                                            <span className="text-sm text-gray-700">
                                                Engage local government units
                                            </span>
                                        </div>
                                        <div className="flex items-start py-2">
                                            <CheckCircle className="w-4 h-4 text-orange-500 mt-1 mr-3 flex-shrink-0" />
                                            <span className="text-sm text-gray-700">
                                                Promote community service
                                                programs
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Key Strategic Initiatives */}
                            <div className="bg-white rounded-xl p-8 shadow-lg border-l-4 border-purple-500">
                                <div className="flex items-center mb-6">
                                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                                        <Lightbulb className="w-6 h-6 text-purple-600" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900">
                                        Key Strategic Initiatives
                                    </h3>
                                </div>

                                <div className="space-y-6">
                                    <div className="border-l-4 border-purple-500 pl-6 py-4 bg-purple-50 rounded-r-lg">
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="font-semibold text-gray-900">
                                                Digital Transformation
                                                Initiative
                                            </h4>
                                            <span className="text-sm text-gray-500">
                                                2024-2025
                                            </span>
                                        </div>
                                        <p className="text-gray-700 text-sm">
                                            Complete digitalization of school
                                            processes, implementation of smart
                                            classrooms, and development of
                                            online learning platforms to enhance
                                            educational delivery.
                                        </p>
                                    </div>

                                    <div className="border-l-4 border-blue-500 pl-6 py-4 bg-blue-50 rounded-r-lg">
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="font-semibold text-gray-900">
                                                Excellence in STEM Program
                                            </h4>
                                            <span className="text-sm text-gray-500">
                                                2024-2026
                                            </span>
                                        </div>
                                        <p className="text-gray-700 text-sm">
                                            Establishment of advanced science
                                            laboratories, robotics programs, and
                                            partnerships with universities to
                                            prepare students for STEM careers.
                                        </p>
                                    </div>

                                    <div className="border-l-4 border-green-500 pl-6 py-4 bg-green-50 rounded-r-lg">
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="font-semibold text-gray-900">
                                                Sustainable School Initiative
                                            </h4>
                                            <span className="text-sm text-gray-500">
                                                2024-2027
                                            </span>
                                        </div>
                                        <p className="text-gray-700 text-sm">
                                            Implementation of eco-friendly
                                            practices, environmental education
                                            programs, and community
                                            sustainability projects to create
                                            responsible citizens.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="sticky bottom-0 bg-gray-50 p-6 rounded-b-2xl border-t">
                            <div className="flex justify-end space-x-3">
                                <button
                                    onClick={() =>
                                        setShowPrincipalVision(false)
                                    }
                                    className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Principal;
