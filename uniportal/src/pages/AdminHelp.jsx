import { useState, useEffect } from "react";
import AdminNavbar from "../components/AdminNavbar";
import AdminSidebar from "../components/AdminSidebar";
import "./AdminHelp.css";

export default function AdminHelp() {

  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(prev => !prev);

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [contacts, setContacts] = useState([]);

  const [text, setText] = useState("");

  useEffect(() => {
    setContacts(JSON.parse(localStorage.getItem("helpContacts")) || []);
    setText(localStorage.getItem("antiRaggingText") || "");
  }, []);

  useEffect(() => {
    localStorage.setItem("helpContacts", JSON.stringify(contacts));
    localStorage.setItem("antiRaggingText", text);
  }, [contacts, text]);

  const addContact = () => {
    if (!name || !number) return;

    setContacts([...contacts, { name, number }]);
    setName("");
    setNumber("");
  };

  const deleteContact = (i) => {
    setContacts(contacts.filter((_, idx) => idx !== i));
  };

  return (
    <>
      <AdminNavbar toggleSidebar={toggleSidebar} />
      <AdminSidebar isOpen={isOpen} />

      <div className="admin-help-page">

        <div className="hero-card">
          <h2>🚨 Admin Emergency & Help Panel</h2>
        </div>

        <div className="admin-card">
          <h3>📞 Important Contacts</h3>

          <input
            placeholder="Contact Name (e.g. Security)"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            placeholder="Phone Number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />

          <button onClick={addContact}>➕ Add Contact</button>

          {contacts.map((c, i) => (
            <div key={i} className="list-row">
              <span>{c.name} - {c.number}</span>
              <button onClick={() => deleteContact(i)}>❌</button>
            </div>
          ))}
        </div>

        <div className="admin-card">
          <h3>🚫 Anti-Ragging Help Text</h3>

          <input
            placeholder="Enter message (Facing ragging? Report immediately!)"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <p><b>Preview:</b> {text}</p>
        </div>

       
        <div className="admin-card">
          <h3>🚑 Emergency Services</h3>

          <div className="list-row">🚑 Ambulance - 108</div>
          <div className="list-row">👮 Police - 100</div>
          <div className="list-row">🔥 Fire - 101</div>
        </div>

      </div>
    </>
  );
}