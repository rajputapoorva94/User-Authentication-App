import NavBar from "./NavBar";
import { useState, useRef, useEffect } from "react";
import app from "./Firebase";
import { getAuth, updatePassword, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function ChangePassword() {
    const nav = useNavigate();

    useEffect(() => {
        let un = localStorage.getItem("un");
        if (un === null) {
            nav("/");
        }
    }, [nav]);

    const rPw1 = useRef();
    const rPw2 = useRef();

    const [pw1, setPw1] = useState("");
    const [pw2, setPw2] = useState("");
    const [msg, setMsg] = useState("");

    const hPw1 = (event) => setPw1(event.target.value);
    const hPw2 = (event) => setPw2(event.target.value);

    const validatePassword = (password) => {
        // Basic password validation criteria
        const minLength = 8;
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        return password.length >= minLength && hasUppercase && hasLowercase && hasNumber && hasSpecialChar;
    };

    const cp = (event) => {
        event.preventDefault();

        if (pw1 === "" || pw2 === "") {
            setMsg("Both password fields are required.");
            return;
        }

        if (!validatePassword(pw1)) {
            setMsg("Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.");
            return;
        }

        if (pw1 !== pw2) {
            setMsg("Passwords did not match.");
            setPw1("");
            setPw2("");
            rPw1.current.focus();
            return;
        }

        const auth = getAuth(app);
        onAuthStateChanged(auth, (user) => {
            if (user) {
                updatePassword(user, pw1)
                    .then(() => {
                        localStorage.removeItem("un");
                        nav("/");
                    })
                    .catch((err) => setMsg("Issue: " + err.message));
            } else {
                setMsg("No user is currently signed in.");
            }
        });
    };
    

    return (
        <>
            <center>
                <NavBar />
                <h1>Change Password Page</h1>
                <div className="cpass">
                <form onSubmit={cp}>
                    <input
                        type="password"
                        placeholder="Enter new password"
                        onChange={hPw1}
                        ref={rPw1}
                        value={pw1}
                    />
                    <br /><br />
                    <input
                        type="password"
                        placeholder="Confirm new password"
                        onChange={hPw2}
                        ref={rPw2}
                        value={pw2}
                    />
                    <br /><br />
                    <input type="submit" value="Change Password" />
                </form>
                </div>
                <h2>{msg}</h2>
            </center>
        </>
    );
}

export default ChangePassword;
