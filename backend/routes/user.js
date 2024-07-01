const express = require('express');
const router = express.Router();
const zod = require("zod");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const  { authMiddleware } = require("../middleware");

// signup
const signupBody = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()
});

const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
});

const updateBody = zod.object({
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
    password: zod.string().optional()
});

router.get("/me", authMiddleware, async (req, res) => {
    try {
        const userId = req.userId; 
        if (!userId) {
            return res.status(403).json({
                message: "Not logged in"
            });
        }
        const userDetails = await User.findById(userId);
        if (!userDetails) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        const accountDetails = await Account.findOne({ userId: userId });
        if (!accountDetails) {
            return res.status(404).json({
                message: "Account not found"
            });
        }
        res.json({
            user: {
                firstName: userDetails.firstName,
                lastName: userDetails.lastName,
                username: userDetails.username,
            },
            account: {
                balance: accountDetails.balance
            }
        });
    } catch (error) {
        console.error("Error in /me route:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/signup", async (req, res) => {
    try {
        const { success } = signupBody.safeParse(req.body);
        if (!success) {
            return res.status(400).json({
                message: "Invalid input"
            });
        }

        const existingUser = await User.findOne({
            username: req.body.username
        });

        if (existingUser) {
            return res.status(409).json({
                message: "Email already taken"
            });
        }

        const user = await User.create({
            username: req.body.username,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        });
        const userId = user._id;

        const account = await Account.create({
            userId,
            balance: 1 + Math.random() * 10000
        });

        const token = jwt.sign({ userId }, JWT_SECRET);

        res.status(201).json({
            message: "User created successfully",
            token: token,
            user: {
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
            },
            account: {
                balance: account.balance
            }
        });
    } catch (error) {
        console.error("Error in /signup route:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// signin

router.post("/signin", async (req, res) => {
    try {
        const { success } = signinBody.safeParse(req.body);
        if (!success) {
            return res.status(400).json({
                message: "Invalid input"
            });
        }

        const user = await User.findOne({
            username: req.body.username,
            password: req.body.password
        });

        if (!user) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET);
        res.json({
            message: "Logged in successfully",
            token: token,
            user: {
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username
            }
        });
        
    } catch (error) {
        console.error("Error in /signin route:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get("/bulk", authMiddleware, async (req, res) => {
    try {
        const filter = req.query.filter || "";

        const users = await User.find({
            $or: [{
                firstName: {
                    '$regex': filter,
                    '$options': 'i'
                }
            }, {
                lastName: {
                    '$regex': filter,
                    '$options': 'i'
                }
            }]
        }).select('username firstName lastName _id');

        res.json({
            users: users
        });
    } catch (error) {
        console.error("Error in /bulk route:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.put("/", authMiddleware, async (req, res) => {
    try {
        const { success } = updateBody.safeParse(req.body);
        if (!success) {
            return res.status(400).json({
                message: "Invalid input"
            });
        }

        await User.findByIdAndUpdate(req.userId, req.body);

        res.json({
            message: "Updated successfully"
        });
    } catch (error) {
        console.error("Error in PUT / route:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

 
module.exports = router;