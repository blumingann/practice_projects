const Tweet = require('../models/tweet.model');
const express = require('express');
const checkJwt = require('express-jwt');
const router = express.Router();
const { SECRET_KEY } = require('../config');

router.post(
    "/",
    checkJwt({ secret: SECRET_KEY, algorithms: ["HS256"] }),
    async (req, res, next) => {
        try {
            const newTweet = await Tweet.create({
                text: req.body.text,
                author: req.user.id,
            });

            const populatedTweet = await newTweet.execPopulate("author", "-hash");
            res.status(200).json(populatedTweet);
        } catch (err) {
            next(err);
        }
    }
),

    router.get("/", async (req, res, next) => {
        try {
            const tweets = await Tweet.find().populate("author", "-hash").lean();

            res.json(tweets);
        } catch (err) {
            next(err);
        }
    });
// router.delete('/:tweetId', async (req, res, next) => {
//     try {
//         const deletedTweet = await Tweet.findByIdAndDelete(req.params.tweetId)
//             .lean();

//         await Promise.all([
//             User.findByIdAndUpdate(deletedTweet.tweet, {
//                 $pull: {
//                     tweets: deletedTweet._id,
//                 },
//             }),
//         ]);

//         res.json({
//             count: 1,
//             value: deletedTweet,
//         });
//     } catch (error) {
//         next(error);
//     }
// });

// router.patch('/:tweetId', async (req, res, next) => {
//     try {
//         const tweetId = req.params.tweetId;
//         const patchData = req.body;

//         const outdatedTweet = await Tweet.findByIdAndUpdate(tweetId, patchData, {
//             runValidators: true,
//         });

//         if (!outdatedTweet) {
//             return res.status(404).json({
//                 error: 'No hay tweet con este ID',
//             });
//         }

//         // update Users
//         await Promise.all([
//             User.findByIdAndUpdate(outdatedTweet.text, {
//                 $pull: {
//                     tweets: tweetId,
//                 },
//             }),

//             User.findByIdAndUpdate(patchData.text, {
//                 $push: {
//                     tweets: tweetId,
//                 },
//             }),

//         ]);

//         const updatedTweet = await Tweet.findById(tweetId)
//             .populate('tweet', 'user')

//         res.json({
//             count: 1,
//             value: updatedTweet,
//         });
//     } catch (error) {
//         next(error);
//     }
// });

module.exports = router;


