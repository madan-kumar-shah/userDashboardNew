# User Dashboard Application

## Overview
This Angular application provides a **User Dashboard** where users can be added through a lazy-loaded popup form. The dashboard displays a dynamic table with user data and a Chart.js pie chart representing the distribution of user roles (Admin, Editor, Viewer). The table and the chart are updated in real time when new users are added. The application is optimized using lazy loading for performance improvement, and RxJS is used to manage asynchronous state updates.

## Features
- **User Table**: Displays a table with user information including Name, Email, and Role.
- **Role Distribution Chart**: Displays a dynamic pie chart using Chart.js, which shows the distribution of user roles (Admin, Editor, Viewer).
- **Add User Popup**: A lazy-loaded modal form that allows adding a new user by filling in Name, Email, and Role. The modal is validated before submission.
- **Real-Time Updates**: The table and pie chart update in real-time as new users are added.
- **Lazy Loading**: The UserFormComponent (add user form) and Chart.js library are loaded lazily to improve app performance.
- **RxJS**: State management for users is handled via **RxJS BehaviorSubject**, allowing smooth updates of user data across the application.

## Technologies Used
- **Angular (14+)**: Front-end framework used to build the application.
- **Chart.js**: A library for rendering the pie chart.
- **RxJS**: For state management and asynchronous operations.
- **Angular Material**: For UI components like buttons, tables, and modals.
- **Lazy Loading**: For lazy loading of the user form and chart to optimize performance.

## Getting Started

### Prerequisites
Before you begin, make sure you have the following installed on your machine:
- **Node.js** (v14 or higher)
- **Angular CLI** (v12 or higher)
  
### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/user-dashboard.git
   cd user-dashboard
   
2.Install dependencies:
npm install

3.Run the development server:
ng serve

4.Open your browser and navigate to:
http://localhost:4200
