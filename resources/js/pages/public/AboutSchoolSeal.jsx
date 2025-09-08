import React from "react";
import {
    Shield,
    BookOpen,
    GraduationCap,
    Star,
    Globe,
    Users,
    Flame,
    Key,
    Sun,
    MapPin,
    Calendar,
    Award,
    Zap,
    Heart,
} from "lucide-react";

const AboutSchoolSeal = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* School Seal Image at the very top */}
            <div className="text-center py-8">
                <img
                    src="/images/Logo.jpg"
                    alt="Taft National High School Official Seal"
                    className="w-48 h-48 mx-auto"
                />
                <h1 className="text-2xl font-bold text-gray-900 mt-4">
                    School Seal
                </h1>
                <p className="text-gray-600 text-sm mt-2">
                    Official School Seal of Taft National High School
                </p>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* School Identity */}
                <div className="text-center mb-12 bg-gray-50 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                        PASEO VERDE STORM
                    </h2>
                    <p className="text-lg text-royal-blue mb-4 font-semibold">
                        "Moving forward with strength, growth, and resilience"
                    </p>
                    <p className="text-gray-700 text-sm max-w-4xl mx-auto leading-relaxed">
                        This is the official identity of our school community,
                        representing a vibrant, united, and purpose-driven
                        educational journey. "Paseo Verde" symbolizes our path
                        of growth and sustainability in a nurturing environment,
                        while "Storm" embodies the energy, strength, and
                        unstoppable momentum of our students and staff moving
                        together toward progress and positive change.
                    </p>
                </div>

                {/* School Motto */}
                <div className="text-center mb-12 bg-white border-2 border-royal-blue rounded-xl p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                        School Motto
                    </h3>
                    <p className="text-2xl font-bold text-royal-blue italic mb-4">
                        "Together we can make a difference"
                    </p>
                    <p className="text-gray-700 text-sm max-w-3xl mx-auto">
                        This motto reinforces our values of collaboration,
                        collective action, and shared responsibility in
                        achieving educational and societal change through unity
                        and determination.
                    </p>
                </div>

                {/* Symbolic Elements */}
                <div className="mb-12">
                    <h2 className="text-xl font-bold text-gray-900 text-center mb-8 bg-royal-blue text-white py-3 rounded-lg">
                        Symbolic Elements of Our School Seal
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Torch */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center mr-4">
                                    <Flame className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">
                                    🔥 Torch
                                </h3>
                            </div>
                            <p className="text-gray-600 mb-3">
                                <strong>Meaning:</strong> Symbol of
                                enlightenment and knowledge
                            </p>
                            <p className="text-gray-600">
                                <strong>Interpretation:</strong> Represents
                                education as a guiding light, dispelling the
                                darkness of ignorance. It signifies our mission
                                to empower students intellectually.
                            </p>
                        </div>

                        {/* Crossed Keys */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-4">
                                    <Key className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">
                                    🔑 Crossed Keys
                                </h3>
                            </div>
                            <p className="text-gray-600 mb-3">
                                <strong>Meaning:</strong> Keys represent access
                                and guardianship
                            </p>
                            <p className="text-gray-600">
                                <strong>Interpretation:</strong> Signifies the
                                unlocking of knowledge and our responsibility to
                                safeguard and provide access to learning and
                                opportunity.
                            </p>
                        </div>

                        {/* Open Book with Laurel */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mr-4">
                                    <BookOpen className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">
                                    📖 Open Book with Laurel
                                </h3>
                            </div>
                            <p className="text-gray-600 mb-3">
                                <strong>Meaning:</strong> Learning, wisdom,
                                academic pursuit, honor, and excellence
                            </p>
                            <p className="text-gray-600">
                                <strong>Interpretation:</strong> The open book
                                symbolizes the foundation of education, while
                                the laurel leaves represent our commitment to
                                producing honorable and accomplished learners.
                            </p>
                        </div>

                        {/* Rays */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mr-4">
                                    <Sun className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">
                                    🌞 Rays
                                </h3>
                            </div>
                            <p className="text-gray-600 mb-3">
                                <strong>Meaning:</strong> Progress, hope, and
                                national identity
                            </p>
                            <p className="text-gray-600">
                                <strong>Interpretation:</strong> These rays
                                reflect our optimism and the role we play in
                                national development through education,
                                connected to our Philippine heritage.
                            </p>
                        </div>

                        {/* Shield Shape */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-royal-blue rounded-lg flex items-center justify-center mr-4">
                                    <Shield className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">
                                    🛡️ Shield Shape
                                </h3>
                            </div>
                            <p className="text-gray-600 mb-3">
                                <strong>Meaning:</strong> Protection and
                                strength
                            </p>
                            <p className="text-gray-600">
                                <strong>Interpretation:</strong> Reflects our
                                role in safeguarding students and preparing them
                                for life's challenges with resilience and
                                determination.
                            </p>
                        </div>

                        {/* Establishment & Location */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mr-4">
                                    <MapPin className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">
                                    📍 Location & History
                                </h3>
                            </div>
                            <p className="text-gray-600 mb-3">
                                <strong>2003:</strong> Foundation year of our
                                institution
                            </p>
                            <p className="text-gray-600">
                                <strong>SURIGAO CITY:</strong> Shows our
                                community identity and pride in being part of
                                this vibrant city.
                            </p>
                        </div>
                    </div>
                </div>

                {/* School Values */}
                <div className="bg-white border-2 border-royal-blue rounded-lg p-6 shadow-lg">
                    <h2 className="text-xl font-bold text-royal-blue text-center mb-6 bg-gray-50 py-3 rounded-lg">
                        Our Core Values
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-royal-blue rounded-full flex items-center justify-center mx-auto mb-4">
                                <Star className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Excellence
                            </h3>
                            <p className="text-gray-600 text-sm">
                                Pursuing the highest standards in all endeavors
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Heart className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Integrity
                            </h3>
                            <p className="text-gray-600 text-sm">
                                Maintaining honesty and strong moral principles
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Unity
                            </h3>
                            <p className="text-gray-600 text-sm">
                                Working together toward common goals
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Zap className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Resilience
                            </h3>
                            <p className="text-gray-600 text-sm">
                                Overcoming challenges with strength and
                                determination
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutSchoolSeal;
