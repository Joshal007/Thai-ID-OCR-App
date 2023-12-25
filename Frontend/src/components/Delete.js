import { useState } from 'react';
import axios from 'axios';
import '../css/Delete.css'
import { useNavigate } from 'react-router';
const Delete = ()=>{
    const [delid,setdelid] = useState("");
    const navigate = useNavigate();
    const SubmitHandler = async(e)=>{
        e.preventDefault()
        try{
            const data = await axios.post('http://localhost:5000/delete',{
                delid
            })
            alert("Successfully Deleted");
            navigate('/')
        }
        catch(e){
            console.log(e);
            alert("Error Again Enter ID");
        }
    }
    return (
        <div className="del">
            <h5>To Delete Data, Enter Identification Number</h5>
            <form onSubmit={SubmitHandler}>
            <input type="text" placeholder="Identification Number" value={delid} onChange={(e)=>setdelid(e.target.value)}/>
            <button type='submit'>Delete</button>
            </form>
        </div>
    )
}

export default Delete;