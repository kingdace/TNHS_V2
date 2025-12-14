import React, { createContext, useState, useEffect, useContext } from "react";
import themeService from "../services/themeService";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(null);
    const [loading, setLoading] = useState(true);

    // Load theme from localStorage or fetch from API
    useEffect(() => {
        const loadTheme = async () => {
            try {
                // Try to get cached theme from localStorage
                const cachedTheme = localStorage.getItem("active_theme");

                if (cachedTheme) {
                    setTheme(JSON.parse(cachedTheme));
                }

                // Fetch fresh theme from API
                const activeTheme = await themeService.getActiveTheme();

                if (activeTheme) {
                    setTheme(activeTheme);
                    localStorage.setItem(
                        "active_theme",
                        JSON.stringify(activeTheme)
                    );
                }
            } catch (error) {
                console.error("Error loading theme:", error);
                // Use default theme as fallback
                const defaultTheme = {
                    id: 1,
                    name: "Royal Blue",
                    slug: "royal-blue",
                    colors: {
                        primary: "#1e3a8a",
                        secondary: "#3b82f6",
                        gradient_from: "#1e3a8a",
                        gradient_via: "#1e40af",
                        gradient_to: "#4338ca",
                        accent: "#fbbf24",
                        text_light: "#e0e7ff",
                        text_lighter: "#bfdbfe",
                        hover: "#2563eb",
                    },
                };
                setTheme(defaultTheme);
                localStorage.setItem(
                    "active_theme",
                    JSON.stringify(defaultTheme)
                );
            } finally {
                setLoading(false);
            }
        };

        loadTheme();
    }, []);

    // Function to refresh theme (call after admin changes theme)
    const refreshTheme = async () => {
        try {
            const activeTheme = await themeService.getActiveTheme();
            if (activeTheme) {
                setTheme(activeTheme);
                localStorage.setItem(
                    "active_theme",
                    JSON.stringify(activeTheme)
                );
            }
        } catch (error) {
            console.error("Error refreshing theme:", error);
        }
    };

    const value = {
        theme,
        loading,
        refreshTheme,
    };

    return (
        <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    );
};

// Custom hook to use theme
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};

export default ThemeContext;
