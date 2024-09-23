const User = require('../../models/User');
const bcrypt = require('bcrypt');
const jwt = require('../../utils/jwtUtils');

class UserService {
    static async createUser(userData) {
        console.log('Creating user with data:', userData);
        const newUser = await User.create(userData);
        console.log('User created with ID:', newUser.id);
        return newUser;
    }

    static async loginUser(user_username, password) {
        console.log('Logging in user:', user_username);

        const user = await User.findByUsername(user_username);
        console.log('User found:', user);

        if (!user) {
            throw new Error('Invalid username or password');
        }

        console.log('Password entered:', password);
        console.log('Stored hashed password:', user.user_password);

        const isPasswordValid = await bcrypt.compare(password, user.user_password);
        if (!isPasswordValid) {
            throw new Error('Invalid username or password');
        }

        const token = jwt.generateToken(user);
        return user;
    }

    static async getUserProfile(userId) {
        console.log('Find profile for user ID:', userId);
        const userProfile = await User.findById(userId);
        if (!userProfile) throw new Error('User not found');
        return userProfile;
    }

    static async updateUserProfile(userId, updateData) {
        console.log('Updating user profile for ID:', userId);
        const updatedUser = await User.update(userId, updateData);
        if (!updatedUser) throw new Error('Update failed');
        return updatedUser;
    }

    static async deleteUser(userId) {
        console.log('Deleting user ID:', userId);
        const deleted = await User.delete(userId);
        if (!deleted) throw new Error('Delete failed');
        return deleted;
    }

    static async getAllUsers() {
        console.log('Fetching all users');
        const users = await User.getAll();
        return users;
    }
}

module.exports = UserService;
