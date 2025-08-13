import { useState } from 'react';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';

export default function SignUp() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    try {

      if(!name.trim() || !age.trim() || !email.trim() || !password.trim()) {
        alert("Please fill all the fields");
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        name: name,
        age: age,
        email: email
      })

      await sendEmailVerification(user);
      alert("Verification email sent! Verify your email before logging in");
    } catch(err) {
      alert(err.message);
    }
  }

  return (
    <div>
      <h2>SignUp</h2>
      <input placeholder='Enter Name' onChange={(e) => setName(e.target.value)} />
      <input placeholder='Enter Age' onChange={(e) => setAge(e.target.value)} />
      <input placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)}/>
      <input type="password" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSignUp}>
        SignUp
      </button>
    </div>
  );
}