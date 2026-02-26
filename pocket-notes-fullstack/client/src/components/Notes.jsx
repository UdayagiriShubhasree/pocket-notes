import { useEffect, useState } from "react";
import api from "../api";
import styles from "../styles/Notes.module.css";

export default function Notes({ group }) {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    if (group) fetchNotes();
  }, [group]);

  const fetchNotes = async () => {
    try {
      const res = await api.get(`/notes/${group._id}`);
      setNotes(res.data);
    } catch (err) {
      console.log("Error fetching notes:", err);
    }
  };

  const addNote = async () => {
    if (!text.trim()) return;

    try {
      await api.post("/notes", {
        text,
        groupId: group._id
      });

      setText("");
      fetchNotes();
    } catch (err) {
      console.log("Error adding note:", err);
    }
  };

  return (
    <div className={styles.notesContainer}>
      <div className={styles.header}>
        {group ? group.name : "Select group"}
      </div>

      <div className={styles.notesList}>
        {notes.map(note => (
          <div key={note._id} className={styles.noteItem}>
            {note.text}
          </div>
        ))}
      </div>

      {group && (
        <div className={styles.inputArea}>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addNote()}
            placeholder="Enter note..."
            className={styles.textarea}
          />
        </div>
      )}
    </div>
  );
}