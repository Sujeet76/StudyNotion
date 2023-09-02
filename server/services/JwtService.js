import jwt from "jsonwebtoken"

import { JWT_SECRETE } from "../config/index.js";

class JwtService{
  static sign(payload,expiry = "60s",secret = JWT_SECRETE){
    return jwt.sign(payload,secret,{expiresIn : expiry})
  }
  static verify(token,secret = JWT_SECRETE){
    return jwt.verify(token,secret);
  }
}

export default JwtService;