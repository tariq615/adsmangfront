import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import userAuth from "../mongodb/userAuth"
import { userLogin } from "../store/userAuthSlice";
import { useDispatch } from "react-redux";


const Start = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userData = {
      email: email,
      password: password,
    };

    try {
      const response = await userAuth.login(userData);
      if (response.status === 200) {
        const { admin, token } = response.data.data;
        console.log(admin, token);
        // dispatch(roleAuth("user"));
        dispatch(userLogin({ userData: admin }));
        localStorage.setItem("token", token);
        navigate("/admin/dashboard");
      }
    } catch (error: any) {
  setEmail("");
  setPassword("");
  setError(error);
}

  };
  return (
    <div className="login-wrapper">
      <div className="login-box">
        <div className="logo">
          <img src="/lg1.png" alt="icon" />
          <img src="/lg2.png" alt="WeeShare" />
        </div>
        <h2 className="login-title">Welcome Back, 👋</h2>
        <p className="login-subtext">
          Sign in to your dashboard & start tracking your analytics
          <Link to="/signup" className="signup-link">
            Sign Up
          </Link>
        </p>

        <form onSubmit={submitHandler} className="form">
  <div className="form-group">
    <label className="form-label">Email</label>
    <input
      type="text"
      className="form-input"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />

    <label className="form-label">Password</label>
    <input
      type="password"
      className="form-input"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />

    <p className="forgot-password">Forgot Password?</p>

    {error.length > 0 && (
      <ul className="text-red-500 text-sm mt-2">
        {error.map((err, index) => (
          <li key={index}>{err}</li>
        ))}
      </ul>
    )}

    <button type="submit" className="submit-button">
      Sign in
    </button>
  </div>
</form>

      </div>
    </div>
  );
};

export default Start;
