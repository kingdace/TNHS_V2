import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import {
    ArrowLeft,
    BookOpen,
    Download,
    Link as LinkIcon,
    FileText,
    Video,
    Image,
} from "lucide-react";

const MoreResources = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen pt-24 pb-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center mb-8">
                    <Link
                        to="/"
                        className="flex items-center text-royal-blue hover:text-blue-700 transition-colors mr-4"
                    >
                        <ArrowLeft className="h-5 w-5 mr-2" />
                        Back to Home
                    </Link>
                </div>

                <div className="text-center">
                    <BookOpen className="h-16 w-16 text-royal-blue mx-auto mb-6" />
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Resources
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">
                        Educational resources and materials to support student
                        learning and development.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
                            <FileText className="h-12 w-12 text-royal-blue mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                Study Guides
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Comprehensive study materials for all subjects
                            </p>
                            <Button
                                variant="outline"
                                className="border-royal-blue text-royal-blue hover:bg-royal-blue hover:text-white"
                            >
                                Coming Soon
                            </Button>
                        </div>

                        <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
                            <Video className="h-12 w-12 text-royal-blue mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                Video Lessons
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Educational videos and tutorials
                            </p>
                            <Button
                                variant="outline"
                                className="border-royal-blue text-royal-blue hover:bg-royal-blue hover:text-white"
                            >
                                Coming Soon
                            </Button>
                        </div>

                        <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
                            <Image className="h-12 w-12 text-royal-blue mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                Visual Aids
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Charts, diagrams, and visual learning materials
                            </p>
                            <Button
                                variant="outline"
                                className="border-royal-blue text-royal-blue hover:bg-royal-blue hover:text-white"
                            >
                                Coming Soon
                            </Button>
                        </div>
                    </div>

                    <div className="mt-8">
                        <Button
                            asChild
                            className="bg-royal-blue hover:bg-blue-700"
                        >
                            <Link to="/contact">Request Resources</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MoreResources;
