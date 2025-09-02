import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    Mail,
    Phone,
    MessageSquare,
    Send,
    User,
    AlertTriangle,
    HelpCircle,
    Wrench,
    BookOpen,
} from "lucide-react";

const ContactSupport = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        issueType: "",
        priority: "",
        subject: "",
        description: "",
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
        alert("Support ticket submitted! We will respond within 24 hours.");
        setFormData({
            name: "",
            email: "",
            issueType: "",
            priority: "",
            subject: "",
            description: "",
        });
    };

    const issueTypes = [
        "Technical Issue",
        "Academic Concern",
        "Administrative Matter",
        "Website Problem",
        "Account Issue",
        "Other",
    ];

    const priorityLevels = [
        "Low - General inquiry",
        "Medium - Needs attention",
        "High - Urgent matter",
        "Critical - Immediate attention required",
    ];

    const supportCategories = [
        {
            icon: BookOpen,
            title: "Academic Support",
            description:
                "Questions about courses, grades, or academic policies",
            contact: "academic@taftnhs.edu.ph",
            phone: "(055) 123-4572",
        },
        {
            icon: Wrench,
            title: "Technical Support",
            description:
                "Website issues, login problems, or technical difficulties",
            contact: "tech@taftnhs.edu.ph",
            phone: "(055) 123-4573",
        },
        {
            icon: AlertTriangle,
            title: "Emergency Support",
            description: "Urgent matters requiring immediate attention",
            contact: "emergency@taftnhs.edu.ph",
            phone: "(055) 123-4574",
        },
        {
            icon: HelpCircle,
            title: "General Support",
            description: "General questions and information requests",
            contact: "support@taftnhs.edu.ph",
            phone: "(055) 123-4575",
        },
    ];

    const faqItems = [
        {
            question: "How do I reset my password?",
            answer: "Contact our technical support team at tech@taftnhs.edu.ph or call (055) 123-4573 for assistance with password reset.",
        },
        {
            question: "How can I access my student records?",
            answer: "Student records can be accessed through the registrar's office. Contact registrar@taftnhs.edu.ph for assistance.",
        },
        {
            question: "What are the school's operating hours?",
            answer: "Our office is open Monday to Friday from 7:00 AM to 5:00 PM, and Saturday from 8:00 AM to 12:00 PM.",
        },
        {
            question: "How do I report a technical issue?",
            answer: "Use the support form above or contact our technical support team directly for immediate assistance.",
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold text-gray-900 mb-4">
                        Support Center
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Get help with technical issues, academic concerns, or
                        any other support needs
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 mb-16">
                    {/* Support Form */}
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            Submit Support Ticket
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

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label
                                        htmlFor="issueType"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Issue Type
                                    </label>
                                    <select
                                        id="issueType"
                                        name="issueType"
                                        value={formData.issueType}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="">
                                            Select issue type
                                        </option>
                                        {issueTypes.map((type, index) => (
                                            <option key={index} value={type}>
                                                {type}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label
                                        htmlFor="priority"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Priority Level
                                    </label>
                                    <select
                                        id="priority"
                                        name="priority"
                                        value={formData.priority}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="">
                                            Select priority
                                        </option>
                                        {priorityLevels.map((level, index) => (
                                            <option key={index} value={level}>
                                                {level}
                                            </option>
                                        ))}
                                    </select>
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
                                        placeholder="Brief description of the issue"
                                    />
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="description"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Detailed Description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    required
                                    rows={6}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Please provide detailed information about your issue..."
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-green-700 transition-all duration-300 flex items-center justify-center space-x-2"
                            >
                                <Send className="w-5 h-5" />
                                <span>Submit Support Ticket</span>
                            </button>
                        </form>
                    </div>

                    {/* Support Categories */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl shadow-xl p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                Support Categories
                            </h2>
                            <div className="space-y-4">
                                {supportCategories.map((category, index) => {
                                    const IconComponent = category.icon;
                                    return (
                                        <div
                                            key={index}
                                            className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-shadow duration-300"
                                        >
                                            <div className="flex items-start space-x-4">
                                                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                                                    <IconComponent className="w-6 h-6 text-white" />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-gray-900 mb-1">
                                                        {category.title}
                                                    </h3>
                                                    <p className="text-gray-600 text-sm mb-2">
                                                        {category.description}
                                                    </p>
                                                    <div className="space-y-1">
                                                        <div className="flex items-center space-x-2">
                                                            <Mail className="w-4 h-4 text-blue-600" />
                                                            <span className="text-sm text-gray-700">
                                                                {
                                                                    category.contact
                                                                }
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <Phone className="w-4 h-4 text-green-600" />
                                                            <span className="text-sm text-gray-700">
                                                                {category.phone}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Response Time */}
                        <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl shadow-xl p-8 text-white">
                            <h3 className="text-xl font-bold mb-4">
                                Response Times
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-blue-100">
                                        Critical Issues:
                                    </span>
                                    <span className="font-semibold">
                                        2-4 hours
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-blue-100">
                                        High Priority:
                                    </span>
                                    <span className="font-semibold">
                                        4-8 hours
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-blue-100">
                                        Medium Priority:
                                    </span>
                                    <span className="font-semibold">
                                        24 hours
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-blue-100">
                                        Low Priority:
                                    </span>
                                    <span className="font-semibold">
                                        48 hours
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-6">
                        {faqItems.map((faq, index) => (
                            <div
                                key={index}
                                className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200"
                            >
                                <h3 className="font-semibold text-gray-900 mb-2">
                                    {faq.question}
                                </h3>
                                <p className="text-gray-600 text-sm">
                                    {faq.answer}
                                </p>
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
                        to="/contact/general"
                        className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-300"
                    >
                        General Inquiry →
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ContactSupport;
