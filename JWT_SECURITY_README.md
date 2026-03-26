# JWT Security Implementation

This document outlines the JWT (JSON Web Token) security implementation for the Interview Q&A Practice application.

## Security Features Implemented

### 1. Environment Variables
- JWT secrets are stored in environment variables instead of hardcoded values
- Separate secrets for access tokens and refresh tokens
- Configurable token expiration times

### 2. Token Expiration
- Access tokens expire in 24 hours
- Refresh tokens expire in 7 days
- Automatic token refresh mechanism

### 3. Password Security
- Passwords hashed with bcrypt (12 rounds)
- Minimum password length of 8 characters
- Input validation for email format

### 4. Rate Limiting
- Basic rate limiting on authentication endpoints
- 5 attempts per 15-minute window per IP
- Prevents brute force attacks

### 5. Secure Token Storage
- Frontend uses AuthManager class for secure token handling
- Automatic token refresh on API calls
- Secure logout that invalidates tokens on server

### 6. Database Security
- Refresh tokens stored in database for validation
- Unique constraints prevent token duplication
- Proper foreign key relationships

## Setup Instructions

### 1. Environment Configuration
Create a `.env` file in the `backend/` directory:

```env
# JWT Configuration
JWT_SECRET=your-super-secure-jwt-secret-key-change-this-in-production-minimum-32-characters
JWT_EXPIRES_IN=24h
REFRESH_TOKEN_SECRET=your-super-secure-refresh-token-secret-key-change-this-too-minimum-32-characters
REFRESH_TOKEN_EXPIRES_IN=7d

# Server Configuration
PORT=5000
FRONTEND_URL=http://localhost:3000

# Database Configuration
NODE_ENV=development
```

### 2. Install Dependencies
```bash
cd backend
npm install
```

### 3. Start the Server
```bash
npm start
```

## API Endpoints

### Authentication Endpoints
- `POST /auth/register` - User registration with JWT token response
- `POST /auth/login` - User login with JWT token response
- `POST /auth/refresh` - Refresh access token using refresh token
- `POST /auth/logout` - Logout and invalidate refresh token
- `GET /auth/user/:id` - Get user profile (protected)

### Protected Endpoints
All quiz-related endpoints require valid JWT tokens:
- `GET /categories`
- `GET /levels/:categoryId`
- `GET /questions/:levelId`
- `POST /submit-quiz`
- `GET /badges/:userId`
- `GET /progress/:userId`

## Security Best Practices

### For Production Deployment

1. **HTTPS Only**: Always use HTTPS in production
2. **Secure Cookies**: Consider using httpOnly cookies instead of localStorage
3. **CORS Configuration**: Restrict CORS to your domain only
4. **Environment Variables**: Never commit secrets to version control
5. **Regular Updates**: Keep dependencies updated for security patches
6. **Monitoring**: Implement logging and monitoring for security events

### Token Security
- Access tokens have short expiration (24 hours)
- Refresh tokens have longer expiration (7 days) but are validated against database
- Tokens are invalidated on logout
- Automatic refresh prevents user disruption

### Password Security
- Minimum 8 characters
- Hashed with bcrypt (12 rounds)
- No plaintext password storage

## Frontend Security

The frontend uses an `AuthManager` class that provides:
- Secure token storage and retrieval
- Automatic token refresh
- Authenticated API calls
- Secure logout functionality

## Database Schema

New table added for refresh token storage:
```sql
CREATE TABLE refresh_tokens (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  token TEXT UNIQUE NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

## Testing Security

### Manual Testing
1. Try accessing protected endpoints without tokens
2. Test token expiration behavior
3. Verify logout invalidates tokens
4. Test rate limiting on login attempts
5. Verify password requirements

### Automated Testing
Consider adding tests for:
- Token validation
- Refresh token flow
- Rate limiting
- Password hashing
- Input validation

## Security Considerations

### Current Limitations
- localStorage is vulnerable to XSS attacks (mitigate with Content Security Policy)
- No CSRF protection (JWT helps but consider additional measures)
- Basic rate limiting (consider Redis for production)
- No account lockout mechanism

### Future Enhancements
- Implement httpOnly cookies for token storage
- Add CSRF tokens
- Implement account lockout after failed attempts
- Add two-factor authentication
- Implement audit logging
- Add security headers (Helmet.js)

## Troubleshooting

### Common Issues
1. **Token expired**: Frontend should automatically refresh
2. **CORS errors**: Check FRONTEND_URL in .env
3. **Database errors**: Ensure refresh_tokens table exists
4. **Rate limiting**: Wait 15 minutes or use different IP

### Debug Mode
Set `NODE_ENV=development` for detailed error messages.