import pg from "pg";
import { db } from "../db/config.js";

const pool = new pg.Pool(db);

export default pool;
