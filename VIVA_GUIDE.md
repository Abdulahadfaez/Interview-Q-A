# Viva Guide

## Project Summary

Interview Q&A Practice is a full-stack learning platform built with:
- Frontend: HTML, CSS, vanilla JavaScript
- Backend: Node.js, Express
- Database: SQLite
- Authentication: JWT with refresh tokens

## Key Features

- User registration and login
- Category-based learning dashboard
- Level unlocking workflow
- Quiz submission and scoring
- Badge and progress tracking
- Search, filtering, pagination, loaders, and toast notifications

## Architecture Explanation

1. The frontend is a lightweight static UI that uses `fetch` to call backend APIs.
2. The backend manages authentication, quiz logic, progress tracking, and data storage.
3. SQLite stores users, categories, levels, questions, progress, badges, and refresh tokens.
4. In production, Express can also serve the frontend for same-origin deployment.

## Performance Notes

- Added SQLite indexes for the most-used query paths.
- Reduced repeated frontend work by filtering and paginating categories client-side.
- Prepared same-origin deployment to remove avoidable cross-origin overhead in production.

## Testing Notes

- Added API smoke tests for `/health` and `/categories`.
- Added GitHub Actions CI to run tests on push and pull requests.

## Deployment Notes

- Added Render blueprint config in `render.yaml`.
- Added CI/CD-ready deploy hook support in GitHub Actions.
- SQLite is configured to use a persistent Render disk through `DB_PATH`.

## Common Viva Questions

1. Why did you choose SQLite?
   It is simple to set up, fast for small-to-medium projects, and suitable for a student project with structured relational data.

2. How is authentication handled?
   The app uses JWT access tokens for API requests and refresh tokens stored in the database for session renewal.

3. How is progress tracked?
   Each quiz submission updates `user_progress`, and passing a level also creates a badge and unlocks the next level in the same category.

4. What improvements were made for evaluation quality?
   I added UI feedback, category search/filter/pagination, database indexes, API tests, CI, Render deployment support, and Postman API documentation.
