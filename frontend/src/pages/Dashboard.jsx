import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { motion } from "framer-motion";
import { Trash2, Pencil, Droplet, CalendarDays, Activity } from "lucide-react";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [notes, setNotes] = useState([]);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteBody, setNoteBody] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u?.uid) {
        const docRef = doc(db, "users", u.uid);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          setUserData(snap.data());
        } else {
          setUserData({ name: u.displayName || "Anonymous", email: u.email });
        }

        const notesRef = collection(db, "users", u.uid, "notes");
        const notesQ = query(notesRef, orderBy("createdAt", "desc"));
        onSnapshot(notesQ, (qs) => {
          const list = qs.docs.map((d) => ({ id: d.id, ...d.data() }));
          setNotes(list);
        });
      }
    });
    return () => unsubscribe();
  }, []);

  const addOrUpdateNote = async () => {
    if (!noteTitle && !noteBody) return;
    if (editId) {
      const ref = doc(db, "users", user.uid, "notes", editId);
      await updateDoc(ref, {
        title: noteTitle,
        body: noteBody,
      });
      setEditId(null);
    } else {
      await addDoc(collection(db, "users", user.uid, "notes"), {
        title: noteTitle,
        body: noteBody,
        createdAt: serverTimestamp(),
      });
    }
    setNoteTitle("");
    setNoteBody("");
  };

  const deleteNote = async (id) => {
    await deleteDoc(doc(db, "users", user.uid, "notes", id));
  };

  const startEdit = (note) => {
    setNoteTitle(note.title);
    setNoteBody(note.body);
    setEditId(note.id);
  };

  return (
    <div className="flex font-primary min-h-screen text-gray-900 dark:text-gray-100 bg-gradient-to-br from-sky-50 to-emerald-50 dark:from-gray-950 dark:to-gray-900">
      <motion.div
        className="w-80 p-8 border-r border-cyan-400/20 bg-white/10 dark:bg-gray-900/40 backdrop-blur-xl flex flex-col justify-between shadow-2xl fixed top-0 bottom-0"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
      >
        {userData ? (
          <div className="flex flex-col h-full justify-between">
            <div className="flex mt-19 flex-col items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-cyan-400/40">
                {userData.name?.charAt(0).toUpperCase() || "U"}
              </div>
              <h1 className="font-heading text-3xl font-bold text-rose-400" >
                {userData.name.charAt(0).toUpperCase() + userData.name.slice(1)}
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                {userData.email}
              </p>
              <div className="mt-6 w-full text-center">
                <p className="text-xs text-gray-400">Blood Type</p>
                <p className="font-semibold text-cyan-400">O+</p>
                <p className="mt-2 text-xs text-gray-400">Risk Level</p>
                <p className="font-semibold text-purple-400">Low</p>
              </div>
            </div>
          </div>
        ) : (
          <p>No user logged in.</p>
        )}
      </motion.div>
      <div className="ml-80 flex-1 flex flex-col p-8 gap-8 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div className="p-5 rounded-2xl border border-sky-400/40 shadow-lg backdrop-blur-md">
            <h3 className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <Activity size={16} /> Last Symptom Check
            </h3>
            <p className="text-xl font-semibold text-sky-600">2 days ago</p>
          </motion.div>
          <motion.div className="p-5 rounded-2xl border border-purple-400/40 shadow-lg backdrop-blur-md">
            <h3 className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <Droplet size={16} /> Seasonal Risk
            </h3>
            <p className="text-xl font-semibold text-purple-600">Low</p>
          </motion.div>
          <motion.div className="p-5 rounded-2xl border border-blue-400/40 shadow-lg backdrop-blur-md">
            <h3 className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <CalendarDays size={16} /> Next Donation
            </h3>
            <p className="text-xl font-semibold text-blue-600">Sept 15</p>
          </motion.div>
        </div>

        <motion.div
          className="p-6 rounded-2xl shadow-xl backdrop-blur-lg border border-emerald-400/30"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <h2 className="text-2xl font-heading font-semibold text-emerald-600 mb-4">Blood Compatibility</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-3 border border-green-200 rounded-xl shadow-sm">
              <p className="text-sm text-gray-500">Can Donate To</p>
              <p className="font-semibold text-emerald-600">A+, AB+</p>
            </div>
            <div className="p-3 border border-green-200 rounded-xl shadow-sm">
              <p className="text-sm text-gray-500">Can Receive From</p>
              <p className="font-semibold text-emerald-600">O+, O-</p>
            </div>
            <div className="p-3 border border-green-200 rounded-xl shadow-sm">
              <p className="text-sm text-gray-500">Urgent Need Nearby</p>
              <p className="font-semibold text-red-500">Yes</p>
            </div>
            <div className="p-3 border border-green-200 rounded-xl shadow-sm">
              <p className="text-sm text-gray-500">Eligible To Donate</p>
              <p className="font-semibold text-blue-500">After 12 days</p>
            </div>
          </div>
        </motion.div>
        <motion.div
          className="flex-1 p-6 rounded-2xl shadow-2xl bg-white/10 dark:bg-gray-900/40 backdrop-blur-lg border border-blue-400/30"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <h2 className="font-heading text-2xl font-semibold mb-4 tracking-wide text-cyan-400">
            My Notes
          </h2>
          <div className="flex flex-col gap-3 mb-6">
            <input
              type="text"
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
              placeholder="Prescription title"
              className="px-4 py-2 rounded-lg border border-cyan-400/40 bg-gray-50 dark:bg-gray-950 text-sm focus:ring-2 focus:ring-cyan-400 focus:outline-none"
            />
            <textarea
              value={noteBody}
              onChange={(e) => setNoteBody(e.target.value)}
              placeholder="Write prescription or notes here..."
              className="px-4 py-2 rounded-lg border border-cyan-400/40 bg-gray-50 dark:bg-gray-950 text-sm focus:ring-2 focus:ring-cyan-400 focus:outline-none"
            />
            <button
              onClick={addOrUpdateNote}
              className="bg-red-400 py-2 rounded-full cursor-pointer px-3 text-white font-medium tracking-wide"
            >
              {editId ? "Update Note" : "Save Note"}
            </button>
          </div>

          <ul className="space-y-3">
            {notes.map((n) => (
              <li
                key={n.id}
                className="flex justify-between items-start p-4 rounded-lg bg-gray-100/30 dark:bg-gray-800/50 border border-transparent hover:border-purple-400/40 transition"
              >
                <div>
                  <h3 className="font-heading font-semibold text-cyan-400">{n.title}</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{n.body}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(n)}
                    className="text-cyan-400 hover:text-cyan-600 transition"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => deleteNote(n.id)}
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
}

export default Dashboard;
