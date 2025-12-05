export default function StrandHeader({ strand }) {
    if (!strand?.headerTitle) return null;

    const getGradient = () => {
        switch (strand.id) {
            case "tvl":
                return "from-yellow-600 to-orange-600";
            case "humss":
                return "from-blue-600 to-indigo-600";
            case "stem":
                return "from-green-600 to-emerald-600";
            default:
                return "from-gray-600 to-gray-700";
        }
    };

    return (
        <div
            className={`bg-gradient-to-r ${getGradient()} text-white py-4 px-6 rounded-xl shadow-lg mb-4`}
        >
            <h3 className="text-2xl font-black uppercase tracking-wide text-center">
                {strand.headerTitle}
            </h3>
        </div>
    );
}
