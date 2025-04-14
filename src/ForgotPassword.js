import NavBar from "./NavBar";
import { useEffect } from "react";
import app from "./Firebase";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
    const nav = useNavigate();

    useEffect(() => {
        let un = localStorage.getItem("un");
        if (un !== null) {
            nav("/home");
        }
    }, [nav]);

    const rUn = useRef();
    const [un, setUn] = useState("");
    const [msg, setMsg] = useState("");

    const hUn = (event) => {
        setUn(event.target.value);
    };

    const sm = (event) => {
        event.preventDefault();
        const auth = getAuth(app); // Ensure app is passed to getAuth
        sendPasswordResetEmail(auth, un)
            .then(() => {
                nav("/");
            })
            .catch((err) => setMsg("Issue: " + err.message));
    };

   const sms = (event) => {
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

        const auth = getAuth(app); // Ensure app is passed to getAuth
        sendPasswordResetEmail(auth, un)
            .then(() => {
                setMsg("Password reset email sent. Check your inbox.");
                setTimeout(() => {
                    nav("/");
                }, 2000); // Redirect after 2 seconds
            })
            .catch((err) => {
           if (err.code === 'auth/user-not-found') {
                    setMsg("No user found with this email.");
                } else {
                    setMsg("Issue: " + err.message);
                }
                rUn.current.focus();
            });
    };

    return (
        <>
            <center>
                <NavBar />
                <h1>Forgot Password Page</h1>
                <form onSubmit={sm}>
                    <input
                        type="email"
                        placeholder="Enter registered email"
                        onChange={hUn}
                        ref={rUn}
                        value={un}
                    />
                    <br /><br />
                    <input type="submit" value="Send Mail" />
                </form>
                <h2>{msg}</h2>
            </center>
        </>
    );
}

export default ForgotPassword;
