import { Router, RequestHandler } from "express";
import { searchGitUser } from "../../controllers/api";

const router = Router();

router.post("/", searchGitUser);

export default router;
