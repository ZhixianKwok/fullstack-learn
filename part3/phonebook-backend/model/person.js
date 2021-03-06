const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const url = process.env.MONGODB_URI

mongoose.connect(url , {useNewUrlParser: true ,  useUnifiedTopology: true , useFindAndModify:false , useCreateIndex: true})
  .then( result => {
    console.log('connected to MongoDB',result)
  }).catch( err =>{
    console.log('error connecting to MongoDB:',err.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    require:true,
    unique:true,
    minlength:3
  },
  number:{
    type: String,
    require:true,
    minlength:8
  }
})

personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
  transform: (document,returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model( 'Person' , personSchema )