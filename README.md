# MERN Thinkboard

A full-stack note-taking application built with the MERN stack (MongoDB, Express.js, React, Node.js). It features rate limiting, a modern UI with Tailwind CSS, and a RESTful API for managing notes.

## Features
- Create, view, and manage notes
- Rate limiting to prevent abuse
- Responsive and modern UI (Tailwind CSS)
- RESTful API (Express.js)
- MongoDB for persistent storage

## Project Structure
```
backend/
  src/
    server.js           # Express server entry point
    config/             # Database and Upstash config
    controllers/        # API controllers
    middleware/         # Rate limiter
    models/             # Mongoose models
    routes/             # API routes
frontend/
  src/
    App.jsx             # Main React app
    components/         # UI components
    pages/              # Page components
    lib/                # Axios and utilities
  public/               # Static assets
```

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB (local or Atlas)

### Backend Setup
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables (e.g., MongoDB URI) in a `.env` file.
4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm run dev
   ```

## API Endpoints
- `GET /api/notes` - Get all notes
- `POST /api/notes` - Create a new note
- `GET /api/notes/:id` - Get a note by ID
- `DELETE /api/notes/:id` - Delete a note

## Technologies Used
- **Frontend:** React, Vite, Tailwind CSS, Axios
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Other:** Upstash (rate limiting)

## Screenshots
![Home Page](./screenshots/HomePage.PNG)
![Create Note](./screenshots/CreatePage.PNG)
![Note Detail Page](./screenshots/NoteDetailPage.PNG)
![Notes Not Found](./screenshots/NotesNotFound.PNG)


## License
MIT
