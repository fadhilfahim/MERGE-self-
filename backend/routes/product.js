const express = require('express')
const {
    createProduct,
    getProducts,
    getProduct,
    deleteProduct,
    updateProduct

} = require('../controllers/productInventoryController')
const router =  express.Router()

//get all products 
router.get('/', getProducts )

//get a single product
router.get('/:id', getProduct)

//POST a new product
router.post('/', createProduct) 
  
// DELETE a product
router.delete('/:id', deleteProduct)
  
// UPDATE a product
router.put('/:id', updateProduct)
  

module.exports = router