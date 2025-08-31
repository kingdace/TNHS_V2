import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { Menu, X, Search } from "lucide-react";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const location = useLocation();
    const searchRef = useRef(null);

    const navigation = [
        { name: "Home", href: "/" },
        { name: "Academics", href: "/academics" },
        { name: "News & Events", href: "/news" },
        { name: "About", href: "/about" },
        { name: "Contact Us", href: "/contact" },
    ];

    const isActive = (path) => {
        if (path === "/" && location.pathname === "/") return true;
        if (path !== "/" && location.pathname.startsWith(path)) return true;
        return false;
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            // Handle search functionality here
            console.log("Searching for:", searchQuery);
            setIsSearchOpen(false);
            setSearchQuery("");
        }
    };

    // Close search bar when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                searchRef.current &&
                !searchRef.current.contains(event.target)
            ) {
                setIsSearchOpen(false);
            }
        };

        if (isSearchOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isSearchOpen]);

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
                            <Link
                                key={item.name}
                                to={item.href}
                                className={`px-4 py-2 rounded font-medium transition-all duration-300 relative group ${
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
                        ))}
                    </nav>

                    {/* Right Side Actions */}
                    <div className="flex items-center space-x-4">
                        {/* Search Section */}
                        <div className="relative" ref={searchRef}>
                            {/* Search Button */}
                            <button
                                onClick={() => setIsSearchOpen(!isSearchOpen)}
                                className="p-2 text-blue-100 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300 group"
                            >
                                <Search className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                            </button>

                            {/* Search Bar */}
                            {isSearchOpen && (
                                <div className="absolute right-0 top-12 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 animate-in slide-in-from-top-2 duration-300">
                                    <form
                                        onSubmit={handleSearch}
                                        className="space-y-3"
                                    >
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                            <input
                                                type="text"
                                                placeholder="Search TNHS website..."
                                                value={searchQuery}
                                                onChange={(e) =>
                                                    setSearchQuery(
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent outline-none transition-all duration-300"
                                                autoFocus
                                            />
                                        </div>
                                        <div className="flex space-x-2">
                                            <Button
                                                type="submit"
                                                className="flex-1 bg-royal-blue hover:bg-blue-700 text-white rounded-lg transition-all duration-300"
                                            >
                                                Search
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() =>
                                                    setIsSearchOpen(false)
                                                }
                                                className="px-4 py-2 border-gray-300 text-gray-600 hover:bg-gray-50 rounded-lg transition-all duration-300"
                                            >
                                                Cancel
                                            </Button>
                                        </div>
                                    </form>
                                </div>
                            )}
                        </div>

                        {/* Enroll Now Button */}
                        <Button
                            asChild
                            className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold px-6 py-2.5 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-0"
                        >
                            <Link to="/admissions">Enroll Now</Link>
                        </Button>

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
                                <Link
                                    key={item.name}
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
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
