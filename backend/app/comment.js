const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const upload = require('../multer').uploads;
const Comment = require('../models/Comment');
const Recipe = require('../models/Places');

router.post('/', auth, async (req, res) => {
    const commentData = req.body;

    try {
        let comment = {
            comment: commentData.comment,
            recipe: commentData.recipe,
            easyToMake: commentData.easyToMake,
            quickToMake: commentData.quickToMake,
            taste: commentData.taste,
            user: req.user._id
        };
        const newComment = new Comment(comment);



        let comments = await Comment.findOne({recipe: commentData.recipe});

        if (!comments) {
            let recipe = await Recipe.findById(commentData.recipe);
            recipe.easyToMake += +commentData.easyToMake;
            recipe.quickToMake += +commentData.quickToMake;
            recipe.taste += +commentData.taste;
            recipe.commentCount += 1;

            await recipe.save();

        }


        await newComment.save();
        return res.send({newComment})

    } catch (e) {
        res.status(500).send(e)
    }
});
router.get('/:id', auth, async (req, res) => {

    try {
        const comment = await Comment.find({recipe: req.params.id}).populate('user');

        if (!comment) {
            return res.status(404).send({message: 'Not found!!!'})
        }
        return res.send(comment)
    } catch (e) {
        return res.status(500).send(e)
    }

});

router.delete('/:id', auth, async (req, res) => {
    await Comment.findByIdAndDelete(req.params.id);
    console.log('Ok');
    return res.send({message: 'Only the image can delete'});
});

module.exports = router;