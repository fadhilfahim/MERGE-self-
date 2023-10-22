const Product = require('../models/productModel')
const mongoose = require('mongoose')

//get all product
const getProducts = async(req, res) =>{
    const products = await Product.find({}).sort ({createdAt: -1})

    res.status(200).json(products)
}


// get a single product 
const getProduct = async (req,res)=> {
    const { id } = req.params
    //check if valid id 
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: `No product with the given ID`})
    }


    const product = await Product.findById(id)
    
    if(!product) {
        return res.status(404).json({error: ' no such product'})
    }

    res.status(200).json(product)
}


//creat a new product 
const createProduct = async(req,res) =>{
    const {name, category, supplier, description, quantity, reOrderLevel, price} = req.body

    let emptyFields = []   //getting an array to check if the values are empty 

    if (!name){
        emptyFields.push('name')
    }
    if(!category){
        emptyFields.push ('category')
    }
    if(!supplier){
        emptyFields.push ('supplier')
    }
    if(!description){
        emptyFields.push ('description')
    }
    if(!quantity){
        emptyFields.push ('quantity')
    }
   
    if(!price){
        emptyFields.push ('price')
    }
    if(emptyFields.length > 0 ){//checking for length of the array and returning error message accordingly
        return res.status(400).json({error: 'Please fill all the fields', emptyFields})
    }   

    //add document to database
    try { 
        if(!reOrderLevel){
            const product = await Product.create({name, category, supplier, description, quantity, price})
            res.status(200).json(product)
        }
        else{
            const product = await Product.create({name, category, supplier, description, quantity, reOrderLevel, price})
            res.status(200).json(product)
        }
        
      } catch (error) {
        res.status(400).json({error: error.message})
      }
} 


//delete a product 
const deleteProduct = async(req,res)=>{
    const { id } = req.params
    //check if valid id 
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: `No product with the given ID`})
    }

    const product = await Product.findOneAndDelete({_id: id})
    
    if(!product) {
        return res.status(404).json({error: ' no such product'})
    }
    res.status(200).json(product)
}



//update a product  
const updateProduct = async (req, res) => {
    const { id } = req.params;
    
    // Check if valid id 
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: `No product with the given ID` });
    }

    // Check for empty fields
    const { name, category, supplier, description, quantity,reOrderLevel, price } = req.body;
    const emptyFields = [];

    if (!name) {
        emptyFields.push('name');
    }
    if (!category) {
        emptyFields.push('category');
    }
    if (!supplier) {
        emptyFields.push('supplier');
    }
    if (!description) {
        emptyFields.push('description');
    }
    if (!quantity) {
        emptyFields.push('quantity');
    }
    if (!reOrderLevel) {
        emptyFields.push('reOrderLevel');
    }
    if (!price) {
        emptyFields.push('price');
    }

    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill all the fields', emptyFields });
    }

    try {
        const updatedProduct = await Product.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ error: 'No such product' });
        }
        else{
            return res.status(200).json(updatedProduct);
        }

        
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

  
module.exports = {
    getProduct,
    getProducts,
    createProduct,
    deleteProduct,
    updateProduct
}