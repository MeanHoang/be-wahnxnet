const db = require('../config/db');

class User {
    //Create a new user
    static async create(userData) {
        const [result] = await db.promise().query('INSERT INTO users SET ?', userData);
        return { id: result.insertId, ...userData };
    }

    //Find one by ID
    static async findById(userId) {
        const [rows] = await db.promise().query('SELECT * FROM users WHERE user_id = ?', [userId]);
        return rows[0];
    }


    //Fìn one by username to login
    static async findByUsername(username) {
        const [rows] = await db.promise().query('SELECT * FROM users WHERE user_username = ?', [username]);
        console.log('Query result:', rows);
        return rows[0];
    }


    // Update user
    static async update(userId, updateData) {
        const [result] = await db.promise().query('UPDATE users SET ? WHERE user_id = ?', [updateData, userId]);
        return result.affectedRows > 0;
    }

    // Delete user
    static async delete(userId) {
        const [result] = await db.promise().query('DELETE FROM users WHERE user_id = ?', [userId]);
        return result.affectedRows > 0;
    }

    //Get all user
    static async getAll() {
        const [rows] = await db.promise().query('SELECT user_id, user_username, user_full_name FROM users');
        return rows;
    }

    static async login(username, password) {
        const [rows] = await db.promise().query('SELECT * FROM users WHERE user_username = ? AND user_password = ?', [username, password]);
        return rows[0];
    }
}

module.exports = User;
