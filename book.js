const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1/relation_db')
.then(res => console.log('connected to mongodb'))
.catch(err => console.log(err))

const bookSchema = new mongoose.Schema({
    title: String,  
    volume: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Volume'
    } ]
})

const Book = mongoose.model('Book',bookSchema)

const volumeSchema = new mongoose.Schema({
    title: String,
    noVol: {
        type: Number,
    },
})

const Volume = mongoose.model('Volume',volumeSchema)

// Book.insertMany(
//     [
//         {
//             title: 'Book 5',
//         },
//         {
//             title: 'Book 6',
//         }
//     ]
// )



// Volume.insertMany([{
//     title: 'Volume 1',
//     noVol: 1
// },
// {
//     title: 'Volume 2',
//     noVol: 2
// }
// ])

// const addVolume = async () => {
//     const book1 = await Book.findOne({title: 'Book 5'})
//     const vol = await Volume.findOne({title: 'Volume 1'})

//     // book1.volume.push(vol._id)
//     // console.log(vol._id)
//     book1.volume.push(vol._id)

//     await book1.save()
    
// }

// addVolume()

// Book.findOne({title: 'Book 5'}).populate('volume')
// .then(res => console.log(res))
// .catch(err => console.log(err))

const showBook = async (title) => {
    const book = await Book.findOne({title}).populate('volume')
    console.log(book)
}

showBook('Book 5')