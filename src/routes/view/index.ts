import { Router, RequestHandler } from "express";
import { renderDocument } from "../../controllers/view";

const router = Router();

router.get("/", renderDocument);

export default router;
