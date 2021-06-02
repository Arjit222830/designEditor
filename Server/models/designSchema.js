const mongoose =require('mongoose'); 

const DesignSchema=new mongoose.Schema({
    body:{
        type: Object,
        required: true
    },
    counters:{
        type: Object,
        required: true
    },
    schemaVersion:{
        type: Number,
        required: true
    } 
});

const Design= mongoose.model('designs', DesignSchema);

module.exports.Design= Design;