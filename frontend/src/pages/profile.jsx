import { useState, useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import API_URL from "../config";

const TABS = ["Personal Info", "Address", "Order History", "Wishlist", "Security"];

const Profile = () => {
  const { user, logout, token } = useContext(ShopContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Personal Info");

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // If not logged in, show message instead of crashing
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">
          Please{" "}
          <a href="/login" className="text-yellow-500 font-semibold underline">
            login
          </a>{" "}
          to view your profile.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 flex gap-8 min-h-screen">

      {/* Sidebar */}
      <aside className="w-60 shrink-0">
        {/* Avatar */}
        <div className="flex flex-col items-center gap-2 mb-8">
          <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center text-black font-bold text-2xl">
            {user.username?.[0]?.toUpperCase()}
          </div>
          <p className="font-semibold text-gray-800">{user.username}</p>
          <p className="text-xs text-gray-400">{user.email}</p>
        </div>

        {/* Tab buttons */}
        <nav className="flex flex-col gap-1">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-left px-4 py-3 rounded-lg text-sm font-medium transition ${
                activeTab === tab
                  ? "bg-yellow-400 text-black"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {tab}
            </button>
          ))}
          <button
            onClick={handleLogout}
            className="text-left px-4 py-3 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition mt-4"
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* Main content panel */}
      <main className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        {activeTab === "Personal Info" && <PersonalInfo user={user} token={token} />}
        {activeTab === "Address"       && <ComingSoon label="Address Management" />}
        {activeTab === "Order History" && <ComingSoon label="Order History" />}
        {activeTab === "Wishlist"      && <ComingSoon label="Wishlist" />}
        {activeTab === "Security"      && <ComingSoon label="Security" />}
      </main>
    </div>
  );
};

// Personal Info tab
const PersonalInfo = ({ user, token }) => {
  const [editing, setEditing] = useState(false);
  const [username, setUsername] = useState(user.username);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/me`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ username }),
      });
      if (!res.ok) throw new Error("Failed to save");
      setEditing(false);
    } catch (err) {
      alert("Could not save. Try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-6">Personal Info</h2>
      <div className="flex flex-col gap-5 max-w-md">

        <div>
          <label className="text-xs text-gray-400 uppercase font-semibold mb-1 block">
            Username
          </label>
          {editing ? (
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          ) : (
            <p className="text-gray-800 font-medium">{user.username}</p>
          )}
        </div>

        <div>
          <label className="text-xs text-gray-400 uppercase font-semibold mb-1 block">
            Email
          </label>
          <p className="text-gray-800 font-medium">{user.email}</p>
          <p className="text-xs text-gray-400 mt-1">Email cannot be changed</p>
        </div>

        <div className="flex gap-3 mt-2">
          {editing ? (
            <>
              <button
                onClick={handleSave}
                disabled={saving}
                className="bg-yellow-400 text-black px-5 py-2 rounded-lg text-sm font-semibold hover:bg-yellow-500 transition disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save"}
              </button>
              <button
                onClick={() => { setEditing(false); setUsername(user.username); }}
                className="text-gray-500 px-5 py-2 rounded-lg text-sm font-semibold hover:bg-gray-100 transition"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="border border-gray-300 text-gray-700 px-5 py-2 rounded-lg text-sm font-semibold hover:bg-gray-50 transition"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Placeholder for tabs not built yet
const ComingSoon = ({ label }) => (
  <div className="flex flex-col items-center justify-center h-64 text-gray-400">
    <p className="text-4xl mb-3">🚧</p>
    <p className="font-semibold">{label} coming soon</p>
    <p className="text-sm mt-1">We'll build this next</p>
  </div>
);

export default Profile;
