# XTORC Company Website - Backend API (ES Modules)

Production-ready, secure, modular monolithic backend for the **XTORC Company Website** built with **Node.js (ES Modules)**, **Express.js**, and **MongoDB (Mongoose)**.

---

## 🚀 Features & Architecture Overview

Following **Modular Monolithic Architecture** principles using native **ES Modules (`import` / `export`)**, the codebase separates concerns cleanly into independent modules (`auth`, `testimonials`, `careers`), with business logic strictly encapsulated within service layers.

### 🔑 Feature 1: Admin Authentication (`src/modules/auth`)
* Single Administrator System.
* Password Hashing via `bcryptjs`.
* Authentication via HTTP-only Cookies & JWT Bearer header fallback.
* Protected admin routes (`/api/v1/auth/me`, `/api/v1/auth/logout`, admin testimonial endpoints).
* Admin seed CLI script (`npm run seed:admin`).

### 💬 Feature 2: Testimonials Management (`src/modules/testimonials`)
* **Visitor Submission**: Public visitors can submit testimonials (`fullName`, `company`, `designation`, `rating` 1-5, `reviewMessage`, optional profile image).
* **Review Workflow**: Every new submission defaults to `pending` status.
* **Public Display**: Only `approved` testimonials are exposed on the public endpoint (`GET /api/v1/testimonials`).
* **Admin Dashboard Management**: Admin can view all pending, approved, or rejected testimonials, approve, reject, edit, or delete them.
* Local profile avatar storage in `uploads/avatars`.

### 💼 Feature 3: Career / Join Us (`src/modules/careers`)
* **Job Application Form**: Public submission supporting Personal Details, Professional Details, Notice Period, Reason to Join (max 500 chars), and Resume File (PDF, DOC, DOCX up to 5MB).
* **In-Memory Resume Processing**: Resumes are **never saved to server disk or stored in database**. Multer handles file uploads directly in memory (`multer.memoryStorage()`).
* **Instant Email Dispatch**: Application details and in-memory resume file buffer are immediately emailed to the Admin/HR email using Nodemailer.

---

## 📁 Directory Structure

```
xtorc-api/
├── .env
├── .env.example
├── .gitignore
├── package.json
├── README.md
├── src/
│   ├── app.js
│   ├── server.js
│   ├── config/
│   │   ├── db.config.js
│   │   ├── env.config.js
│   │   ├── mail.config.js
│   │   └── multer.config.js
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   ├── error.middleware.js
│   │   ├── upload.middleware.js
│   │   └── validate.middleware.js
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.controller.js
│   │   │   ├── auth.model.js
│   │   │   ├── auth.routes.js
│   │   │   ├── auth.service.js
│   │   │   └── auth.validation.js
│   │   ├── careers/
│   │   │   ├── career.controller.js
│   │   │   ├── career.routes.js
│   │   │   ├── career.service.js
│   │   │   └── career.validation.js
│   │   └── testimonials/
│   │       ├── testimonial.controller.js
│   │       ├── testimonial.model.js
│   │       ├── testimonial.routes.js
│   │       ├── testimonial.service.js
│   │       └── testimonial.validation.js
│   ├── scripts/
│   │   ├── seedAdmin.js
│   │   └── testEndpoints.js
│   └── utils/
│       ├── apiError.js
│       ├── apiResponse.js
│       ├── asyncHandler.js
│       ├── logger.js
│       └── mailer.js
└── uploads/
    └── avatars/
        └── .gitkeep
```

---

## ⚙️ Installation & Setup

### 1. Install Dependencies
```bash
cd xtorc-api
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

### 3. Seed Administrator Account
Run the admin seeder to initialize or update the single admin account in MongoDB:
```bash
npm run seed:admin
```

### 4. Run Development Server
```bash
npm run dev
```
