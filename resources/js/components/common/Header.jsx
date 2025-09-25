import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const navigation = [
        { name: "Home", href: "/" },
        {
            name: "Academics",
            href: "/academics",
            hasDropdown: true,
            submenu: [
                { name: "Junior High", href: "/academics/junior-high" },
                { name: "Senior High", href: "/academics/senior-high" },
                {
                    name: "Special Programs",
                    href: "/academics/special-programs",
                },
            ],
        },
        {
            name: "Announcements",
            href: "/news",
            hasDropdown: true,
            submenu: [
                { name: "School Highlights", href: "/announcements" },
                { name: "School Events", href: "/events" },
            ],
        },
        {
            name: "About Us",
            href: "/about",
            hasDropdown: true,
            submenu: [
                { name: "School Seal", href: "/about/school-seal" },
                { name: "Privacy Policy", href: "/about/privacy-policy" },
                { name: "Our History", href: "/about/history" },
                { name: "Mission & Vision", href: "/about/mission" },
                { name: "Quality Policy", href: "/about/quality-policy" },
            ],
        },
        {
            name: "Faculty",
            href: "/faculty",
            hasDropdown: true,
            submenu: [
                { name: "Principal", href: "/faculty/principal" },
                { name: "Assistant", href: "/faculty/assistant-principal" },
                { name: "Faculties", href: "/faculty/teaching-staff" },
                { name: "And Staff", href: "/faculty/administrative-staff" },
            ],
        },
        {
            name: "More",
            href: "/more",
            hasDropdown: true,
            submenu: [
                { name: "Contact Us", href: "/contact" },
                { name: "Resources", href: "/more/resources" },
                { name: "Downloads", href: "/more/downloads" },
                { name: "Links", href: "/more/links" },
            ],
        },
    ];

    const isActive = (path) => {
        if (path === "/" && location.pathname === "/") return true;
        if (path !== "/" && location.pathname.startsWith(path)) return true;
        return false;
    };

    return (
        <header className="bg-royal-blue shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center h-20">
                    {/* Logo and School Name */}
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center shadow-lg overflow-hidden">
                                <img
                                    src="/images/Logo.jpg"
                                    alt="TNHS Logo"
                                    className="h-full w-full object-cover rounded-full"
                                />
                            </div>
                        </div>
                        <div className="hidden sm:block">
                            <h1 className="text-2xl font-bold text-white">
                                Taft National High School
                            </h1>
                            <p className="text-sm text-blue-100 font-medium">
                                Nueva Ext., Surigao City
                            </p>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center space-x-1 ml-auto">
                        {navigation.map((item) => (
                            <div key={item.name} className="relative group">
                                {item.hasDropdown ? (
                                    item.name === "Academics" ? (
                                        // Academics: Clickable text (navigate to overview page only)
                                        <div
                                            to={item.href}
                                            className={`px-4 py-2 rounded font-medium transition-all duration-300 ${
                                                isActive(item.href)
                                                    ? "bg-white/20 text-white"
                                                    : "text-blue-100 hover:bg-white/10 hover:text-white"
                                            }`}
                                        >
                                            {item.name}
                                        </div>
                                    ) : (
                                        // Other dropdowns: Dropdown only (not clickable to main page)
                                        <div
                                            className={`px-4 py-2 rounded font-medium transition-all duration-300 flex items-center space-x-1 ${
                                                isActive(item.href)
                                                    ? "bg-white/20 text-white"
                                                    : "text-blue-100 hover:bg-white/10 hover:text-white hover:rounded"
                                            }`}
                                        >
                                            <span>{item.name}</span>
                                            {/* <ChevronDown className="h-4 w-4" /> */}
                                        </div>
                                    )
                                ) : (
                                    <Link
                                        to={item.href}
                                        className={`px-4 py-2 rounded font-medium transition-all duration-300 relative ${
                                            isActive(item.href)
                                                ? "bg-white/20 text-white shadow-lg backdrop-blur-sm border border-white/20"
                                                : "text-blue-100 hover:bg-white/10 hover:text-white hover:rounded"
                                        }`}
                                    >
                                        {item.name}
                                        {/* Hover underline effect */}
                                        <div
                                            className={`absolute bottom-0 left-0 h-0.5 bg-yellow-400 transition-all duration-300 rounded-full ${
                                                isActive(item.href)
                                                    ? "w-full"
                                                    : "w-0 group-hover:w-full"
                                            }`}
                                        ></div>
                                    </Link>
                                )}

                                {/* Dropdown Menu */}
                                {item.hasDropdown && (
                                    <div className="absolute top-full left-0 mt-1 w-[170px] bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                                        {item.submenu.map((subItem) => (
                                            <Link
                                                key={subItem.name}
                                                to={subItem.href}
                                                className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                                            >
                                                {subItem.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="lg:hidden p-2 text-blue-100 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300 ml-4"
                        >
                            {isMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </nav>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="lg:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 bg-blue-800 rounded-xl mt-2 shadow-xl">
                            {navigation.map((item) => (
                                <div key={item.name}>
                                    {item.hasDropdown ? (
                                        <div>
                                            {item.name === "Academics" ? (
                                                <div
                                                    className={`
          w-full text-left px-3 py-2 rounded-lg text-base font-medium
          transition-all duration-300 flex items-center justify-between
          ${
              isActive(item.href)
                  ? "bg-white/20 text-white"
                  : "text-blue-100 hover:bg-white/10 hover:text-white"
          }
        `}
                                                >
                                                    <span>{item.name}</span>
                                                </div>
                                            ) : (
                                                // Other dropdowns: Dropdown only (not clickable to main page)
                                                <div
                                                    className={`w-full text-left px-3 py-2 rounded-lg text-base font-medium transition-all duration-300 flex items-center justify-between ${
                                                        isActive(item.href)
                                                            ? "bg-white/20 text-white"
                                                            : "text-blue-100 hover:bg-white/10 hover:text-white"
                                                    }`}
                                                >
                                                    <span>{item.name}</span>
                                                    {/* <ChevronDown className="h-4 w-4" /> */}
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <Link
                                            to={item.href}
                                            onClick={() => setIsMenuOpen(false)}
                                            className={`block px-3 py-2 rounded-lg text-base font-medium transition-all duration-300 ${
                                                isActive(item.href)
                                                    ? "bg-white/20 text-white shadow-md backdrop-blur-sm border border-white/20"
                                                    : "text-blue-100 hover:bg-white/10 hover:text-white"
                                            }`}
                                        >
                                            {item.name}
                                        </Link>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
