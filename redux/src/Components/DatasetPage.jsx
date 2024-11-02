import React, { useState, useEffect } from "react";
import "./Dataset.css";

function DatasetPage() {
  const [admins, setAdmins] = useState([]);
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formType, setFormType] = useState(""); // 'admin' or 'user'
  const [formData, setFormData] = useState({ name: "", password: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    const storedAdmins = JSON.parse(localStorage.getItem("admins")) || [];
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setAdmins(storedAdmins);
    setUsers(storedUsers);
  }, []);

  const openModal = (type) => {
    setFormType(type);
    setFormData({ name: "", password: "" });
    setIsModalOpen(true);
    setError("");
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    // Validation
    if (!formData.name || !formData.password) {
      setError("Name and password are required");
      return;
    }

    const newEntry = {
      id: formType === "admin" ? Date.now() : Date.now(), // Replace with a better unique ID generation method
      ...formData,
    };

    if (formType === "admin") {
      const updatedAdmins = [...admins, newEntry];
      setAdmins(updatedAdmins);
      localStorage.setItem("admins", JSON.stringify(updatedAdmins));
    } else if (formType === "user") {
      const updatedUsers = [...users, newEntry];
      setUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
    }
    closeModal();
  };

  const handleDeleteAdmin = (id) => {
    const updatedAdmins = admins.filter((admin) => admin.id !== id);
    setAdmins(updatedAdmins);
    localStorage.setItem("admins", JSON.stringify(updatedAdmins));
  };

  const handleDeleteUser = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  return (
    <div className="fulldata">
      <h2>Manage Dataset</h2>
      <button onClick={() => openModal("admin")}>Add Admin</button>
      <button onClick={() => openModal("user")}>Add User</button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add {formType === "admin" ? "Admin" : "User"}</h3>
            {error && <p className="error">{error}</p>}
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter name"
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter password"
            />
            <button onClick={handleSubmit}>Submit</button>
            <button onClick={closeModal}>Cancel</button>
          </div>
        </div>
      )}

      <div className="table">
        <div>
          <h3>Admins</h3>
          {admins.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {admins.map((admin) => (
                  <tr key={admin.id}>
                    <td>{admin.id}</td>
                    <td>{admin.name}</td>
                    <td>
                      <button onClick={() => handleDeleteAdmin(admin.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No admins added yet.</p>
          )}
        </div>

        <div>
          <h3>Users</h3>
          {users.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>
                      <button onClick={() => handleDeleteUser(user.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No users added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DatasetPage;
