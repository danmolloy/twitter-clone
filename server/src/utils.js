const jwt = require('jsonwebtoken');
const APP_SECRET = 'GraphQL-is-aw3some';

function getTokenPayload(token) {
  return jwt.verify(token, APP_SECRET);
}

function getUser(req, authToken) {
  
  if (req) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.replace('Bearer ', '');
      if (!token) {
        throw new Error('No token found');
      }
      const user = getTokenPayload(token);

      return user;
    }
  } else if (authToken) {
    const user = getTokenPayload(authToken);
    
    return user;
  }

  throw new Error('Not authenticated');
}

module.exports = {
  APP_SECRET,
  getUser
};