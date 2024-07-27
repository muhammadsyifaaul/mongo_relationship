const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1/relation_db')
.then(res => console.log('connected to mongodb'))
.catch(err => console.log(err))

const userSchema = new mongoose.Schema({
    userName: String,
    age: Number
})

const tweetSchema = new mongoose.Schema({
    text: String,
    likes: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const User = mongoose.model('User',userSchema)
const Tweet = mongoose.model('Tweet',tweetSchema)

const makeTweet = async () => {
    // const user = new User({
    //     userName: 'john',
    //     age: 30
    // }) 
    const user = await User.findOne({
        userName: 'john'
    })
    const tweet = new Tweet({
        text: 'this is my second tweet',
        likes: 0
    })
    tweet.user = user
    // user.save()
    tweet.save()
}

// makeTweet()

const showTweets = async () => {
    const tweets = await Tweet.findById('66a3a895d25c83e3dba03f2a').populate('user')
    console.log(tweets)
}

showTweets()