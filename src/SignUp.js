import NavBar from "./NavBar";
import { useState, useRef, useEffect } from "react";
import app from "./Firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const nav = useNavigate();
  useEffect(() => {
    let un = localStorage.getItem("un");
    if (un !== null) {
      nav("/home");
    }
  }, [nav]);

  const rUn = useRef();
  const rPw1 = useRef();
  const rPw2 = useRef();
  const [un, setUn] = useState("");
  const [pw1, setPw1] = useState("");
  const [pw2, setPw2] = useState("");
  const [msg, setMsg] = useState("");

  const hUn = (event) => setUn(event.target.value);
  const hPw1 = (event) => setPw1(event.target.value);
  const hPw2 = (event) => setPw2(event.target.value);

  const register = (event) => {
    event.preventDefault();

    // Validate email
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

    // Validate passwords
    if (pw1 === "" || pw2 === "") {
      setMsg("Both password fields are required.");
      rPw1.current.focus();
      return;
    }

    if (pw1 !== pw2) {
      setMsg("Passwords did not match.");
      setPw1("");
      setPw2("");
      rPw1.current.focus();
      return;
    }

    const auth = getAuth(app); // Ensure app is passed to getAuth
    createUserWithEmailAndPassword(auth, un, pw1)
      .then((res) => {
        localStorage.setItem("un", un);
        nav("/");
      })
      .catch((err) => setMsg("Issue: " + err.message)); // Provide clearer error message
  };

  return (
    <>
      <center>
        <NavBar />
        <h1>SignUp Page</h1>
        <form onSubmit={register}>
          <input
            type="email"
            placeholder="Enter email"
            onChange={hUn}
            ref={rUn}
            value={un}
          />
          <br /><br />
          <input
            type="password"
            placeholder="Enter password"
            onChange={hPw1}
            ref={rPw1}
            value={pw1}
          />
          <br /><br />
          <input
            type="password"
            placeholder="Confirm password"
            onChange={hPw2}
            ref={rPw2}
            value={pw2}
          />
          <br /><br />
          <input type="submit" value="Register" />
        </form>
        <h2>{msg}</h2>
      </center>
    </>
  );
}

export default SignUp;
