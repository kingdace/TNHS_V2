export default function CareerGuideIntro({ strand }) {
    if (!strand?.careerGuideIntro) return null;

    const getBorderColor = () => {
        switch (strand.id) {
            case "tvl":
                return "border-yellow-500";
            case "humss":
                return "border-blue-500";
            case "stem":
                return "border-green-500";
            default:
                return "border-gray-500";
        }
    };

    return (
        <div
            className={`bg-white p-4 rounded-lg shadow-sm border-l-4 ${getBorderColor()}`}
        >
            <p className="text-gray-700 text-base leading-relaxed font-medium">
                {strand.careerGuideIntro}
            </p>
        </div>
    );
}
