import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    Mail,
    Phone,
    Calendar,
    FileText,
    User,
    GraduationCap,
    Clock,
    CheckCircle,
} from "lucide-react";

const ContactAdmissions = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [formData, setFormData] = useState({
        studentName: "",
        parentName: "",
        email: "",
        phone: "",
        gradeLevel: "",
        previousSchool: "",
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
        alert(
            "Thank you for your admission inquiry! We will contact you within 24 hours."
        );
        setFormData({
            studentName: "",
            parentName: "",
            email: "",
            phone: "",
            gradeLevel: "",
            previousSchool: "",
            message: "",
        });
    };

    const admissionInfo = [
        {
            icon: Calendar,
            title: "Application Period",
            details:
                "Grade 7: March - May\nGrade 11: March - May\nTransferees: Year-round",
            color: "from-blue-500 to-blue-600",
        },
        {
            icon: FileText,
            title: "Required Documents",
            details:
                "Report Card\nBirth Certificate\nGood Moral Certificate\n2x2 ID Photos",
            color: "from-green-500 to-green-600",
        },
        {
            icon: Clock,
            title: "Processing Time",
            details:
                "New Students: 3-5 days\nTransferees: 1-2 days\nAssessment: Same day",
            color: "from-purple-500 to-purple-600",
        },
        {
            icon: CheckCircle,
            title: "Assessment",
            details:
                "Grade 7: No entrance exam\nGrade 11: Track assessment\nTransferees: Grade evaluation",
            color: "from-orange-500 to-orange-600",
        },
    ];

    const gradeLevels = [
        "Grade 7 (New Student)",
        "Grade 8 (Transferee)",
        "Grade 9 (Transferee)",
        "Grade 10 (Transferee)",
        "Grade 11 (New Student)",
        "Grade 12 (Transferee)",
    ];

    const admissionSteps = [
        {
            step: "1",
            title: "Submit Application",
            description:
                "Complete the online application form or visit our office",
        },
        {
            step: "2",
            title: "Submit Documents",
            description: "Provide all required documents and certificates",
        },
        {
            step: "3",
            title: "Assessment",
            description: "Undergo academic assessment (if required)",
        },
        {
            step: "4",
            title: "Interview",
            description: "Parent and student interview with guidance counselor",
        },
        {
            step: "5",
            title: "Enrollment",
            description: "Complete enrollment process and pay fees",
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold text-gray-900 mb-4">
                        Admissions Inquiry
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Get information about enrollment, requirements, and the
                        admission process
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 mb-16">
                    {/* Admission Form */}
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            Admission Inquiry Form
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label
                                    htmlFor="studentName"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Student's Full Name
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        id="studentName"
                                        name="studentName"
                                        value={formData.studentName}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter student's full name"
                                    />
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="parentName"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Parent/Guardian Name
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        id="parentName"
                                        name="parentName"
                                        value={formData.parentName}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter parent/guardian name"
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
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
                                            placeholder="Enter email"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label
                                        htmlFor="phone"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Phone Number
                                    </label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Enter phone number"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label
                                        htmlFor="gradeLevel"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Desired Grade Level
                                    </label>
                                    <div className="relative">
                                        <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <select
                                            id="gradeLevel"
                                            name="gradeLevel"
                                            value={formData.gradeLevel}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                                        >
                                            <option value="">
                                                Select grade level
                                            </option>
                                            {gradeLevels.map((level, index) => (
                                                <option
                                                    key={index}
                                                    value={level}
                                                >
                                                    {level}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label
                                        htmlFor="previousSchool"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Previous School (if applicable)
                                    </label>
                                    <input
                                        type="text"
                                        id="previousSchool"
                                        name="previousSchool"
                                        value={formData.previousSchool}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter previous school name"
                                    />
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="message"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Additional Information
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    rows={4}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Any specific questions or additional information..."
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-green-700 transition-all duration-300"
                            >
                                Submit Admission Inquiry
                            </button>
                        </form>
                    </div>

                    {/* Admission Information */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl shadow-xl p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                Admission Information
                            </h2>
                            <div className="space-y-6">
                                {admissionInfo.map((info, index) => {
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

                        {/* Contact Info */}
                        <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl shadow-xl p-8 text-white">
                            <h3 className="text-xl font-bold mb-4">
                                Admissions Office
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-center space-x-3">
                                    <Mail className="w-5 h-5 text-blue-200" />
                                    <span className="text-blue-100">
                                        admissions@taftnhs.edu.ph
                                    </span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Phone className="w-5 h-5 text-green-200" />
                                    <span className="text-green-100">
                                        (055) 123-4570
                                    </span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Calendar className="w-5 h-5 text-purple-200" />
                                    <span className="text-purple-100">
                                        Mon-Fri: 8:00 AM - 4:00 PM
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Admission Process */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                        Admission Process
                    </h2>
                    <div className="grid md:grid-cols-5 gap-6">
                        {admissionSteps.map((step, index) => (
                            <div key={index} className="text-center">
                                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl font-bold text-white">
                                        {step.step}
                                    </span>
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-2">
                                    {step.title}
                                </h3>
                                <p className="text-gray-600 text-sm">
                                    {step.description}
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
                        to="/admissions"
                        className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-300"
                    >
                        View Full Admissions →
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ContactAdmissions;
