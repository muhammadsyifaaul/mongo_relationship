const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/anime')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Error connecting to MongoDB:', err));

const animeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    genres: [String], // Contoh one-to-few
    mainCharacters: [String], // Contoh one-to-few
    episodes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Episode'
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
});

const Anime = mongoose.model('Anime', animeSchema);

const episodeSchema = new mongoose.Schema({
    episode: { type: Number, required: true },
    epsTitle: { type: String, required: true },
    animeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Anime',
        required: true
    }
});

const Episode = mongoose.model('Episode', episodeSchema);

const commentSchema = new mongoose.Schema({
    text: { type: String, required: true },
    anime: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Anime',
        required: true
    }
});

const Comment = mongoose.model('Comment', commentSchema);

const makeAnime = async () => {
    try {
        // Membuat anime baru
        const anime = new Anime({
            title: 'One Piece',
            description: 'One Piece description',
            genres: ['action', 'adventure'],
            mainCharacters: ['Luffy', 'Zoro']
        });

        // Menyimpan anime ke database
        await anime.save();

        // Mencari anime yang baru saja dibuat
        const onePiece = await Anime.findOne({ title: 'One Piece' });

        // Membuat episode baru yang terkait dengan anime tersebut
        const episode1 = new Episode({
            episode: 1,
            epsTitle: 'Romance Dawn',
            animeId: onePiece._id
        });

        // Menyimpan episode ke database
        await episode1.save();

        // Menambahkan episode ke anime dan menyimpan perubahan
        onePiece.episodes.push(episode1._id);
        await onePiece.save();

        // Membuat komentar baru yang terkait dengan anime tersebut
        const comment1 = new Comment({
            text: 'This is a great episode!',
            anime: onePiece._id
        });

        // Menyimpan komentar ke database
        await comment1.save();

        // Menambahkan komentar ke anime dan menyimpan perubahan
        onePiece.comments.push(comment1._id);
        await onePiece.save();

        console.log('Anime, episode, and comment created and linked successfully');
    } catch (err) {
        console.log('Error creating anime, episode, or comment:', err);
    }
};

makeAnime();
