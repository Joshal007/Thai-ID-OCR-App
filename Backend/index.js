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

const CREDENTIALS = JSON.parse(JSON.stringify({
    "type": "service_account",
    "project_id": "eighth-parity-409107",
    "private_key_id": "0fdc851991c3b9b9745a469147f9e3c1cf222cc9",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCu3vxQ166kT+O6\nkX+htNgaJ6hqfRkTTJAeFKRB+uxl0cB4fpQpZeva0v2IK3jjDdvCG/I37fL4M04o\nCoOtkNqvKtezfMtxl7YAa+HQLIUkouk+W1kM+k5uGgxIpm+mSQMCy3YcoU+337jy\nWatdDs35v2c2LvSDgsbxMSr6dbeUxnhPi25HSQjeR1qQu/DDV1dvVRJ/tf9PXR6f\nSzm9ClL1bkkjZIbXDnBBowJwqyWzvKUKtlAIFhkiPlBd04LEkQ7OJ63M8clTB0/A\n4sXVtEUbDRWMrKk211Hjbzz6kheAhQhiTKsUBi99saeJrtablC7k3PjgQPk7ufvB\nVblAWE3HAgMBAAECggEAAphLfTWeIVEQK4oSL0ecN1MkVCQ0FY26y795qoL7NA2X\nQhJ6x1x8Ufx0h6tBeXkQrEI2526P/u/f9oclahNus0+68K5m5HIgYMQ5DxpCBYen\nV2YKnb8vH8IiMYfKu1h1A3sabxVTtgJLX8lF2jUoiE63TN4IgdUUd6rHnPzXMw1y\njmf0SRggqTcShd9AgjobyJeU754SkI2JzisJow1mnC3VKpyVoXh0ujbNv4IxRcdd\n9V5q2dMTLoR9zrgNNf/ytPbFdizZ1noXihvcYZg68Uvgxo5TVWZ4jp2IHSiXvFfz\nVJNJKr1lUllDu2p2ZuZOU05qdPLS650uAB4mT+ODDQKBgQD0UDN75KmgcpZ/qDXs\nM5G7dUk9sTvRVaMI3vbFFdPYBJusY1Vzd3ednlNStxoRvHXjcs9Yxq4ovEr7gJ5M\nxLONxl0gjBivWe66tn3fS5l/Zn3JoZ9p+BdxF7e//Wa0uxO6HdBkrTNpAen+7tOz\nvRJgoz+unMGGN6aMN+KhqciI7QKBgQC3PGmIjOU7DacvKNAmqBc16zVqZ8/Q4zFe\nnTqT9Haq9fiPNUQN9mb+KMPqm7Ro3jtf3p1VKwzbUJUjUdwfep/aB0U9ozeZ0ie2\n0GBL5fIXkM50eW/9o58dtoCslcszJEqQVW8MnSpq8Y6DtDUUjxXzNjtLv0cmj7Kq\nSuQKSNIfAwKBgG29sMKP/dnCXvPMnRwSNf3cOx/pApOPQgJ0FKiGm3fG6h5PKE0L\ndsFoIsle0ejxnIqkQZsA8638ljnOlkypdnXSinZaN6RcYy2fV377uGFPqmTtomu5\nMt5r5u/oZT/9YGkTh04RtqwOXgtTP+jWnvClo69NXmhpivglCjnPx/IpAoGBAJQb\nq73pDPyvq3wOBDnK0oANr65jXPIeQfCVLB0dk7Hagd/XkTur+FHlx35h/vBo+Rsj\nyI5n7stzFilnaIK1TnIgQFJzFGUsHlfBlKSkqAtuS8KPyfr9f4a31sgpiAa9hdum\ngs1yWC/7MlO4nNMSWQ6uvj0azjsYGbVWNX8un1DbAoGBAK8LLYixOxuygqGbYokX\n0q0wXt2oqDrgw6OTERKPq0Nt8ZPMuf4OJnYOKwUH98/1Hd58C8TZxxaCuynbSd08\nChqoJs1+ftRWiKVDJWF8hMIXb+JI87ZBtbNPmmDtnuN4Cjr+hfk0adOmW7O/H+TA\n2qgw7G0j+JXIyaI7RuHVFrLw\n-----END PRIVATE KEY-----\n",
    "client_email": "joshal-joshi@eighth-parity-409107.iam.gserviceaccount.com",
    "client_id": "113037261753635336919",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/joshal-joshi%40eighth-parity-409107.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
}))

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


