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
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="border-b border-gray-200">
                    <nav className="flex space-x-0">
                        {tabs.map((tab) => {
                            const IconComponent = tab.icon;
                            const isActive = activeTab === tab.id;

                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex-1 flex flex-col items-center justify-center px-4 py-4 text-center border-b-2 transition-all duration-200 ${
                                        isActive
                                            ? "border-blue-600 bg-blue-50 text-blue-900"
                                            : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                                    }`}
                                >
                                    <IconComponent
                                        className={`h-5 w-5 mb-2 ${
                                            isActive
                                                ? "text-blue-600"
                                                : "text-gray-400"
                                        }`}
                                    />
                                    <span className="text-sm font-medium">
                                        {tab.title}
                                    </span>
                                    <span className="text-xs mt-1 opacity-75">
                                        {tab.description}
                                    </span>
                                </button>
                            );
                        })}
                    </nav>
                </div>

                {/* Tab Content */}
                <div className="p-0">
                    <ActiveComponent />
                </div>
            </div>
        </div>
    );
};

export default NewsEvents;
