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
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-royal-blue mx-auto mb-4"></div>
                    <p className="text-gray-600">
                        Loading school seal information...
                    </p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center max-w-md mx-auto p-6">
                    <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        Error Loading Content
                    </h2>
                    <p className="text-gray-600">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            {/* School Seal Image at the very top */}
            <div className="text-center py-8">
                {sealImage?.image_path ? (
                    <img
                        src={sealImage.image_path}
                        alt={sealImage.title || "School Seal"}
                        className="w-48 h-48 mx-auto object-contain"
                    />
                ) : (
                    <div className="w-48 h-48 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                        <Shield className="w-24 h-24 text-gray-400" />
                    </div>
                )}
                <h1 className="text-2xl font-bold text-gray-900 mt-4">
                    School Seal
                </h1>
                <p className="text-gray-600 text-sm mt-2">
                    {sealImage?.content || "Official School Seal"}
                </p>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* School Identity */}
                {schoolIdentity && (
                    <div className="text-center mb-12 bg-gray-50 rounded-xl p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-3">
                            {schoolIdentity.title || "School Identity"}
                        </h2>
                        {schoolIdentity.subtitle && (
                            <p className="text-lg text-royal-blue mb-4 font-semibold">
                                "{schoolIdentity.subtitle}"
                            </p>
                        )}
                        <p className="text-gray-700 text-sm max-w-4xl mx-auto leading-relaxed">
                            {schoolIdentity.content}
                        </p>
                    </div>
                )}

                {/* School Motto */}
                {motto && (
                    <div className="text-center mb-12 bg-white border-2 border-royal-blue rounded-xl p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">
                            {motto.title || "School Motto"}
                        </h3>
                        {motto.subtitle && (
                            <p className="text-2xl font-bold text-royal-blue italic mb-4">
                                "{motto.subtitle}"
                            </p>
                        )}
                        <p className="text-gray-700 text-sm max-w-3xl mx-auto">
                            {motto.content}
                        </p>
                    </div>
                )}

                {/* Symbolic Elements */}
                {symbolicElements.length > 0 && (
                    <div className="mb-12">
                        <h2 className="text-xl font-bold text-gray-900 text-center mb-8 bg-royal-blue text-white py-3 rounded-lg">
                            Symbolic Elements of Our School Seal
                        </h2>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {symbolicElements.map((element) => {
                                const IconComponent = getIconComponent(
                                    element.icon
                                );
                                return (
                                    <div
                                        key={element.id}
                                        className="bg-white border border-gray-200 rounded-lg p-6"
                                    >
                                        <div className="flex items-center mb-4">
                                            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mr-4">
                                                {element.emoji ? (
                                                    <span className="text-2xl">
                                                        {element.emoji}
                                                    </span>
                                                ) : (
                                                    <IconComponent className="w-6 h-6 text-white" />
                                                )}
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900">
                                                {element.name}
                                            </h3>
                                        </div>
                                        <p className="text-gray-600 mb-3">
                                            <strong>Meaning:</strong>{" "}
                                            {element.meaning}
                                        </p>
                                        <p className="text-gray-600">
                                            <strong>Interpretation:</strong>{" "}
                                            {element.interpretation}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* School Values */}
                {coreValues.length > 0 && (
                    <div className="bg-white border-2 border-royal-blue rounded-lg p-6 shadow-lg">
                        <h2 className="text-xl font-bold text-royal-blue text-center mb-6 bg-gray-50 py-3 rounded-lg">
                            Our Core Values
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {coreValues.map((value) => {
                                const IconComponent = getIconComponent(
                                    value.icon
                                );
                                return (
                                    <div key={value.id} className="text-center">
                                        <div
                                            className={`w-16 h-16 bg-gradient-to-r ${
                                                value.color ||
                                                "from-blue-500 to-green-500"
                                            } rounded-full flex items-center justify-center mx-auto mb-4`}
                                        >
                                            <IconComponent className="w-8 h-8 text-white" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                            {value.name}
                                        </h3>
                                        <p className="text-gray-600 text-sm">
                                            {value.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AboutSchoolSeal;
