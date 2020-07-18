const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const upload = require('../multer').uploads;
const Places = require('../models/Places');

router.post('/', [auth, upload.single('image')], async (req, res) => {
    const recipesData = req.body;
    try {
        if (!recipesData.checked){
            return res.send('не не не!!!')
        }
        let recipes = {
            name: recipesData.name,
            description: recipesData.description,
            user: req.user._id,
        };
        if (req.file) {
            recipes.image = req.file.filename;
        }

        const newRecipe = new Places(recipes);

        await newRecipe.save();

        res.send(newRecipe)

    } catch (e) {
        res.status(500).send(e)
    }
});

router.get('/', auth, async (req, res) => {
    try {
        let recipes = await Places.find();
        if (!recipes) {
            return res.status(404).send({message: 'Not found!!!'})
        }
        if (!recipes.commentCount) {
            recipes = recipes.map(r => (
                {
                    easyToMake: (+r.easyToMake / +r.commentCount).toFixed(1),
                    quickToMake: (+r.quickToMake / +r.commentCount).toFixed(1),
                    taste: (+r.taste / +r.commentCount).toFixed(1),
                    name: r.name,
                    _id: r._id,
                    image: r.image
                }
            )).map(o => (
                {
                    overall: ((+o.easyToMake + +o.quickToMake + +o.taste) / 3).toFixed(1),
                    ...o
                }
            ));
        }
        return res.send(recipes);

    } catch (e) {

        return res.status(500).send(e)
    }
});


router.get('/:id', auth, async (req, res) => {

    try {


        let recipes = await Places.findById(req.params.id);

        if (!recipes) {
            return res.status(404).send({message: 'Not found!!!'})
        }

        if (recipes.commentCount) {
            recipes.easyToMake = (recipes.easyToMake / recipes.commentCount).toFixed(1);
            recipes.quickToMake = (recipes.quickToMake / recipes.commentCount).toFixed(1);
            recipes.taste = (recipes.taste / recipes.commentCount).toFixed(1);
            recipes.overall = ((recipes.easyToMake + recipes.quickToMake + recipes.taste) / 3).toFixed(1);
        }

        return res.send(recipes)

    } catch (e) {
        return res.status(500).send(e)
    }

});

router.put('/:id', [auth, upload.single('image')], async (req, res) => {
    try {

        let recipes = await Places.findById(req.params.id);

        if (!recipes) {
            return res.status(404).send({message: 'Not found!!!'})
        }

        if (req.file) {
            recipes.images.push(req.file.filename)
        }
        await recipes.save();

        return res.send(recipes)
    } catch (e) {

        return res.status(500).send(e)
    }
});

router.delete('/:id', auth, async (req, res) => {
    await Places.findByIdAndDelete(req.params.id);
    console.log('Ok');
    return res.send({message: 'Only the image can delete'});
});

module.exports = router;