import { useEffect, useState } from "react";
import api from "../api";
import styles from "../styles/Sidebar.module.css";
import CreateGroupModal from "./CreateGroupModal";
import { toast } from "react-toastify";

export default function Sidebar({ setSelectedGroup }) {
  const [groups, setGroups] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const res = await api.get("/groups");
      setGroups(res.data);
    } catch (err) {
      toast.error("Failed to fetch groups");
    }
  };

  const createGroup = async (name, color) => {
    try {
      await api.post("/groups", { name, color });
      toast.success("Group created!");
      fetchGroups();
    } catch (err) {
      toast.error("Failed to create group");
    }
  };

  return (
    <div className={styles.sidebar}>
      <h2>Pocket Notes</h2>

      {groups.map((g) => {
        const initials = g.name
          .split(" ")
          .map(word => word[0])
          .join("")
          .toUpperCase();

        return (
          <div
            key={g._id}
            onClick={() => setSelectedGroup(g)}
            className={styles.groupRow}
          >
            <div
              className={styles.initialCircle}
              style={{ backgroundColor: g.color }}
            >
              {initials}
            </div>
            <span>{g.name}</span>
          </div>
        );
      })}

      {/* Floating Add Button */}
      <button
        className={styles.floatingBtn}
        onClick={() => setShowModal(true)}
      >
        +
      </button>

      {showModal && (
        <CreateGroupModal
          onClose={() => setShowModal(false)}
          onCreate={createGroup}
        />
      )}
    </div>
  );
}