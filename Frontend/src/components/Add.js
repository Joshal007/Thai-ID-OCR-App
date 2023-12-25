import { useState } from "react";
import { useNavigate } from "react-router";
import 'bootstrap/dist/css/bootstrap.css'
import '../css/Add.css'
import axios from "axios";

const Add = ()=>{
    const [firstname,setfirstname] = useState("");
    const [lastname,setlastname] = useState("");
    const [id,setid] = useState("");
    const [dob,setdob] = useState("");
    const [doi,setdoi] = useState("");
    const [doe,setdoe] = useState("");
    const navigate = useNavigate();

    const SubmitHandler = async (e)=>{
        console.log(id);
        e.preventDefault()
        try{
            const data = await axios.post('http://localhost:5000/add',{
                id,firstname,lastname,dob,doi,doe
            })
            alert("Data Added Successfully");
            navigate('/')
        }
        catch(e){
            alert("Error Please Add Data Again")
        }

    }

    return(
        <form className="add" onSubmit={SubmitHandler}>
            <h2>Add ID Card Details</h2>
            <br/>
            <label for="inputPassword4">Identification Number </label>
            <input className="inp" type="text"  placeholder="Identification Number" value={id} onChange={(e)=>setid(e.target.value)}/>
            <br/>
            <br/>
            <label for="inputEmail4">First Name </label>
            <input className="inp" type="text" placeholder="First Name" value={firstname} onChange={(e)=>setfirstname(e.target.value)}/>
            <br/>
            <br/>
            <label for="inputPassword4">Last Name </label>
            <input className="inp" type="text" placeholder="Last Name" value={lastname} onChange={(e)=>setlastname(e.target.value)}/>
            <br/>
            <br/>
            <label for="inputPassword4">Date of Birth </label>
            <input className="inp" type="date" value={dob} onChange={(event) => setdob(event.target.value)}/>
            <br/>
            <br/>
            <label for="inputPassword4">Date of Issue </label>
            <input className="inp" type="date" value={doi} onChange={(event) => setdoi(event.target.value)}/>
            <br/>
            <br/>
            <label for="inputPassword4">Date of Expiry </label>
            <input className="inp" type="date" value={doe} onChange={(event) => setdoe(event.target.value)}/>
            <br/>
            <br/>
            <button type="submit">Add</button>
            <br/>
        </form>
    )
}
export default Add;