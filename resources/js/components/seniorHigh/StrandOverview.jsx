export default function StrandOverview({ strand }) {
    if (!strand?.strandOverview?.length) return null;

    const getColors = () => {
        switch (strand.id) {
            case "tvl":
                return {
                    bg: "from-yellow-50 to-orange-50",
                    border: "border-yellow-200",
                    icon: "bg-yellow-600",
                    badge: "bg-yellow-500",
                    text: "text-yellow-800",
                };
            case "humss":
                return {
                    bg: "from-blue-50 to-indigo-50",
                    border: "border-blue-200",
                    icon: "bg-blue-600",
                    badge: "bg-blue-500",
                    text: "text-blue-800",
                };
            case "stem":
                return {
                    bg: "from-green-50 to-emerald-50",
                    border: "border-green-200",
                    icon: "bg-green-600",
                    badge: "bg-green-500",
                    text: "text-green-800",
                };
            default:
                return {
                    bg: "from-gray-50 to-gray-100",
                    border: "border-gray-200",
                    icon: "bg-gray-600",
                    badge: "bg-gray-500",
                    text: "text-gray-800",
                };
        }
    };

    const colors = getColors();

    return (
        <div className="mb-6">
            <div
                className={`bg-gradient-to-br ${colors.bg} p-6 rounded-xl shadow-lg border ${colors.border} max-w-md mx-auto`}
            >
                <div className="text-center mb-4">
                    <div
                        className={`w-12 h-12 ${colors.icon} text-white rounded-full flex items-center justify-center mx-auto mb-3`}
                    >
                        <span className="text-xl">{strand.icon}</span>
                    </div>
                    <h4 className={`text-lg font-bold ${colors.text}`}>
                        {strand.shortTitle} Strand Overview
                    </h4>
                </div>
                <div className="space-y-3">
                    {strand.strandOverview.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-center space-x-3"
                        >
                            <span
                                className={`w-6 h-6 ${colors.badge} text-white rounded-full flex items-center justify-center text-sm font-bold`}
                            >
                                {item.number}
                            </span>
                            <span className="text-gray-700 font-medium">
                                {item.text}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
