import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import './App.css';

function Doubt()
{
        const rName = useRef();
        const rDoubt = useRef();
     
        const [ name, setName] = useState("");
        const [ doubt, setDoubt] = useState("");
        const[ msg, setMsg] = useState("");

        const hName = (event) => {setName(event.target.value); }
        const hDoubt = (event) => { setDoubt(event.target.value); }
        
        const sm = (event) => {
                   event.preventDefault();
                   const data = {
                    from_name: name,
              
                    to_name: 'Ms Rajput',
                    message: doubt,
         };
          emailjs.send("service_44jargt","template_k7b07ot",data,"24PVInD39xXeZEzk4")

                  
                      .then(res => {
                               
                               setMsg("we will get back to you");
                               setName("");
                               setDoubt("");
                               rName.current.focus();
                    })
                    .catch( err => console.log("issue" + err));
           }
      
           return(
           <>
           <div className="doubt">
           <center 
        style={{
        backgroundImage: "url('https://img.freepik.com/premium-photo/multitude-white-question-marks-dark-background-concept-indecision-doubt-3d-render_77593-957.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px"
      }}
      > 
                         <h1> Ask Your Doubt </h1>
                         <div className= "doubt-box">
                         <form onSubmit={ sm}>
                                        <input type="text" placeholder="Enter your Name"
                                        onChange={ hName } ref={rName} value={name} />
                                         <br/><br/>
                                         <textarea placeholder="enter your doubt" rows={3} cols={30}
                                         onChange={hDoubt} ref={rDoubt} value={doubt}></textarea>
                                         <br/><br/>
                                         <input type="submit" />
                         </form>
                         </div>
                         <h2> { msg } </h2>
            </center>
            </div>
            </>
              );
   }

  export default Doubt;


