import { Router } from "express";

import { contactUs } from "../controllers/index.js";

const contactRoute = new Router();

contactRoute.post("/contact", contactUs);

export default contactRoute;
