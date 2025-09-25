import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    Calendar,
    MapPin,
    Users,
    Award,
    BookOpen,
    Building,
    Loader2,
} from "lucide-react";
import { historyService } from "../../services/historyService";

const AboutHistory = () => {
    const [content, setContent] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHistoryContent = async () => {
            try {
                setLoading(true);
                const [overviewData, milestonesData, achievementsData] =
                    await Promise.all([
                        historyService.getOverview(),
                        historyService.getMilestones(),
                        historyService.getAchievements(),
                    ]);

                // Structure the data to match the expected format
                setContent({
                    history_overview: overviewData ? [overviewData] : [],
                    history_milestones: milestonesData || [],
                    history_achievements: achievementsData || [],
                    history_legacy: [], // Will be populated when legacy management is implemented
                });
            } catch (error) {
                console.error("Error fetching history content:", error);
                setError("Failed to load history content");
            } finally {
                setLoading(false);
            }
        };

        fetchHistoryContent();
        window.scrollTo(0, 0);
    }, []);

    // Parse milestones from content data
    const getMilestones = () => {
        const milestonesSection = content.history_milestones || [];

        // If no data from API, show sample milestones
        if (milestonesSection.length === 0) {
            return [
                {
                    year: "2003",
                    title: "School Establishment",
                    description:
                        "Taft National High School was officially established through a Memorandum of Agreement signed by then City Mayor Alfonso S. Casurra and City Schools Division Superintendent.",
                    icon: getIconForType("building"),
                },
                {
                    year: "2004",
                    title: "DepEd Recognition",
                    description:
                        "Received DepEd Government Permit R-XIII No. 86 s. 2004, officially recognizing the school as a public educational institution.",
                    icon: getIconForType("award"),
                },
                {
                    year: "2014",
                    title: "K-12 Implementation",
                    description:
                        "Successfully implemented the K-12 curriculum, providing enhanced educational opportunities for students.",
                    icon: getIconForType("book"),
                },
                {
                    year: "2017",
                    title: "Infrastructure Expansion",
                    description:
                        "Completed major infrastructure projects including new classrooms and facilities to accommodate growing student population.",
                    icon: getIconForType("building"),
                },
            ];
        }

        return milestonesSection.map((item) => ({
            year: item.year || "2023",
            title: item.title || "Milestone",
            description: item.description || "",
            icon: getIconForType(item.icon || "building"),
        }));
    };

    // Parse achievements from content data
    const getAchievements = () => {
        const achievementsSection = content.history_achievements || [];

        // If no data from API, show sample achievements
        if (achievementsSection.length === 0) {
            return [
                {
                    title: "Academic Excellence",
                    description:
                        "Consistently achieving high academic performance and maintaining quality education standards for over 20 years.",
                },
                {
                    title: "Community Impact",
                    description:
                        "Serving thousands of students and families in Surigao City, contributing to the development of the local community.",
                },
                {
                    title: "Modern Facilities",
                    description:
                        "Continuously upgrading facilities and infrastructure to provide students with modern learning environments.",
                },
                {
                    title: "Student Success",
                    description:
                        "Producing graduates who excel in various fields and contribute meaningfully to society.",
                },
                {
                    title: "Educational Innovation",
                    description:
                        "Embracing new teaching methods and technologies to enhance the learning experience.",
                },
                {
                    title: "Partnership Development",
                    description:
                        "Building strong partnerships with local government, organizations, and stakeholders for educational advancement.",
                },
            ];
        }

        return achievementsSection.map((item) => ({
            title: item.title || "Achievement",
            description: item.description || "",
        }));
    };

    // Get overview content
    const getOverviewContent = () => {
        const overviewSection = content.history_overview || [];
        if (overviewSection.length > 0) {
            const item = overviewSection[0];
            return {
                title: item.title || "Our History",
                description: item.content || "",
                established: "2003", // Default since we're not storing this separately yet
                location: "Surigao City",
                facts: [
                    "Over 20 years of service",
                    "Thousands of graduates",
                    "K-12 compliant",
                    "Community-centered",
                ],
            };
        }
        return {
            title: "Our History",
            description:
                "A journey of excellence, growth, and commitment to quality education",
            established: "2003",
            location: "Surigao City",
            facts: [
                "Over 20 years of service",
                "Thousands of graduates",
                "K-12 compliant",
                "Community-centered",
            ],
        };
    };

    // Get legacy content
    const getLegacyContent = () => {
        const legacySection = content.history_legacy || [];
        return legacySection.map((item) => {
            const data = JSON.parse(item.content_data || "{}");
            return {
                title: data.title || item.title || "Legacy",
                description: data.description || item.description || "",
                icon: getIconForType(data.icon || "users"),
            };
        });
    };

    const getIconForType = (type) => {
        const iconMap = {
            building: Building,
            award: Award,
            book: BookOpen,
            users: Users,
            calendar: Calendar,
            map: MapPin,
        };
        return iconMap[type] || Building;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 pt-24 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
                    <div className="text-center">
                        <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
                        <p className="text-gray-600">
                            Loading history content...
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 pt-24 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center py-16">
                        <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-6">
                            <span className="text-4xl">❌</span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-600 mb-3">
                            {error}
                        </h3>
                        <p className="text-gray-500 text-lg max-w-md mx-auto mb-8">
                            Unable to load the history content. Please try again
                            later.
                        </p>
                        <Link
                            to="/about"
                            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Back to About
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const overview = getOverviewContent();
    const milestones = getMilestones();
    const achievements = getAchievements();
    const legacyItems = getLegacyContent();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 pt-16 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-8 -mt-5">
                    <h1 className="text-3xl font-bold text-royal-blue mb-2">
                        {overview.title}
                    </h1>
                </div>

                {/* School Overview */}
                <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
                    <div className="grid lg:grid-cols-3 gap-6">
                        {/* Main Content */}
                        <div className="lg:col-span-2">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                                    <Building className="w-4 h-4 text-white" />
                                </div>
                                Foundation & Growth
                            </h2>
                            <div className="bg-gray-50 rounded-lg px-4 py-2 mb-4 max-w-md mx-auto text-center -mt-5">
                                <h4 className="text-xs font-semibold text-gray-800 mb-2">
                                    Key Highlights
                                </h4>
                                <div className="flex flex-wrap justify-center gap-3 text-xs">
                                    <div className="flex items-center gap-1">
                                        <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                                        <span className="text-gray-700">
                                            Years
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                                        <span className="text-gray-700">
                                            Schools
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                                        <span className="text-gray-700">
                                            People
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
                                        <span className="text-gray-700">
                                            Numbers
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <div className="w-3 h-3 bg-indigo-600 rounded-full"></div>
                                        <span className="text-gray-700">
                                            Documents
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Structured Content */}
                            <div className="space-y-6">
                                {overview.description ? (
                                    <div className="prose prose-lg max-w-none">
                                        {overview.description
                                            .split("\n\n")
                                            .map((paragraph, index) => (
                                                <p
                                                    key={index}
                                                    className="text-gray-600 leading-relaxed mb-6 text-justify"
                                                >
                                                    {paragraph
                                                        .trim()
                                                        .split(".")
                                                        .map(
                                                            (
                                                                sentence,
                                                                sentenceIndex,
                                                                sentences
                                                            ) => {
                                                                const trimmedSentence =
                                                                    sentence.trim();
                                                                if (
                                                                    !trimmedSentence
                                                                )
                                                                    return null;

                                                                // Highlight important parts
                                                                const highlightedSentence =
                                                                    trimmedSentence
                                                                        .replace(
                                                                            /\b(2003|2004|2005|2006|2007|2014|2015|2016|2017)\b/g,
                                                                            '<span class="font-bold text-blue-600">$1</span>'
                                                                        )
                                                                        .replace(
                                                                            /\b(Taft National High School|Surigao City National High School|MEMCES|Mariano Espina Memorial Central Elementary School)\b/g,
                                                                            '<span class="font-semibold text-green-600">$1</span>'
                                                                        )
                                                                        .replace(
                                                                            /\b(Mrs\. Vilma L\. Gorgonio|Mrs\. Jennefer L\. Natonio|Mrs\. Lany G\. Petallar|Mr\. Manuel B\. Dayondon|Mrs\. Marichi P\. Higayon|Mrs\. Norma Morales|Mr\. Bel T\. Cencia|Mr\. Alejandro O\. Ignalig|Mrs\. Maria B\. Meñoza|Mayor Casurra)\b/g,
                                                                            '<span class="font-semibold text-purple-600">$1</span>'
                                                                        )
                                                                        .replace(
                                                                            /\b(206 students|1,080 students|38 teachers|8 teachers|9 buildings|11 classrooms|19,915\.33 sqm)\b/g,
                                                                            '<span class="font-bold text-orange-600">$1</span>'
                                                                        )
                                                                        .replace(
                                                                            /\b(DepEd Government Permit|R-XIII|No\. 86 s\. 2004)\b/g,
                                                                            '<span class="font-semibold text-indigo-600">$1</span>'
                                                                        );

                                                                return (
                                                                    <span
                                                                        key={
                                                                            sentenceIndex
                                                                        }
                                                                        dangerouslySetInnerHTML={{
                                                                            __html:
                                                                                highlightedSentence +
                                                                                (sentenceIndex <
                                                                                sentences.length -
                                                                                    1
                                                                                    ? "."
                                                                                    : ""),
                                                                        }}
                                                                    />
                                                                );
                                                            }
                                                        )}
                                                </p>
                                            ))}
                                    </div>
                                ) : (
                                    <div className="text-gray-600 leading-relaxed text-justify">
                                        <p className="mb-6">
                                            <span className="font-semibold text-green-600">
                                                Taft National High School
                                            </span>{" "}
                                            has a rich history of educational
                                            excellence, serving the community
                                            with dedication and commitment to
                                            quality education.
                                        </p>
                                        <p className="mb-6">
                                            From our humble beginnings to
                                            becoming a cornerstone of education
                                            in{" "}
                                            <span className="font-semibold text-green-600">
                                                Surigao City
                                            </span>
                                            , we continue to shape the future of
                                            our students and community.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Quick Facts Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-5 sticky top-8">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <Award className="w-4 h-4 text-blue-600" />
                                    Quick Facts
                                </h3>

                                {/* Key Stats */}
                                <div className="space-y-3 mb-4">
                                    <div className="flex items-center space-x-3 p-2 bg-white rounded-lg shadow-sm">
                                        <Calendar className="w-4 h-4 text-blue-600" />
                                        <div>
                                            <div className="font-semibold text-gray-900 text-sm">
                                                Established
                                            </div>
                                            <div className="text-xs text-gray-600">
                                                {overview.established}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3 p-2 bg-white rounded-lg shadow-sm">
                                        <MapPin className="w-4 h-4 text-green-600" />
                                        <div>
                                            <div className="font-semibold text-gray-900 text-sm">
                                                Location
                                            </div>
                                            <div className="text-xs text-gray-600">
                                                {overview.location}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Facts List */}
                                <div className="space-y-2">
                                    <h4 className="font-semibold text-gray-800 text-xs uppercase tracking-wide">
                                        Highlights
                                    </h4>
                                    <ul className="space-y-1.5">
                                        {overview.facts &&
                                        overview.facts.length > 0 ? (
                                            overview.facts.map(
                                                (fact, index) => (
                                                    <li
                                                        key={index}
                                                        className="flex items-start space-x-3 text-sm"
                                                    >
                                                        <div
                                                            className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                                                                index % 2 === 0
                                                                    ? "bg-blue-500"
                                                                    : "bg-green-500"
                                                            }`}
                                                        ></div>
                                                        <span className="text-gray-700">
                                                            {fact}
                                                        </span>
                                                    </li>
                                                )
                                            )
                                        ) : (
                                            <>
                                                <li className="flex items-start space-x-3 text-sm">
                                                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                                    <span className="text-gray-700">
                                                        Over 20 years of service
                                                    </span>
                                                </li>
                                                <li className="flex items-start space-x-3 text-sm">
                                                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                                    <span className="text-gray-700">
                                                        Thousands of graduates
                                                    </span>
                                                </li>
                                                <li className="flex items-start space-x-3 text-sm">
                                                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                                    <span className="text-gray-700">
                                                        K-12 compliant
                                                    </span>
                                                </li>
                                                <li className="flex items-start space-x-3 text-sm">
                                                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                                    <span className="text-gray-700">
                                                        Community-centered
                                                    </span>
                                                </li>
                                            </>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Timeline */}
                <div className="bg-white rounded-2xl shadow-xl p-4 mb-8">
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-3 flex items-center justify-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                                <Calendar className="w-4 h-4 text-white" />
                            </div>
                            Milestones & Achievements
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto text-sm">
                            Our journey through the years, marked by significant
                            achievements and growth milestones
                        </p>
                    </div>

                    <div className="relative">
                        {/* Center line */}
                        <div className="hidden md:block absolute left-1/2 transform -translate-x-0.5 h-full w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-green-500 rounded-full z-0"></div>
                        <div className="md:hidden absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-green-500 rounded-full"></div>

                        <div className="space-y-1 md:space-y-2">
                            {milestones.map((milestone, index) => {
                                const IconComponent = milestone.icon;
                                const isLeft = index % 2 === 0;

                                return (
                                    <div
                                        key={index}
                                        className={`relative flex items-center ${
                                            isLeft
                                                ? "md:justify-start"
                                                : "md:justify-end md:-mt-12"
                                        } ${index > 0 ? "md:-mt-12" : ""}`}
                                    >
                                        {/* Timeline Dot */}
                                        <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-blue-500 to-green-500 rounded-full border-4 border-white shadow-lg z-30 flex items-center justify-center">
                                            <div className="w-2 h-2 bg-white rounded-full"></div>
                                        </div>
                                        {/* Mobile Dot */}
                                        <div className="md:hidden absolute left-8 transform -translate-x-1/2 w-5 h-5 bg-gradient-to-r from-blue-500 to-green-500 rounded-full border-3 border-white shadow-md z-10 flex items-center justify-center">
                                            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                                        </div>

                                        {/* Card Content */}
                                        <div
                                            className={`w-full md:w-2/5 ${
                                                isLeft ? "md:pr-0" : "md:pl-0"
                                            }`}
                                        >
                                            <div
                                                className={`
                  ${isLeft ? "bg-blue-50" : "bg-green-50"}
                  border-2 border-gray-100 p-3 rounded-lg shadow-md hover:shadow-lg
                  hover:border-blue-200 hover:-translate-y-1 transition-all duration-300 ml-12 md:ml-0
                  ${isLeft ? "md:translate-x-10" : "md:-translate-x-10"}
                  text-center   /* <-- center all inner content */
                `}
                                            >
                                                <div className="flex flex-col items-center mb-2 space-y-2">
                                                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-md flex items-center justify-center shadow-sm">
                                                        <IconComponent className="w-4 h-4 text-white" />
                                                    </div>
                                                    <div className="text-xl font-bold text-blue-600">
                                                        {milestone.year}
                                                    </div>
                                                </div>

                                                <h4 className="font-bold text-gray-900 mb-1.5 text-sm">
                                                    {milestone.title}
                                                </h4>

                                                <p className="text-gray-600 leading-relaxed text-xs">
                                                    {milestone.description}
                                                </p>

                                                <div className="mt-2 h-0.5 w-12 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-green-500"></div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Achievements */}
                <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-3 flex items-center justify-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                                <Award className="w-4 h-4 text-white" />
                            </div>
                            Our Achievements
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto text-sm">
                            Recognitions and accomplishments that showcase our
                            commitment to excellence
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {achievements.map((achievement, index) => (
                            <div
                                key={index}
                                className="group bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-4 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                            >
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                    <Award className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">
                                    {achievement.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed text-sm">
                                    {achievement.description}
                                </p>

                                {/* Decorative element */}
                                <div className="mt-4 h-1 w-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-full mx-auto"></div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Legacy Section */}
                {legacyItems.length > 0 && (
                    <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl shadow-xl p-6 text-white mb-8">
                        <h2 className="text-2xl font-bold mb-4 text-center">
                            Our Legacy
                        </h2>
                        <div
                            className={`grid md:grid-cols-${Math.min(
                                legacyItems.length,
                                3
                            )} gap-6`}
                        >
                            {legacyItems.map((item, index) => {
                                const IconComponent = item.icon;
                                return (
                                    <div key={index} className="text-center">
                                        <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                                            <IconComponent className="w-7 h-7 text-white" />
                                        </div>
                                        <h3 className="text-lg font-semibold mb-2">
                                            {item.title}
                                        </h3>
                                        <p className="text-blue-100 text-sm">
                                            {item.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Navigation */}
                <div className="flex flex-wrap justify-center gap-3">
                    <Link
                        to="/about"
                        className="inline-flex items-center px-5 py-2.5 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors duration-300 text-sm"
                    >
                        ← Back to About
                    </Link>
                    <Link
                        to="/about/mission"
                        className="inline-flex items-center px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-300 text-sm"
                    >
                        Mission & Vision →
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AboutHistory;
