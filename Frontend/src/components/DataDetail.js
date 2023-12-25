import { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import '../css/Get.css'
const DataDetail = ()=>{
    const [id,setid]=useState("");
    const [data,setdata]=useState("");
    const navigate = useNavigate();

    const SubmitHandler = async(e)=>{
        e.preventDefault();
        try{
            const {data} = await axios.post('http://localhost:5000/getdata',{
                id
            })
            if(data.status===404){
                alert("Again Enter ID");
            }
            else{
                await setdata(data.data);
            }
        }
        catch(e){
            alert("Error , Enter ID Again");
        }
    }

    return (
        <div className="get">
            <h5>Get All Data of a particular Identification Number</h5>
            <form onSubmit={SubmitHandler}>
            <input type="text" placeholder="Identification Number" value={id} onChange={(e)=>setid(e.target.value)}/>
            <button type='submit'>Get Data</button>
            </form>
            {!data?"":<div>
                <h3>ID Details</h3>
                <ul>
                    <li><b>Identification ID</b> : {data.identificationid}</li>
                    <li><b>Name</b> : {data.firstname} {data.lastname}</li>
                    <li><b>Date of Birth</b> : {data.dob}</li>
                    <li><b>Date of Issue</b> : {data.dateofissue}</li>
                    <li><b>Date of Expiry</b> : {data.dateofexpiry}</li>
                </ul>
            </div>}
        </div>
    )
}

export default DataDetail;