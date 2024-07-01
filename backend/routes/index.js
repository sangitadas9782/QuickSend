const express = require('express');
const userRouter = require("./user")
const accountRouter = require("./account");
const cors = require("cors")
const zod = require("zod");
const  { authMiddleware } = require("../middleware");
const { User } = require('../db');

const app = express();
const router = express.Router();


router.use("/user", userRouter);
router.use("/account", accountRouter);

app.use(cors());
app.use(express.json());

const updateBody = zod.object({
	password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

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