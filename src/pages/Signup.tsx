import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import userAuth from "../mongodb/userAuth";
import { userLogin } from "../store/userAuthSlice";
import { useDispatch } from "react-redux";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userData = new FormData();
    userData.append("name", name);
    userData.append("email", email);
    userData.append("password", password);
    userData.append("image", image);

    try {
      const response = await userAuth.createAccount(userData);
      if (response.status === 201) {
        const { admin, token } = response.data.data;
        console.log(admin, token);
        // dispatch(roleAuth("user"));
        dispatch(userLogin({ userData: admin }));
        localStorage.setItem("token", token);
        navigate("/admin/dashboard");
      }
    } catch (error: any) {
      setName("");
      setEmail("");
      setPassword("");
      setImage(null);
      setError(error);
    }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
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
        </p>

        <form onSubmit={submitHandler} className="form">
          <div className="form-group">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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

export default Signup;
