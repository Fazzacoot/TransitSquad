import express, { Request, Response, NextFunction } from "express";
import { json } from "body-parser";

import viewRoutes from "./routes/view";
import apiRoutes from "./routes/api";

const app = express();

app.use(json());

app.use("/", viewRoutes);
app.use("/api/v1", apiRoutes);

//Error handling function
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

app.listen(3000, () => {
  console.log("listining on port 3000");
});

export default app;