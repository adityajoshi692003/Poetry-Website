# Indian Peacock Poetry Portfolio

A personal poetry portfolio website built with the MERN stack and shaped as a modern literary archive inspired by ancient Indian manuscripts and the refined colors of the peacock.

## Overview

This project presents a single poet's digital archive with:

- A richly atmospheric editorial homepage
- Searchable poem and collection archives
- Individual poem and collection detail pages
- A featured literary book section
- Video and gallery storytelling
- About and contact experiences
- Light and dark manuscript-inspired themes
- Secure contact form handling via Express

## Stack

- Frontend: React + Vite + React Router + Tailwind CSS + Framer Motion + Axios
- Backend: Node.js + Express + MongoDB + Mongoose
- Database: MongoDB Atlas

## Folder structure

- frontend/ — React application and UI
- backend/ — Express API, models, routes, controllers, seed data

## Local development

### 1) Install dependencies

```bash
npm install
npm --prefix frontend install
npm --prefix backend install
```

### 2) Configure environment variables

Copy the example files and update values:

```bash
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env
```

### 3) Run the app

```bash
npm run dev
```

The frontend runs on http://localhost:5173 and the backend on http://localhost:5000.

## Frontend

```bash
cd frontend
npm install
npm run dev
```

## Backend

```bash
cd backend
npm install
npm run dev
```

## Seed data

```bash
cd backend
npm run seed
```

This adds sample poems, collections, book, videos and gallery content for development.

## MongoDB Atlas setup

Create or use an existing Atlas cluster and add the connection string to backend/.env:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database>?retryWrites=true&w=majority
```

Do not commit .env files to version control.

## API

Public read-only API endpoints include:

- GET /api/poems
- GET /api/poems/:slug
- GET /api/collections
- GET /api/collections/:slug
- GET /api/books
- GET /api/books/featured
- GET /api/videos
- GET /api/gallery
- POST /api/contact

This project is a personal literary portfolio and not a public CRUD platform.

## Production notes

- Use environment variables for secrets and connection strings.
- Build the frontend with `npm --prefix frontend run build`.
- Deploy backend and frontend separately or behind a reverse proxy.
- Keep MongoDB Atlas credentials private.

## Git / GitHub

```bash
git init
git add .
git commit -m "Initial poetry portfolio project"
git branch -M main
git remote add origin <your-repository-url>
git push -u origin main
```
