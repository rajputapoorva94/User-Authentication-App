import NavBar from "./NavBar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './App.css';

function About()
{
         const nav = useNavigate();
         useEffect( ()=> {
                     let un = localStorage.getItem("un");
                     if (un === null)
                     {
                            nav("/");
                    }
         }, []);
         
         return(
         <>
         <center>
                <NavBar  />
                <h1> About Page </h1>
                <h2>
                         Courses Available :
                </h2>
                <div  className="courses-box">
                       
                       <p>JS Full Stack</p>
                       <p>Java Full Stack</p>
                       <p>Python Full Stack</p>

                </div>
         </center>
         </>
          );
  }
   export default About;
