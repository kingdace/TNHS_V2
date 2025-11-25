import React, { useEffect } from "react";
import Breadcrumb from "../../components/ui/Breadcrumb";
import JHSProgramSection from "../../components/JHSProgramSection";

const AcademicsJuniorHigh = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const breadcrumbItems = [
        { label: "Academics", href: "/academics" },
        { label: "Junior High School" },
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Breadcrumb */}
            <Breadcrumb items={breadcrumbItems} />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* JHS Program Section */}
                <JHSProgramSection />
            </div>
        </div>
    );
};

export default AcademicsJuniorHigh;
