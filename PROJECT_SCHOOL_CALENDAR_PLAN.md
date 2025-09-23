## School Calendar (Events) - Design and Implementation Plan

### Overview

Evolve the current Exam Calendar into a full School Calendar that displays all key dated activities: exams, academic events, sports, meetings, and cultural activities. Reuse the existing `events` table and `Event` model, expose public month-scoped endpoints, and add an Admin management UI with CRUD.

### Goals

-   Single source of truth for all school events
-   Categories: academic, exam, sports, cultural, meeting
-   Support all-day, timed, and multi-day events
-   Fast month-based public fetch
-   Admin UX consistent with Announcements and Hero Carousel

### Data Model

Use the existing table (`database/migrations/2025_09_08_131348_create_events_table.php`) and model (`app/Models/Event.php`). Optional future fields are listed under “Future Enhancements”.

Fields in use now:

-   title (string, required)
-   description (text, optional)
-   event_type (enum: academic, sports, cultural, meeting, exam)
-   start_date (datetime, required)
-   end_date (datetime, optional)
-   location (string, optional)
-   image_path (string, optional)
-   is_featured (boolean, optional)
-   is_active (boolean, required, default true)
-   display_order (integer, optional)

### API Design

Public (no auth):

-   GET `/api/events/public?month=YYYY-MM&types=exam,sports&include_past_overlap=1`
    -   Returns active events for the given month, including events that overlap the month.
    -   Response: list of events with normalized fields (id, title, description, event_type, start_date, end_date, location, image_url, is_active, display_order).

Admin (auth + admin.auth):

-   REST: `/api/admin/events` (index, store, show, update, destroy)
-   Optional quick toggles:
    -   POST `/api/admin/events/{id}/toggle-active`
    -   POST `/api/admin/events/reorder`

### Controllers

-   `App\Http\Controllers\Api\EventController`

    -   `publicByMonth(Request $request)` → validates `month`, optional `types`, returns month-bounded active events (with overlap).

-   `App\Http\Controllers\Admin\EventController`
    -   CRUD with validation: title, start_date required; end_date after_or_equal:start; event_type in enum; location/description optional; image handled via storage; is_active boolean; display_order int.

### Frontend Integration

Services:

-   `publicService.events.getByMonth(yearMonth, options)`
-   `adminService.events` with `getAll({ month, types, search, active })`, `create`, `update`, `delete`.

Public UI (Home.jsx Calendar):

-   Replace placeholders with fetched month events.
-   Build a `Map<YYYY-MM-DD, Event[]>` to render dots/badges on days with events.
-   Day click opens a modal listing events for that date (time window, type badge, location, link to details if any).

Admin UI (`resources/js/pages/admin/Events.jsx`):

-   Toolbar: month selector, category filter, search, active toggle.
-   List/table of events for selected month with columns: Date, Title, Type, Active, Location, Actions.
-   Create/Edit modal: fields above, live validation, image preview, per-action loading, toasts.

### Category Colors (UI)

-   academic: royal-blue
-   exam: red
-   sports: green
-   cultural: purple
-   meeting: amber

### Validation & Edge Cases

-   Multi-day events spanning months must appear in all overlapped months.
-   All-day vs timed events (v1: infer from times; v2: add `all_day` boolean).
-   Missing `end_date` treated as single-day/timed event.

### Security

-   Public endpoints return only `is_active = true`.
-   Admin endpoints require `auth` + `admin.auth` middleware.

### Implementation Steps

1. Backend: Public controller + route `/api/events/public`.
2. Backend: Admin controller + routes under `/api/admin/events`.
3. Frontend: Services for public/admin events.
4. Public: Hook Home.jsx calendar to real data.
5. Admin: Build Events management page with month toolbar and modals.
6. Polish: colors, tooltips, toasts, skeletons.

### Future Enhancements (v2+)

-   `all_day` boolean column for clarity.
-   `color` string for custom color tokens.
-   `visibility` enum (public/internal).
-   Recurring events (RRULE or recurrence table) with server-side expansion.
-   ICS export endpoint for calendar subscription.
