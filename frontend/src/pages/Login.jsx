import { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] =  useState("");

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user  = userCredential.user;

      if(user.emailVerified) {
        alert("Logged In!");
      } else {
        alert("Verify email before loggin first!");
        await auth.signOut();
      }
    } catch (err) {
      alert(err.message);
    }
  }

  return(
    <div>
      <h2>Login</h2>
      <input placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder='Enter Password' onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>
        Login
      </button>
      <Link
        to="/signup"
      >
        Don't have an accout? Click Here!
      </Link>
    </div>
  );
}