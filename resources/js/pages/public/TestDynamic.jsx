import React from "react";
import { useDynamicContent } from "../../hooks/useDynamicContent";
import DynamicContentRenderer from "../../components/dynamic/DynamicContentRenderer";

const TestDynamic = () => {
    const { content: heroContent, loading: heroLoading } = useDynamicContent(
        "home",
        "hero"
    );
    const { content: missionContent, loading: missionLoading } =
        useDynamicContent("home", "mission");
    const { content: featuresContent, loading: featuresLoading } =
        useDynamicContent("home", "features");

    if (heroLoading || missionLoading || featuresLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-xl">Loading dynamic content...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-center mb-8">
                    Dynamic Content Test
                </h1>

                <div className="space-y-8">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4">
                            Hero Content
                        </h2>
                        <DynamicContentRenderer content={heroContent} />
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4">
                            Mission Content
                        </h2>
                        <DynamicContentRenderer content={missionContent} />
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4">
                            Features Content
                        </h2>
                        <DynamicContentRenderer content={featuresContent} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestDynamic;
