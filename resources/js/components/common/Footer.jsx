import React from "react";
import { Link } from "react-router-dom";
import {
    Mail,
    Phone,
    MapPin,
    Facebook,
    Instagram,
    Twitter,
    Youtube,
} from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-royal-blue text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* School Info */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="relative">
                                <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center shadow-lg overflow-hidden">
                                    <img
                                        src="/images/Logo.jpg"
                                        alt="TNHS Logo"
                                        className="h-full w-full object-cover rounded-full"
                                    />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white">
                                    Taft National High School
                                </h3>
                                <p className="text-blue-100 font-medium">
                                    Empowering students for a brighter future
                                </p>
                            </div>
                        </div>
                        <p className="text-blue-100 mb-6 max-w-md text-lg leading-relaxed">
                            Empowering students with quality education,
                            fostering academic excellence, and building
                            character for a brighter future in Eastern Samar.
                        </p>
                        <div className="flex space-x-4">
                            <a
                                href="#"
                                className="h-10 w-10 bg-blue-700 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg group"
                            >
                                <Facebook className="h-5 w-5 text-white group-hover:scale-110 transition-transform duration-300" />
                            </a>
                            <a
                                href="#"
                                className="h-10 w-10 bg-blue-700 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg group"
                            >
                                <Instagram className="h-5 w-5 text-white group-hover:scale-110 transition-transform duration-300" />
                            </a>
                            <a
                                href="#"
                                className="h-10 w-10 bg-blue-700 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg group"
                            >
                                <Twitter className="h-5 w-5 text-white group-hover:scale-110 transition-transform duration-300" />
                            </a>
                            <a
                                href="#"
                                className="h-10 w-10 bg-blue-700 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg group"
                            >
                                <Youtube className="h-5 w-5 text-white group-hover:scale-110 transition-transform duration-300" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6 text-white border-b border-blue-300 pb-2">
                            Quick Links
                        </h4>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    to="/about"
                                    className="text-blue-100 hover:text-white transition-all duration-300 flex items-center group"
                                >
                                    <span className="w-2 h-2 bg-white rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></span>
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/academics"
                                    className="text-blue-100 hover:text-white transition-all duration-300 flex items-center group"
                                >
                                    <span className="w-2 h-2 bg-white rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></span>
                                    Academics
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/admissions"
                                    className="text-blue-100 hover:text-white transition-all duration-300 flex items-center group"
                                >
                                    <span className="w-2 h-2 bg-white rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></span>
                                    Admissions
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/news"
                                    className="text-blue-100 hover:text-white transition-all duration-300 flex items-center group"
                                >
                                    <span className="w-2 h-2 bg-white rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></span>
                                    News & Events
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/contact"
                                    className="text-blue-100 hover:text-white transition-all duration-300 flex items-center group"
                                >
                                    <span className="w-2 h-2 bg-white rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></span>
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Information */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6 text-white border-b border-blue-300 pb-2">
                            Contact Info
                        </h4>
                        <ul className="space-y-4">
                            <li className="flex items-start space-x-3">
                                <MapPin className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                                <span className="text-blue-100">
                                    Taft, Eastern Samar, Philippines
                                </span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Phone className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                                <span className="text-blue-100">
                                    +63 XXX XXX XXXX
                                </span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Mail className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                                <span className="text-blue-100">
                                    info@taftnhs.edu.ph
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-12 pt-8 border-t border-blue-600">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-blue-100 text-sm text-center md:text-left">
                            © 2024 Taft National High School. All rights
                            reserved.
                        </p>
                        <div className="mt-4 md:mt-0 flex space-x-6">
                            <Link
                                to="/privacy"
                                className="text-blue-100 hover:text-white text-sm transition-colors duration-300"
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                to="/terms"
                                className="text-blue-100 hover:text-white text-sm transition-colors duration-300"
                            >
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
