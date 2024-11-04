# CASCA - SHOP
# DESCRIPCIÓN

Casca-Shop is a fully-featured e-commerce platform built with Next.js 14, designed to deliver an advanced and secure shopping experience. The platform includes:

    Protected Routes: Secure access to specific sections of the application.
    Server-Side Pagination: Efficient handling of large datasets.
    User Management: Supports creation, editing, and role-based access control.
    Image Storage with Cloudinary: Smooth image upload and storage.
    Admin Routes: Restricted access for administrators to manage products.
    Product Management: Full CRUD functionality for creating, editing, and deleting products, managing prices, images, and generating unique slugs.
    Internationalization: Supports both English and Spanish languages.
    Fully Responsive Design: Optimized for all device sizes.
    Payment Integration: Secure payments through PayPal.
    Form Management with React Hook Form: Simplified and reliable form handling.
    Styling with Tailwind CSS: Utility-first CSS framework for fast and responsive design.

This app provides a secure, scalable, and multilingual platform tailored for e-commerce solutions.
Technologies

    Next.js 14: Framework for building fast, server-rendered React applications.
    Prisma: ORM for efficient database integration with MySQL.
    MySQL: Relational database for storing application data.
    Cloudinary: Cloud-based solution for storing and serving images.
    Tailwind CSS: Utility-first CSS framework for responsive design.
    React Hook Form: Lightweight solution for handling form validation and state.
    Docker: Containerization platform for easy setup and deployment.
    PayPal API: Secure payment processing.


## DEV
1- Clone the repository.

2- Create a copy of the
```.env.template```
file, rename it to
```.env```
and update the environment variables as needed.

3- Start the database
```docker compose up -d```

4- Run Prisma migrations
```npx prisma migrate dev```

5- Run the seed file to populate the database
```npm run seed```

6- Install dependencies 
```npm install```

7- Start the project
```npm run dev```

8- Clear the browser's localStorage.
