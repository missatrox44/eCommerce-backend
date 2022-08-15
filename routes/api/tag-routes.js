const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [Product]
  })
    .then(tagData => {
      res.json(tagData)
    }).catch(err => {
      res.status(500).json(err);
    })
});

// find a single tag by its `id`
// be sure to include its associated Product data
router.get('/:id', (req, res) => {
  Tag.findByPk(req.params.id, {
    include: [Product]
  })
    .then(TagData => {
      res.json(TagData)
    }).catch(err => {
      res.status(500).json(err);
    })
});

// create a new tag
router.post('/', async(req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag)
  }
  catch (err) {
    res.status(400).json(err);
  }
});


// update a tag's name by its `id` value
router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: { id: req.params.id }
  })
    .then(tagData => {
      res.json(tagData)
    }).catch(err => {
      res.status(500).json(err);
    })
});

//FIX ROUTE!
router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: { id: req.params.id }
  })
    .then(tagData => {
      res.json(tagData)
    }).catch(err => {
      res.status(500).json(err);
    })
});

module.exports = router;
