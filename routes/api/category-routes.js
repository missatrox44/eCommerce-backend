const router = require('express').Router();
const { restart } = require('nodemon');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [Product]
  })
    .then(catData => {
      res.json(catData)
    }).catch(err => {
      res.status(500).json(err);
    })
});

// find one category by its `id` value
// be sure to include its associated Products
router.get('/:id', (req, res) => {
  Category.findByPk(req.params.id, {
    include: [Product]
  })
    // if (!catData) {
    //   res.status(404).json({ message: 'No category found with that id!' });
    //   return;
    // }
    .then(catData => {
      res.json(catData)
    }).catch(err => {
      res.status(500).json(err);
    })
});

// create a new category
router.post('/', async (req, res) => {
  try {
    const newCat = await Category.create(req.body);
    res.status(200).json(newCat)
  }
  catch (err) {
    res.status(400).json(err);
  }
});

//update category by `id` value
router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: { id: req.params.id }
  })
    // if (!catData) {
    //   res.status(404).json({ message: 'No category found with that id!' });
    //   return;
    // }
    .then(catData => {
      res.json(catData)
    }).catch(err => {
      res.status(500).json(err);
    })
});




// delete a category by its `id` value
router.delete('/:id', (req, res) => {
  Category.destroy(req.body, {
    where: { id: req.params.id }
  })
    // if (!catData) {
    //   res.status(404).json({ message: 'No category found with that id!' });
    //   return;
    // }
    .then(catData => {
      res.json(catData)
    }).catch(err => {
      res.status(500).json(err);
    })
});

//   try {
//     const catData = await Category.destroy({
//       where: { id: req.params.id}
//     });
//     if(!catData) {
//       res.status(404).json({message: 'No category found with this id!'});
//       return;
//     }
//     res.status(200).json(catData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
