import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import {
    Calendar,
    ChevronLeft,
    ChevronRight,
    Clock,
    MapPin,
    X,
} from "lucide-react";
import { publicService } from "../../services/publicService";

const EventCalendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [eventsByDay, setEventsByDay] = useState({});
    const [eventsLoading, setEventsLoading] = useState(false);

    // Fetch calendar events when month changes
    useEffect(() => {
        const loadEvents = async () => {
            try {
                setEventsLoading(true);
                const ym = `${currentDate.getFullYear()}-${String(
                    currentDate.getMonth() + 1
                ).padStart(2, "0")}`;
                const events = await publicService.events.getByMonth(ym);
                const map = {};
                events.forEach((ev) => {
                    const start = new Date(ev.start_date);
                    const end = ev.end_date ? new Date(ev.end_date) : start;
                    const cursor = new Date(start);
                    cursor.setHours(0, 0, 0, 0);
                    const last = new Date(end);
                    last.setHours(0, 0, 0, 0);
                    while (cursor <= last) {
                        const key = `${cursor.getFullYear()}-${String(
                            cursor.getMonth() + 1
                        ).padStart(2, "0")}-${String(cursor.getDate()).padStart(
                            2,
                            "0"
                        )}`;
                        if (!map[key]) map[key] = [];
                        map[key].push(ev);
                        cursor.setDate(cursor.getDate() + 1);
                    }
                });
                setEventsByDay(map);
            } catch (e) {
                console.error("Error loading events", e);
                setEventsByDay({});
            } finally {
                setEventsLoading(false);
            }
        };
        loadEvents();
    }, [currentDate]);

    // Calendar Functions
    const getDaysInMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const nextMonth = () => {
        setCurrentDate(
            new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
        );
    };

    const prevMonth = () => {
        setCurrentDate(
            new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
        );
    };

    const handleDateClick = (day) => {
        setSelectedDate(day);
        setShowModal(true);
    };

    return (
        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
            {/* Header */}
            <div className="relative h-12 bg-gradient-to-r from-royal-blue to-blue-600 flex flex-col items-center justify-center text-center text-white">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative">
                    <h4 className="text-lg font-bold">School Event Calendar</h4>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-3">
                {/* Interactive Calendar */}
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                    {/* Calendar Header with Navigation */}
                    <div className="flex items-center justify-between p-3 border-b border-gray-100">
                        <button
                            onClick={prevMonth}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors group"
                        >
                            <ChevronLeft className="h-4 w-4 text-royal-blue group-hover:text-blue-700" />
                        </button>
                        <h5 className="text-sm font-semibold text-royal-blue">
                            {monthNames[currentDate.getMonth()]}{" "}
                            {currentDate.getFullYear()}
                        </h5>
                        <button
                            onClick={nextMonth}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors group"
                        >
                            <ChevronRight className="h-4 w-4 text-royal-blue group-hover:text-blue-700" />
                        </button>
                    </div>

                    <div className="p-3">
                        <div className="grid grid-cols-7 gap-1 text-center">
                            {/* Days of the week */}
                            <div className="p-1 font-semibold text-royal-blue text-xs bg-gray-50 rounded">
                                S
                            </div>
                            <div className="p-1 font-semibold text-royal-blue text-xs bg-gray-50 rounded">
                                M
                            </div>
                            <div className="p-1 font-semibold text-royal-blue text-xs bg-gray-50 rounded">
                                T
                            </div>
                            <div className="p-1 font-semibold text-royal-blue text-xs bg-gray-50 rounded">
                                W
                            </div>
                            <div className="p-1 font-semibold text-royal-blue text-xs bg-gray-50 rounded">
                                T
                            </div>
                            <div className="p-1 font-semibold text-royal-blue text-xs bg-gray-50 rounded">
                                F
                            </div>
                            <div className="p-1 font-semibold text-royal-blue text-xs bg-gray-50 rounded">
                                S
                            </div>

                            {/* Empty cells for days before the first day of the month */}
                            {Array.from(
                                {
                                    length: getFirstDayOfMonth(currentDate),
                                },
                                (_, i) => (
                                    <div
                                        key={`empty-${i}`}
                                        className="p-1 text-gray-400 text-xs"
                                    ></div>
                                )
                            )}

                            {/* Calendar dates */}
                            {Array.from(
                                {
                                    length: getDaysInMonth(currentDate),
                                },
                                (_, i) => {
                                    const day = i + 1;
                                    const key = `${currentDate.getFullYear()}-${String(
                                        currentDate.getMonth() + 1
                                    ).padStart(2, "0")}-${String(day).padStart(
                                        2,
                                        "0"
                                    )}`;
                                    const dayEvents = eventsByDay[key] || [];
                                    const hasEvents = dayEvents.length > 0;
                                    const isSelected = selectedDate === day;

                                    // Get primary event type for styling
                                    const primaryEventType = hasEvents
                                        ? dayEvents[0].event_type
                                        : null;

                                    const eventTypeColors = {
                                        exam: "border-red-500 text-red-700 hover:bg-red-50",
                                        academic:
                                            "border-blue-500 text-blue-700 hover:bg-blue-50",
                                        sports: "border-green-500 text-green-700 hover:bg-green-50",
                                        cultural:
                                            "border-purple-500 text-purple-700 hover:bg-purple-50",
                                        meeting:
                                            "border-amber-500 text-amber-700 hover:bg-amber-50",
                                    };

                                    const eventDotColors = {
                                        exam: "bg-red-500",
                                        academic: "bg-blue-500",
                                        sports: "bg-green-500",
                                        cultural: "bg-purple-500",
                                        meeting: "bg-amber-500",
                                    };

                                    return (
                                        <div
                                            key={day}
                                            onClick={() => handleDateClick(day)}
                                            className={`p-1 text-xs cursor-pointer rounded-lg transition-all duration-300 relative ${
                                                isSelected
                                                    ? "bg-royal-blue text-white shadow-lg"
                                                    : hasEvents
                                                    ? `border ${
                                                          eventTypeColors[
                                                              primaryEventType
                                                          ] ||
                                                          eventTypeColors.exam
                                                      }`
                                                    : "text-gray-700 hover:bg-gray-100 border border-transparent hover:border-gray-200"
                                            }`}
                                        >
                                            {day}
                                            {hasEvents && !isSelected && (
                                                <div
                                                    className={`absolute -top-1 -right-1 w-2 h-2 ${
                                                        eventDotColors[
                                                            primaryEventType
                                                        ] || eventDotColors.exam
                                                    } rounded-full border border-white`}
                                                >
                                                    {dayEvents.length > 1 && (
                                                        <div className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 bg-gray-600 rounded-full border border-white"></div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    );
                                }
                            )}
                        </div>
                    </div>
                </div>

                {/* Legend */}
                <div className="mt-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-2 border border-blue-100">
                    <h5 className="text-xs font-semibold text-royal-blue mb-2 flex items-center">
                        <span className="mr-1">📅</span>
                        Event Types
                    </h5>
                    <div className="grid grid-cols-2 gap-1 text-xs">
                        <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                            <span>Exams</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span>Academic</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span>Sports</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            <span>Cultural</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Event Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-hidden">
                        {/* Modal Header */}
                        <div className="bg-gradient-to-r from-royal-blue to-blue-600 text-white p-6">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-xl font-bold">
                                        Events on{" "}
                                        {monthNames[currentDate.getMonth()]}{" "}
                                        {selectedDate},{" "}
                                        {currentDate.getFullYear()}
                                    </h3>
                                    <p className="text-blue-100 text-sm mt-1">
                                        Click on any event for more details
                                    </p>
                                </div>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="text-white/80 hover:text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                                >
                                    <X className="h-6 w-6" />
                                </button>
                            </div>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6 max-h-[60vh] overflow-y-auto">
                            {(() => {
                                const key = `${currentDate.getFullYear()}-${String(
                                    currentDate.getMonth() + 1
                                ).padStart(2, "0")}-${String(
                                    selectedDate
                                ).padStart(2, "0")}`;
                                const dayEvents = eventsByDay[key] || [];
                                return (
                                    <div className="space-y-4">
                                        {dayEvents.length === 0 ? (
                                            <div className="text-center py-8">
                                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                                    <Calendar className="w-8 h-8 text-gray-400" />
                                                </div>
                                                <p className="text-gray-600 font-medium">
                                                    No events scheduled for this
                                                    date.
                                                </p>
                                                <p className="text-gray-500 text-sm mt-1">
                                                    Check back later for
                                                    updates.
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="space-y-3">
                                                {dayEvents.map((ev) => {
                                                    const start = ev.start_date
                                                        ? new Date(
                                                              ev.start_date
                                                          )
                                                        : null;
                                                    const end = ev.end_date
                                                        ? new Date(ev.end_date)
                                                        : null;

                                                    // Calculate duration
                                                    const duration =
                                                        start && end
                                                            ? (() => {
                                                                  const diffMs =
                                                                      end -
                                                                      start;
                                                                  const diffHours =
                                                                      Math.floor(
                                                                          diffMs /
                                                                              (1000 *
                                                                                  60 *
                                                                                  60)
                                                                      );
                                                                  const diffMins =
                                                                      Math.floor(
                                                                          (diffMs %
                                                                              (1000 *
                                                                                  60 *
                                                                                  60)) /
                                                                              (1000 *
                                                                                  60)
                                                                      );
                                                                  if (
                                                                      diffHours >
                                                                      0
                                                                  ) {
                                                                      return `${diffHours}h ${diffMins}m`;
                                                                  }
                                                                  return `${diffMins}m`;
                                                              })()
                                                            : null;

                                                    const timeLabel = start
                                                        ? `${start.toLocaleTimeString(
                                                              [],
                                                              {
                                                                  hour: "2-digit",
                                                                  minute: "2-digit",
                                                                  hour12: true,
                                                              }
                                                          )}${
                                                              end
                                                                  ? ` - ${end.toLocaleTimeString(
                                                                        [],
                                                                        {
                                                                            hour: "2-digit",
                                                                            minute: "2-digit",
                                                                            hour12: true,
                                                                        }
                                                                    )}`
                                                                  : ""
                                                          }`
                                                        : "All day";

                                                    const typeColor =
                                                        {
                                                            academic:
                                                                "bg-blue-500",
                                                            exam: "bg-red-500",
                                                            sports: "bg-green-500",
                                                            cultural:
                                                                "bg-purple-500",
                                                            meeting:
                                                                "bg-amber-500",
                                                        }[ev.event_type] ||
                                                        "bg-gray-500";

                                                    const typeIcon =
                                                        {
                                                            academic: "🎓",
                                                            exam: "📝",
                                                            sports: "⚽",
                                                            cultural: "🎭",
                                                            meeting: "👥",
                                                        }[ev.event_type] ||
                                                        "📅";

                                                    return (
                                                        <div
                                                            key={ev.id}
                                                            className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200 hover:border-gray-300"
                                                        >
                                                            {/* Event Header */}
                                                            <div className="flex items-start justify-between mb-3">
                                                                <div className="flex-1">
                                                                    <div className="flex items-center gap-2 mb-1">
                                                                        <span className="text-lg">
                                                                            {
                                                                                typeIcon
                                                                            }
                                                                        </span>
                                                                        <h4 className="font-bold text-gray-900 text-lg">
                                                                            {
                                                                                ev.title
                                                                            }
                                                                        </h4>
                                                                    </div>
                                                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                                                        <span
                                                                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${typeColor}`}
                                                                        >
                                                                            {
                                                                                ev.event_type
                                                                            }
                                                                        </span>
                                                                        {duration && (
                                                                            <span className="text-gray-500">
                                                                                •{" "}
                                                                                {
                                                                                    duration
                                                                                }
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* Event Details */}
                                                            <div className="space-y-2">
                                                                <div className="flex items-center gap-2 text-sm text-gray-700">
                                                                    <Clock className="h-4 w-4 text-gray-400" />
                                                                    <span>
                                                                        {
                                                                            timeLabel
                                                                        }
                                                                    </span>
                                                                </div>

                                                                {ev.location && (
                                                                    <div className="flex items-center gap-2 text-sm text-gray-700">
                                                                        <MapPin className="h-4 w-4 text-gray-400" />
                                                                        <span>
                                                                            {
                                                                                ev.location
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                )}

                                                                {ev.description && (
                                                                    <div className="mt-3 pt-3 border-t border-gray-100">
                                                                        <p className="text-sm text-gray-700 leading-relaxed">
                                                                            {
                                                                                ev.description
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                )}

                                                                {/* Event Image */}
                                                                {ev.image_path && (
                                                                    <div className="mt-3">
                                                                        <img
                                                                            src={
                                                                                ev.image_path
                                                                            }
                                                                            alt={
                                                                                ev.title
                                                                            }
                                                                            className="w-full h-32 object-cover rounded-lg border border-gray-200"
                                                                        />
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                );
                            })()}
                        </div>

                        {/* Modal Footer */}
                        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                            <div className="flex justify-between items-center">
                                <div className="text-sm text-gray-600">
                                    {(() => {
                                        const key = `${currentDate.getFullYear()}-${String(
                                            currentDate.getMonth() + 1
                                        ).padStart(2, "0")}-${String(
                                            selectedDate
                                        ).padStart(2, "0")}`;
                                        const dayEvents =
                                            eventsByDay[key] || [];
                                        return `${dayEvents.length} event${
                                            dayEvents.length !== 1 ? "s" : ""
                                        } found`;
                                    })()}
                                </div>
                                <Button
                                    onClick={() => setShowModal(false)}
                                    variant="outline"
                                    className="px-6"
                                >
                                    Close
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EventCalendar;
