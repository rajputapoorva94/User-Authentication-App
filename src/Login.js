import NavBar from "./NavBar";
import { useState, useRef, useEffect } from "react";
import app from "./Firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Login() {
    const nav = useNavigate();
    const rUn = useRef();
    const rPw = useRef();
    
    const [un, setUn] = useState("");
    const [pw, setPw] = useState("");
    const [msg, setMsg] = useState("");

    useEffect(() => {
        let storedUn = localStorage.getItem("un");
        if (storedUn !== null) {
            nav("/home");
        }
    }, [nav]);

    const hUn = (event) => setUn(event.target.value);
    const hPw = (event) => setPw(event.target.value);

    const login = (event) => {
        event.preventDefault();

        if (un === "") {
            setMsg("Email is required.");
            rUn.current.focus();
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(un)) {
            setMsg("Invalid email format.");
            rUn.current.focus();
            return;
        }

        const auth = getAuth(app);
        signInWithEmailAndPassword(auth, un, pw)
            .then(() => {
                nav("/home");
                localStorage.setItem("un", un);
            })
            .catch((error) => {
              
                switch (error.code) {
                    case 'auth/wrong-password':
                        setMsg("Incorrect password.");
                        break;
                    case 'auth/user-not-found':
                        setMsg("User not found.");
                        break;
                    default:
                        setMsg("Login failed: " + error.message);
                        break;
                }
            });
    };

    return (
        <>
            <center>
                <NavBar />
                <h1>Login Page</h1>
                <form onSubmit={login}>
                    <input
                        type="email"
                        placeholder="Enter registered email"
                        onChange={hUn}
                        ref={rUn}
                        value={un}
                    />
                    <br /><br />
                    <input
                        type="password"
                        placeholder="Enter password"
                        onChange={hPw}
                        ref={rPw}
                        value={pw}
                    />
                    <br /><br />
                    <input type="submit" value="Login" />
                </form>
                <h2>{msg}</h2>
            </center>
        </>
    );
}

export default Login;
