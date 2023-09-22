# Task Management API

## Introduction
This is a Task Management API developed using Node.js and Express.js, allowing users to manage and track tasks effectively. With user authentication, task assignments, notifications, and more, this API provides comprehensive task management features.

## Features

- **User Authentication**: Register, log in, and manage your profile seamlessly.
- **Task Management**: CRUD operations for tasks. Tasks have attributes like title, description, due date, and status (e.g., "in progress," "completed," "pending").
- **Task Assignments**: Assign tasks to other users and keep track of these assignments.
- **Notifications**: Get notified about task assignments, updates, or approaching due dates.
- **Task Filtering and Sorting**: Retrieve tasks based on various parameters like due date, status, assigned user, and more.

## Endpoints

### User Related

- `/auth/signup` (POST): Endpoint to register a new user.
- `/auth/login` (POST): Endpoint for user login.

### Task Related

- `/tasks` (GET): Fetch all tasks for the authenticated user.
- `/tasks/:taskId` (GET): Retrieve details of a specific task.
- `/tasks` (POST): Create a new task.
- `/tasks/:taskId` (PUT): Update a specific task.
- `/tasks/:taskId` (DELETE): Delete a task.

### Notification Related

- `/notifications` (GET): Fetch all notifications for the authenticated user.
- `/notifications/:notificationId` (GET): Retrieve a specific notification.
- `/notifications` (POST): Create a new notification.
- `/notifications/:notificationId` (DELETE): Delete a notification.

## Setup

1. Clone the repository to your local machine.
2. Navigate to the project directory and install dependencies using `npm install`.
3. Ensure MongoDB is set up and running.
4. Use the `.env` file to manage environment variables like the database connection string and JWT secret.
5. Start the server using `npm start` or any preferred command as set in the `package.json`.

## Conclusion
This API is designed to offer comprehensive task management functionalities for developers and users. Built with best practices in mind, the code is modular and easy to understand. Expand on the API or use it as a starting point for more complex task management needs.

## Testing

To test the API, you can use tools like Postman or the provided Swagger documentation.

## Contribution

- Kashif Ali

## License

This project is licensed under the MIT License.
