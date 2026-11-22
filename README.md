#  Poetry Portfolio

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
npm run validate-seed
npm run seed
```

`validate-seed` checks model requirements, collection mappings, and public image paths without connecting to MongoDB.
`seed` replaces the collections, poems, books, videos and gallery records in the configured database. It runs those changes in a transaction; MongoDB must support transactions (as Atlas does). Contact messages and visitor counts are preserved, while poem likes are cleared with the reseeded poems.

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

### Deploy both services to Render

The root `render.yaml` defines the API web service and the frontend static site, including a rewrite for React Router URLs.

1. Create a MongoDB Atlas database and a database user. Configure Atlas Network Access to allow connections from your hosting provider.
2. In Render, create a Blueprint from this repository and deploy both services.
3. Set `MONGO_URI` for `poetry-portfolio-api` in Render to the Atlas connection string. Keep this value private.
4. Set `VITE_API_URL` for `poetry-portfolio-web` to the API's public URL followed by `/api`, for example `https://<your-api-host>/api`. This is a build-time setting; redeploy the frontend after changing it.
5. Before loading production data, run `npm --prefix backend run validate-seed`. After it passes, run `npm --prefix backend run seed` with the production `MONGO_URI` configured. **Seeding replaces the poems, collections, books, videos and gallery records in that database.**
6. Confirm `https://<your-api-host>/api/health` returns `{"status":"ok"}`, then open the frontend URL and test direct navigation to a poem or collection URL.

Render serves the frontend over HTTPS and the API health check uses `/api/health`. Add a custom domain to the static site in Render when desired.

## Git / GitHub

```bash
git init
git add .
git commit -m "Initial poetry portfolio project"
git branch -M main
git remote add origin <your-repository-url>
git push -u origin main
```
