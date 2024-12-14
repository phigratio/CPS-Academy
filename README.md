# CPS Academy

A full-stack web application built using Next.js for the frontend and Strapi for the backend to streamline the operations of CPS Academy. The application provides features like user authentication, role-based access management, and a customizable dashboard.

---

## Project Overview

CPS Academy aims to simplify the management of academic activities through a robust and scalable web application. The project leverages modern technologies like Next.js for a seamless user experience and Strapi as a flexible backend CMS for content and user management. The application is designed with a focus on security, usability, and extensibility.

---

## Features

### Frontend (Next.js)

- **User Authentication**: Login and password management using secure JWT tokens.
- **Role-Based Access Control**: Different functionalities for roles like Admin, Social Media Manager, etc.
- **Responsive UI**: Built using Tailwind CSS and modular components.
- **Dynamic Routing**: Client-side routing with React Router for a smooth experience.
- **Custom Dialogs**: Modal implementation for actions like changing passwords.

### Backend (Strapi)

- **Content Management**: Manage users, roles, and other content types.
- **Authentication API**: Endpoints for login, password change, and user roles.
- **Role-Based Content**: Serve content based on user roles.
- **Media Handling**: Handle file uploads for content.

---

## Installation and Setup

### Prerequisites

- Node.js (v16.x or above)
- npm or yarn
- A database supported by Strapi (e.g., SQLite, PostgreSQL)

### Setup Instructions

#### Backend Setup (Strapi)

1. Clone the repository:
   ```bash
   git clone <repository-url> cps-backend
   cd cps-backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure the database in `config/database.js`.
4. Start the Strapi server:
   ```bash
   npm run develop
   ```
5. Access the Strapi admin panel at `http://localhost:1337/admin` and set up an admin user.

#### Frontend Setup (Next.js)

1. Clone the repository:
   ```bash
   git clone <repository-url> cps-frontend
   cd cps-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure the `.env.local` file:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:1337/api
   ```
4. Start the Next.js development server:
   ```bash
   npm run dev
   ```
5. Access the application at `http://localhost:3000`.

---

## Dependencies

### Frontend (Next.js)

- **Next.js**: `13.x`
- **Axios**: `^1.x`
- **Tailwind CSS**: `^3.x`
- **React**: `^18.x`

### Backend (Strapi)

- **Strapi**: `4.x`
- **Database Adapter** (e.g., SQLite, PostgreSQL): Specific to your configuration
- **JWT Plugin**: For secure authentication

---

## Usage

1. Navigate to the Strapi admin panel to manage users and roles.
2. Use the frontend app to log in as different roles to explore functionalities.
3. Modify components or endpoints as needed for additional features.

---

## Contributing

Feel free to fork the project and submit pull requests for improvements or new features. Ensure that all new code is covered by tests and follows the existing code style.

---

## Contact

For questions or feedback, please contact [[your_email@example.com](mailto:muqtadir.mujahid02@gmail.com)].

Md Abdul Muqtadir
