const express = require("express");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken"); // We'll use JWT for authentication tokens
const User = require("../models/user"); // UserSchema models directory
const authenticate = require("../middleware/authenticate");

const router = express.Router();

// Signup route
router.post("/signup", async (req, res) => {
    try {
        // Synchronous Hashing
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });

        const savedUser = await user.save();
        res.status(201).send({ userId: savedUser._id });
    } catch (error) {
        res.status(500).send(error);
    }
});

// Login route
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).send({ error: "Invalid login credentials" });
        }
        const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);

        if (!isPasswordValid) {
            return res.status(400).send({ error: "Invalid login credentials" });
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        res.send({ token });
    } catch (error) {
        res.status(500).send(error);
    }
});

// Fetch user profile
router.get("/profile", authenticate, async (req, res) => {
  try {
    // In a real-world scenario, you'd use the user's ID (from the JWT token) to fetch the profile
    const user = await User.findById(req.user._id); // Assuming you have middleware to set req.user
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update user profile
router.patch("/profile", authenticate, async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();

    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
