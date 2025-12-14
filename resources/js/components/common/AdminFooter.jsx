import React from "react";
import { Link } from "react-router-dom";
import { Shield, Mail, Phone, ExternalLink, Heart } from "lucide-react";

const AdminFooter = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gradient-to-r from-slate-50 via-blue-50 to-slate-50 border-t border-blue-100 mt-auto shadow-inner">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                {/* Main Footer Content */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    {/* Left: Copyright & School Info */}
                    <div className="text-center md:text-left">
                        <p className="text-sm font-bold text-gray-800">
                            Taft National High School
                        </p>
                        <p className="text-xs text-blue-600 font-medium">
                            Admin Panel
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                            © {currentYear} All rights reserved • SMS v1.0.0
                        </p>
                    </div>

                    {/* Center: Quick Admin Links */}
                    <div className="flex flex-wrap justify-center gap-3">
                        <Link
                            to="/admin"
                            className="px-3 py-1.5 bg-white hover:bg-blue-50 text-gray-700 hover:text-blue-700 rounded-lg transition-all duration-200 flex items-center gap-1.5 text-xs font-medium shadow-sm border border-gray-200 hover:border-blue-300"
                        >
                            <Shield className="h-3.5 w-3.5" />
                            Dashboard
                        </Link>
                        <a
                            href="mailto:info@taftnhs.edu.ph"
                            className="px-3 py-1.5 bg-white hover:bg-blue-50 text-gray-700 hover:text-blue-700 rounded-lg transition-all duration-200 flex items-center gap-1.5 text-xs font-medium shadow-sm border border-gray-200 hover:border-blue-300"
                        >
                            <Mail className="h-3.5 w-3.5" />
                            Support
                        </a>
                        <a
                            href="tel:+639457766068"
                            className="px-3 py-1.5 bg-white hover:bg-blue-50 text-gray-700 hover:text-blue-700 rounded-lg transition-all duration-200 flex items-center gap-1.5 text-xs font-medium shadow-sm border border-gray-200 hover:border-blue-300"
                        >
                            <Phone className="h-3.5 w-3.5" />
                            Contact
                        </a>
                        <a
                            href="/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg transition-all duration-200 flex items-center gap-1.5 text-xs font-medium shadow-sm"
                        >
                            <ExternalLink className="h-3.5 w-3.5" />
                            View Website
                        </a>
                    </div>

                    {/* Right: Department Info & Made with Love */}
                    <div className="text-center md:text-right">
                        <p className="text-xs font-semibold text-gray-700">
                            Department of Education
                        </p>
                        <p className="text-xs text-gray-600">
                            Region XIII (Caraga)
                        </p>
                        <div className="flex items-center justify-center md:justify-end gap-1 mt-1">
                            <p className="text-xs text-gray-500">Made with</p>
                            <Heart className="h-3 w-3 text-red-500 fill-red-500" />
                            <p className="text-xs text-gray-500">
                                for Education
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default AdminFooter;
