import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const { JWT_SECRET } = process.env;

let jwtUtils;

export default jwtUtils = {
  generateToken(userData) {
    const payload = {
      id: userData._id,
      username: userData.username,
      email: userData.email,
    };
    let token = jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });

    return token;
  },
  verifyToken(token) {
    jwt.verify(token, JWT_SECRET, (err, payload) => {
      if (err) {
        return false;
      }

      return payload;
    });
  },
};
