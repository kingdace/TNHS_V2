import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, ChevronUp, ChevronRight } from "lucide-react";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
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
            name: "News & Events",
            href: "/news",
            hasDropdown: true,
            submenu: [
                { name: "Announcements", href: "/news/announcements" },
                { name: "Events", href: "/news/events" },
                { name: "School Updates", href: "/news/updates" },
            ],
        },
        {
            name: "About",
            href: "/about",
            hasDropdown: true,
            submenu: [
                { name: "Our History", href: "/about/history" },
                { name: "Mission & Vision", href: "/about/mission" },
                { name: "School Leadership", href: "/about/leadership" },
            ],
        },
        {
            name: "Contact Us",
            href: "/contact",
            hasDropdown: true,
            submenu: [
                { name: "General Inquiries", href: "/contact/general" },
                { name: "Admissions", href: "/contact/admissions" },
                { name: "Support", href: "/contact/support" },
            ],
        },
        {
            name: "Faculty",
            href: "/faculty",
            hasDropdown: true,
            submenu: [
                { name: "Principal", href: "/faculty/principal" },
                {
                    name: "Assistant Principal",
                    href: "/faculty/assistant-principal",
                },
                { name: "Teaching Staff", href: "/faculty/teaching-staff" },
                {
                    name: "Administrative Staff",
                    href: "/faculty/administrative-staff",
                },
                { name: "Support Staff", href: "/faculty/support-staff" },
            ],
        },
        {
            name: "More",
            href: "/more",
            hasDropdown: true,
            submenu: [
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
                <div className="flex items-center justify-between h-20">
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
                                TNHS
                            </h1>
                            <p className="text-sm text-blue-100 font-medium">
                                Taft National High School
                            </p>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center space-x-1">
                        {navigation.map((item) => (
                            <div key={item.name} className="relative group">
                                {item.hasDropdown ? (
                                    <button
                                        onClick={() =>
                                            setOpenDropdown(
                                                openDropdown === item.name
                                                    ? null
                                                    : item.name
                                            )
                                        }
                                        className={`px-4 py-2 rounded font-medium transition-all duration-300 flex items-center space-x-1 ${
                                            isActive(item.href)
                                                ? "bg-white/20 text-white shadow-lg backdrop-blur-sm border border-white/20"
                                                : "text-blue-100 hover:bg-white/10 hover:text-white hover:rounded"
                                        }`}
                                    >
                                        <span>{item.name}</span>
                                        {openDropdown === item.name ? (
                                            <ChevronUp className="h-4 w-4" />
                                        ) : (
                                            <ChevronDown className="h-4 w-4" />
                                        )}
                                    </button>
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
                                {item.hasDropdown &&
                                    openDropdown === item.name && (
                                        <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                                            <div className="px-3 py-2 border-b border-gray-100 mb-1">
                                                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                                    {item.name} Menu
                                                </span>
                                            </div>
                                            {item.submenu.map((subItem) => (
                                                <Link
                                                    key={subItem.name}
                                                    to={subItem.href}
                                                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                                                    onClick={() =>
                                                        setOpenDropdown(null)
                                                    }
                                                >
                                                    {subItem.name}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                            </div>
                        ))}
                    </nav>

                    {/* Right Side Actions */}
                    <div className="flex items-center space-x-4">
                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="lg:hidden p-2 text-blue-100 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
                        >
                            {isMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="lg:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 bg-blue-800 rounded-xl mt-2 shadow-xl">
                            {navigation.map((item) => (
                                <div key={item.name}>
                                    {item.hasDropdown ? (
                                        <div>
                                            <button
                                                onClick={() =>
                                                    setOpenDropdown(
                                                        openDropdown ===
                                                            item.name
                                                            ? null
                                                            : item.name
                                                    )
                                                }
                                                className={`w-full text-left px-3 py-2 rounded-lg text-base font-medium transition-all duration-300 flex items-center justify-between ${
                                                    isActive(item.href)
                                                        ? "bg-white/20 text-white shadow-md backdrop-blur-sm border border-white/20"
                                                        : "text-blue-100 hover:bg-white/10 hover:text-white"
                                                }`}
                                            >
                                                <span>{item.name}</span>
                                                {openDropdown === item.name ? (
                                                    <ChevronUp className="h-4 w-4" />
                                                ) : (
                                                    <ChevronDown className="h-4 w-4" />
                                                )}
                                            </button>
                                            {openDropdown === item.name && (
                                                <div className="ml-4 mt-1 space-y-1">
                                                    {item.submenu.map(
                                                        (subItem) => (
                                                            <Link
                                                                key={
                                                                    subItem.name
                                                                }
                                                                to={
                                                                    subItem.href
                                                                }
                                                                onClick={() =>
                                                                    setIsMenuOpen(
                                                                        false
                                                                    )
                                                                }
                                                                className="block px-3 py-2 rounded-lg text-sm text-blue-100 hover:bg-white/10 hover:text-white transition-all duration-300"
                                                            >
                                                                {subItem.name}
                                                            </Link>
                                                        )
                                                    )}
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
