import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const { JWT_SECRET } = process.env;

let jwtUtils;

export default jwtUtils = {
  generateToken(userData) {
    let role = userData.role;

    const payload = {
      id: userData._id,
      username: userData.username,
      email: userData.email,
      role,
    };

    let token = jwt.sign(payload, JWT_SECRET);

    return token;
  },
  verifyToken(token) {
    let isVerified = true;
    let data = {};

    jwt.verify(token, JWT_SECRET, (err, payload) => {
      if (err) {
        isVerified = false;
      }

      data = payload;
    });

    if (!isVerified) return false;

    return data;
  },
};
