import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Home, ChevronDown, ChevronUp } from "lucide-react";

const Faculties = () => {
    const [openDropdown, setOpenDropdown] = useState(null);

    const toggleDropdown = (grade) => {
        setOpenDropdown(openDropdown === grade ? null : grade);
    };

    const gradeLevels = {
        "Grade 7": {
            count: 6,
            color: "blue",
            teachers: [
                {
                    name: "APRILROSE M. ARANA",
                    rank: "Teacher III",
                    section: "Grade 7 - Rodriguez",
                },
                {
                    name: "NOLYN A. ASIS",
                    rank: "Teacher I",
                    section: "Grade 7 - Padolina",
                },
                {
                    name: "ANELYN M. BOLONGAITA",
                    rank: "Teacher I",
                    section: "Grade 7 - Zara",
                },
                {
                    name: "MARJORIE C. MONDOÑEDO",
                    rank: "Teacher I",
                    section: "Grade 7 - Escuro",
                },
                {
                    name: "CHARIS N. PENDULAS",
                    rank: "Teacher III",
                    section: "Grade 7 - Galileo",
                },
                {
                    name: "EVELYN D. SECLON",
                    rank: "Master Teacher I",
                    section: "Grade 7 - Flores",
                },
            ],
        },
        "Grade 8": { count: 5, color: "green" },
        "Grade 9": { count: 4, color: "orange" },
        "Grade 10": { count: 3, color: "purple" },
        "Grade 11": { count: 4, color: "indigo" },
        "Grade 12": { count: 3, color: "pink" },
    };

    const getColorClasses = (color) => {
        const colors = {
            blue: "from-blue-100 to-blue-200",
            green: "from-green-100 to-green-200",
            orange: "from-orange-100 to-orange-200",
            purple: "from-purple-100 to-purple-200",
            indigo: "from-indigo-100 to-indigo-200",
            pink: "from-pink-100 to-pink-200",
        };
        return colors[color] || colors.blue;
    };

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Breadcrumbs */}
                <nav className="mb-8">
                    <div className="flex items-center space-x-4 text-lg text-gray-600">
                        <Link
                            to="/"
                            className="hover:text-blue-600 transition-colors duration-200 flex items-center"
                        >
                            <Home className="h-5 w-5 mr-1" />
                            HOME
                        </Link>
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                        <Link
                            to="/about"
                            className="hover:text-blue-600 transition-colors duration-200"
                        >
                            ABOUT
                        </Link>
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                        <span className="text-gray-900 font-bold">
                            FACULTIES
                        </span>
                    </div>
                </nav>

                {/* Main Title */}
                <div className="text-center mb-12">
                    <div className="relative inline-block">
                        <div className="absolute -inset-4 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-full blur-lg opacity-50"></div>
                        <h1 className="relative text-5xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                            FACULTIES
                        </h1>
                    </div>
                    <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto rounded-full"></div>
                </div>

                {/* Unified Content Table */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="grid lg:grid-cols-2 gap-0">
                        {/* Left Column - Mission Statement */}
                        <div className="relative bg-gradient-to-br from-purple-50 to-indigo-50 p-8 border-r border-gray-200">
                            <div className="absolute top-4 left-4 w-2 h-16 bg-gradient-to-b from-purple-500 to-indigo-500 rounded-full"></div>
                            <div className="pl-6">
                                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                                    FAR MORE THAN BUILDINGS AND RESOURCES AND
                                    CAMPUS GROUNDS, TAFT NHS IS PEOPLE.
                                </h2>
                                <p className="text-gray-700 text-lg leading-relaxed">
                                    Eager and motivated students, skilled and
                                    caring faculty, and dedicated staff and
                                    administrators enable the School to fulfill
                                    its mission of educating students in mind,
                                    body, and spirit.
                                </p>
                            </div>
                        </div>

                        {/* Right Column - Call to Action */}
                        <div className="relative bg-gradient-to-br from-orange-50 to-yellow-50 p-8">
                            <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full opacity-20"></div>
                            <h3 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent mb-4">
                                INTERESTED IN JOINING OUR TEAM?
                            </h3>
                            <p className="text-orange-600 hover:text-orange-700 cursor-pointer underline font-medium transition-colors duration-200">
                                Learn More About Opportunities and Building a
                                Career at Taft NHS!
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Teacher Profile Cards Section with Dropdowns */}
            <div className="mt-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="relative inline-block">
                            <div className="absolute -inset-2 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-full blur-md opacity-60"></div>
                            <h2 className="relative text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                                Our Teaching Faculty
                            </h2>
                        </div>
                        <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto rounded-full"></div>
                    </div>

                    {/* Grade Level Dropdowns */}
                    <div className="space-y-6">
                        {Object.entries(gradeLevels).map(([grade, data]) => (
                            <div
                                key={grade}
                                className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300"
                            >
                                {/* Dropdown Header */}
                                <button
                                    onClick={() => toggleDropdown(grade)}
                                    className="w-full flex items-center justify-between p-8 text-left hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 transition-all duration-300"
                                >
                                    <div className="flex items-center space-x-4">
                                        <div
                                            className={`w-4 h-4 rounded-full bg-gradient-to-r ${getColorClasses(
                                                data.color
                                            )
                                                .replace("from-", "from-")
                                                .replace("to-", "to-")}`}
                                        ></div>
                                        <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent flex items-center">
                                            {grade} Teachers
                                            <span className="ml-4 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-semibold rounded-full shadow-lg">
                                                {data.count} Teachers
                                            </span>
                                        </h3>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div
                                            className={`w-8 h-8 rounded-full bg-gradient-to-r ${getColorClasses(
                                                data.color
                                            )
                                                .replace("from-", "from-")
                                                .replace(
                                                    "to-",
                                                    "to-"
                                                )} flex items-center justify-center`}
                                        >
                                            {openDropdown === grade ? (
                                                <ChevronUp className="h-5 w-5 text-white" />
                                            ) : (
                                                <ChevronDown className="h-5 w-5 text-white" />
                                            )}
                                        </div>
                                    </div>
                                </button>

                                {/* Dropdown Content */}
                                {openDropdown === grade && (
                                    <div className="px-8 pb-8 bg-gradient-to-br from-gray-50 to-purple-50">
                                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                                            {grade === "Grade 7" &&
                                            data.teachers
                                                ? data.teachers.map(
                                                      (teacher, i) => (
                                                          <div
                                                              key={i}
                                                              className="group"
                                                          >
                                                              <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105">
                                                                  <div
                                                                      className={`w-full h-56 bg-gradient-to-br ${getColorClasses(
                                                                          data.color
                                                                      )} flex items-center justify-center relative`}
                                                                  >
                                                                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                                                                  </div>
                                                                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-purple-700 via-purple-600 to-transparent p-4">
                                                                      <h4 className="text-white font-bold text-sm mb-1 leading-tight">
                                                                          {
                                                                              teacher.name
                                                                          }
                                                                      </h4>
                                                                      <p className="text-white/90 text-xs mb-1 font-medium">
                                                                          {
                                                                              teacher.rank
                                                                          }
                                                                      </p>
                                                                      <p className="text-white/80 text-xs">
                                                                          {
                                                                              teacher.section
                                                                          }
                                                                      </p>
                                                                  </div>
                                                              </div>
                                                          </div>
                                                      )
                                                  )
                                                : Array.from(
                                                      { length: data.count },
                                                      (_, i) => (
                                                          <div
                                                              key={i}
                                                              className="group"
                                                          >
                                                              <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105">
                                                                  <div
                                                                      className={`w-full h-56 bg-gradient-to-br ${getColorClasses(
                                                                          data.color
                                                                      )} flex items-center justify-center relative`}
                                                                  >
                                                                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                                                                  </div>
                                                                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-purple-700 via-purple-600 to-transparent p-4">
                                                                      <h4 className="text-white font-bold text-sm mb-1 leading-tight">
                                                                          Teacher{" "}
                                                                          {i +
                                                                              1}
                                                                      </h4>
                                                                      <p className="text-white/90 text-xs font-medium">
                                                                          {
                                                                              grade
                                                                          }{" "}
                                                                          Educator
                                                                      </p>
                                                                  </div>
                                                              </div>
                                                          </div>
                                                      )
                                                  )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Faculties;
