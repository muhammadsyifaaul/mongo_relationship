const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1/relation_db')
.then(res => console.log('connected to mongodb'))
.catch(err => console.log(err))

const petaniSchema = new mongoose.Schema({
    name: String,
    jenisLahan: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lahan'
    }]
})

const Petani = mongoose.model('Petani',petaniSchema)

const lahanSchema = new mongoose.Schema({
    name: String,
    jenis: {
        type: String,
    }
})

const Lahan = mongoose.model('Lahan',lahanSchema)

const make = async () => {
    const petani = new Petani({
        name: 'Samsul'
    })
    await petani.save()

    const lahan = new Lahan({
        name: 'Lahan 1',
        jenis: 'Perkebunan Sawit'
    })
    await lahan.save()
    addLahan(petani._id)
}

// const addLahan = async (id) => {
//     const petani = await Petani.findById(id)
//     const lahan = await Lahan.findOne({name: 'Lahan 1'})
//     // petani.jenis.push(lahan._id)
//     // console.log(petani.jenisLahan)
//     petani.jenisLahan.push(lahan._id)

//     await petani.save()
// } 

// make()

const showPetani = async () => {
    const petani = await Petani.findOne({name: 'Samsul'}).populate('jenisLahan')
    console.log(petani)
    
}
showPetani()