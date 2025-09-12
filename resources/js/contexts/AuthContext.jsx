import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Check authentication status on mount
    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            const response = await fetch("/api/user", {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN":
                        document
                            .querySelector('meta[name="csrf-token"]')
                            ?.getAttribute("content") || "",
                },
            });

            if (response.ok) {
                const userData = await response.json();
                setUser(userData);
                setIsAuthenticated(!!userData);
            } else {
                setUser(null);
                setIsAuthenticated(false);
            }
        } catch (error) {
            console.error("Auth check failed:", error);
            setUser(null);
            setIsAuthenticated(false);
        } finally {
            // Add a small delay to prevent flash of content
            setTimeout(() => {
                setLoading(false);
            }, 100);
        }
    };

    const login = async (credentials) => {
        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN":
                        document
                            .querySelector('meta[name="csrf-token"]')
                            ?.getAttribute("content") || "",
                },
                credentials: "include",
                body: JSON.stringify(credentials),
            });

            if (response.ok) {
                await checkAuthStatus();
                return { success: true };
            } else {
                const data = await response.json();
                return {
                    success: false,
                    errors: data.errors || { message: "Login failed" },
                };
            }
        } catch (error) {
            console.error("Login error:", error);
            return {
                success: false,
                errors: { message: "An error occurred during login" },
            };
        }
    };

    const logout = async () => {
        try {
            await fetch("/api/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN":
                        document
                            .querySelector('meta[name="csrf-token"]')
                            ?.getAttribute("content") || "",
                },
                credentials: "include",
            });
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            setUser(null);
            setIsAuthenticated(false);
        }
    };

    const isAdmin = () => {
        return user && user.is_admin && user.is_active;
    };

    const value = {
        user,
        isAuthenticated,
        loading,
        login,
        logout,
        isAdmin,
        checkAuthStatus,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};
