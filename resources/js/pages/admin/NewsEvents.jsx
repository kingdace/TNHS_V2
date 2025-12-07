import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../../components/ui/card";
import { Megaphone, Calendar } from "lucide-react";

// Import existing components
import AdminAnnouncements from "./Announcements";
import AdminEvents from "./Events";

const NewsEvents = () => {
    const [activeTab, setActiveTab] = useState("announcements");

    const tabs = [
        {
            id: "announcements",
            title: "School Highlights",
            description: "Manage school highlights and updates",
            icon: Megaphone,
            component: AdminAnnouncements,
        },
        {
            id: "events",
            title: "School Events",
            description: "Manage school calendar and events",
            icon: Calendar,
            component: AdminEvents,
        },
    ];

    const ActiveComponent =
        tabs.find((tab) => tab.id === activeTab)?.component ||
        AdminAnnouncements;

    return (
        <div className="space-y-6">
            {/* Header
            <div className="bg-gradient-to-r from-blue-900 to-blue-700 rounded-xl px-6 py-4 text-white shadow-lg">
                <div>
                    <h1 className="text-2xl font-bold">
                        News & Events Management
                    </h1>
                    <p className="text-blue-100 text-sm mt-0.5">
                        Manage school announcements and calendar events
                    </p>
                </div>
            </div> */}
            {/* Tab Navigation */}
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="border-b border-gray-200/50">
                    <nav className="flex space-x-2 p-2">
                        {tabs.map((tab) => {
                            const IconComponent = tab.icon;
                            const isActive = activeTab === tab.id;

                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex-1 flex flex-col items-center justify-center px-4 py-2 text-center rounded-lg transition-all duration-300 ${
                                        isActive
                                            ? "bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 text-white shadow-lg"
                                            : "bg-white text-gray-600 hover:text-blue-600 hover:bg-blue-50 hover:shadow-md border border-gray-200"
                                    }`}
                                >
                                    <IconComponent
                                        className={`h-4 w-4 mb-1 transition-all duration-300 ${
                                            isActive
                                                ? "text-white drop-shadow-sm"
                                                : "text-blue-500"
                                        }`}
                                    />
                                    <span
                                        className={`text-xs font-bold transition-all duration-300 ${
                                            isActive ? "drop-shadow-sm" : ""
                                        }`}
                                    >
                                        {tab.title}
                                    </span>
                                    <span
                                        className={`text-[10px] mt-0.5 transition-all duration-300 ${
                                            isActive
                                                ? "text-blue-100"
                                                : "text-gray-500"
                                        }`}
                                    >
                                        {tab.description}
                                    </span>
                                </button>
                            );
                        })}
                    </nav>
                </div>

                {/* Tab Content */}
                <div className="p-0 animate-in fade-in duration-300">
                    <ActiveComponent />
                </div>
            </div>
        </div>
    );
};

export default NewsEvents;
