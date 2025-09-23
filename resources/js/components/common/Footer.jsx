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
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* School Info */}
                    <div className="md:col-span-1">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center shadow-lg overflow-hidden">
                                <img
                                    src="/images/Logo.jpg"
                                    alt="TNHS Logo"
                                    className="h-full w-full object-cover rounded-full"
                                />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white">
                                    Taft National High School
                                </h3>
                                <p className="text-blue-100 text-sm">
                                    Empowering students for a brighter future
                                </p>
                            </div>
                        </div>
                        <p className="text-blue-100 text-sm mb-4 leading-relaxed">
                            Empowering students with quality education and
                            fostering academic excellence in Eastern Samar.
                        </p>
                        <div className="flex space-x-3">
                            <a
                                href="#"
                                className="h-8 w-8 bg-blue-700 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                            >
                                <Facebook className="h-4 w-4 text-white" />
                            </a>
                            <a
                                href="#"
                                className="h-8 w-8 bg-blue-700 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                            >
                                <Instagram className="h-4 w-4 text-white" />
                            </a>
                            <a
                                href="#"
                                className="h-8 w-8 bg-blue-700 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                            >
                                <Twitter className="h-4 w-4 text-white" />
                            </a>
                            <a
                                href="#"
                                className="h-8 w-8 bg-blue-700 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                            >
                                <Youtube className="h-4 w-4 text-white" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-base font-semibold mb-4 text-white">
                            Quick Links
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    to="/about"
                                    className="text-blue-100 hover:text-white transition-colors duration-300 text-sm"
                                >
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/academics"
                                    className="text-blue-100 hover:text-white transition-colors duration-300 text-sm"
                                >
                                    Academics
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/admissions"
                                    className="text-blue-100 hover:text-white transition-colors duration-300 text-sm"
                                >
                                    Admissions
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/news"
                                    className="text-blue-100 hover:text-white transition-colors duration-300 text-sm"
                                >
                                    News & Events
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/contact"
                                    className="text-blue-100 hover:text-white transition-colors duration-300 text-sm"
                                >
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Information */}
                    <div>
                        <h4 className="text-base font-semibold mb-4 text-white">
                            Contact Info
                        </h4>
                        <ul className="space-y-3">
                            <li className="flex items-start space-x-2">
                                <MapPin className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                                <span className="text-blue-100 text-sm">
                                    Taft, Surigao City, Philippines
                                </span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <Phone className="h-4 w-4 text-yellow-400 flex-shrink-0" />
                                <span className="text-blue-100 text-sm">
                                    +63 XXX XXX XXXX
                                </span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <Mail className="h-4 w-4 text-yellow-400 flex-shrink-0" />
                                <span className="text-blue-100 text-sm">
                                    info@taftnhs.edu.ph
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-6 pt-4 border-t border-blue-600">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-blue-100 text-xs text-center md:text-left">
                            © 2024 Taft National High School. All rights
                            reserved.
                        </p>
                        <div className="mt-2 md:mt-0 flex space-x-4">
                            <Link
                                to="/privacy"
                                className="text-blue-100 hover:text-white text-xs transition-colors duration-300"
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                to="/terms"
                                className="text-blue-100 hover:text-white text-xs transition-colors duration-300"
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
