const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1/relation_db')
.then(res => console.log('connected to mongodb'))
.catch(err => console.log(err))

const brandSchema = new mongoose.Schema({
    name: String,
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }]
})

const Brand = mongoose.model('Brand',brandSchema)

const productSchema = new mongoose.Schema({
    name: String,
    varian: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Varian'
    }]
})

const Product = mongoose.model('Product',productSchema)

const varianSchema = new mongoose.Schema({
    name: String,
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand'
    }
})

const Varian = mongoose.model('Varian',varianSchema)

// const makeProduct = async () => {
//     const brand = new Brand({
//         name: 'Samsung'
//     })

//     const product = new Product({
//         name: 'Handphone'
//     })
    

//     await Promise.all([brand.save(),product.save()])
//     const varian = new Varian({
//         name: 'Galaxy',
//         brand: brand._id
//     })
//     brand.products.push(product._id)
//     product.varian.push(varian._id)
    
//     await Promise.all([brand.save(),product.save(),varian.save()])
// }

// makeProduct()

const showProduct = async () => {
    const samsung = await Brand.findOne({name: 'Samsung'})
    .populate({
        path: 'products',
        populate: {
            path: 'varian',
            model: 'Varian'
        }
    });

    console.log(samsung)
}

showProduct()