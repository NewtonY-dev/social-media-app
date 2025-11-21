## Social Media App – MERN stack client/server with basic auth, posts, and media upload

- A React (Vite) client with routing and MUI, and an Express/MongoDB API for authentication, users, posts, and file uploads.

## Table of Contents

- [Badges](#badges)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Run Locally](#run-locally)
- [Usage / Examples](#usage--examples)
- [Build & Deployment](#build--deployment)
- [Project Structure](#project-structure)
- [API Reference](#api-reference)
- [Environment / Configuration](#environment--configuration)
- [Contributing](#contributing)
- [License](#license)
- [Troubleshooting & FAQ](#troubleshooting--faq)
- [Changelog / Versioning](#changelog--versioning)
- [Contact / Maintainers](#contact--maintainers)
- [MISSING INFO](#missing-info)

## Badges

<!-- Suggested placeholders (replace once available)
[![Build](https://github.com/https://github.com/NewtonY-dev/social-media-app/actions/workflows/ci.yml/badge.svg)](https://github.com/https://github.com/NewtonY-dev/social-media-app/actions)
[![Coverage](https://img.shields.io/codecov/c/github/https://github.com/NewtonY-dev/social-media-app)](https://codecov.io/gh/https://github.com/NewtonY-dev/social-media-app)
-->

- License: ISC

## Features

- Express API with routes:
  - Auth: `POST /api/auth/register`, `POST /api/auth/login`
  - Users: `PUT /api/users/:id`, `DELETE /api/users/:id`, `GET /api/users?userId=...|username=...`, `GET /api/users/friends/:userId`, `PUT /api/users/:id/follow`, `PUT /api/users/:id/unfollow`
  - Posts: `POST /api/posts`, `PUT /api/posts/:id`, `DELETE /api/posts/:id`, `PUT /api/posts/:id/like`, `GET /api/posts/:id`, `GET /api/posts/timeline/:userId`, `GET /api/posts/profile/:username`
  - Uploads: `POST /api/upload` (multipart, field name: `file`), static files served under `/images/...`
- MongoDB models: `User`, `Post`
- Client app:
  - React (Vite) with React Router and MUI
  - Dev server proxy for API requests to `http://localhost:8800` via `/api`
  - Scripts for dev, build, preview, and linting

## Getting Started

### Prerequisites

- Node.js (modern version supporting ES Modules; exact version not specified)
- MongoDB instance/connection string

### Installation

From the repository root, install client and server dependencies:

```bash
# client
cd client
npm install

# server
cd ../server
npm install
```

### Environment Variables

Create a `.env` file in `server/` with:

```bash
# Required by server/index.js
MONGO_URL="mongodb://localhost:27017/your-db-name"
```

Optional: the server currently listens on port 8800 (hardcoded).

### Run Locally

Start the API server and the client in separate terminals:

```bash
# terminal 1 - API server
cd server
npm start  # uses nodemon index.js

# terminal 2 - client
cd client
npm run dev
```

Client dev server proxies `/api` to `http://localhost:8800`.

## Usage / Examples

- Register

```bash
curl -X POST http://localhost:8800/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"alice","email":"alice@example.com","password":"secret"}'
```

- Login

```bash
curl -X POST http://localhost:8800/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","password":"secret"}'
```

- Get user by ID or username

```bash
# by id
curl "http://localhost:8800/api/users?userId=USER_ID"

# by username
curl "http://localhost:8800/api/users?username=alice"
```

- Follow / Unfollow

```bash
curl -X PUT http://localhost:8800/api/users/TARGET_USER_ID/follow \
  -H "Content-Type: application/json" \
  -d '{"userId":"CURRENT_USER_ID"}'

curl -X PUT http://localhost:8800/api/users/TARGET_USER_ID/unfollow \
  -H "Content-Type: application/json" \
  -d '{"userId":"CURRENT_USER_ID"}'
```

- Create post

```bash
curl -X POST http://localhost:8800/api/posts \
  -H "Content-Type: application/json" \
  -d '{"userId":"CURRENT_USER_ID","desc":"hello world"}'
```

- Like/Dislike post

```bash
curl -X PUT http://localhost:8800/api/posts/POST_ID/like \
  -H "Content-Type: application/json" \
  -d '{"userId":"CURRENT_USER_ID"}'
```

- Upload image (saved under `server/public/images/` and served at `/images/<filename>`)

```bash
curl -X POST http://localhost:8800/api/upload \
  -F "file=@/path/to/local/image.jpg"
```

## Build & Deployment

### Client build

```bash
cd client
npm run build
npm run preview  # locally preview build
```

### Server

- No build step; run with Node (script uses `nodemon index.js` during development).

### CI

- No CI configuration found.
<!-- Suggested: Add a GitHub Actions workflow to install, build client, and run server checks. See example at the end. -->

## Project Structure

```
social-media-app/
  client/
    src/            # React app (components, pages, context)
    vite.config.js  # Dev server proxy for /api -> http://localhost:8800
    package.json    # dev, build, preview, lint scripts
  server/
    index.js        # Express app, routes, MongoDB connection, upload handling
    routes/         # auth.js, users.js, posts.js
    models/         # User.js, Post.js (Mongoose schemas)
    public/images/  # Uploaded files (served at /images)
  .gitignore
  README.md
```

## API Reference

- Base URL: `http://localhost:8800/api`

### Auth

- POST `/auth/register` — create a user
- POST `/auth/login` — authenticate user

### Users

- PUT `/users/:id` — update user (requires `userId` in body matching `:id` or `isAdmin`)
- DELETE `/users/:id` — delete user (requires `userId` or `isAdmin`)
- GET `/users?userId=...|username=...` — fetch user (excludes sensitive fields)
- GET `/users/friends/:userId` — list friend summaries
- PUT `/users/:id/follow` — follow a user (requires `userId` in body)
- PUT `/users/:id/unfollow` — unfollow a user (requires `userId` in body)

### Posts

- POST `/posts` — create post
- PUT `/posts/:id` — update post (must be owner)
- DELETE `/posts/:id` — delete post (must be owner)
- PUT `/posts/:id/like` — like/dislike post
- GET `/posts/:id` — fetch post by id
- GET `/posts/timeline/:userId` — user timeline + followings
- GET `/posts/profile/:username` — posts by username

### Uploads

- POST `/upload` — multipart upload; returns `{ filename }`
- Static: `GET /images/<filename>`

All endpoints return JSON. Some checks rely on body fields such as `userId` and `isAdmin`. Authentication/authorization tokens are not present in the provided code.

## Environment / Configuration

- `MONGO_URL` (required): MongoDB connection string, e.g. `mongodb://localhost:27017/social_media`
- Port: API listens on `8800` (hardcoded).
- Upload directory: `server/public/images` (created automatically if present on disk; ensure it exists in production).

## Contributing

- Fork and create a feature branch
- Keep changes focused and documented
- Run linters and builds where applicable
- Open a PR with:
  - Clear description and rationale
  - Screenshots or curl examples if touching API/UX
  - Notes on any migrations or env changes
  - Checklist: builds pass, lint passes, README updated if needed

## License

ISC

## Troubleshooting & FAQ

- MongoDB connection fails: verify `MONGO_URL` in `server/.env` and that MongoDB is reachable.
- 404/Proxy issues in client dev: ensure client requests use `/api/...` so Vite proxy forwards to `http://localhost:8800`.
- Uploads not accessible: confirm files are saved to `server/public/images` and accessed via `/images/<filename>`.

## Changelog / Versioning

- Recommended: Semantic Versioning (MAJOR.MINOR.PATCH).
- Start CHANGELOG entries with date, version, and brief notes.

## Contact / Maintainers

- Author: Newton Yetsedaw
- Contact: yetsedawn@gmail.com

## MISSING INFO

- Node.js version(s) supported — add exact version (e.g., “>=18.0”).
- Production start command for server — script uses `nodemon` (dev). Suggest adding `"start": "node index.js"` and a separate `"dev": "nodemon index.js"`.
- Authentication strategy beyond bcrypt checks — no tokens/sessions present. Specify if/when added.
- CORS policy — not present; add details if needed for non-proxied clients.
- Deployment steps (Dockerfile, hosting, envs) — none provided; add instructions.
- Tests — none detected; add test framework and commands if applicable.
- Contact details and repository links for badges — https://github.com/NewtonY-dev and yetsedawn@gmail.com.

---


