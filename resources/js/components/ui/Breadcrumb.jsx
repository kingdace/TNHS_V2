import React from "react";
import { Link } from "react-router-dom";
import { Home, ChevronRight } from "lucide-react";

const Breadcrumb = ({ items }) => {
    return (
        <div className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center space-x-2 py-4 text-sm">
                    <Link
                        to="/"
                        className="text-blue-600 hover:text-blue-800 flex items-center"
                    >
                        <Home className="h-4 w-4 mr-1" />
                        Home
                    </Link>
                    {items.map((item, index) => (
                        <React.Fragment key={index}>
                            <ChevronRight className="h-4 w-4 text-gray-400" />
                            {item.href ? (
                                <Link
                                    to={item.href}
                                    className="text-blue-600 hover:text-blue-800"
                                >
                                    {item.label}
                                </Link>
                            ) : (
                                <span className="text-gray-700">
                                    {item.label}
                                </span>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Breadcrumb;
