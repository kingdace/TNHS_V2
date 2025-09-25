import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    Target,
    Eye,
    Heart,
    Users,
    BookOpen,
    Award,
    Globe,
    Lightbulb,
} from "lucide-react";
import { publicService } from "../../services/publicService";

const AboutMission = () => {
    const [missions, setMissions] = useState([]);
    const [visions, setVisions] = useState([]);
    const [coreValues, setCoreValues] = useState([]);
    const [principles, setPrinciples] = useState([]);
    const [goals, setGoals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [
                missionsData,
                visionsData,
                coreValuesData,
                principlesData,
                goalsData,
            ] = await Promise.all([
                publicService.missions.getPublic(),
                publicService.visions.getPublic(),
                publicService.coreValues.getPublic(),
                publicService.guidingPrinciples.getPublic(),
                publicService.goals.getPublic(),
            ]);

            setMissions(missionsData);
            setVisions(visionsData);
            setCoreValues(coreValuesData);
            setPrinciples(principlesData);
            setGoals(goalsData);
        } catch (error) {
            console.error("Error fetching mission & vision data:", error);
        } finally {
            setLoading(false);
        }
    };

    // Icon mapping for dynamic icons
    const iconMap = {
        Heart,
        Users,
        Globe,
        Award,
        BookOpen,
        Lightbulb,
        Target,
        Eye,
    };

    // Get current mission and vision (first active ones)
    const currentMission = missions.find((m) => m.is_active) || {
        title: "Our Mission",
        content:
            "To provide quality secondary education that develops students' intellectual, moral, and social capabilities, preparing them to become productive citizens who contribute to the development of their community and the nation.",
    };

    const currentVision = visions.find((v) => v.is_active) || {
        title: "Our Vision",
        content:
            "To be a leading educational institution that produces globally competitive graduates who are morally upright, academically excellent, and socially responsible citizens committed to nation-building.",
    };

    // Group goals by category
    const academicGoals = goals.filter(
        (g) => g.category === "academic" && g.is_active
    );
    const characterGoals = goals.filter(
        (g) => g.category === "character" && g.is_active
    );

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 pt-24 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-4 text-gray-600">
                            Loading Mission & Vision...
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold text-gray-900 mb-4">
                        Mission & Vision
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Our guiding principles and aspirations for educational
                        excellence and community development
                    </p>
                </div>

                {/* Mission & Vision Cards */}
                <div className="grid lg:grid-cols-2 gap-8 mb-16">
                    {/* Mission */}
                    <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl shadow-xl p-8 text-white">
                        <div className="flex items-center space-x-4 mb-6">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                                <Target className="w-8 h-8 text-white" />
                            </div>
                            <h2 className="text-3xl font-bold">Our Mission</h2>
                        </div>
                        <p className="text-lg leading-relaxed text-blue-100">
                            {currentMission.content}
                        </p>
                    </div>

                    {/* Vision */}
                    <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-2xl shadow-xl p-8 text-white">
                        <div className="flex items-center space-x-4 mb-6">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                                <Eye className="w-8 h-8 text-white" />
                            </div>
                            <h2 className="text-3xl font-bold">Our Vision</h2>
                        </div>
                        <p className="text-lg leading-relaxed text-green-100">
                            {currentVision.content}
                        </p>
                    </div>
                </div>

                {/* Core Values */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                        Filipino Core Values
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {coreValues.map((value, index) => {
                            const IconComponent = iconMap[value.icon] || Heart;
                            return (
                                <div key={index} className="text-center">
                                    <div
                                        className={`w-20 h-20 bg-gradient-to-r ${
                                            value.color ||
                                            "from-blue-500 to-green-500"
                                        } rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}
                                    >
                                        <IconComponent className="w-10 h-10 text-white" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                                        {value.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {value.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Guiding Principles */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                        Guiding Principles
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {principles.map((principle, index) => {
                            const IconComponent =
                                iconMap[principle.icon] || BookOpen;
                            return (
                                <div
                                    key={index}
                                    className="flex items-start space-x-4 p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl hover:shadow-lg transition-shadow duration-300"
                                >
                                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                                        <IconComponent className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                            {principle.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm leading-relaxed">
                                            {principle.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Goals & Objectives */}
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl shadow-xl p-8 text-white mb-16">
                    <h2 className="text-3xl font-bold mb-8 text-center">
                        Goals & Objectives
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-xl font-semibold mb-4">
                                Academic Goals
                            </h3>
                            <ul className="space-y-2">
                                {academicGoals.map((goal, index) => (
                                    <li
                                        key={index}
                                        className="flex items-start space-x-2"
                                    >
                                        <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                                        <span className="text-purple-100">
                                            {goal.title}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-4">
                                Character Development
                            </h3>
                            <ul className="space-y-2">
                                {characterGoals.map((goal, index) => (
                                    <li
                                        key={index}
                                        className="flex items-start space-x-2"
                                    >
                                        <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                                        <span className="text-purple-100">
                                            {goal.title}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Commitment Statement */}
                <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">
                        Our Commitment
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto mb-8">
                        We are committed to providing an environment where every
                        student can thrive, learn, and grow. Our mission and
                        vision guide us in creating opportunities for academic
                        excellence, character development, and community
                        service.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                            Quality Education
                        </div>
                        <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                            Character Formation
                        </div>
                        <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium">
                            Community Service
                        </div>
                        <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium">
                            Nation Building
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
                        to="/about/history"
                        className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-300"
                    >
                        Our History →
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AboutMission;
