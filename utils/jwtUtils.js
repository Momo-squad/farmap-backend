import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const { JWT_SECRET_ADMIN, JWT_SECRET_USER, JWT_SECRET_SELLER } = process.env;

let jwtUtils;

export default jwtUtils = {
  generateToken(userData) {
    let role = userData.role;

    const payload = {
      id: userData._id,
      username: userData.username,
      email: userData.email,
      role
    };
    let token;

    if(role === "admin") {
      token = jwt.sign(payload, JWT_SECRET_ADMIN, { expiresIn: "7d" });
    } 

    if(role === "user") {
      token = jwt.sign(payload, JWT_SECRET_USER, { expiresIn: "7d" });
    }

    if(role === "seller") {
      token = jwt.sign(payload, JWT_SECRET_SELLER, { expiresIn: "7d" });
    }

    return token;
  },
  verifyToken(token, role) {

    let secret;

    if(role == "admin") {
      secret = JWT_SECRET_ADMIN
    }

    if(role === "user") {
      secret = JWT_SECRET_USER
    }

    if(role === "seller") {
      secret = JWT_SECRET_SELLER
    }

    jwt.verify(token, secret, (err, payload) => {
      if (err) {
        return false;
      }

      return payload;
    });
  },
};
