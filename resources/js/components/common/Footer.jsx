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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                    {/* School Info - Takes 2 columns on large screens */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center shadow-lg overflow-hidden">
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
                                    Nueva Ext., Surigao City
                                </p>
                            </div>
                        </div>
                        <p className="text-blue-100 text-sm mb-4 leading-relaxed">
                            Empowering students with quality education and
                            fostering academic excellence. Building tomorrow's
                            leaders through comprehensive education and
                            character development.
                        </p>

                        {/* Mission Statement */}
                        <div className="mb-4">
                            <h5 className="text-white font-semibold text-sm mb-2">
                                Our Mission
                            </h5>
                            <p className="text-blue-100 text-xs leading-relaxed">
                                To provide quality, accessible, and relevant
                                education that develops competent, productive,
                                and responsible citizens.
                            </p>
                        </div>

                        {/* Social Media */}
                        <div>
                            <div className="flex items-center gap-3">
                                <h5 className="text-white font-semibold text-sm">
                                    Follow Us
                                </h5>
                                <div className="flex space-x-2">
                                    <a
                                        href="#"
                                        className="h-8 w-8 bg-blue-700 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                                        title="Facebook"
                                    >
                                        <Facebook className="h-4 w-4 text-white" />
                                    </a>
                                    <a
                                        href="#"
                                        className="h-8 w-8 bg-blue-700 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                                        title="Instagram"
                                    >
                                        <Instagram className="h-4 w-4 text-white" />
                                    </a>
                                    <a
                                        href="#"
                                        className="h-8 w-8 bg-blue-700 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                                        title="Twitter"
                                    >
                                        <Twitter className="h-4 w-4 text-white" />
                                    </a>
                                    <a
                                        href="#"
                                        className="h-8 w-8 bg-blue-700 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                                        title="YouTube"
                                    >
                                        <Youtube className="h-4 w-4 text-white" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-base font-semibold mb-4 text-white border-b border-blue-600 pb-2">
                            Quick Links
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    to="/about"
                                    className="text-blue-100 hover:text-white transition-colors duration-300 text-sm hover:translate-x-1 transform inline-block"
                                >
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/academics"
                                    className="text-blue-100 hover:text-white transition-colors duration-300 text-sm hover:translate-x-1 transform inline-block"
                                >
                                    Academics
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/admissions/requirements"
                                    className="text-blue-100 hover:text-white transition-colors duration-300 text-sm hover:translate-x-1 transform inline-block"
                                >
                                    Admissions
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/announcements"
                                    className="text-blue-100 hover:text-white transition-colors duration-300 text-sm hover:translate-x-1 transform inline-block"
                                >
                                    Announcements
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/events"
                                    className="text-blue-100 hover:text-white transition-colors duration-300 text-sm hover:translate-x-1 transform inline-block"
                                >
                                    Events
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/gallery"
                                    className="text-blue-100 hover:text-white transition-colors duration-300 text-sm hover:translate-x-1 transform inline-block"
                                >
                                    Gallery
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Academic Programs */}
                    <div>
                        <h4 className="text-base font-semibold mb-4 text-white border-b border-blue-600 pb-2">
                            Programs
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    to="/academics/junior-high"
                                    className="text-blue-100 hover:text-white transition-colors duration-300 text-sm hover:translate-x-1 transform inline-block"
                                >
                                    Junior High School
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/academics/senior-high"
                                    className="text-blue-100 hover:text-white transition-colors duration-300 text-sm hover:translate-x-1 transform inline-block"
                                >
                                    Senior High School
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/academics/special-programs"
                                    className="text-blue-100 hover:text-white transition-colors duration-300 text-sm hover:translate-x-1 transform inline-block"
                                >
                                    ALS Program
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/faculty"
                                    className="text-blue-100 hover:text-white transition-colors duration-300 text-sm hover:translate-x-1 transform inline-block"
                                >
                                    Faculty & Staff
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/faculty/principal"
                                    className="text-blue-100 hover:text-white transition-colors duration-300 text-sm hover:translate-x-1 transform inline-block"
                                >
                                    Principal Corner
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/more/resources"
                                    className="text-blue-100 hover:text-white transition-colors duration-300 text-sm hover:translate-x-1 transform inline-block"
                                >
                                    Resources
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Information */}
                    <div>
                        <h4 className="text-base font-semibold mb-4 text-white border-b border-blue-600 pb-2">
                            Contact Info
                        </h4>
                        <ul className="space-y-3">
                            <li className="flex items-start space-x-2">
                                <MapPin className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                                <div>
                                    <span className="text-blue-100 text-sm block">
                                        Nueva Extension, Taft
                                    </span>
                                    <span className="text-blue-100 text-sm">
                                        Surigao City, Philippines
                                    </span>
                                </div>
                            </li>
                            <li className="flex items-center space-x-2">
                                <Phone className="h-4 w-4 text-yellow-400 flex-shrink-0" />
                                <span className="text-blue-100 text-sm">
                                    +63 945 776 6068
                                </span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <Mail className="h-4 w-4 text-yellow-400 flex-shrink-0" />
                                <span className="text-blue-100 text-sm">
                                    info@taftnhs.edu.ph
                                </span>
                            </li>
                        </ul>

                        {/* Office Hours */}
                        <div className="mt-4">
                            <h5 className="text-white font-semibold text-sm mb-2">
                                Office Hours
                            </h5>
                            <div className="text-blue-100 text-xs space-y-1">
                                <div>Monday - Friday</div>
                                <div>8:00 AM - 5:00 PM</div>
                                <div className="text-yellow-400 text-xs mt-1">
                                    Closed on weekends & holidays
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-6 pt-4 border-t border-blue-600">
                    {/* Copyright and Links */}
                    <div className="flex flex-col lg:flex-row justify-between items-center space-y-3 lg:space-y-0">
                        <div className="text-center lg:text-left">
                            <p className="text-blue-100 text-xs">
                                © 2024 Taft National High School. All rights
                                reserved.
                            </p>
                            <p className="text-blue-200 text-xs mt-1">
                                Department of Education - Region XIII (Caraga)
                            </p>
                        </div>

                        <div className="flex flex-wrap justify-center lg:justify-end gap-4 text-xs">
                            <Link
                                to="/about/privacy-policy"
                                className="text-blue-100 hover:text-white transition-colors duration-300"
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                to="/about/quality-policy"
                                className="text-blue-100 hover:text-white transition-colors duration-300"
                            >
                                Quality Policy
                            </Link>
                            <Link
                                to="/contact"
                                className="text-blue-100 hover:text-white transition-colors duration-300"
                            >
                                Contact Us
                            </Link>
                            <Link
                                to="/more/resources"
                                className="text-blue-100 hover:text-white transition-colors duration-300"
                            >
                                Resources
                            </Link>
                        </div>
                    </div>

                    {/* School Motto */}
                    <div className="text-center mt-3 -mb-5 pt-3 border-t border-blue-700">
                        <p className="text-yellow-400 text-sm font-medium italic">
                            "Excellence in Education, Excellence in Character"
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
