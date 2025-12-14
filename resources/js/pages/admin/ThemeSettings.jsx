import React, { useState, useEffect } from "react";
import { adminService } from "../../services/adminService";
import { useTheme } from "../../contexts/ThemeContext";
import { Check, Palette, Loader2 } from "lucide-react";

const ThemeSettings = () => {
    const [themes, setThemes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activating, setActivating] = useState(null);
    const { theme: currentTheme, refreshTheme } = useTheme();

    useEffect(() => {
        fetchThemes();
    }, []);

    const fetchThemes = async () => {
        try {
            setLoading(true);
            const data = await adminService.getThemes();
            setThemes(data);
        } catch (error) {
            console.error("Error fetching themes:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleActivateTheme = async (themeId) => {
        try {
            setActivating(themeId);
            await adminService.activateTheme(themeId);

            // Refresh theme context
            await refreshTheme();

            // Refresh themes list to update active status
            await fetchThemes();

            // Show success message
            alert(
                "Theme activated successfully! The changes will be visible on the public website."
            );
        } catch (error) {
            console.error("Error activating theme:", error);
            alert("Failed to activate theme. Please try again.");
        } finally {
            setActivating(null);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                    <Palette className="h-6 w-6 text-blue-600" />
                    <h1 className="text-2xl font-bold text-gray-900">
                        Theme Settings
                    </h1>
                </div>
                <p className="text-gray-600">
                    Choose a color theme for the public website's header and
                    footer. Changes apply immediately.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {themes.map((theme) => (
                    <div
                        key={theme.id}
                        className={`relative rounded-lg border-2 overflow-hidden transition-all duration-200 ${
                            theme.is_active
                                ? "border-blue-600 shadow-lg"
                                : "border-gray-200 hover:border-gray-300"
                        }`}
                    >
                        {/* Theme Preview */}
                        <div
                            className="h-32 relative"
                            style={{
                                background: `linear-gradient(to right, ${theme.colors.gradient_from}, ${theme.colors.gradient_via}, ${theme.colors.gradient_to})`,
                            }}
                        >
                            {theme.is_active && (
                                <div className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-md">
                                    <Check className="h-5 w-5 text-blue-600" />
                                </div>
                            )}
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
                                <h3 className="text-white font-bold text-lg">
                                    {theme.name}
                                </h3>
                            </div>
                        </div>

                        {/* Theme Info */}
                        <div className="p-4 bg-white flex flex-col h-48">
                            {/* Description - Fixed height area */}
                            <p className="text-sm text-gray-600 mb-3 h-10 line-clamp-2">
                                {theme.description}
                            </p>

                            {/* Color Swatches */}
                            <div className="flex gap-2 mb-4">
                                <div
                                    className="h-8 w-8 rounded border border-gray-200"
                                    style={{ background: theme.colors.primary }}
                                    title="Primary"
                                />
                                <div
                                    className="h-8 w-8 rounded border border-gray-200"
                                    style={{
                                        background: theme.colors.secondary,
                                    }}
                                    title="Secondary"
                                />
                                <div
                                    className="h-8 w-8 rounded border border-gray-200"
                                    style={{ background: theme.colors.accent }}
                                    title="Accent"
                                />
                            </div>

                            {/* Activate Button - Pushed to bottom */}
                            <button
                                onClick={() => handleActivateTheme(theme.id)}
                                disabled={
                                    theme.is_active || activating === theme.id
                                }
                                className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 mt-auto ${
                                    theme.is_active
                                        ? "bg-blue-600 text-white cursor-default"
                                        : activating === theme.id
                                        ? "bg-gray-100 text-gray-400 cursor-wait"
                                        : "bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                                }`}
                            >
                                {activating === theme.id ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Activating...
                                    </span>
                                ) : theme.is_active ? (
                                    "Active Theme"
                                ) : (
                                    "Activate Theme"
                                )}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Info Box */}
            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">
                    ℹ️ About Themes
                </h3>
                <ul className="text-sm text-blue-800 space-y-1">
                    <li>
                        • Themes only affect the public website's header and
                        footer
                    </li>
                    <li>• The admin panel always uses the blue theme</li>
                    <li>• Changes are visible immediately after activation</li>
                    <li>• Only one theme can be active at a time</li>
                </ul>
            </div>
        </div>
    );
};

export default ThemeSettings;
