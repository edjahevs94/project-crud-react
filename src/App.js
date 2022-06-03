
import './App.css';
import List from "./components/List.js"
import Create from './components/Create';
import Edit from './components/Edit';
import {Route, Routes , BrowserRouter as Router, Link} from "react-router-dom"

function App() {
  return (
    <Router>
      <div className="container-fluid">
        <nav className="navbar navbar-expand navbar-light bg-light">
          <div className="container-fluid">
            <div className='nav navbar-nav'>
              <Link className="nav-item nav-link active" to={"/"}>Home</Link>
              <Link className="nav-item nav-link" to={"/create"}>Create project</Link>
            </div>
          </div>
        </nav>
        <div className='container'>
        <Routes>
          <Route exact path="/" element={<List />}> </Route>
          <Route exact path='/create' element={<Create />}> </Route>
          <Route exact path='/:id' element={<Edit />}> </Route>
        </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
