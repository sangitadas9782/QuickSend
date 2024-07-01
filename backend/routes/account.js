const express = require('express');
const { authMiddleware } = require('../middleware');
const { Account, User, Transaction } = require('../db');
const { default: mongoose } = require('mongoose');

const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
    const account = await Account.findOne({
        userId: req.userId
    });

    res.json({
        balance: account.balance
    })
});

router.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();
        const { amount, to } = req.body;

        const account = await Account.findOne({ userId: req.userId }).session(session);
        if (!account || account.balance < amount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Insufficient balance"
            });
        }

        const toAccount = await Account.findOne({ userId: to }).session(session);
        if (!toAccount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Invalid account"
            });
        }

        await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
        await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

        const newTransaction = new Transaction({
            userId: req.userId,
            amount: amount,
            type: 'debit',
            description: `Transfer to ${to}`
        });
        await newTransaction.save({ session });

        const recipientTransaction = new Transaction({
            userId: to,
            amount: amount,
            type: 'credit',
            description: `Received from ${req.userId}`
        });
        await recipientTransaction.save({ session });

        await session.commitTransaction();
        res.json({
            message: "Transfer successful"
        });
    } catch (error) {
        await session.abortTransaction();
        console.error('Transfer error:', error);
        res.status(500).json({ message: 'Internal server error' });
    } finally {
        session.endSession();
    }
});


router.get('/transactions', authMiddleware, async (req, res) => {
  try {
      const transactions = await Transaction.find({ userId: req.userId })
          .sort({ date: -1 })
          .limit(10)
          .populate('userId', 'firstName lastName')
          .lean();

      const formattedTransactions = transactions.map(t => ({
          id: t._id,
          amount: t.amount,
          type: t.type,
          description: t.description,
          date: t.date,
          userName: `${t.userId.firstName} ${t.userId.lastName}`
      }));

      res.json({ transactions: formattedTransactions });
  } catch (error) {
      console.error('Error fetching transactions:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;


// backend/routes/account.js

// const express = require('express');
// const { authMiddleware } = require('../middleware');
// const { Account } = require('../db');
// const { default: mongoose } = require('mongoose');

// const router = express.Router();

// router.get("/balance", authMiddleware, async (req, res) => {
//     const account = await Account.findOne({
//         userId: req.userId
//     });

//     res.json({
//         balance: account.balance
//     })
// });

// async function transfer(req) {
//     const session = await mongoose.startSession();

//     session.startTransaction();
//     const { amount, to } = req.body;

//     // Fetch the accounts within the transaction
//     const account = await Account.findOne({ userId: req.userId }).session(session);

//     if (!account || account.balance < amount) {
//         await session.abortTransaction();
//         console.log("Insufficient balance")
//         return;
//     }

//     const toAccount = await Account.findOne({ userId: to }).session(session);

//     if (!toAccount) {
//         await session.abortTransaction();
//         console.log("Invalid account")
//         return;
//     }

//     // Perform the transfer
//     await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
//     await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

//     // Commit the transaction
//     await session.commitTransaction();
//     console.log("done")
// }

// transfer({
//     userId: "65db1c8353ae0c4d05039d11",
//     body: {
//         to: "65db1ddf0b13c0fb6b69e6ca",
//         amount: 1000
//     }
// })

// transfer({
//     userId: "65db1ddf0b13c0fb6b69e6ca",
//     body: {
//         to: "65db1c8353ae0c4d05039d11",
//         amount: 1000
//     }
// })
// module.exports = router;