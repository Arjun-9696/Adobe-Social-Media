const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const Post = require('../models/postModel');

// Create a new user
router.post('/users', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Retrieve a user by id
router.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.send(user);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Update a user's name or bio by id
router.put('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { name: req.body.name, bio: req.body.bio, updated_at: Date.now() },
            { new: true }
        );
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.send(user);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Delete a user by id
router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.send(user);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Retrieve the total number of users
router.get('/analytics/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json({ users });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Retrieve the top 5 most active users, based on the number of posts.
router.get('/analytics/users/top-active', async (req, res) => {
    try {
        const users = await User.aggregate([
            {
                $lookup: {
                    from: 'posts',
                    localField: '_id',
                    foreignField: 'user_id',
                    as: 'posts'
                }
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    email: 1,
                    bio: 1,
                    created_at: 1,
                    updated_at: 1,
                    post_count: { $size: '$posts' }
                }
            },
            {
                $sort: { post_count: -1 }
            },
            {
                $limit: 5
            }
        ]);
        res.json({ users });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/* Post Endpoints:
 Create a new post. The request should include the user_id. */
router.post('/posts', async (req, res) => {
    try {
        const { user_id, content } = req.body;
        const post = new Post({ user_id, content });
        await post.save();
        res.status(201).json(post);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Retrieve a post by id
router.get('/posts/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) throw new Error('Post not found');
        res.json(post);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
});

// Update a post's content by id
router.put('/posts/:id', async (req, res) => {
    try {
        const { content } = req.body;
        const post = await Post.findByIdAndUpdate(
            req.params.id,
            { content, updated_at: Date.now() },
            { new: true }
        );
        if (!post) throw new Error('Post not found');
        res.json(post);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
});

// Delete a post by id
router.delete('/posts/:id', async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) throw new Error('Post not found');
        res.json({ message: 'Post deleted' });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
});

// Increment the like count of a post by id
router.post('/posts/:id/like', async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(
            req.params.id,
            { $inc: { likes: 1 } },
            { new: true }
        );
        if (!post) throw new Error('Post not found');
        res.json(post);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
});

// Decrement the like count of a post by id
router.post('/posts/:id/unlike', async (req, res) => {
    try {
        const postA = await Post.findById(req.params.id);
        if (!postA) {
            return res.status(404).send({ message: 'Post not found' });
        }
        if (postA.likes > 0) {
            const post = await Post.findByIdAndUpdate(
                req.params.id,
                { $inc: { likes: -1 } },
                { new: true }
            );
            if (!post) throw new Error('Post not found');
            res.json(post);
        }
        else {
            res.status(404).json({ message: "0 likes" });
        }

    } catch (err) {
        res.status(404).json({ message: err.message });
    }
});

// Retrieve the total number of posts.
router.get('/analytics/posts', async (req, res) => {
    try {
        const count = await Post.find();
        res.json({ count });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Retrieve the top 5 most liked posts.
router.get('/analytics/posts/top-liked', async (req, res) => {
    try {
        const posts = await Post.find().sort({ likes: -1 }).limit(5);
        res.json({ posts });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;