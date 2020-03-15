import { RequestHandler } from "express";

export const renderDocument: RequestHandler = (req, res, next) => {
  res.render('index')
};
