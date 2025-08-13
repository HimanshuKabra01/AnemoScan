import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";

function Dashboard() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user && user.uid) {
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setUserData(docSnap.data());
          } else {
            console.warn("No user data found in Firestore for:", user.uid);
            setUserData({ email: user.email }); // fallback
          }
        } catch (err) {
          console.error("Error fetching user data:", err);
        }
      } else {
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome to Dashboard</h1>
      {userData ? (
        <div>
          <p>Email: <strong>{userData.email}</strong></p>
          <p>Name: <strong>{userData.name || "N/A"}</strong></p>
          <p>Age: <strong>{userData.age || "N/A"}</strong></p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p>No user logged in.</p>
      )}
    </div>
  );
}

export default Dashboard;
