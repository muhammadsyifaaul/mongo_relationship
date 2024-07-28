const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1/relation_db')
.then(res => console.log('connected to mongodb'))
.catch(err => console.log(err))

// one to few
const userSchema = new mongoose.Schema({
    name: String,
    address: [{
        _id: false,
        street: String,
        city: String,
        country: String
    }]
})


const User = mongoose.model('User',userSchema)

// const makeUser = async() => {
//     const user = new User ({
//         name: 'john',
//     })
//     user.address.push({
//         street: '123 Main St',
//         city: 'Anytown',
//         country: 'USA'
//     })
//     const res = await user.save()
//     console.log(res)
// }

// makeUser()


const addAddress = async (id) => {
    const user = await User.findById(id)
    user.address.push({
        street: '123 Main St',
        city: 'Anytown',
        country: 'UK'
    })
    const res = await user.save()
    console.log(res)
}

addAddress('66a34ae249efc4371173dd60')