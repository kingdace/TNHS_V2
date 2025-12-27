import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openDropdowns, setOpenDropdowns] = useState([]);
    const location = useLocation();
    const { theme, loading } = useTheme();

    const toggleDropdown = (menuName) => {
        setOpenDropdowns((prev) =>
            prev.includes(menuName)
                ? prev.filter((name) => name !== menuName)
                : [...prev, menuName]
        );
    };

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
                    name: "ALS Program",
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
                { name: "Mission & Vision", href: "/about/mission" },
                { name: "Our History", href: "/about/history" },
                { name: "School Seal", href: "/about/school-seal" },
                { name: "Privacy Policy", href: "/about/privacy-policy" },
                { name: "Quality Policy", href: "/about/quality-policy" },
                {
                    name: "More",
                    hasNestedDropdown: true,
                    submenu: [
                        {
                            name: "Enrollment Guidelines & Requirements",
                            href: "/admissions/requirements",
                        },
                        { name: "Contact Us", href: "/contact" },
                        { name: "Resources", href: "/more/resources" },
                        { name: "Media Gallery", href: "/gallery" },
                    ],
                },
            ],
        },
        {
            name: "Faculty and Staff",
            href: "/faculty",
        },
        { name: "Principal's Corner", href: "/faculty/principal" },
    ];

    const isActive = (path) => {
        if (path === "/" && location.pathname === "/") return true;
        if (path !== "/" && location.pathname === path) return true;
        return false;
    };

    const isParentActive = (submenu) => {
        if (!submenu) return false;
        return submenu.some((subItem) => location.pathname === subItem.href);
    };

    return (
        <header
            className="shadow-lg sticky top-0 z-50"
            style={{
                background: theme?.colors
                    ? `linear-gradient(to right, ${theme.colors.gradient_from}, ${theme.colors.gradient_via}, ${theme.colors.gradient_to})`
                    : "#1e3a8a",
            }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo and School Name - Always on LEFT */}
                    <div className="flex items-center space-x-2 lg:space-x-3 flex-1">
                        <div className="relative">
                            <div className="h-10 w-10 md:h-12 md:w-12 bg-white rounded-full flex items-center justify-center shadow-lg overflow-hidden">
                                <img
                                    src="/images/Logo.jpg"
                                    alt="TNHS Logo"
                                    className="h-full w-full object-cover rounded-full"
                                />
                            </div>
                        </div>
                        {/* Mobile: Compact school name */}
                        <div className="md:hidden">
                            <h1 className="text-sm font-bold text-white leading-tight">
                                Taft National High School
                            </h1>
                            <p className="text-xs text-blue-100 font-medium">
                                Nueva Ext., Surigao City
                            </p>
                        </div>
                        {/* Desktop: Full school name */}
                        <div className="hidden md:block">
                            <h1 className="text-2xl font-bold text-white">
                                Taft National High School
                            </h1>
                            <p className="text-sm text-blue-100 font-medium">
                                Nueva Ext., Surigao City
                            </p>
                        </div>
                    </div>

                    {/* Mobile: Hamburger Menu (Always on RIGHT) */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-all duration-300"
                    >
                        {isMenuOpen ? (
                            <X className="h-6 w-6" />
                        ) : (
                            <Menu className="h-6 w-6" />
                        )}
                    </button>

                    {/* Desktop Navigation - Hidden on Mobile */}
                    <nav className="hidden lg:flex items-center space-x-1 ml-2">
                        {navigation.map((item) => (
                            <div key={item.name} className="relative group">
                                {item.hasDropdown ? (
                                    item.name === "Academics" ? (
                                        // Academics: Clickable text (navigate to overview page only)
                                        <Link
                                            to={item.href}
                                            className={`px-4 py-2 rounded font-medium transition-all duration-300 ${
                                                isActive(item.href)
                                                    ? "bg-white/20 text-white"
                                                    : "text-blue-100 hover:bg-white/10 hover:text-white"
                                            }`}
                                        >
                                            {item.name}
                                        </Link>
                                    ) : (
                                        // Other dropdowns: Dropdown only (not clickable to main page)
                                        <div
                                            className={`px-4 py-2 rounded font-medium transition-all duration-300 flex items-center space-x-1 ${
                                                isParentActive(item.submenu)
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
                                        {item.submenu.map((subItem) =>
                                            subItem.hasNestedDropdown ? (
                                                <div
                                                    key={subItem.name}
                                                    className="relative group/nested"
                                                >
                                                    <div className="flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 cursor-pointer">
                                                        <span>
                                                            {subItem.name}
                                                        </span>
                                                        <ChevronRight className="h-4 w-4 text-gray-400" />
                                                    </div>
                                                    {/* Nested Dropdown for "More" */}
                                                    <div className="absolute left-full top-0 ml-1 w-[200px] bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50 opacity-0 invisible group-hover/nested:opacity-100 group-hover/nested:visible transition-all duration-300">
                                                        {subItem.submenu.map(
                                                            (nestedItem) => (
                                                                <Link
                                                                    key={
                                                                        nestedItem.name
                                                                    }
                                                                    to={
                                                                        nestedItem.href
                                                                    }
                                                                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                                                                >
                                                                    {
                                                                        nestedItem.name
                                                                    }
                                                                </Link>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            ) : (
                                                <Link
                                                    key={subItem.name}
                                                    to={subItem.href}
                                                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                                                >
                                                    {subItem.name}
                                                </Link>
                                            )
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>
                </div>

                {/* Mobile Navigation - Sidebar Drawer */}
                {isMenuOpen && (
                    <>
                        {/* Backdrop Overlay */}
                        <div
                            className="lg:hidden fixed inset-0 bg-black/50 z-40"
                            onClick={() => setIsMenuOpen(false)}
                        ></div>

                        {/* Sidebar Drawer - Slides from RIGHT with consistent royal-blue color */}
                        <div
                            className="lg:hidden fixed right-0 top-0 bottom-0 w-[60%] max-w-[280px] backdrop-blur-lg z-50 shadow-2xl overflow-y-auto border-l border-blue-800"
                            style={{
                                background: theme?.colors
                                    ? `linear-gradient(to bottom, ${theme.colors.gradient_from}, ${theme.colors.gradient_via})`
                                    : "#1e3a8a",
                            }}
                        >
                            {/* Close Button at Top - Matches header color */}
                            <div
                                className="p-3 flex justify-end border-b border-blue-700/50"
                                style={{
                                    background: theme?.colors
                                        ? `${theme.colors.primary}F2`
                                        : "#1e3a8aF2",
                                }}
                            >
                                <button
                                    onClick={() => setIsMenuOpen(false)}
                                    className="p-2 text-white hover:bg-white/20 rounded-lg transition-all duration-200 shadow-sm"
                                    aria-label="Close menu"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            {/* Menu Items - White text on royal-blue background */}
                            <nav className="bg-transparent">
                                {navigation.map((item) => (
                                    <div key={item.name}>
                                        {item.hasDropdown ? (
                                            <div>
                                                {/* Parent Menu Item - Clickable */}
                                                <button
                                                    onClick={() =>
                                                        toggleDropdown(
                                                            item.name
                                                        )
                                                    }
                                                    className="w-full flex items-center justify-between px-4 py-3.5 text-left text-white hover:bg-white/20 transition-colors duration-200 border-b border-blue-700/30"
                                                >
                                                    <span className="text-base font-medium">
                                                        {item.name}
                                                    </span>
                                                    <ChevronDown
                                                        className={`h-5 w-5 text-white transition-transform duration-300 ${
                                                            openDropdowns.includes(
                                                                item.name
                                                            )
                                                                ? "rotate-180"
                                                                : ""
                                                        }`}
                                                    />
                                                </button>
                                                {/* Submenu Items - Collapsible */}
                                                {openDropdowns.includes(
                                                    item.name
                                                ) && (
                                                    <div className="bg-blue-800/30">
                                                        {item.submenu.map(
                                                            (subItem) =>
                                                                subItem.hasNestedDropdown ? (
                                                                    <div
                                                                        key={
                                                                            subItem.name
                                                                        }
                                                                    >
                                                                        <button
                                                                            onClick={() =>
                                                                                toggleDropdown(
                                                                                    `${item.name}-${subItem.name}`
                                                                                )
                                                                            }
                                                                            className="w-full flex items-center justify-between pl-10 pr-4 py-3 text-sm font-normal text-blue-100 hover:bg-white/10 hover:text-white transition-all duration-200 border-b border-blue-700/30 border-l-4 border-l-transparent hover:border-l-blue-400"
                                                                        >
                                                                            <span>
                                                                                {
                                                                                    subItem.name
                                                                                }
                                                                            </span>
                                                                            <ChevronDown
                                                                                className={`h-4 w-4 transition-transform duration-300 ${
                                                                                    openDropdowns.includes(
                                                                                        `${item.name}-${subItem.name}`
                                                                                    )
                                                                                        ? "rotate-180"
                                                                                        : ""
                                                                                }`}
                                                                            />
                                                                        </button>
                                                                        {/* Nested submenu */}
                                                                        {openDropdowns.includes(
                                                                            `${item.name}-${subItem.name}`
                                                                        ) && (
                                                                            <div className="bg-blue-900/40">
                                                                                {subItem.submenu.map(
                                                                                    (
                                                                                        nestedItem
                                                                                    ) => (
                                                                                        <Link
                                                                                            key={
                                                                                                nestedItem.name
                                                                                            }
                                                                                            to={
                                                                                                nestedItem.href
                                                                                            }
                                                                                            onClick={() =>
                                                                                                setIsMenuOpen(
                                                                                                    false
                                                                                                )
                                                                                            }
                                                                                            className={`block pl-16 pr-4 py-3 text-xs font-normal transition-all duration-200 border-b border-blue-700/30 border-l-4 ${
                                                                                                isActive(
                                                                                                    nestedItem.href
                                                                                                )
                                                                                                    ? "text-white bg-blue-600/50 border-l-white"
                                                                                                    : "text-blue-100 hover:bg-white/10 hover:text-white border-l-transparent hover:border-l-blue-400"
                                                                                            }`}
                                                                                        >
                                                                                            {
                                                                                                nestedItem.name
                                                                                            }
                                                                                        </Link>
                                                                                    )
                                                                                )}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                ) : (
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
                                                                        className={`block pl-10 pr-4 py-3 text-sm font-normal transition-all duration-200 border-b border-blue-700/30 border-l-4 ${
                                                                            isActive(
                                                                                subItem.href
                                                                            )
                                                                                ? "text-white bg-blue-600/50 border-l-white"
                                                                                : "text-blue-100 hover:bg-white/10 hover:text-white border-l-transparent hover:border-l-blue-400"
                                                                        }`}
                                                                    >
                                                                        {
                                                                            subItem.name
                                                                        }
                                                                    </Link>
                                                                )
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <Link
                                                to={item.href}
                                                onClick={() =>
                                                    setIsMenuOpen(false)
                                                }
                                                className={`block px-4 py-3.5 text-base font-medium transition-colors duration-200 border-b border-blue-700/30 ${
                                                    isActive(item.href)
                                                        ? "text-white bg-blue-600/50"
                                                        : "text-white hover:bg-white/20"
                                                }`}
                                            >
                                                {item.name}
                                            </Link>
                                        )}
                                    </div>
                                ))}
                            </nav>
                        </div>
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;
