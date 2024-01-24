import pg from "pg";
import { db } from "../db/config.js";

export const pool = new pg.Pool(db);
