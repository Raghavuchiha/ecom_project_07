import { useState, useEffect, useContext } from "react";
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
        <div className="flex flex-col items-center gap-2 mb-8">
          <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center text-black font-bold text-2xl">
            {user.username?.[0]?.toUpperCase()}
          </div>
          <p className="font-semibold text-gray-800">{user.username}</p>
          <p className="text-xs text-gray-400">{user.email}</p>
        </div>

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

// ✅ PersonalInfo — now wired to /profile GET and PATCH
const PersonalInfo = ({ user, token }) => {
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  const [username, setUsername] = useState(user.username);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");

  // fetch profile data on mount
  useEffect(() => {
    fetch(`${API_URL}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setFullName(data.full_name || "");
        setPhone(data.phone || "");
        setDob(data.date_of_birth || "");
        setGender(data.gender || "");
      })
      .catch((err) => console.error("Failed to load profile", err))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/profile`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          full_name: fullName,
          phone: phone,
          date_of_birth: dob || null,
          gender: gender,
        }),
      });
      if (!res.ok) throw new Error("Failed to save");
      setEditing(false);
    } catch (err) {
      alert("Could not save. Try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="text-gray-400 text-sm">Loading...</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-6">Personal Info</h2>
      <div className="flex flex-col gap-5 max-w-md">

        {/* Username */}
        <div>
          <label className="text-xs text-gray-400 uppercase font-semibold mb-1 block">Username</label>
          {editing ? (
            <input value={username} onChange={(e) => setUsername(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400" />
          ) : (
            <p className="text-gray-800 font-medium">{user.username}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="text-xs text-gray-400 uppercase font-semibold mb-1 block">Email</label>
          <p className="text-gray-800 font-medium">{user.email}</p>
          <p className="text-xs text-gray-400 mt-1">Email cannot be changed</p>
        </div>

        {/* Full Name */}
        <div>
          <label className="text-xs text-gray-400 uppercase font-semibold mb-1 block">Full Name</label>
          {editing ? (
            <input value={fullName} onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              className="border border-gray-300 rounded-lg px-4 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400" />
          ) : (
            <p className="text-gray-800 font-medium">{fullName || <span className="text-gray-400">Not set</span>}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="text-xs text-gray-400 uppercase font-semibold mb-1 block">Phone</label>
          {editing ? (
            <input value={phone} onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              className="border border-gray-300 rounded-lg px-4 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400" />
          ) : (
            <p className="text-gray-800 font-medium">{phone || <span className="text-gray-400">Not set</span>}</p>
          )}
        </div>

        {/* Date of Birth */}
        <div>
          <label className="text-xs text-gray-400 uppercase font-semibold mb-1 block">Date of Birth</label>
          {editing ? (
            <input type="date" value={dob} onChange={(e) => setDob(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400" />
          ) : (
            <p className="text-gray-800 font-medium">{dob || <span className="text-gray-400">Not set</span>}</p>
          )}
        </div>

        {/* Gender */}
        <div>
          <label className="text-xs text-gray-400 uppercase font-semibold mb-1 block">Gender</label>
          {editing ? (
            <select value={gender} onChange={(e) => setGender(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400">
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          ) : (
            <p className="text-gray-800 font-medium">{gender || <span className="text-gray-400">Not set</span>}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-2">
          {editing ? (
            <>
              <button onClick={handleSave} disabled={saving}
                className="bg-yellow-400 text-black px-5 py-2 rounded-lg text-sm font-semibold hover:bg-yellow-500 transition disabled:opacity-50">
                {saving ? "Saving..." : "Save"}
              </button>
              <button onClick={() => { setEditing(false); setUsername(user.username); }}
                className="text-gray-500 px-5 py-2 rounded-lg text-sm font-semibold hover:bg-gray-100 transition">
                Cancel
              </button>
            </>
          ) : (
            <button onClick={() => setEditing(true)}
              className="border border-gray-300 text-gray-700 px-5 py-2 rounded-lg text-sm font-semibold hover:bg-gray-50 transition">
              Edit
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

const ComingSoon = ({ label }) => (
  <div className="flex flex-col items-center justify-center h-64 text-gray-400">
    <p className="text-4xl mb-3">🚧</p>
    <p className="font-semibold">{label} coming soon</p>
    <p className="text-sm mt-1">We'll build this next</p>
  </div>
);

export default Profile;
