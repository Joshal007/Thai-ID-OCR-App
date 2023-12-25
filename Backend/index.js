const express = require('express');
const vision = require('@google-cloud/vision');
const app = express();
const dotenv = require('dotenv')
dotenv.config({
    path:  './config.env'
})

const mongoose = require("mongoose")
const cors = require('cors')

const upload = require('./Upload')

app.use(express.json())
app.use(cors())

const User = require('./models/user');

const connectDatabase =async  () => {

    await mongoose.connect(process.env.MONGO_URI ,{useNewUrlParser : true})

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

const CREDENTIALS = JSON.parse(JSON.stringify(process.env.CREDENTIALS));

const CONFIG = {
    credentials:{
        private_key:CREDENTIALS.private_key,
        client_email:CREDENTIALS.client_email
    }
};
app.post('/addimagedata',upload.single("image"),async (req,res)=>{
    const client = new vision.ImageAnnotatorClient(CONFIG);
    const fileName = `/THAI ID OCR APP/Backend/images/${req.savedStoryImage}`;
    try{
        const [result] = await client.textDetection(fileName);
        const detections = await result.textAnnotations;
        const extractedData = [];

        detections.forEach(text => {
            const dataObject = {
                locations: text.locations,
                properties: text.properties,
                mid: text.mid,
                locale: text.locale,
                description: text.description,
                score: text.score,
                confidence: text.confidence,
                topicality: text.topicality,
                boundingPoly: {
                    vertices: text.boundingPoly.vertices,
                    normalizedVertices: text.boundingPoly.normalizedVertices
                }
            };
            extractedData.push(dataObject);
        });
        const jsonData = JSON.stringify(extractedData, null, 2);
        const data = JSON.parse(jsonData);
        
        
        res.status(201).json({
            success:true,
            message:"Image Added",
            extracteddata : data
        })
    }
    catch(e){
        console.log(`Error : ${e}`);
        res.status(404).json({
            success:true,
            message:"Data Not Added"
        })
    }
})


