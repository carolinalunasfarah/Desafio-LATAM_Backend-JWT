import pool from "../../../../config/db/connectionDB.js";
import bcrypt from "bcryptjs";

export const createUser = async (email, password, role, lenguage) => {
    const encriptedPassword = bcrypt.hashSync(password);
    const SQLquery = {
        text: "INSERT INTO users (email, password, role, lenguage) VALUES ($1, $2, $3, $4) RETURNING *;",
        values: [email, encriptedPassword, role, lenguage],
    };
    try {
        const response = await pool.query(SQLquery);
        return response.rows;
    } catch (error) {
        throw new Error("Error creating new user: " + error.message);
    }
};

export const displayUser = async (email) => {
    const SQLquery = {
        text: "SELECT * FROM users WHERE email = $1;",
        values: [email],
    };
    try {
        const response = await pool.query(SQLquery);
        return response.rows[0];
    } catch (error) {
        throw new Error("Error finding this user: " + error.message);
    }
};
