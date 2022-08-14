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

//FIX ROUTE!
// update a tag's name by its `id` value
router.put('/:id', (req, res) => {
  // {
	// 	"id": "9",
	// 	"tag_name": "80s",
	// 	"products": [
	// 		{
	// 			"id": 1,
	// 			"product_name": "Plain T-Shirt",
	// 			"price": 15,
	// 			"stock": 14,
	// 			"category_id": 1,
	// 			"product_tag": {
	// 				"id": 3,
	// 				"product_id": 1,
	// 				"tag_id": 8
	// 			}
	// 		},
	// 		{
	// 			"id": 4,
	// 			"product_name": "Top 40 Music Compilation Vinyl Record",
	// 			"price": 13,
	// 			"stock": 50,
	// 			"category_id": 3,
	// 			"product_tag": {
	// 				"id": 11,
	// 				"product_id": 4,
	// 				"tag_id": 8
	// 			}
	// 		}]
	// 		}
	// 		}


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
// delete on tag by its `id` value
router.delete('/:id', (req, res) => {
  Tag.destroy(req.body, {
    where: { id: req.params.id }
  })
    .then(tagData => {
      res.json(tagData)
    }).catch(err => {
      res.status(500).json(err);
    })
});

module.exports = router;
