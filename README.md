### ChatGPT-Inspired Chat Application

This project is a full-stack chat application featuring a React frontend and a FastAPI backend. The app allows users to interact with a ChatGPT-like interface, save chat histories, and manage ideas. The backend communicates with OpenAI’s GPT API, with a fallback to random text responses.

### Features

- Frontend: Built with React and Material-UI.
- Backend: Developed using FastAPI.
- Data Storage:
  - Chat history and saved ideas are managed on the frontend using local storage.
  - ChatGPT responses are fetched from the backend. (fallback response if chatgpt did not work)
- Dockerized: Both frontend and backend are containerized using Docker for easy setup and deployment.

### Prerequisites

Docker and Docker Compose installed on your machine.
An OpenAI API key for GPT communication.
Getting Started

1.  Clone the Repository
    git clone https://github.com/yourusername/chatgpt-chat-app.git
    cd chatgpt-chat-app
2.  Environment Variables
    Create a <b>.env</b> file in the backend directory and add your OpenAI API key:

    `OPEN_API_KEY=your_openai_api_chatgpt4_key`

In the frontend directory, create a <b>.env</b> file and set the backend URL:

`REACT_APP_API_URL=http://localhost:8000`

3. Build and Run with Docker
   Build and Start Services

`docker compose up -d`

Stop and Remove Containers
To stop and clean up all containers:

`docker-compose down`

4. Access the Application
   - Frontend: Open http://localhost:3000.
   - Backend API: Open http://localhost:8000/docs for the interactive API documentation.
     Frontend Structure
     The frontend is a React app with the following key components:

Feel free to fork this repository, submit issues, or create pull requests to improve the project!

License
This project is open-source and available under the MIT License.
