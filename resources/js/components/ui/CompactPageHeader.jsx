import React from "react";

const CompactPageHeader = ({
    icon: Icon,
    title,
    subtitle,
    breadcrumb = "Taft National High School",
    gradient = "from-blue-600 to-indigo-600",
    bgPattern = "from-blue-50 to-indigo-50",
}) => {
    return (
        <div
            className={`relative bg-gradient-to-br ${bgPattern} border-b border-gray-200 py-12`}
        >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='27' cy='7' r='1'/%3E%3Ccircle cx='47' cy='7' r='1'/%3E%3Ccircle cx='7' cy='27' r='1'/%3E%3Ccircle cx='27' cy='27' r='1'/%3E%3Ccircle cx='47' cy='27' r='1'/%3E%3Ccircle cx='7' cy='47' r='1'/%3E%3Ccircle cx='27' cy='47' r='1'/%3E%3Ccircle cx='47' cy='47' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                ></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    {/* Breadcrumb Badge */}
                    <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 mb-4 shadow-sm border border-white/20">
                        <Icon className="w-4 h-4 text-blue-600" />
                        <span className="text-blue-800 font-medium text-sm">
                            {breadcrumb}
                        </span>
                    </div>

                    {/* Title */}
                    <h1
                        className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent mb-4`}
                    >
                        {title}
                    </h1>

                    {/* Subtitle */}
                    <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        {subtitle}
                    </p>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-transparent rounded-full -translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-indigo-400/10 to-transparent rounded-full translate-x-20 translate-y-20"></div>
        </div>
    );
};

export default CompactPageHeader;
