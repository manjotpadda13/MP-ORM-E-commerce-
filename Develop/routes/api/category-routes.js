const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [Product]
  })
    .then((dbCategory) => {
      res.json(dbCategory);
    })
    .catch((err) => {
      res.status(500).json({ msg: "oh no!", err });
    });



});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
  Category.findByPk(req.params.id, {
    include: [Product]
  }).then(dbCategory => {
    if (!dbCategory) {
      res.status(404).json({ msg: "no such Category!" })
    } else {
      res.json(dbCategory)
    }
  }).catch(err => {
    res.status(500).json({ msg: "oh no!", err })
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.create({
    category_name: req.body.category_name,
  }).then(newCategory => {
    res.json(newCategory)
  }).catch(err => {
    res.status(500).json({ msg: "oh no!", err })
  })

});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  }).then(delCategory => {
    if (!delCategory) {
      res.status(404).json({ msg: "no such category!" })
    } else {
      res.json(`Category Deleted :)`)
    }
  }).catch(err => {
    res.status(500).json({ msg: "oh no!", err })
  })
});

module.exports = router;
