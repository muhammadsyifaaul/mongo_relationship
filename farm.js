const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1/relation_db')
.then(res => console.log('connected to mongodb'))
.catch(err => console.log(err))

const userSchema = new mongoose.Schema({
    name: String,
    address: [{
        _id: false,
        street: String,
        city: String,
        country: String
    }]
})


const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    season: {
        type: String,
        enum: ['spring', 'summer', 'autumn', 'winter']
    }
})


const farmSchema = new mongoose.Schema({
    name: String,
    city: String,
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'  // referensi(collection mana yang akan digunakan object idnya)
    }]
})


const Product = mongoose.model('Product',productSchema)
const Farm = mongoose.model('Farm',farmSchema)

// Product.insertMany([
//     {
//         name: 'Melon',
//         price: 9,
//         season: 'summer'
//     },
//     {
//         name: 'Watermelon',
//         price: 12,
//         season: 'summer'
//     }
//     ,
//     {
//         name: 'Kiwi',
//         price: 4,
//         season: 'summer'
//     }
// ])

// const makeFarm = async () => {
//     const farm = new Farm({
//         name: 'Big Farm',
//         city: 'Anytown',
//     })
//     const melon = await Product.findOne({name: 'Melon'})
//     farm.products.push(melon)
//     await farm.save()
//     console.log(farm)
// }

// makeFarm()

// const addProduct = async (id) => {
//     const farm = await Farm.findById(id)
//     const Watermelon = await Product.findOne({name : 'Watermelon'})
//     farm.products.push(Watermelon)
//     await farm.save()
//     console.log(farm)
// }

// addProduct('66a39d9fbf299526cd920560')

Farm.findOne({ name: 'Big Farm'}).populate('products','name') // didlm populte bisa mennetukan apa saja yg akan ditampilkan
.then(farm => {
    console.log(farm)
    // for(const product of farm.products) {
    //     console.log(product.name)
    // }
})