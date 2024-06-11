const express = require('express');
const userRouter = require("./user")
const accountRouter = require("./account");
const cors = require("cors")
const zod = require("zod");
const  { authMiddleware } = require("../middleware");

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

router.put("/", authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body)
    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }

	await User.updateOne({ _id: req.userId }, req.body);
    res.json({
        message: "Updated successfully"
    })
})

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                '$regex': filter
            }
        }, {
           lastName: {
                '$regex': filter
           } 
        }]
    })
    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})


module.exports = router;