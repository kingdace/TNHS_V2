import React from "react";
import { Calendar, Clock } from "lucide-react";

const Events = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="max-w-7xl mx-auto">
                    {/* Header Section */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-royal-blue mb-2">
                            School Events
                        </h1>
                        <div className="w-24 h-1 bg-gradient-to-r from-royal-blue to-blue-600 rounded-full mx-auto"></div>
                    </div>

                    {/* Coming Soon Message */}
                    <div className="text-center py-16">
                        <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Calendar className="h-12 w-12 text-gray-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-600 mb-3">
                            Events Coming Soon
                        </h3>
                        <p className="text-gray-500 text-lg max-w-md mx-auto">
                            The school events page is currently under
                            development. Please check back later for upcoming
                            school events and activities.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Events;
