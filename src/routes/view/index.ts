import { Router, RequestHandler } from "express";

const router = Router();

const getTodos: RequestHandler =  (req, res, next) => {
  res.status(200).send("Hello World");
};

router.get("/", getTodos);

export default router;
