const express = require('express');
const vision = require('@google-cloud/vision');
const app = express();

const mongoose = require("mongoose")
const cors = require('cors')

const upload = require('./Upload')

app.use(express.json())
app.use(cors())

const User = require('./models/user');

const connectDatabase =async  () => {

    await mongoose.connect('mongodb://Joshal_007:Joshal007@ac-8thcfbi-shard-00-00.lxspq41.mongodb.net:27017,ac-8thcfbi-shard-00-01.lxspq41.mongodb.net:27017,ac-8thcfbi-shard-00-02.lxspq41.mongodb.net:27017/?ssl=true&replicaSet=atlas-9a65rb-shard-0&authSource=admin&retryWrites=true&w=majority' ,{useNewUrlParser : true})

    console.log("MongoDB Connection Successfully")

}
connectDatabase();


app.listen(5000,()=>{
    console.log("Backend Running at Port 5000");
})

app.get('/',(req, res) => { 
    res.send('A simple Node App is '
        + 'running on 5000 server') 
    res.end() 
}) 

app.post('/add',async(req,res)=>{
    const {id,firstname,lastname,dob,doi,doe} = req.body;
    console.log(req.body)
    await User.create({
        identificationid:id,
        firstname:firstname,
        lastname:lastname,
        dob:dob,
        dateofissue:doi,
        dateofexpiry:doe
    })
    return res.status(201).json({
        success: true
    })
})

app.post('/delete',async(req,res)=>{
    const {delid} = req.body;
    const user = await User.findOne({identificationid:delid});
    if(!user){
        return res.status(404).json({
            success:false,
            message:"Wrong ID"
        })
    }
    await User.deleteOne({identificationid:delid});
    return res.status(200).
        json({
            success:true,
            message : "Story delete succesfully "
    })

})

app.post('/getdata',async(req,res)=>{
    const {id} = req.body;
    const data = await User.findOne({identificationid:id});
    if(!data){
        res.status(404).json({
            success:false,
            message:"Data Not Found"
        })
    }
    res.status(200).json({
        success:true,
        message:"Data Found",
        data:data
    })
})


app.post('/addimagedata',upload.single("image"),async (req,res)=>{
    console.log(req.savedStoryImage)
    const client = new vision.ImageAnnotatorClient();
    const fileName = `/THAI ID OCR APP/Backend/images/${req.savedStoryImage}`;
    const func = async()=>{
    try{
        const [result] = await client.textDetection(fileName);
        const detections = await result.textAnnotations;
        console.log('Text:');
        detections.forEach(text => console.log(text));
    }
    catch(e){
        console.log(`Error : ${e}`);
        res.status(404).json({
            success:true,
            message:"Data Not Added"
        })
    }
    }
    await func()
    res.status(201).json({
        success:true,
        message:"Image Added"
    })
})

