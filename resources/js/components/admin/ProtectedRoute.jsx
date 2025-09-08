import React, { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { adminAuthService } from "../../services/adminAuthService";
import { Loader2 } from "lucide-react";

const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        checkAuthentication();
    }, []);

    const checkAuthentication = async () => {
        try {
            const authData = await adminAuthService.checkAuth();
            setIsAuthenticated(authData.authenticated);
        } catch (error) {
            console.error("Auth check failed:", error);
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
                    <p className="text-gray-600">Checking authentication...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        // Redirect to login page with return url
        return (
            <Navigate to="/admin/login" state={{ from: location }} replace />
        );
    }

    return children;
};

export default ProtectedRoute;
