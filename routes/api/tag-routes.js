const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const tags = await Tag.findAll({
      // be sure to include its associated Product data
      include: [{ model: Product, through: ProductTag }],
    });
    res.json(tags);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch tags' });
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    const tag = await Tag.findByPk(req.params.id, {
      // be sure to include its associated Product data
      include: [{ model: Product, through: ProductTag }],
    });
    if (!tag) {
      return res.status(404).json({ error: 'Tag not found' });
    }
    res.json(tag);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch tag' });
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tag = await Tag.create(req.body);
    res.status(201).json(tag);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create tag' });
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tag = await Tag.findByPk(req.params.id);
    if (!tag) {
      return res.status(404).json({ error: 'Tag not found' });
    }
    await tag.update(req.body);
    res.json(tag);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update tag' });
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tag = await Tag.findByPk(req.params.id);
    if (!tag) {
      return res.status(404).json({ error: 'Tag not found' });
    }
    await tag.destroy();
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete tag' });
  }
});

module.exports = router;
