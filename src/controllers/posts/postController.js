const postService = require('../../services/posts/postService');

exports.createPost = async (req, res) => {
    try {
        const post = await postService.createPost(req.body, req.user.id);
        res.status(201).json(post);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
