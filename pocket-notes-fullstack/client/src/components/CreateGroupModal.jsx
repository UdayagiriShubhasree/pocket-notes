import { useState } from "react";
import styles from "../styles/Modal.module.css";

export default function CreateGroupModal({ onClose, onCreate }) {
  const [name, setName] = useState("");
  const [color, setColor] = useState("#3b82f6");

  const handleCreate = () => {
    if (!name.trim() || name.length < 2) {
      alert("Group name must be at least 2 characters");
      return;
    }

    onCreate(name, color);
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3>Create New Group</h3>

        <input
          placeholder="Enter group name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className={styles.colors}>
          {["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6"].map(
            (c) => (
              <div
                key={c}
                className={styles.colorCircle}
                style={{ backgroundColor: c }}
                onClick={() => setColor(c)}
              />
            )
          )}
        </div>

        <button onClick={handleCreate}>Create</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}