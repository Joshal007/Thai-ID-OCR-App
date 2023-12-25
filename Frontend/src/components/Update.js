import { Link } from "react-router-dom";
import '../css/Edit.css'
const Update = ()=>{
    return (
        <div className="edit">
            <h3>Update Data</h3>
            <p>Firstly Delete the data using IdentificationID in <Link to='http://localhost:3000/delete'>Delete Data</Link> and then Add Updated Data in <Link to='http://localhost:3000/add'>Add Data</Link></p>
        </div>
    )
}

export default Update;