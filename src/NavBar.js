import {Link} from "react-router-dom";
import {useState , useEffect } from "react";

function NavBar()
{
       const[un ,setUn] = useState("");
 
       useEffect( () => {
                   const u = localStorage.getItem("un");
                   setUn(u);
         } , []);

         return(
         <>
             <center>
                      <div className="nav">
       
                      { (un == null) &&   (<Link to="/"> Login  </Link>  ) }
                      {  (un == null) &&  (<Link to="/signup"> SignUp </Link>  ) }
                      {  (un == null) &&  (<Link to="/forgotpassword"> ForgotPassword </Link>  ) }
                       {  (un !== null) &&  (<Link to="/home"> Home </Link>  ) }
                         {  (un !== null) &&  (<Link to="/about"> About </Link>  ) }
                        {  (un !== null) &&  (<Link to="/changepassword"> ChangePassword </Link>  ) }
                        { (un !==null) && (<Link to="/doubt"> Doubt </Link>  )}
                      </div>
             </center>
             
         </> 
             );
 }
 export default NavBar;