import React, { useEffect, useMemo, useState } from "react";
import { adminService } from "../../services/adminService";
import { Button } from "../../components/ui/button";
import { Calendar, Plus, X, Loader2 } from "lucide-react";

const EVENT_TYPES = [
    { value: "academic", label: "Academic" },
    { value: "exam", label: "Exam" },
    { value: "sports", label: "Sports" },
    { value: "cultural", label: "Cultural" },
    { value: "meeting", label: "Meeting" },
];

function formatYearMonth(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
        2,
        "0"
    )}`;
}

export default function AdminEvents() {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [loading, setLoading] = useState(false);
    const [rows, setRows] = useState([]);
    const [search, setSearch] = useState("");
    const [type, setType] = useState("");
    const [onlyActive, setOnlyActive] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [saving, setSaving] = useState(false);
    const [editing, setEditing] = useState(null); // event object or null
    const [form, setForm] = useState({
        title: "",
        event_type: "exam",
        start_date: "",
        end_date: "",
        location: "",
        description: "",
        is_active: true,
    });

    const monthLabel = useMemo(
        () =>
            currentMonth.toLocaleString("default", {
                month: "long",
                year: "numeric",
            }),
        [currentMonth]
    );

    async function load() {
        try {
            setLoading(true);
            const filters = {
                month: formatYearMonth(currentMonth),
            };
            if (type) filters.types = type;
            if (search) filters.search = search;
            if (onlyActive) filters.active = "1";
            const res = await adminService.events.getAll(filters);
            setRows(res.data || []);
        } catch (e) {
            console.error("Failed to load events", e);
            setRows([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentMonth, type, onlyActive]);

    function prevMonth() {
        const d = new Date(currentMonth);
        d.setMonth(d.getMonth() - 1);
        setCurrentMonth(d);
    }

    function nextMonth() {
        const d = new Date(currentMonth);
        d.setMonth(d.getMonth() + 1);
        setCurrentMonth(d);
    }

    function openCreate() {
        setEditing(null);
        setForm({
            title: "",
            event_type: "exam",
            start_date: "",
            end_date: "",
            location: "",
            description: "",
            is_active: true,
        });
        setIsModalOpen(true);
    }

    function openEdit(row) {
        setEditing(row);
        setForm({
            title: row.title || "",
            event_type: row.event_type || "exam",
            start_date: row.start_date ? row.start_date.slice(0, 16) : "",
            end_date: row.end_date ? row.end_date.slice(0, 16) : "",
            location: row.location || "",
            description: row.description || "",
            is_active: !!row.is_active,
        });
        setIsModalOpen(true);
    }

    async function onSave(e) {
        e.preventDefault();
        try {
            setSaving(true);
            const payload = { ...form };
            // Ensure booleans
            payload.is_active = !!payload.is_active;
            if (editing) await adminService.events.update(editing.id, payload);
            else await adminService.events.create(payload);
            setIsModalOpen(false);
            await load();
        } catch (err) {
            console.error("Save failed", err);
        } finally {
            setSaving(false);
        }
    }

    async function onDelete(row) {
        if (!confirm("Delete this event?")) return;
        try {
            await adminService.events.delete(row.id);
            await load();
        } catch (e) {
            console.error("Delete failed", e);
        }
    }

    return (
        <div className="p-6">
            <div className="mb-4 flex flex-col md:flex-row md:items-center gap-3">
                <div className="flex items-center gap-2 text-royal-blue font-semibold">
                    <Calendar className="w-5 h-5" />
                    <span>School Calendar</span>
                </div>
                <div className="ml-auto flex items-center gap-2">
                    <button
                        onClick={prevMonth}
                        className="px-3 py-2 rounded-md border"
                    >
                        Prev
                    </button>
                    <span className="min-w-[160px] text-center font-semibold">
                        {monthLabel}
                    </span>
                    <button
                        onClick={nextMonth}
                        className="px-3 py-2 rounded-md border"
                    >
                        Next
                    </button>
                </div>
            </div>

            <div className="mb-4 flex flex-col md:flex-row gap-3">
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search..."
                    className="border rounded-md px-3 py-2 w-full md:w-64"
                />
                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="border rounded-md px-3 py-2 w-full md:w-52"
                >
                    <option value="">All types</option>
                    {EVENT_TYPES.map((t) => (
                        <option key={t.value} value={t.value}>
                            {t.label}
                        </option>
                    ))}
                </select>
                <label className="inline-flex items-center gap-2 text-sm">
                    <input
                        type="checkbox"
                        checked={onlyActive}
                        onChange={(e) => setOnlyActive(e.target.checked)}
                    />{" "}
                    Active only
                </label>
                <div className="ml-auto">
                    <Button
                        onClick={openCreate}
                        className="bg-royal-blue text-white h-10 rounded-lg"
                    >
                        <Plus className="w-4 h-4 mr-1" /> New Event
                    </Button>
                </div>
            </div>

            <div className="bg-white rounded-lg border shadow-sm">
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                        <thead className="bg-gray-50 text-gray-600">
                            <tr>
                                <th className="text-left px-4 py-2">Date</th>
                                <th className="text-left px-4 py-2">Title</th>
                                <th className="text-left px-4 py-2">Type</th>
                                <th className="text-left px-4 py-2">
                                    Location
                                </th>
                                <th className="text-left px-4 py-2">Active</th>
                                <th className="text-right px-4 py-2">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td
                                        className="px-4 py-6 text-center"
                                        colSpan={6}
                                    >
                                        <span className="inline-flex items-center gap-2 text-gray-500">
                                            <Loader2 className="w-4 h-4 animate-spin" />{" "}
                                            Loading events...
                                        </span>
                                    </td>
                                </tr>
                            ) : rows.length === 0 ? (
                                <tr>
                                    <td
                                        className="px-4 py-6 text-center text-gray-500"
                                        colSpan={6}
                                    >
                                        No events found.
                                    </td>
                                </tr>
                            ) : (
                                rows.map((r) => (
                                    <tr key={r.id} className="border-t">
                                        <td className="px-4 py-2 whitespace-nowrap">
                                            {new Date(
                                                r.start_date
                                            ).toLocaleString()}{" "}
                                            {r.end_date
                                                ? `→ ${new Date(
                                                      r.end_date
                                                  ).toLocaleString()}`
                                                : ""}
                                        </td>
                                        <td className="px-4 py-2">{r.title}</td>
                                        <td className="px-4 py-2 capitalize">
                                            {r.event_type}
                                        </td>
                                        <td className="px-4 py-2">
                                            {r.location || "—"}
                                        </td>
                                        <td className="px-4 py-2">
                                            {r.is_active ? "Yes" : "No"}
                                        </td>
                                        <td className="px-4 py-2 text-right">
                                            <button
                                                onClick={() => openEdit(r)}
                                                className="text-royal-blue hover:underline mr-3"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => onDelete(r)}
                                                className="text-red-600 hover:underline"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg w-full max-w-xl mx-4 p-5">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="font-semibold">
                                {editing ? "Edit Event" : "Create Event"}
                            </h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-1 hover:bg-gray-100 rounded"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                        <form onSubmit={onSave} className="space-y-3">
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Title
                                </label>
                                <input
                                    value={form.title}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            title: e.target.value,
                                        })
                                    }
                                    className="w-full border rounded-md px-3 py-2"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Type
                                    </label>
                                    <select
                                        value={form.event_type}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                event_type: e.target.value,
                                            })
                                        }
                                        className="w-full border rounded-md px-3 py-2"
                                    >
                                        {EVENT_TYPES.map((t) => (
                                            <option
                                                key={t.value}
                                                value={t.value}
                                            >
                                                {t.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex items-center gap-2 mt-6 md:mt-0">
                                    <input
                                        id="active"
                                        type="checkbox"
                                        checked={form.is_active}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                is_active: e.target.checked,
                                            })
                                        }
                                    />
                                    <label htmlFor="active" className="text-sm">
                                        Active
                                    </label>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Start (date & time)
                                    </label>
                                    <input
                                        type="datetime-local"
                                        value={form.start_date}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                start_date: e.target.value,
                                            })
                                        }
                                        className="w-full border rounded-md px-3 py-2"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        End (optional)
                                    </label>
                                    <input
                                        type="datetime-local"
                                        value={form.end_date}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                end_date: e.target.value,
                                            })
                                        }
                                        className="w-full border rounded-md px-3 py-2"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Location (optional)
                                </label>
                                <input
                                    value={form.location}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            location: e.target.value,
                                        })
                                    }
                                    className="w-full border rounded-md px-3 py-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Description (optional)
                                </label>
                                <textarea
                                    value={form.description}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            description: e.target.value,
                                        })
                                    }
                                    className="w-full border rounded-md px-3 py-2"
                                    rows={4}
                                />
                            </div>
                            <div className="flex justify-end gap-2 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 rounded-md border"
                                >
                                    Cancel
                                </button>
                                <Button
                                    type="submit"
                                    className="bg-royal-blue text-white h-10 rounded-lg"
                                    disabled={saving}
                                >
                                    {saving ? (
                                        <span className="inline-flex items-center gap-2">
                                            <Loader2 className="w-4 h-4 animate-spin" />{" "}
                                            Saving...
                                        </span>
                                    ) : (
                                        "Save"
                                    )}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
