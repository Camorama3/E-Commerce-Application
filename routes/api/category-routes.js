const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const categories = await Category.findAll({
      // be sure to include its associated Products
      include: Product
    });
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get categories"});
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const category = await Category.findByPk(req.params.id, {
      // be sure to include its associated Products
      include: Product
    });
    if (!category) {
      res.status(404).json({ error: "Category not found!"});
    };
    res.json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve category!'});
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create category' });
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const [updated] = await Category.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      res.json({ message: 'Category updated successfully' });
    } else {
      res.status(404).json({ error: 'Category not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update category' });
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleted = await Category.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.json({ message: 'Category deleted successfully' });
    } else {
      res.status(404).json({ error: 'Category not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete category' });
  }
});

module.exports = router;
