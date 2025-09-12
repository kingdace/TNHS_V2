import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import LoadingSpinner from "./LoadingSpinner";

const LoginRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Only redirect if we're not loading and user is authenticated
        if (!loading && isAuthenticated) {
            const from = location.state?.from?.pathname || "/admin";
            navigate(from, { replace: true });
        }
    }, [isAuthenticated, loading, navigate, location]);

    // Show loading while checking authentication
    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="mx-auto h-16 w-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center shadow-lg mb-4">
                        <svg
                            className="h-8 w-8 text-white animate-pulse"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                            />
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        Taft National High School
                    </h3>
                    <p className="text-sm text-gray-600">
                        Verifying access credentials...
                    </p>
                    <div className="mt-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    </div>
                </div>
            </div>
        );
    }

    // Don't render children if authenticated (redirect will happen)
    if (isAuthenticated) {
        return null;
    }

    // Render login form for unauthenticated users
    return children;
};

export default LoginRoute;
