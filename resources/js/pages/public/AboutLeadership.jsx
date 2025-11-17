import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
    Users,
    Award,
    Mail,
    Phone,
    MapPin,
    Calendar,
    GraduationCap,
    BookOpen,
} from "lucide-react";

const AboutLeadership = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const leadershipTeam = [
        {
            name: "Dr. Manuel B. Dayondon",
            position: "School Principal IV",
            department: "Administration",
            experience: "15+ years",
            education: "Ph.D. in Educational Management",
            email: "principal@taftnhs.edu.ph",
            phone: "(055) 123-4567",
            image: "/images/Principal.jpg",
            achievements: [
                "Former Assistant Principal of Taft NHS",
                "Led 5+ schools with excellence",
                "Graduate school instructor at SPUS",
                "Regional awardee for educational leadership",
            ],
        },
        {
            name: "Ms. Maria Santos",
            position: "Assistant Principal",
            department: "Academic Affairs",
            experience: "12+ years",
            education: "Master of Arts in Education",
            email: "assistant.principal@taftnhs.edu.ph",
            phone: "(055) 123-4568",
            image: "/images/assistant-principal.jpg",
            achievements: [
                "Specializes in curriculum development",
                "Former Department Head",
                "National trainer for K-12 implementation",
                "Published researcher in education",
            ],
        },
        {
            name: "Mr. Juan Dela Cruz",
            position: "Department Head - Mathematics",
            department: "Mathematics",
            experience: "10+ years",
            education: "Master of Science in Mathematics",
            email: "math.dept@taftnhs.edu.ph",
            phone: "(055) 123-4569",
            image: "/images/math-head.jpg",
            achievements: [
                "Consistent high performance in national math competitions",
                "Developed innovative teaching methodologies",
                "Mentor to new teachers",
                "Regional math coordinator",
            ],
        },
        {
            name: "Ms. Ana Rodriguez",
            position: "Department Head - Science",
            department: "Science",
            experience: "8+ years",
            education: "Master of Science in Biology",
            email: "science.dept@taftnhs.edu.ph",
            phone: "(055) 123-4570",
            image: "/images/science-head.jpg",
            achievements: [
                "STEM program coordinator",
                "Science fair organizer",
                "Environmental education advocate",
                "Research project supervisor",
            ],
        },
    ];

    const organizationalStructure = [
        {
            level: "School Administration",
            positions: [
                "School Principal IV",
                "Assistant Principal",
                "Administrative Officer",
            ],
        },
        {
            level: "Academic Department",
            positions: ["Department Heads", "Senior Teachers", "Teachers"],
        },
        {
            level: "Support Services",
            positions: [
                "Guidance Counselor",
                "Librarian",
                "IT Coordinator",
                "Maintenance Staff",
            ],
        },
        {
            level: "Student Services",
            positions: [
                "Student Government Adviser",
                "Club Moderators",
                "Sports Coordinator",
            ],
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold text-gray-900 mb-4">
                        School Leadership
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Meet our dedicated leaders who guide and inspire
                        excellence in education
                    </p>
                </div>

                {/* Leadership Team */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                        Leadership Team
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {leadershipTeam.map((leader, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300"
                            >
                                <div className="flex flex-col md:flex-row gap-6">
                                    {/* Photo */}
                                    <div className="flex-shrink-0">
                                        <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-green-100 rounded-full flex items-center justify-center overflow-hidden">
                                            <img
                                                src={leader.image}
                                                alt={leader.name}
                                                className="w-full h-full object-cover rounded-full"
                                                onError={(e) => {
                                                    e.target.style.display =
                                                        "none";
                                                    e.target.nextSibling.style.display =
                                                        "flex";
                                                }}
                                            />
                                            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center hidden">
                                                <Users className="w-16 h-16 text-white" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Information */}
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                            {leader.name}
                                        </h3>
                                        <p className="text-lg font-semibold text-blue-600 mb-1">
                                            {leader.position}
                                        </p>
                                        <p className="text-gray-600 mb-4">
                                            {leader.department} •{" "}
                                            {leader.experience}
                                        </p>

                                        {/* Education */}
                                        <div className="flex items-center space-x-2 mb-3">
                                            <GraduationCap className="w-4 h-4 text-green-600" />
                                            <span className="text-sm text-gray-600">
                                                {leader.education}
                                            </span>
                                        </div>

                                        {/* Contact */}
                                        <div className="space-y-2 mb-4">
                                            <div className="flex items-center space-x-2">
                                                <Mail className="w-4 h-4 text-blue-600" />
                                                <span className="text-sm text-gray-600">
                                                    {leader.email}
                                                </span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Phone className="w-4 h-4 text-green-600" />
                                                <span className="text-sm text-gray-600">
                                                    {leader.phone}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Achievements */}
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-2">
                                                Key Achievements:
                                            </h4>
                                            <ul className="space-y-1">
                                                {leader.achievements.map(
                                                    (achievement, idx) => (
                                                        <li
                                                            key={idx}
                                                            className="flex items-start space-x-2"
                                                        >
                                                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                                                            <span className="text-sm text-gray-600">
                                                                {achievement}
                                                            </span>
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Organizational Structure */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                        Organizational Structure
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {organizationalStructure.map((level, index) => (
                            <div
                                key={index}
                                className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200"
                            >
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                                    {level.level}
                                </h3>
                                <ul className="space-y-2">
                                    {level.positions.map(
                                        (position, posIndex) => (
                                            <li
                                                key={posIndex}
                                                className="flex items-center space-x-2"
                                            >
                                                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                                <span className="text-sm text-gray-700">
                                                    {position}
                                                </span>
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Leadership Philosophy */}
                <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl shadow-xl p-8 text-white mb-16">
                    <h2 className="text-3xl font-bold mb-6 text-center">
                        Leadership Philosophy
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">
                                Collaborative Leadership
                            </h3>
                            <p className="text-blue-100">
                                Working together with teachers, students, and
                                parents to achieve common goals
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Award className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">
                                Excellence Focus
                            </h3>
                            <p className="text-blue-100">
                                Maintaining high standards while supporting
                                continuous improvement
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <BookOpen className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">
                                Innovation Driven
                            </h3>
                            <p className="text-blue-100">
                                Embracing new ideas and technologies to enhance
                                educational outcomes
                            </p>
                        </div>
                    </div>
                </div>

                {/* Contact Leadership */}
                <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">
                        Connect with Our Leadership
                    </h2>
                    <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
                        Our leadership team is committed to transparency and
                        open communication. Feel free to reach out with
                        questions, suggestions, or concerns.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <div className="flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full">
                            <Mail className="w-4 h-4" />
                            <span className="text-sm font-medium">
                                leadership@taftnhs.edu.ph
                            </span>
                        </div>
                        <div className="flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full">
                            <Phone className="w-4 h-4" />
                            <span className="text-sm font-medium">
                                (055) 123-4567
                            </span>
                        </div>
                        <div className="flex items-center space-x-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full">
                            <MapPin className="w-4 h-4" />
                            <span className="text-sm font-medium">
                                Taft, Surigao City
                            </span>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex flex-wrap justify-center gap-4 mt-12">
                    <Link
                        to="/about"
                        className="inline-flex items-center px-6 py-3 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors duration-300"
                    >
                        ← Back to About
                    </Link>
                    <Link
                        to="/faculty"
                        className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-300"
                    >
                        View All Faculty →
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AboutLeadership;
