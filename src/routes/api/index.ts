import { Router, RequestHandler } from "express";
import { searchGitUser } from "../../controllers/api";

const router = Router();

router.get("/", searchGitUser);

router.post("/", searchGitUser);

export default router;
