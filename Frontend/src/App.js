import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Outlet} from "react-router-dom";
import Header from './components/Header';
import Update from './components/Update';
import DataDetail from './components/DataDetail';
import Delete from './components/Delete';
import Add from './components/Add';
import Home from './components/Home';

function LayoutWithHeader(){
  return (
    <>
      <Header/>
      <Outlet/>
    </>
  )
}
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element = {<LayoutWithHeader/>}>
          <Route path="/" element = {<Home/>}/>
          <Route path="/delete" element = {<Delete/>}/>
          <Route path="/edit" element = {<Update/>}/>
          <Route path="/add" element = {<Add/>}/>
          <Route path="/getdata" element = {<DataDetail/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
