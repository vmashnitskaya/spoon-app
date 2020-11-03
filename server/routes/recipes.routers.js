const {Router} = require('express');
const Recipes = require('../models/Recipes');
const auth = require('../middleware/auth.middleware');
const router = Router();

router.post('/create', auth, async (req, res) => {
    try {
        const {title, category,time, amount, summary, advice, author, ingredients} = req.body;

        const appDataUnit = new Recipes({
            title, category,time, amount, summary, advice, author, ingredients, author_id: req.user.userId
        });

        await appDataUnit.save();

        res.status(201).json({ data: appDataUnit, message: 'The item is created.' });
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, try again later' });
    }
})

router.get('/', auth, async (req, res) => {
    try {
        const recipes = await Recipes.find({ owner: req.user.userId });
        res.status(200).json(recipes)
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, try again later' });
    }
})

router.delete('/delete', auth, async (req, res) => {
    try {
        const {ids} = req.body;
        const recipesDeleted = await Recipes.deleteMany({_id: { $in: ids}})
        res.status(200).json({deleted: recipesDeleted.deletedCount, ids})
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, try again later' });
    }
})


module.exports = router;