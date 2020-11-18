const {Router} = require('express');
const Recipes = require('../models/Recipes');
const auth = require('../middleware/auth.middleware');
const router = Router();

router.post('/create', auth, async (req, res) => {
    try {
        const {title, category,time, amount,created_at, summary, advice, author, ingredients,approved, instructions} = req.body;

        const recipe = new Recipes({
            title, category,time, amount, created_at, summary, advice, author, ingredients,instructions, approved, author_id: req.user.userId
        });

        await recipe.save();

        res.status(201).json({ data: recipe, message: 'The recipe is created.' });
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