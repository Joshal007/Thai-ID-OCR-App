import {Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'

function Header(){
    return(
    <>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <div class="container-fluid">
              <Link class="navbar-brand" to="/">Thai ID OCR App</Link>
              
          <div id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <Link class="nav-link" to="/add">Add Data</Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/delete">Delete Data</Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/getdata">Get Data</Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/edit">Edit Data</Link>
              </li>
            </ul>
          </div>
         </div>
        </nav>
        <br/>
    </>
    )
}

export default Header