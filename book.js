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


const reviewSchema = new mongoose.Schema({
    text: String,
    rating: Number,
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    }
})

const Review = mongoose.model('Review',reviewSchema)
Book.insertMany(
    [
        {
            title: 'Book 5',
        },
        {
            title: 'Book 6',
        }
    ]
)



Volume.insertMany([{
    title: 'Volume 1',
    noVol: 1
},
{
    title: 'Volume 2',
    noVol: 2
}
])

const addVolume = async () => {
    const book1 = await Book.findOne({title: 'Book 5'})
    const vol = await Volume.findOne({title: 'Volume 1'})

    // book1.volume.push(vol._id)
    // console.log(vol._id)
    book1.volume.push(vol._id)

    await book1.save()
    
}

addVolume()

Book.findOne({title: 'Book 5'}).populate('volume')
.then(res => console.log(res))
.catch(err => console.log(err))

const showBook = async (title) => {
    const book = await Book.findOne({title}).populate('volume')
    console.log(book)
}

showBook('Book 5')

const makeBook = async (title) => {
    const book = new Book({
        title
    })

    const vol = new Volume({
        title: 'one day',
        noVol: 1
    })
    await vol.save()
   book.volume.push(vol._id)

   await book.save()

}


makeBook('Bismillah')

const showBook = async () => {
    const book = await Book.findOne({title: 'Bismillah'}).populate('volume')
    console.log(book)
}

showBook()

const makeReview = async (title) => {
    const findBook = await Book.findOne({title})
    const review = new Review({
        text: 'this is my review last',
        rating: 9,
        book: findBook._id
    })
    review.save()
    showReview(review._id)
    console.log(review._id)
}

const showReview = async (id) => {
    const review = await Review.findById(id).populate('book')
    console.log(review)
}

makeReview('Bismillah')