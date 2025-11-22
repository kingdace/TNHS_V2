import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
    MapPin,
    Phone,
    Mail,
    Clock,
    Users,
    GraduationCap,
    BookOpen,
    Award,
    MessageCircle,
    Shield,
    Heart,
    Target,
    CheckCircle,
    ArrowRight,
} from "lucide-react";
import CompactPageHeader from "../../components/ui/CompactPageHeader";

const Contact = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-white pb-20">
            {/* Compact Header */}
            <CompactPageHeader
                icon={MessageCircle}
                title="Contact Us"
                subtitle="We're here to help! Reach out to us for any inquiries, support, or information about our school community."
                gradient="from-blue-600 to-purple-600"
                bgPattern="from-blue-50 to-purple-50"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
                {/* Quick Contact Cards */}
                <div className="grid md:grid-cols-4 gap-6 mb-12">
                    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                        <div className="flex items-center gap-3 mb-4">
                            <MapPin className="w-6 h-6 text-blue-600" />
                            <h3 className="text-lg font-bold text-gray-800">
                                Location
                            </h3>
                        </div>
                        <p className="text-gray-600 mb-2">Taft, Surigao City</p>
                        <p className="text-sm text-gray-500">Philippines</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                        <div className="flex items-center gap-3 mb-4">
                            <Phone className="w-6 h-6 text-green-600" />
                            <h3 className="text-lg font-bold text-gray-800">
                                Phone
                            </h3>
                        </div>
                        <p className="text-gray-600 mb-2">(086) 826-1234</p>
                        <p className="text-sm text-gray-500">
                            +63 912 345 6789
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                        <div className="flex items-center gap-3 mb-4">
                            <Mail className="w-6 h-6 text-purple-600" />
                            <h3 className="text-lg font-bold text-gray-800">
                                Email
                            </h3>
                        </div>
                        <p className="text-gray-600 mb-2">info@tnhs.edu.ph</p>
                        <p className="text-sm text-gray-500">
                            admissions@tnhs.edu.ph
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                        <div className="flex items-center gap-3 mb-4">
                            <Clock className="w-6 h-6 text-orange-600" />
                            <h3 className="text-lg font-bold text-gray-800">
                                Hours
                            </h3>
                        </div>
                        <p className="text-gray-600 mb-2">Mon-Fri: 7AM-5PM</p>
                        <p className="text-sm text-gray-500">Sat: 8AM-12PM</p>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-3 gap-8 mb-16">
                    {/* Contact Information */}
                    <div className="lg:col-span-2 flex">
                        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200 flex-1 flex flex-col">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                    <MessageCircle className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800">
                                        Get in Touch
                                    </h2>
                                    <p className="text-gray-600">
                                        We'd love to hear from you
                                    </p>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <MapPin className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-800 mb-1">
                                                School Address
                                            </h3>
                                            <p className="text-gray-600 text-sm leading-relaxed">
                                                Taft National High School
                                                <br />
                                                Taft, Surigao City
                                                <br />
                                                Philippines 6806
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Phone className="w-5 h-5 text-green-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-800 mb-1">
                                                Phone Numbers
                                            </h3>
                                            <p className="text-gray-600 text-sm">
                                                Main: (086) 826-1234
                                                <br />
                                                Mobile: +63 912 345 6789
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Mail className="w-5 h-5 text-purple-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-800 mb-1">
                                                Email Addresses
                                            </h3>
                                            <p className="text-gray-600 text-sm">
                                                General: info@tnhs.edu.ph
                                                <br />
                                                Admissions:
                                                admissions@tnhs.edu.ph
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
                                        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                                            <Clock className="w-5 h-5 text-blue-600" />
                                            Office Hours
                                        </h3>
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm font-medium text-gray-700">
                                                    Monday - Friday
                                                </span>
                                                <span className="text-sm text-gray-600">
                                                    7:00 AM - 5:00 PM
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm font-medium text-gray-700">
                                                    Saturday
                                                </span>
                                                <span className="text-sm text-gray-600">
                                                    8:00 AM - 12:00 PM
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm font-medium text-gray-700">
                                                    Sunday
                                                </span>
                                                <span className="text-sm text-gray-600 text-red-500">
                                                    Closed
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6">
                                        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                                            <Shield className="w-5 h-5 text-green-600" />
                                            Quick Response
                                        </h3>
                                        <p className="text-sm text-gray-600 mb-3">
                                            We typically respond to inquiries
                                            within 24 hours during business
                                            days.
                                        </p>
                                        <div className="flex items-center gap-2 text-green-600">
                                            <CheckCircle className="w-4 h-4" />
                                            <span className="text-sm font-medium">
                                                Available for urgent matters
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex flex-col">
                        <div className="grid grid-rows-3 gap-4 flex-1">
                            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200 flex flex-col">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                                        <GraduationCap className="w-5 h-5 text-green-600" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-800">
                                        Admissions
                                    </h3>
                                </div>
                                <p className="text-sm text-gray-600 mb-4 flex-1">
                                    Questions about enrollment, requirements, or
                                    application process?
                                </p>
                                <Link
                                    to="/admissions/requirements"
                                    className="inline-flex items-center gap-2 w-full justify-center px-4 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors duration-300"
                                >
                                    View Requirements
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>

                            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200 flex flex-col">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                                        <BookOpen className="w-5 h-5 text-purple-600" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-800">
                                        Academics
                                    </h3>
                                </div>
                                <p className="text-sm text-gray-600 mb-4 flex-1">
                                    Learn about our programs, curriculum, and
                                    academic offerings.
                                </p>
                                <Link
                                    to="/academics"
                                    className="inline-flex items-center gap-2 w-full justify-center px-4 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors duration-300"
                                >
                                    Explore Programs
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>

                            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200 flex flex-col">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                                        <Users className="w-5 h-5 text-orange-600" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-800">
                                        About Us
                                    </h3>
                                </div>
                                <p className="text-sm text-gray-600 mb-4 flex-1">
                                    Discover our mission, vision, history, and
                                    school community.
                                </p>
                                <Link
                                    to="/about"
                                    className="inline-flex items-center gap-2 w-full justify-center px-4 py-3 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition-colors duration-300"
                                >
                                    Learn More
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* School Information */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-2xl p-8 mb-12 text-white">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold mb-4">
                            Why Choose TNHS?
                        </h2>
                        <p className="text-blue-100 text-lg max-w-2xl mx-auto">
                            Experience excellence in education with our
                            dedicated faculty, modern facilities, and
                            comprehensive programs.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Award className="w-8 h-8" />
                            </div>
                            <h3 className="font-bold mb-2">Excellence</h3>
                            <p className="text-blue-100 text-sm">
                                DepEd Recognized Institution
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="w-8 h-8" />
                            </div>
                            <h3 className="font-bold mb-2">Community</h3>
                            <p className="text-blue-100 text-sm">
                                Strong School Community
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Target className="w-8 h-8" />
                            </div>
                            <h3 className="font-bold mb-2">Goals</h3>
                            <p className="text-blue-100 text-sm">
                                Student Success Focused
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Heart className="w-8 h-8" />
                            </div>
                            <h3 className="font-bold mb-2">Support</h3>
                            <p className="text-blue-100 text-sm">
                                Caring Environment
                            </p>
                        </div>
                    </div>
                </div>

                {/* Back to Home */}
                <div className="text-center">
                    <Link
                        to="/"
                        className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold text-lg rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Contact;
