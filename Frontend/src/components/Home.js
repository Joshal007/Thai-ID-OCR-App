import { useRef, useState } from 'react'
import axios from 'axios'
import { AiOutlineUpload } from 'react-icons/ai'
import '../css/Home.css'
import 'bootstrap/dist/css/bootstrap.css'
import { useNavigate } from 'react-router';
const Home = ()=>{
    const [image,setimage] = useState('');
    const [detail,setdetail] = useState("");
    const [uploading,setIsUploading] = useState(false);
    const navigate = useNavigate();
    const imageEl = useRef(null)
    const SubmitHandler = async (e)=>{
        e.preventDefault()
        try{
            const formdata = new FormData()
            formdata.append("image", image)
            setIsUploading(true);
            
            const {data} = await axios.post('http://localhost:5000/addimagedata',formdata)
            setIsUploading(false);
            console.log(data)
            setdetail(data.data);
            alert(data.message);
            imageEl.current.value = '';
            setimage(null);
        }
        catch(e){
            console.log("Error");
            alert("Error Arrived Again Add Image")
            imageEl.current.value = '';
            setimage(null);
            setIsUploading(false);

        }
        

    }
    return (
        <div className='home'>
            <h2>Add Thai ID Card to be Verified</h2>
            <form onSubmit={SubmitHandler}>
            {/* <input type="file" onChange={(e)=>setimage(e.target.files[0])}/> */}
            <div class="StoryImageField">
                    <AiOutlineUpload />
                    <div class="txt">
                        {image ? image.name :
                            "Add a high quality Thai ID Card Image Here."
                        }
                    </div>
                    <input
                        name="image"
                        type="file"
                        ref={imageEl}
                        onChange={(e) => {
                            setimage(e.target.files[0])
                        }}
                    />
                </div>
            <button type='submit' disabled={uploading}>{uploading?'Uploading...':'Submit'}</button>
            </form>
            <br/>
            {!detail?"":<div>
                <h3>Data Extracted from your ID</h3>
                <ul>
                    <li><b>Identification Number</b> : {detail.idNumber}</li>
                    <li><b>First Name</b>: {detail.first_name}</li>
                    <li><b>Last Name</b> : {detail.last_name}</li>
                    <li><b>Date of Birth</b> : {detail.date_of_birth}</li>
                    <li><b>Date of Issue</b> : {detail.date_of_issue}</li>
                    <li><b>Date of Expiry</b> : {detail.date_of_expiry}</li>
                </ul>
            </div>}
        </div>
    )
}

export default Home;