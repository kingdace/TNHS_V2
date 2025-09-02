import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    Mail,
    Phone,
    MapPin,
    Clock,
    MessageSquare,
    Send,
    User,
    Building,
} from "lucide-react";

const ContactGeneral = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        alert("Thank you for your message! We will get back to you soon.");
        setFormData({ name: "", email: "", subject: "", message: "" });
    };

    const contactInfo = [
        {
            icon: MapPin,
            title: "Address",
            details:
                "Taft National High School\nTaft, Eastern Samar\nPhilippines 6816",
            color: "from-blue-500 to-blue-600",
        },
        {
            icon: Phone,
            title: "Phone",
            details:
                "Main Office: (055) 123-4567\nPrincipal's Office: (055) 123-4568\nGuidance Office: (055) 123-4569",
            color: "from-green-500 to-green-600",
        },
        {
            icon: Mail,
            title: "Email",
            details:
                "General: info@taftnhs.edu.ph\nPrincipal: principal@taftnhs.edu.ph\nGuidance: guidance@taftnhs.edu.ph",
            color: "from-purple-500 to-purple-600",
        },
        {
            icon: Clock,
            title: "Office Hours",
            details:
                "Monday - Friday: 7:00 AM - 5:00 PM\nSaturday: 8:00 AM - 12:00 PM\nSunday: Closed",
            color: "from-orange-500 to-orange-600",
        },
    ];

    const departments = [
        {
            name: "Principal's Office",
            contact: "principal@taftnhs.edu.ph",
            phone: "(055) 123-4568",
            description: "School administration and general inquiries",
        },
        {
            name: "Guidance Office",
            contact: "guidance@taftnhs.edu.ph",
            phone: "(055) 123-4569",
            description: "Student counseling and career guidance",
        },
        {
            name: "Registrar's Office",
            contact: "registrar@taftnhs.edu.ph",
            phone: "(055) 123-4570",
            description: "Student records and enrollment",
        },
        {
            name: "Finance Office",
            contact: "finance@taftnhs.edu.ph",
            phone: "(055) 123-4571",
            description: "Tuition fees and financial matters",
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold text-gray-900 mb-4">
                        General Inquiries
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Get in touch with us for any questions, concerns, or
                        information you need
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 mb-16">
                    {/* Contact Form */}
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            Send us a Message
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Full Name
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter your full name"
                                    />
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter your email address"
                                    />
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="subject"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Subject
                                </label>
                                <div className="relative">
                                    <MessageSquare className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="What is this about?"
                                    />
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="message"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    required
                                    rows={6}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Please provide details about your inquiry..."
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-green-700 transition-all duration-300 flex items-center justify-center space-x-2"
                            >
                                <Send className="w-5 h-5" />
                                <span>Send Message</span>
                            </button>
                        </form>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl shadow-xl p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                Contact Information
                            </h2>
                            <div className="space-y-6">
                                {contactInfo.map((info, index) => {
                                    const IconComponent = info.icon;
                                    return (
                                        <div
                                            key={index}
                                            className="flex items-start space-x-4"
                                        >
                                            <div
                                                className={`w-12 h-12 bg-gradient-to-r ${info.color} rounded-full flex items-center justify-center flex-shrink-0`}
                                            >
                                                <IconComponent className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900 mb-1">
                                                    {info.title}
                                                </h3>
                                                <p className="text-gray-600 text-sm whitespace-pre-line">
                                                    {info.details}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Quick Response */}
                        <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl shadow-xl p-8 text-white">
                            <h3 className="text-xl font-bold mb-4">
                                Quick Response Guarantee
                            </h3>
                            <p className="text-blue-100 mb-4">
                                We typically respond to inquiries within 24
                                hours during business days.
                            </p>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="font-semibold">
                                        Response Time:
                                    </span>
                                    <p className="text-blue-100">24 hours</p>
                                </div>
                                <div>
                                    <span className="font-semibold">
                                        Business Days:
                                    </span>
                                    <p className="text-blue-100">Mon-Fri</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Department Contacts */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                        Department Contacts
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {departments.map((dept, index) => (
                            <div
                                key={index}
                                className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300"
                            >
                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Building className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900 mb-2">
                                            {dept.name}
                                        </h3>
                                        <p className="text-gray-600 text-sm mb-3">
                                            {dept.description}
                                        </p>
                                        <div className="space-y-1">
                                            <div className="flex items-center space-x-2">
                                                <Mail className="w-4 h-4 text-blue-600" />
                                                <span className="text-sm text-gray-700">
                                                    {dept.contact}
                                                </span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Phone className="w-4 h-4 text-green-600" />
                                                <span className="text-sm text-gray-700">
                                                    {dept.phone}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex flex-wrap justify-center gap-4">
                    <Link
                        to="/contact"
                        className="inline-flex items-center px-6 py-3 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors duration-300"
                    >
                        ← Back to Contact
                    </Link>
                    <Link
                        to="/contact/admissions"
                        className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-300"
                    >
                        Admissions Inquiry →
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ContactGeneral;
