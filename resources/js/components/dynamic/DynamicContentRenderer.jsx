import React from 'react';

const DynamicContentRenderer = ({ content, sectionName }) => {
    if (!content || content.length === 0) {
        return null;
    }

    const renderContent = (item) => {
        const data = typeof item.content_data === 'string' 
            ? JSON.parse(item.content_data) 
            : item.content_data;

        switch (item.content_type) {
            case 'hero_section':
                return (
                    <div key={item.id} className="hero-section">
                        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
                            <div className="container mx-auto px-4 text-center">
                                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                                    {data.title}
                                </h1>
                                <p className="text-xl md:text-2xl mb-6 text-blue-100">
                                    {data.subtitle}
                                </p>
                                <p className="text-lg mb-8 max-w-3xl mx-auto">
                                    {data.description}
                                </p>
                                {data.cta_text && data.cta_link && (
                                    <a
                                        href={data.cta_link}
                                        className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                                    >
                                        {data.cta_text}
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                );

            case 'text_content':
                return (
                    <div key={item.id} className="text-content py-12">
                        <div className="container mx-auto px-4 text-center">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                                {data.title}
                            </h2>
                            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                                {data.description}
                            </p>
                        </div>
                    </div>
                );

            case 'feature_list':
                return (
                    <div key={item.id} className="feature-list py-16 bg-gray-50">
                        <div className="container mx-auto px-4">
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                                {data.features?.map((feature, index) => (
                                    <div key={index} className="text-center p-6 bg-white rounded-lg shadow-md">
                                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                {getIcon(feature.icon)}
                                            </svg>
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-800 mb-3">
                                            {feature.title}
                                        </h3>
                                        <p className="text-gray-600">
                                            {feature.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            case 'statistics':
                return (
                    <div key={item.id} className="statistics py-16 bg-blue-600 text-white">
                        <div className="container mx-auto px-4">
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                                {data.stats?.map((stat, index) => (
                                    <div key={index} className="p-6">
                                        <div className="text-4xl md:text-5xl font-bold mb-2">
                                            {stat.value}
                                        </div>
                                        <div className="text-xl text-blue-100">
                                            {stat.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            case 'form_list':
                return (
                    <div key={item.id} className="form-list py-16">
                        <div className="container mx-auto px-4">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                                    {data.title}
                                </h2>
                                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                    {data.description}
                                </p>
                            </div>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {data.forms?.map((form, index) => (
                                    <div key={index} className="bg-white p-6 rounded-lg shadow-md border hover:shadow-lg transition-shadow">
                                        <div className="flex items-start justify-between mb-4">
                                            <h3 className="text-lg font-semibold text-gray-800">
                                                {form.name}
                                            </h3>
                                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                                {form.type}
                                            </span>
                                        </div>
                                        <p className="text-gray-600 mb-4">
                                            {form.description}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-500">
                                                {form.size}
                                            </span>
                                            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                                                Download
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            default:
                return (
                    <div key={item.id} className="default-content">
                        <pre>{JSON.stringify(data, null, 2)}</pre>
                    </div>
                );
        }
    };

    return (
        <div className="dynamic-content">
            {content.map(renderContent)}
        </div>
    );
};

// Helper function to get SVG icons
const getIcon = (iconName) => {
    const icons = {
        'graduation-cap': (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
        ),
        'book-open': (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        ),
        'users': (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a4 4 0 11-8 0 4 4 0 018 0z" />
        ),
        'heart': (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        ),
        'award': (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        )
    };
    
    return icons[iconName] || icons['book-open'];
};

export default DynamicContentRenderer;
