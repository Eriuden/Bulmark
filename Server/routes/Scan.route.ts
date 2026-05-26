import { Router } from "express";
import { scanWebsiteController } from "../controllers/Scan.controller";/scan.controller";

const router = Router();

router.post("/", scanWebsiteController);

export default router;