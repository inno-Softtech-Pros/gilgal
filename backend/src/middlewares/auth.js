const { CognitoJwtVerifier } = require("aws-jwt-verify");

const verifier = CognitoJwtVerifier.create({
  userPoolId: process.env.COGNITO_USER_POOL_ID,
  tokenUse: "id", // use "access" if that's what your clients send
  clientId: process.env.COGNITO_CLIENT_ID,
});

const authenticate = async (req, res, next) => {
  try {
    const token = (req.headers.authorization || "").replace(/^Bearer\s+/i, "");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authorization header is required",
      });
    }

    const payload = await verifier.verify(token);

    // Confirm the exact claim name with your colleague
    const churchId = payload["custom:churchId"];

    if (!churchId) {
      return res.status(403).json({
        success: false,
        message: "No church associated with this user",
      });
    }

    req.churchId = churchId;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

module.exports = authenticate;