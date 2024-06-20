# Slidely-backend

# Introduction
Welcome to the Slidely-backend! This server application is designed to handle form submissions for the SlidelyFormApp. It provides endpoints for creating, reading, updating, deleting, and searching submissions. This guide will help you set up and run the server.

# Prerequisites
Node.js: Ensure you have Node.js installed on your system. You can download it from nodejs.org.
npm: Node Package Manager, which is installed automatically with Node.js.
Installation

# Clone the Repository:

Clone the repository to your local machine using:
bash
Copy code
git clone https://github.com/your-username/slidely-backend.git
Navigate into the project directory:
bash
Copy code
cd slidely-backend

# Install Dependencies:

Install the required dependencies by running:
bash
Copy code
npm install
Running the Server
Build the Project:

# Build the project by running:
npm run build

# Start the server by running:
npm start

The server should now be running and listening on port 3000 by default. You can access it at http://localhost:3000.
API Endpoints
The server provides the following API endpoints:

# Ping:

GET /ping
Response: true (to check if the server is running)

# Submit Form:

POST /submit
Request Body:
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "123-456-7890",
  "github_link": "https://github.com/johndoe",
  "stopwatch_time": "00:05:30"
}
Response: 200 OK on success or error message on failure

# Read Submission:

GET /read?index=<index>
Response: JSON object of the submission at the specified index

# Edit Submission:

PUT /edit/:index
Request Body:
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "123-456-7890",
  "github_link": "https://github.com/johndoe",
  "stopwatch_time": "00:05:30"
}
Response: 200 OK on success or error message on failure

# Delete Submission:

DELETE /delete/:index
Response: 200 OK on success or error message on failure

# Search Submission:

GET /search?email=<email>
Response: JSON array of submissions matching the provided email

# Data Storage

The server stores submissions in a db.json file in the project directory. Ensure this file is present and writable.
Troubleshooting
Server Not Starting: Ensure all dependencies are installed correctly. Check for any errors in the console and resolve them.
API Errors: Use tools like Postman to test the API endpoints. Check the server logs for detailed error messages.
Conclusion
You should now have the Slidely-backend server up and running, ready to handle requests from the SlidelyFormApp.
