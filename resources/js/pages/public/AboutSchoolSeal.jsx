import React, { useState, useEffect } from "react";
import {
    Shield,
    BookOpen,
    GraduationCap,
    Star,
    Globe,
    Users,
    Flame,
    Key,
    Sun,
    MapPin,
    Calendar,
    Award,
    Zap,
    Heart,
    AlertCircle,
} from "lucide-react";

const AboutSchoolSeal = () => {
    const [sealInfo, setSealInfo] = useState([]);
    const [symbolicElements, setSymbolicElements] = useState([]);
    const [coreValues, setCoreValues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Icon mapping for dynamic rendering
    const iconMap = {
        Flame,
        Key,
        BookOpen,
        Sun,
        Shield,
        MapPin,
        Star,
        Heart,
        Users,
        Zap,
        Globe,
        Award,
        GraduationCap,
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                // Fetch all school seal data in parallel
                const [
                    sealInfoResponse,
                    symbolicElementsResponse,
                    coreValuesResponse,
                ] = await Promise.all([
                    fetch("/api/school-seal-info/public"),
                    fetch("/api/school-seal-symbolic-elements/public"),
                    fetch("/api/school-seal-core-values/public"),
                ]);

                if (
                    !sealInfoResponse.ok ||
                    !symbolicElementsResponse.ok ||
                    !coreValuesResponse.ok
                ) {
                    throw new Error("Failed to fetch school seal data");
                }

                const [sealInfoData, symbolicElementsData, coreValuesData] =
                    await Promise.all([
                        sealInfoResponse.json(),
                        symbolicElementsResponse.json(),
                        coreValuesResponse.json(),
                    ]);

                if (
                    sealInfoData.success &&
                    symbolicElementsData.success &&
                    coreValuesData.success
                ) {
                    setSealInfo(sealInfoData.data || []);
                    setSymbolicElements(symbolicElementsData.data || []);
                    setCoreValues(coreValuesData.data || []);
                } else {
                    throw new Error("Invalid response format");
                }
            } catch (err) {
                console.error("Error fetching school seal data:", err);
                setError(
                    "Failed to load school seal information. Please try again later."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Helper function to get icon component
    const getIconComponent = (iconName) => {
        return iconMap[iconName] || Shield;
    };

    // Helper function to get seal info by type
    const getSealInfoByType = (type) => {
        return sealInfo.find((item) => item.info_type === type);
    };

    // Get the seal image
    const sealImage = getSealInfoByType("seal_image");
    // Get school identity
    const schoolIdentity = getSealInfoByType("school_identity");
    // Get motto
    const motto = getSealInfoByType("motto");

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center">
                <div className="text-center bg-white rounded-2xl p-12 shadow-xl border-4 border-royal-blue">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-royal-blue mx-auto mb-6"></div>
                    <h2 className="text-2xl font-bold text-royal-blue mb-2 font-display">
                        Loading School Seal Information
                    </h2>
                    <p className="text-gray-600">
                        Please wait while we load the official school seal
                        details...
                    </p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center">
                <div className="text-center max-w-md mx-auto bg-white rounded-2xl p-8 shadow-xl border-4 border-red-500">
                    <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4 font-display">
                        Error Loading Content
                    </h2>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-royal-blue hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
            {/* Professional Header with Navy Blue Border */}
            <div className="bg-white border-t-8 border-royal-blue shadow-lg">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* School Seal Image at the very top */}
                    <div className="text-center py-12">
                        <div className="relative inline-block">
                            {/* Navy Blue Border Frame */}
                            <div className="absolute -inset-4 bg-gradient-to-r from-royal-blue to-blue-900 rounded-full opacity-20"></div>
                            <div className="relative bg-white p-6 rounded-full shadow-xl border-4 border-royal-blue">
                                {sealImage?.image_path ? (
                                    <img
                                        src={sealImage.image_path}
                                        alt={sealImage.title || "School Seal"}
                                        className="w-48 h-48 mx-auto object-contain"
                                    />
                                ) : (
                                    <div className="w-48 h-48 bg-gradient-to-br from-blue-50 to-blue-100 rounded-full flex items-center justify-center mx-auto border-2 border-royal-blue">
                                        <Shield className="w-24 h-24 text-royal-blue" />
                                    </div>
                                )}
                            </div>
                        </div>
                        <h1 className="text-4xl font-bold text-royal-blue mt-6 mb-2 font-display">
                            School Seal
                        </h1>
                        <div className="w-24 h-1 bg-gradient-to-r from-royal-blue to-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-700 text-lg font-medium max-w-2xl mx-auto">
                            {sealImage?.content || "Official School Seal"}
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* School Identity */}
                {schoolIdentity && (
                    <div className="text-center mb-16 bg-white rounded-2xl p-8 shadow-xl border-l-8 border-royal-blue relative overflow-hidden">
                        {/* Decorative Navy Blue Corner */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-royal-blue to-blue-900 opacity-10 rounded-bl-full"></div>
                        <div className="relative">
                            <h2 className="text-3xl font-bold text-royal-blue mb-4 font-display">
                                {schoolIdentity.title || "School Identity"}
                            </h2>
                            {schoolIdentity.subtitle && (
                                <div className="mb-6">
                                    <p className="text-2xl text-royal-blue font-bold italic">
                                        "{schoolIdentity.subtitle}"
                                    </p>
                                    <div className="w-16 h-1 bg-gradient-to-r from-royal-blue to-blue-600 mx-auto mt-2"></div>
                                </div>
                            )}
                            <p className="text-gray-700 text-lg max-w-4xl mx-auto leading-relaxed">
                                {schoolIdentity.content}
                            </p>
                        </div>
                    </div>
                )}

                {/* School Motto */}
                {motto && (
                    <div className="text-center mb-16 bg-gradient-to-br from-white to-blue-50 rounded-2xl p-8 shadow-xl border-4 border-royal-blue relative">
                        {/* Navy Blue Accent Lines */}
                        <div className="absolute top-4 left-4 w-12 h-1 bg-royal-blue rounded-full"></div>
                        <div className="absolute top-4 right-4 w-12 h-1 bg-royal-blue rounded-full"></div>
                        <div className="absolute bottom-4 left-4 w-12 h-1 bg-royal-blue rounded-full"></div>
                        <div className="absolute bottom-4 right-4 w-12 h-1 bg-royal-blue rounded-full"></div>

                        <h3 className="text-2xl font-bold text-royal-blue mb-6 font-display">
                            {motto.title || "School Motto"}
                        </h3>
                        {motto.subtitle && (
                            <div className="mb-6">
                                <p className="text-3xl font-bold text-royal-blue italic">
                                    "{motto.subtitle}"
                                </p>
                                <div className="w-20 h-1 bg-gradient-to-r from-royal-blue to-blue-600 mx-auto mt-3"></div>
                            </div>
                        )}
                        <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed">
                            {motto.content}
                        </p>
                    </div>
                )}

                {/* Symbolic Elements */}
                {symbolicElements.length > 0 && (
                    <div className="mb-16">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-royal-blue mb-4 font-display">
                                Symbolic Elements of Our School Seal
                            </h2>
                            <div className="w-32 h-1 bg-gradient-to-r from-royal-blue to-blue-600 mx-auto mb-6"></div>
                            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                                Each element of our school seal carries deep
                                meaning and represents our values
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {symbolicElements.map((element) => {
                                const IconComponent = getIconComponent(
                                    element.icon
                                );
                                return (
                                    <div
                                        key={element.id}
                                        className="bg-white border-2 border-royal-blue rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
                                    >
                                        {/* Navy Blue Accent */}
                                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-royal-blue to-blue-600"></div>

                                        <div className="flex items-center mb-6">
                                            <div className="w-16 h-16 bg-gradient-to-br from-royal-blue to-blue-900 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                                                {element.emoji ? (
                                                    <span className="text-3xl">
                                                        {element.emoji}
                                                    </span>
                                                ) : (
                                                    <IconComponent className="w-8 h-8 text-white" />
                                                )}
                                            </div>
                                            <h3 className="text-xl font-bold text-royal-blue font-display">
                                                {element.name}
                                            </h3>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-royal-blue">
                                                <p className="text-gray-700 font-medium">
                                                    <span className="text-royal-blue font-bold">
                                                        Meaning:
                                                    </span>{" "}
                                                    {element.meaning}
                                                </p>
                                            </div>
                                            <div className="bg-slate-50 rounded-lg p-4 border-l-4 border-blue-600">
                                                <p className="text-gray-700 font-medium">
                                                    <span className="text-blue-600 font-bold">
                                                        Interpretation:
                                                    </span>{" "}
                                                    {element.interpretation}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* School Values */}
                {coreValues.length > 0 && (
                    <div className="bg-white border-4 border-royal-blue rounded-2xl p-8 shadow-xl relative overflow-hidden">
                        {/* Navy Blue Header */}
                        <div className="bg-gradient-to-r from-royal-blue to-blue-900 text-white py-6 px-8 rounded-t-xl -mx-8 -mt-8 mb-8">
                            <h2 className="text-3xl font-bold text-center font-display">
                                Our Core Values
                            </h2>
                            <div className="w-24 h-1 bg-white mx-auto mt-3 rounded-full"></div>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {coreValues.map((value) => {
                                const IconComponent = getIconComponent(
                                    value.icon
                                );
                                return (
                                    <div
                                        key={value.id}
                                        className="text-center group"
                                    >
                                        <div className="relative mb-6">
                                            <div
                                                className={`w-20 h-20 bg-gradient-to-br ${
                                                    value.color ||
                                                    "from-royal-blue to-blue-600"
                                                } rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105`}
                                            >
                                                <IconComponent className="w-10 h-10 text-white" />
                                            </div>
                                            {/* Navy Blue Accent Ring */}
                                            <div className="absolute -inset-2 border-2 border-royal-blue rounded-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                                        </div>
                                        <h3 className="text-xl font-bold text-royal-blue mb-3 font-display">
                                            {value.name}
                                        </h3>
                                        <p className="text-gray-700 leading-relaxed">
                                            {value.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Navy Blue Footer Accent */}
                        <div className="mt-8 pt-6 border-t-2 border-royal-blue">
                            <div className="text-center">
                                <p className="text-royal-blue font-semibold text-lg">
                                    "These values guide us in everything we do"
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AboutSchoolSeal;
