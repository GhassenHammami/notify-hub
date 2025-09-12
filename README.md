<div align="center">

# Notify Hub

**The complete notification solution for developers. Send emails, SMS, and push notifications with powerful APIs and beautiful templates.**

[![Last Commit](https://img.shields.io/github/last-commit/GhassenHammami/notify-hub)](https://github.com/GhassenHammami/notify-hub/commits/master)
[![TypeScript](https://img.shields.io/github/languages/top/GhassenHammami/notify-hub
)](https://www.typescriptlang.org/)
[![Languages](https://img.shields.io/github/languages/count/GhassenHammami/notify-hub
)](https://github.com/GhassenHammami/notify-hub)

### Built with the tools and technologies

[![AdonisJS](https://img.shields.io/badge/AdonisJS-6.18.0-220052?logo=adonisjs)](https://adonisjs.com/)
[![React](https://img.shields.io/badge/React-19.1.1-61DAFB?logo=react)](https://reactjs.org/)
[![Inertia.js](https://img.shields.io/badge/Inertia.js-2.1.2-9553E9)](https://inertiajs.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.11-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![SQLite](https://img.shields.io/badge/SQLite-12.2.0-003B57?logo=sqlite)](https://sqlite.org/)
</div>

## Table of Contents

- [Project Description](#project-description)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Demo](#demo)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Setup](#environment-setup)
  - [Database Setup](#database-setup)
  - [Start Development Server](#start-development-server)
  - [Docker Setup (Alternative)](#docker-setup-alternative)
- [Usage](#usage)
  - [Initial Setup](#initial-setup)
  - [Creating Notifications](#creating-notifications)
  - [Building Templates](#building-templates)
  - [Sending Notifications via API](#sending-notifications-via-api)
- [License](#license)
- [Contributing](#contributing)
- [Acknowledgments](#acknowledgments)

## Project Description

Notify Hub is a comprehensive notification management platform designed for developers who need to send multi-channel notifications at scale. The application provides a modern, full-stack solution for creating, managing, and delivering notifications across email, SMS, and push notification channels.

The platform solves the common problem of managing complex notification workflows by providing:
- **Centralized notification management** with project-based organization
- **Template-based messaging** with dynamic content and personalization
- **Multi-channel delivery** supporting email, SMS, and push notifications
- **RESTful API** for seamless integration with existing applications
- **Real-time analytics** and delivery tracking
- **Beautiful, responsive UI** built with modern web technologies

## Tech Stack

- **AdonisJS 6.18.0** - A Node.js framework used for the backend API and server-side logic, providing robust routing, middleware, and ORM capabilities
- **React 19.1.1** - The frontend library used to build the interactive user interface with modern hooks and component architecture
- **Inertia.js 2.1.2** - A "modern monolith" approach that allows building a single-page application using classic server-side routing without the complexity of separate API management
- **Tailwind CSS 4.1.11** - A utility-first CSS framework for rapid and consistent styling with responsive design capabilities
- **TypeScript 5.9.2** - Provides static type checking and enhanced developer experience across the entire application
- **SQLite** - Lightweight, serverless database for data persistence
- **Vite** - Fast build tool and development server with hot module replacement
- **Docker** - Containerization for consistent deployment

## Features

- 🚀 **Multi-Channel Notifications** - Send emails, SMS, and push notifications through a unified interface
- 📧 **Email Template Editor** - Visual drag-and-drop editor powered by GrapesJS for creating responsive email templates
- 📱 **SMS Integration** - Reliable SMS delivery with template support
- 🔔 **Push Notifications** - Real-time push notification delivery across platforms
- 📊 **Analytics Dashboard** - Comprehensive analytics with delivery statistics and performance metrics
- 🎯 **Project Management** - Organize notifications by projects with API key management
- 🔐 **Secure API** - RESTful API with authentication and rate limiting
- 📝 **Template Management** - Create, edit, and manage notification templates with dynamic attributes
- 🎨 **Modern UI** - Beautiful, responsive interface built with Tailwind CSS
- 🔍 **Real-time Tracking** - Track notification delivery status and performance
- 📈 **Charts & Visualizations** - Interactive charts showing notification trends and statistics
- 🛡️ **Security** - CSRF protection, input validation, and secure authentication

## Demo

- This demo showcases how the app works.

https://github.com/user-attachments/assets/27b3cb75-5a62-45ac-84a6-f4a9e1293b67



## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/GhassenHammami/notify-hub.git
   cd notify-hub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env
   ```
   
   Configure the following variables in your `.env` file:
   ```env
   TZ=UTC
   PORT=3333
   HOST=localhost
   LOG_LEVEL=info
   APP_KEY=your-app-key-here
   NODE_ENV=development
   SESSION_DRIVER=cookie
   DRIVE_DISK=fs
   
   # SMTP Configuration for email notifications
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USERNAME=your-email@gmail.com
   SMTP_PASSWORD=your-app-password
   ```
   
   **SMTP Configuration Notes:**
   - **For Development/Testing**: Use [Ethereal.email](https://ethereal.email) (free testing service)
     ```env
     SMTP_HOST=smtp.ethereal.email
     SMTP_PORT=587
     SMTP_USERNAME=your-ethereal-username
     SMTP_PASSWORD=your-ethereal-password
     ```
   - **For Production**: 
     - Gmail: Use `smtp.gmail.com` with port `587` and enable 2-factor authentication
     - Outlook: Use `smtp-mail.outlook.com` with port `587`
     - Other providers: Check your email provider's SMTP settings
     - Use app-specific passwords for Gmail (not your regular password)
   
   Generate an application key:
   ```bash
   node ace generate:key
   ```

   For development, ensure the `tmp` directory exists for the local SQLite database file:
   ```powershell
   # Windows (PowerShell)
   mkdir tmp
   ```
   ```bash
   # macOS/Linux
   mkdir -p tmp
   ```

4. **Database setup**
   ```bash
   # Run database migrations
   node ace migration:run
   
   # (Optional) Seed the database with test data
   node ace db:seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Access the application**
   - Open your browser and navigate to `http://localhost:3333`
   - The application will be running with hot module replacement enabled

### Docker Setup (Alternative)

If you prefer to use Docker, you can run the application in a container:

1. **Build and run with Docker Compose**
   ```bash
   # Build and start the container
   docker-compose up --build
   
   # Run in detached mode
   docker-compose up -d --build
   ```

2. **Access the application**
   - Open your browser and navigate to `http://localhost:3333`
   - The application will be running in a Docker container

3. **Stop the container**
   ```bash
   # Stop the container
   docker-compose down
   
   # Stop and remove volumes
   docker-compose down -v
   ```

**Docker Environment Variables:**
The Docker setup uses the following default environment variables:
- `TZ=UTC`
- `PORT=3333`
- `HOST=0.0.0.0`
- `LOG_LEVEL=info`
- `NODE_ENV=production`
- `SESSION_DRIVER=cookie`
- `VITE_APP_NAME=NotifyHub`
- `DRIVE_DISK=fs`

**Note:** For Docker setup, you'll need to add SMTP configuration to your `compose.yaml` file or create a custom `.env` file with your email settings.

## Usage

### Initial Setup

1. **Create an Account** - Register a new account or use the provided test credentials
2. **Create a Project** - Set up your first project to organize your notifications
3. **Generate API Key** - Each project gets a unique API key for API access

### Creating Notifications

1. Navigate to the **Notifications** section
2. Click **"New Notification"** to create a notification type
3. Define the notification title and external ID
4. Configure any required attributes for personalization

### Building Templates

1. Go to the **Templates** section
2. Click **"New Template"** to create a template
3. Select the notification type and channel (email, SMS, push)
4. Use the visual editor to design your template
5. Add dynamic attributes for personalization

### Sending Notifications via API

```bash
curl -X POST http://localhost:3333/api/v1/notifications \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "templateId": "template_id",
    "recipient": "user@example.com",
    "attributes": {
      "name": "John Doe",
      "message": "Welcome to Notify Hub!"
    }
  }'
```


## License

This project is licensed under the [MIT License](LICENSE.md) - see the LICENSE file for details.

## Contributing

We welcome contributions to Notify Hub! Here are some ways you can help:

1. **Report Bugs** - Found a bug? Please create an issue with detailed information
2. **Suggest Features** - Have an idea? Open a feature request issue
3. **Submit Pull Requests** - Fix bugs or add features and submit a PR
4. **Improve Documentation** - Help make the docs better for everyone

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Good First Issues

Look for issues labeled `good first issue` to get started with contributing to the project.

## Acknowledgments

- **AdonisJS Community** - For the excellent framework and comprehensive documentation
- **Inertia.js Team** - For creating the modern monolith approach that makes full-stack development seamless
- **React Team** - For the powerful and flexible UI library
- **Tailwind CSS** - For the utility-first CSS framework that accelerates development
- **GrapesJS** - For the powerful visual page builder that makes template creation intuitive
- **Lucide** - For the beautiful and consistent icon library

---

**Built with ❤️ using modern web technologies**
