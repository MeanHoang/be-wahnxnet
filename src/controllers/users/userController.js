const userService = require('../../services/users/userServices')
const jwt = require('../../utils/jwtUtils');

const registerUser = async (req, res) => {
    try {
        const userData = req.body;
        const newUser = await userService.createUser(userData);
        const token = jwt.generateToken(newUser);
        res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await userService.loginUser(username, password);
        const token = jwt.generateToken(user);
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

const getUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        console.log('User ID from token:', userId);
        const userProfile = await userService.getUserProfile(userId);
        res.status(200).json(userProfile);
    } catch (error) {
        console.error('Error find user profile:', error.message);
        res.status(404).json({ error: error.message });
    }
};

const updateUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        console.log(">>> check req.body: ", req.body);
        const updatedUser = await userService.updateUserProfile(userId, req.body);
        res.status(200).json({ message: 'User profile updated successfully', user: updatedUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const userId = req.user.id;
        await userService.deleteUser(userId);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
    deleteUser,
    getAllUsers,
};
