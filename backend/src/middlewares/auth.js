// backend/src/middlewares/auth.js
const { CognitoJwtVerifier } = require("aws-jwt-verify");

const verifier = CognitoJwtVerifier.create({
  userPoolId: process.env.COGNITO_USER_POOL_ID,
  tokenUse: "id", // use "access" if that's what your clients send
  clientId: process.env.COGNITO_CLIENT_ID
});

const authenticate = async (req, res, next) => {
  try {
    const token = (req.headers.authorization || "").replace(/^Bearer\s+/i, "");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authorization header is required"
      });
    }

    await verifier.verify(token);

    req.churchId = process.env.CHURCH_ID;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token"
    });
  }
};

module.exports = authenticate;
