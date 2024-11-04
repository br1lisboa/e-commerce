# 🌟 Casca-Shop

A fully-featured e-commerce platform designed with Next.js 14 for a secure, responsive, and multilingual shopping experience.

## 📖 Description

Casca-Shop is a comprehensive e-commerce platform, equipped with powerful tools and integrations for building a seamless online store. Key features include:

- 🔒 Protected Routes: Restrict access to specific sections for secure user management.
- 📊 Server-Side Pagination: Efficiently handles large data volumes.
- 👤 User Management: Supports creating, editing, and role-based access control.
- 📷 Image Storage with Cloudinary: Effortless image upload and cloud storage.
- 🔑 Admin Routes: Provides restricted access for administrators to manage products.
- 🛠 Product Management: Complete CRUD operations for products, including price management, image handling, and slug generation.
- 🌐 Internationalization: Fully supports English and Spanish languages.
- 📱 Responsive Design: Optimized for a flawless experience across devices.
- 💳 Payment Integration: Secure payments via PayPal.
- 📋 Form Management with React Hook Form: Simplified form handling with robust validation.
- 🎨 Styling with Tailwind CSS: Rapid and responsive UI development with a utility-first approach.

## 🚀 Technologies

The Casca-Shop platform utilizes a modern tech stack for optimal performance and maintainability:

- Next.js 14: Server-rendered React applications for fast, interactive interfaces.
- Prisma: ORM for efficient database management and MySQL integration.
- MySQL: Relational database for structured data storage.
- Cloudinary: Cloud solution for image management and delivery.
- Tailwind CSS: Utility-first CSS framework for responsive styling.
- React Hook Form: Lightweight solution for form validation and state management.
- Docker: Containerization for simplified setup and environment consistency.
- PayPal API: Secure integration for online payment processing.

## 🛠 Development Setup

Follow these steps to set up and run Casca-Shop locally.

1. **Clone the Repository**

    ```bash
    git clone https://github.com/your-username/Casca-Shop.git
    cd Casca-Shop
    ```

2. **Configure Environment Variables**

    Copy `.env.template` to `.env`:

    ```bash
    cp .env.template .env
    ```

    Update the variables in `.env` as needed for your environment.

3. **Start Database with Docker**

    Start the MySQL database container:

    ```bash
    docker compose up -d
    ```

4. **Run Prisma Migrations**

    Apply migrations to set up the database schema:

    ```bash
    npx prisma migrate dev
    ```

5. **Seed the Database**

    Populate the database with initial data:

    ```bash
    npm run seed
    ```

6. **Install Dependencies**

    ```bash
    npm install
    ```

7. **Start the Development Server**

    ```bash
    npm run dev
    ```

8. **Clear Browser Local Storage**

    If testing in the browser, clear localStorage as needed for a fresh start.

## 🐳 Docker Usage

Casca-Shop uses Docker for an isolated and easily deployable environment. Here are some key commands:

- **Start services:**

    ```bash
    docker compose up -d
    ```

- **Stop services:**

    ```bash
    docker compose down
    ```

Docker ensures consistency across development, testing, and production environments, making it easy to manage dependencies.

## 💡 Tips

- **Environment Variables:** Double-check your .env file for accurate setup.
- **Local Testing:** For repeated tests, clear your browser’s localStorage to avoid stale data issues.
