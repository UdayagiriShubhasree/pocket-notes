import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Notes from "./components/Notes";
import Auth from "./pages/Auth";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  const [selectedGroup, setSelectedGroup] = useState(null);

  if (!isAuthenticated) {
    return <Auth setIsAuthenticated={setIsAuthenticated} />;
  }

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar setSelectedGroup={setSelectedGroup} />
      <Notes group={selectedGroup} />
    </div>
  );
}