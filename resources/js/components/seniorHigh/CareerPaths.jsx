export default function CareerPaths({ strand }) {
    if (!strand?.careerPaths?.length) return null;

    const getColors = () => {
        switch (strand.id) {
            case "tvl":
                return {
                    badge: "bg-yellow-500",
                    border: "border-yellow-400",
                    skillsText: "text-yellow-700",
                    skillsBg: "bg-yellow-100",
                    skillsIcon: "text-yellow-600",
                    skillsContainer: "bg-yellow-50 border-yellow-200",
                };
            case "humss":
                return {
                    badge: "bg-blue-500",
                    border: "border-blue-400",
                    skillsText: "text-blue-700",
                    skillsBg: "bg-blue-100",
                    skillsIcon: "text-blue-600",
                    skillsContainer: "bg-blue-50 border-blue-200",
                };
            case "stem":
                return {
                    badge: "bg-green-500",
                    border: "border-green-400",
                    skillsText: "text-green-700",
                    skillsBg: "bg-green-100",
                    skillsIcon: "text-green-600",
                    skillsContainer: "bg-green-50 border-green-200",
                };
            default:
                return {
                    badge: "bg-gray-500",
                    border: "border-gray-400",
                    skillsText: "text-gray-700",
                    skillsBg: "bg-gray-100",
                    skillsIcon: "text-gray-600",
                    skillsContainer: "bg-gray-50 border-gray-200",
                };
        }
    };

    const colors = getColors();

    return (
        <>
            {strand.careerPaths.map((path, index) => (
                <details key={path.id || index} className="group">
                    <summary className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-all duration-300 border">
                        <div className="flex items-center space-x-3">
                            <div
                                className={`w-8 h-8 ${colors.badge} text-white rounded-full flex items-center justify-center font-bold text-lg shadow-sm`}
                            >
                                {index + 1}
                            </div>
                            <span className="font-semibold text-gray-800 text-lg">
                                {path.title}
                            </span>
                        </div>
                        <span className="text-gray-600 group-open:rotate-180 transition-transform text-xl">
                            ▼
                        </span>
                    </summary>

                    <div
                        className={`p-6 bg-white border-l-4 ${colors.border} rounded-r-lg mt-2 shadow-sm`}
                    >
                        {/* Skills/Interests Section */}
                        <div className="mb-4">
                            <h5
                                className={`font-bold mb-2 flex items-center ${colors.skillsText}`}
                            >
                                <span
                                    className={`w-6 h-6 ${colors.skillsBg} ${colors.skillsIcon} rounded-full flex items-center justify-center text-sm mr-2`}
                                >
                                    ⚡
                                </span>
                                Skills/Interests:
                            </h5>
                            <div
                                className={`p-3 rounded-lg border ${colors.skillsContainer}`}
                            >
                                <p className="text-gray-700 font-medium">
                                    {path.skills}
                                </p>
                            </div>
                        </div>

                        {/* College Courses Section */}
                        {path.courses?.length > 0 && (
                            <div className="mb-4">
                                <h5 className="font-bold text-green-700 mb-2 flex items-center">
                                    <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm mr-2">
                                        🎓
                                    </span>
                                    College Courses:
                                </h5>
                                <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                                    <ul className="text-gray-700 space-y-2">
                                        {path.courses.map((course, i) => (
                                            <li
                                                key={i}
                                                className="flex items-center"
                                            >
                                                <span className="text-green-500 mr-2 font-bold">
                                                    ✓
                                                </span>
                                                {course}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}

                        {/* Career Matches Section */}
                        {path.careers?.length > 0 && (
                            <div>
                                <h5 className="font-bold text-purple-700 mb-2 flex items-center">
                                    <span className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm mr-2">
                                        💼
                                    </span>
                                    Career Matches:
                                </h5>
                                <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                                    <ul className="text-gray-700 space-y-2">
                                        {path.careers.map((career, i) => (
                                            <li
                                                key={i}
                                                className="flex items-center"
                                            >
                                                <span className="text-purple-500 mr-2 font-bold">
                                                    🚀
                                                </span>
                                                {career}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                </details>
            ))}
        </>
    );
}
