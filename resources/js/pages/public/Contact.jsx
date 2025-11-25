import React, { useState, useEffect } from "react";
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
    Globe,
    Facebook,
} from "lucide-react";
import CompactPageHeader from "../../components/ui/CompactPageHeader";
import { contactService } from "../../services/contactService";

const Contact = () => {
    const [contactData, setContactData] = useState({
        general: [],
        admissions: [],
        support: [],
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch contact information on component mount
    useEffect(() => {
        window.scrollTo(0, 0);

        const fetchContactData = async () => {
            try {
                setLoading(true);
                setError(null);

                // Fetch all contact information
                const response = await contactService.public.getAll();
                console.log("API Response:", response);
                const allContacts = response.data || [];
                console.log("All contacts:", allContacts);

                // Group contacts by category
                const groupedContacts = {
                    general: allContacts.filter(
                        (contact) =>
                            contact.category === "general" ||
                            contact.type === "phone" ||
                            contact.type === "email" ||
                            contact.type === "address" ||
                            contact.type === "hours"
                    ),
                    admissions: allContacts.filter(
                        (contact) =>
                            contact.category === "admissions" ||
                            contact.department
                                ?.toLowerCase()
                                .includes("admission")
                    ),
                    support: allContacts.filter(
                        (contact) =>
                            contact.category === "support" ||
                            contact.department
                                ?.toLowerCase()
                                .includes("support") ||
                            contact.department
                                ?.toLowerCase()
                                .includes("guidance")
                    ),
                };

                setContactData(groupedContacts);
            } catch (err) {
                console.error("Error fetching contact data:", err);
                setError(
                    "Failed to load contact information. Please try again later."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchContactData();
    }, []);

    // Helper function to get contact info by type
    const getContactByType = (contacts, type) => {
        return contacts.find((contact) => contact.type === type);
    };

    // Helper function to get contacts by department
    const getContactsByDepartment = (contacts, department) => {
        return contacts.filter((contact) =>
            contact.department?.toLowerCase().includes(department.toLowerCase())
        );
    };

    // Helper function to render contact icon
    const renderContactIcon = (type, iconClass) => {
        if (iconClass) {
            // If custom icon class is provided, use it
            return <i className={iconClass} />;
        }

        // Default icons based on type
        switch (type) {
            case "phone":
                return <Phone className="w-5 h-5" />;
            case "email":
                return <Mail className="w-5 h-5" />;
            case "address":
                return <MapPin className="w-5 h-5" />;
            case "hours":
                return <Clock className="w-5 h-5" />;
            case "website":
                return <Globe className="w-5 h-5" />;
            case "social":
                return <Facebook className="w-5 h-5" />;
            default:
                return <Phone className="w-5 h-5" />;
        }
    };

    // Helper function to format contact value based on type
    const formatContactValue = (contact) => {
        switch (contact.type) {
            case "phone":
                return contact.value;
            case "email":
                return contact.value;
            case "address":
                return contact.value;
            case "hours":
                return contact.value;
            default:
                return contact.value;
        }
    };

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <CompactPageHeader
                    icon={MessageCircle}
                    title="Contact Us"
                    subtitle="We're here to help! Reach out to us for any inquiries, support, or information about our school community."
                    gradient="from-blue-600 to-purple-600"
                    bgPattern="from-blue-50 to-purple-50"
                />
                <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-royal-blue"></div>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="min-h-screen bg-gray-50">
                <CompactPageHeader
                    icon={MessageCircle}
                    title="Contact Us"
                    subtitle="We're here to help! Reach out to us for any inquiries, support, or information about our school community."
                    gradient="from-blue-600 to-purple-600"
                    bgPattern="from-blue-50 to-purple-50"
                />
                <div className="flex justify-center items-center py-20">
                    <div className="text-center">
                        <p className="text-red-600 mb-4">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-4 py-2 bg-royal-blue text-white rounded hover:bg-blue-700"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

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
                {/* Quick Contact Cards - Dynamic */}
                <div className="grid md:grid-cols-4 gap-6 mb-12">
                    {/* Location Card */}
                    {getContactByType(contactData.general, "address") && (
                        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                            <div className="flex items-center gap-3 mb-4">
                                <MapPin className="w-6 h-6 text-blue-600" />
                                <h3 className="text-lg font-bold text-gray-800">
                                    Location
                                </h3>
                            </div>
                            <p className="text-gray-600 mb-2">
                                {
                                    getContactByType(
                                        contactData.general,
                                        "address"
                                    ).value
                                }
                            </p>
                            {getContactByType(contactData.general, "address")
                                .description && (
                                <p className="text-sm text-gray-500">
                                    {
                                        getContactByType(
                                            contactData.general,
                                            "address"
                                        ).description
                                    }
                                </p>
                            )}
                        </div>
                    )}

                    {/* Phone Card */}
                    {getContactByType(contactData.general, "phone") && (
                        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                            <div className="flex items-center gap-3 mb-4">
                                <Phone className="w-6 h-6 text-green-600" />
                                <h3 className="text-lg font-bold text-gray-800">
                                    Phone
                                </h3>
                            </div>
                            <p className="text-gray-600 mb-2">
                                {
                                    getContactByType(
                                        contactData.general,
                                        "phone"
                                    ).value
                                }
                            </p>
                            {getContactByType(contactData.general, "phone")
                                .description && (
                                <p className="text-sm text-gray-500">
                                    {
                                        getContactByType(
                                            contactData.general,
                                            "phone"
                                        ).description
                                    }
                                </p>
                            )}
                        </div>
                    )}

                    {/* Email Card */}
                    {getContactByType(contactData.general, "email") && (
                        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                            <div className="flex items-center gap-3 mb-4">
                                <Mail className="w-6 h-6 text-purple-600" />
                                <h3 className="text-lg font-bold text-gray-800">
                                    Email
                                </h3>
                            </div>
                            <p className="text-gray-600 mb-2">
                                {
                                    getContactByType(
                                        contactData.general,
                                        "email"
                                    ).value
                                }
                            </p>
                            {getContactByType(contactData.general, "email")
                                .description && (
                                <p className="text-sm text-gray-500">
                                    {
                                        getContactByType(
                                            contactData.general,
                                            "email"
                                        ).description
                                    }
                                </p>
                            )}
                        </div>
                    )}

                    {/* Hours Card */}
                    {getContactByType(contactData.general, "hours") && (
                        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                            <div className="flex items-center gap-3 mb-4">
                                <Clock className="w-6 h-6 text-orange-600" />
                                <h3 className="text-lg font-bold text-gray-800">
                                    Hours
                                </h3>
                            </div>
                            <p className="text-gray-600 mb-2">
                                {
                                    getContactByType(
                                        contactData.general,
                                        "hours"
                                    ).value
                                }
                            </p>
                            {getContactByType(contactData.general, "hours")
                                .description && (
                                <p className="text-sm text-gray-500">
                                    {
                                        getContactByType(
                                            contactData.general,
                                            "hours"
                                        ).description
                                    }
                                </p>
                            )}
                        </div>
                    )}

                    {/* Fallback cards if no data */}
                    {contactData.general.length === 0 && (
                        <>
                            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                                <div className="flex items-center gap-3 mb-4">
                                    <MapPin className="w-6 h-6 text-blue-600" />
                                    <h3 className="text-lg font-bold text-gray-800">
                                        Location
                                    </h3>
                                </div>
                                <p className="text-gray-500 text-sm">
                                    Contact information will be available soon.
                                </p>
                            </div>
                            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                                <div className="flex items-center gap-3 mb-4">
                                    <Phone className="w-6 h-6 text-green-600" />
                                    <h3 className="text-lg font-bold text-gray-800">
                                        Phone
                                    </h3>
                                </div>
                                <p className="text-gray-500 text-sm">
                                    Contact information will be available soon.
                                </p>
                            </div>
                            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                                <div className="flex items-center gap-3 mb-4">
                                    <Mail className="w-6 h-6 text-purple-600" />
                                    <h3 className="text-lg font-bold text-gray-800">
                                        Email
                                    </h3>
                                </div>
                                <p className="text-gray-500 text-sm">
                                    Contact information will be available soon.
                                </p>
                            </div>
                            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                                <div className="flex items-center gap-3 mb-4">
                                    <Clock className="w-6 h-6 text-orange-600" />
                                    <h3 className="text-lg font-bold text-gray-800">
                                        Hours
                                    </h3>
                                </div>
                                <p className="text-gray-500 text-sm">
                                    Contact information will be available soon.
                                </p>
                            </div>
                        </>
                    )}
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
                                    {/* Dynamic Address */}
                                    {getContactByType(
                                        contactData.general,
                                        "address"
                                    ) && (
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <MapPin className="w-5 h-5 text-blue-600" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-800 mb-1">
                                                    {
                                                        getContactByType(
                                                            contactData.general,
                                                            "address"
                                                        ).label
                                                    }
                                                </h3>
                                                <p className="text-gray-600 text-sm leading-relaxed">
                                                    {
                                                        getContactByType(
                                                            contactData.general,
                                                            "address"
                                                        ).value
                                                    }
                                                </p>
                                                {getContactByType(
                                                    contactData.general,
                                                    "address"
                                                ).description && (
                                                    <p className="text-gray-500 text-xs mt-1">
                                                        {
                                                            getContactByType(
                                                                contactData.general,
                                                                "address"
                                                            ).description
                                                        }
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Dynamic Phone */}
                                    {getContactByType(
                                        contactData.general,
                                        "phone"
                                    ) && (
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <Phone className="w-5 h-5 text-green-600" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-800 mb-1">
                                                    {
                                                        getContactByType(
                                                            contactData.general,
                                                            "phone"
                                                        ).label
                                                    }
                                                </h3>
                                                <p className="text-gray-600 text-sm">
                                                    {
                                                        getContactByType(
                                                            contactData.general,
                                                            "phone"
                                                        ).value
                                                    }
                                                </p>
                                                {getContactByType(
                                                    contactData.general,
                                                    "phone"
                                                ).description && (
                                                    <p className="text-gray-500 text-xs mt-1">
                                                        {
                                                            getContactByType(
                                                                contactData.general,
                                                                "phone"
                                                            ).description
                                                        }
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Dynamic Email */}
                                    {getContactByType(
                                        contactData.general,
                                        "email"
                                    ) && (
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <Mail className="w-5 h-5 text-purple-600" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-800 mb-1">
                                                    {
                                                        getContactByType(
                                                            contactData.general,
                                                            "email"
                                                        ).label
                                                    }
                                                </h3>
                                                <p className="text-gray-600 text-sm">
                                                    {
                                                        getContactByType(
                                                            contactData.general,
                                                            "email"
                                                        ).value
                                                    }
                                                </p>
                                                {getContactByType(
                                                    contactData.general,
                                                    "email"
                                                ).description && (
                                                    <p className="text-gray-500 text-xs mt-1">
                                                        {
                                                            getContactByType(
                                                                contactData.general,
                                                                "email"
                                                            ).description
                                                        }
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Student Support Section */}
                                    {contactData.support.length > 0 && (
                                        <div className="border-t border-gray-200 pt-6">
                                            <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                                                <Users className="w-5 h-5 text-purple-600" />
                                                Student Support Services
                                            </h4>

                                            {/* Support Phone */}
                                            {getContactByType(
                                                contactData.support,
                                                "phone"
                                            ) && (
                                                <div className="flex items-start gap-4 mb-4">
                                                    <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
                                                        <Phone className="w-5 h-5 text-purple-600" />
                                                    </div>
                                                    <div>
                                                        <h5 className="font-bold text-gray-800 mb-1">
                                                            {
                                                                getContactByType(
                                                                    contactData.support,
                                                                    "phone"
                                                                ).label
                                                            }
                                                        </h5>
                                                        <p className="text-gray-600 text-sm">
                                                            {
                                                                getContactByType(
                                                                    contactData.support,
                                                                    "phone"
                                                                ).value
                                                            }
                                                        </p>
                                                        {getContactByType(
                                                            contactData.support,
                                                            "phone"
                                                        ).description && (
                                                            <p className="text-gray-500 text-xs mt-1">
                                                                {
                                                                    getContactByType(
                                                                        contactData.support,
                                                                        "phone"
                                                                    )
                                                                        .description
                                                                }
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Support Email */}
                                            {getContactByType(
                                                contactData.support,
                                                "email"
                                            ) && (
                                                <div className="flex items-start gap-4">
                                                    <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
                                                        <Mail className="w-5 h-5 text-purple-600" />
                                                    </div>
                                                    <div>
                                                        <h5 className="font-bold text-gray-800 mb-1">
                                                            {
                                                                getContactByType(
                                                                    contactData.support,
                                                                    "email"
                                                                ).label
                                                            }
                                                        </h5>
                                                        <p className="text-gray-600 text-sm">
                                                            {
                                                                getContactByType(
                                                                    contactData.support,
                                                                    "email"
                                                                ).value
                                                            }
                                                        </p>
                                                        {getContactByType(
                                                            contactData.support,
                                                            "email"
                                                        ).description && (
                                                            <p className="text-gray-500 text-xs mt-1">
                                                                {
                                                                    getContactByType(
                                                                        contactData.support,
                                                                        "email"
                                                                    )
                                                                        .description
                                                                }
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-6">
                                    {/* Dynamic Office Hours */}
                                    {getContactByType(
                                        contactData.general,
                                        "hours"
                                    ) && (
                                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
                                            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                                                <Clock className="w-5 h-5 text-blue-600" />
                                                {
                                                    getContactByType(
                                                        contactData.general,
                                                        "hours"
                                                    ).label
                                                }
                                            </h3>
                                            <div className="space-y-3">
                                                <div className="text-sm text-gray-600">
                                                    {
                                                        getContactByType(
                                                            contactData.general,
                                                            "hours"
                                                        ).value
                                                    }
                                                </div>
                                                {getContactByType(
                                                    contactData.general,
                                                    "hours"
                                                ).description && (
                                                    <div className="text-xs text-gray-500 mt-2">
                                                        {
                                                            getContactByType(
                                                                contactData.general,
                                                                "hours"
                                                            ).description
                                                        }
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}

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

                                    {/* Visit Us Section */}
                                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
                                        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                                            <MapPin className="w-5 h-5 text-blue-600" />
                                            Visit Our Campus
                                        </h3>
                                        <p className="text-sm text-gray-600 mb-3">
                                            Walk-ins welcome during office
                                            hours. Valid ID required for campus
                                            entry.
                                        </p>
                                        <div className="flex items-center gap-2 text-blue-600">
                                            <CheckCircle className="w-4 h-4" />
                                            <span className="text-sm font-medium">
                                                Appointments available
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
