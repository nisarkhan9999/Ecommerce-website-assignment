import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    const res = await fetch("https://e-commerce-backend-five-henna.vercel.app/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("userName", data.name);
      window.dispatchEvent(new Event("authChanged"));
      navigate("/");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-logo">SHOP.CO</div>
        <p className="auth-subtitle">Create your account</p>

        <input className="auth-input" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input className="auth-input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="auth-input" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button className="auth-btn" onClick={handleSignup}>Sign Up</button>

        <p className="auth-switch">
          Already have an account? <span onClick={() => navigate("/login")}>Login</span>
        </p>
      </div>
    </div>
  );
};


export default Signup;