# Taft National High School (TNHS) Website

A modern, responsive website for Taft National High School built with Laravel, React, and Tailwind CSS.

## 🚀 Features

### Public Pages

-   **Home Page**: Hero section, features, and latest announcements
-   **About Page**: School information, mission, vision, and history
-   **Academics Page**: Academic programs and curriculum information
-   **Admissions Page**: Application requirements and process
-   **News Page**: School announcements and events
-   **Contact Page**: Contact information and contact form

### Admin Interface

-   **Dashboard**: Overview statistics and quick actions
-   **Announcements Management**: Create, edit, and manage school announcements
-   **User Management**: Manage administrative accounts
-   **Responsive Design**: Mobile-first design with modern UI components

## 🛠️ Tech Stack

### Backend

-   **Laravel 12**: PHP framework for robust backend development
-   **MySQL**: Database for data storage
-   **Laravel Sanctum**: API authentication
-   **Spatie Laravel Permission**: Role and permission management

### Frontend

-   **React 18**: Modern JavaScript library for building user interfaces
-   **React Router**: Client-side routing
-   **Tailwind CSS**: Utility-first CSS framework
-   **shadcn/ui**: Beautiful and accessible UI components
-   **Lucide React**: Beautiful & consistent icon toolkit

### Development Tools

-   **Vite**: Fast build tool and development server
-   **TypeScript**: Type-safe JavaScript development
-   **Laravel Vite Plugin**: Integration between Laravel and Vite

## 📋 Prerequisites

-   PHP 8.2 or higher
-   Composer
-   Node.js 20+ and npm
-   MySQL 8.0 or higher
-   Git

## 🚀 Installation

1. **Clone the repository**

    ```bash
    git clone <repository-url>
    cd TNHS_V2
    ```

2. **Install PHP dependencies**

    ```bash
    composer install
    ```

3. **Install Node.js dependencies**

    ```bash
    npm install
    ```

4. **Environment setup**

    ```bash
    cp .env.example .env
    php artisan key:generate
    ```

5. **Configure database**

    - Update `.env` file with your database credentials
    - Set `DB_DATABASE=tnhs_v2`

6. **Run migrations and seeders**

    ```bash
    php artisan migrate:fresh --seed
    ```

7. **Build frontend assets**
    ```bash
    npm run build
    ```

## 🏃‍♂️ Development

### Start development servers

**Terminal 1 - Laravel Backend:**

```bash
php artisan serve
```

**Terminal 2 - Frontend Development:**

```bash
npm run dev
```

### Access the application

-   **Frontend**: http://localhost:8000
-   **Admin Panel**: http://localhost:8000/admin

## 📁 Project Structure

```
TNHS_V2/
├── app/
│   ├── Http/Controllers/Api/     # API Controllers
│   └── Models/                   # Eloquent Models
├── database/
│   ├── migrations/               # Database migrations
│   └── seeders/                  # Database seeders
├── resources/
│   ├── js/                       # React components
│   │   ├── components/           # Reusable UI components
│   │   ├── layouts/              # Layout components
│   │   ├── pages/                # Page components
│   │   └── lib/                  # Utility functions
│   └── views/                    # Blade templates
├── routes/
│   └── web.php                   # Web routes
└── public/                        # Public assets
```

## 🔧 Configuration

### Environment Variables

-   `APP_NAME`: Application name
-   `DB_*`: Database configuration
-   `VITE_APP_NAME`: Frontend app name
-   `VITE_APP_URL`: Frontend app URL

### Database

The application includes:

-   Users table (Laravel default)
-   Announcements table for school announcements
-   Cache and jobs tables (Laravel default)

## 📱 Responsive Design

The website is fully responsive and optimized for:

-   Desktop computers
-   Tablets
-   Mobile devices

## 🎨 UI Components

Built with shadcn/ui components:

-   Button
-   Card
-   Form elements
-   Navigation components
-   Responsive layouts

## 🔒 Security Features

-   CSRF protection
-   Input validation and sanitization
-   SQL injection prevention
-   XSS protection
-   Secure API endpoints

## 🚀 Deployment

### Production Build

```bash
npm run build
```

### Server Requirements

-   PHP 8.2+
-   MySQL 8.0+
-   Node.js 20+
-   Composer
-   Web server (Apache/Nginx)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support and questions, please contact:

-   Email: info@taftnhs.edu.ph
-   School: Taft National High School

---

**Built with ❤️ for Taft National High School**
