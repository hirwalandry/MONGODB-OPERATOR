const mongoose = require('mongoose')

const connection = mongoose.connect('mongodb://127.0.0.1:27017/mongodb_operater', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
if(!connection){
    console.log('not connected')
}else{
    console.log('connected')
}