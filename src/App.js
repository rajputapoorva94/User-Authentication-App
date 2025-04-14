import logo from './logo.svg';
import './App.css';
import Login from "./Login";
import SignUp from "./SignUp";
import Home from "./Home";
import About from "./About";
import ForgotPassword from "./ForgotPassword";
import ChangePassword from "./ChangePassword";
import Doubt from "./Doubt";
import { BrowserRouter, Routes , Route } from "react-router-dom" ;


function App() {
  return (
    <BrowserRouter>
      <Routes>
           <Route path="/" element=<Login/>  />
           <Route path="/signup" element=<SignUp/>  />
           <Route path="/home" element=<Home/>  />
           <Route path="/about" element=<About/>  />
           <Route path="/forgotpassword" element=<ForgotPassword/>  />
           <Route path="/changepassword" element=<ChangePassword/>  />
           <Route path="/doubt" element=<Doubt/> />
           <Route path="*" element=<Login/>  />
         
      </Routes>
    </BrowserRouter>
  );
}

export default App;


