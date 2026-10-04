import { Router } from "express";
import { healthCheck } from "../controllers/healthcheck.controllers.js";

const router = Router();

router.get("/", healthCheck);

export default router; //SINCE THIS IS DEFAULT I CAN IMPROT IT IN WITH ANY NAME.
