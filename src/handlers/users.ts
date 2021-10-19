// #### Users

// - Index [token required]
// - Show [token required]
// - Create N[token required]

import express, { Request, Response } from "express";
import { User, UserStore } from "../models/user";

const store = new UserStore();

const index = async (req: Request, res: Response) => {
  const users = await store.index();
  res.json(users);
};

const create = async (req: Request, res: Response) => {
  try {
    const user = await store.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const user = await store.show(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};
