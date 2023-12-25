const express = require('express');
const vision = require('@google-cloud/vision');
const app = express();
const dotenv = require('dotenv')
dotenv.config({
    path:  './.env'
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

const CONFIG = {
    credentials:{
        private_key:process.env.private_key,
        client_email:process.env.client_email
    }
};
app.post('/addimagedata',upload.single("image"),async (req,res)=>{
    const client = new vision.ImageAnnotatorClient(CONFIG);
    const fileName = `/THAI ID OCR APP/Backend/images/${req.savedStoryImage}`;
    try{
        const [result] = await client.textDetection(fileName);
        const detections = await result.textAnnotations;
        const textResults = await detections.map(text => text.description);
        // Join the array elements into a single string for easier processing
        const englishDateRegex = /\b\d{1,2} (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\. \d{4}\b/g;
        // Function to extract English dates from text using the regex
        function extractEnglishDates(text) {
            return text.match(englishDateRegex) || [];
        }

        // Array to store all extracted English dates
        let allEnglishDates = [];

        // Loop through each text result and extract English dates
        textResults.forEach(result => {
            const englishDatesInResult = extractEnglishDates(result);
            allEnglishDates = allEnglishDates.concat(englishDatesInResult);
        });

        const joinedText = textResults.join(' ');

        // Regular expressions to extract information
        const idNumberRegex = /\b\d+ \d+ \d+ \d+ \d+\b/g;
        const firstNameRegex = /\bName\s+([\s\S]+?)\n/;
        const lastNameRegex = /\bLast\s+name\s+(\S+)/;

        // Extract information using regular expressions
        const idNumber = joinedText.match(idNumberRegex)[0];
        const firstName = joinedText.match(firstNameRegex)[1];
        const lastName = joinedText.match(lastNameRegex)[1];
        const dateOfBirth = allEnglishDates[0];
        const issueDate = allEnglishDates[1];
        const expiryDate = allEnglishDates[2];

        function formatDate(dateString) {
            const date = new Date(dateString);
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        }

        const data = {
            idNumber: idNumber,
            first_name: firstName,
            last_name: lastName,
            "date_of_birth": formatDate(dateOfBirth),
            "date_of_issue": formatDate(issueDate),
            "date_of_expiry": formatDate(expiryDate)
        };
        
        res.status(201).json({
            success:true,
            message:"Image Added",
            data : data
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