import { useState } from "react";
import api from "../services/api";

function Login() {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const login = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      localStorage.setItem("user", JSON.stringify(res.data.user));

      window.location = "/dashboard";
    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data?.message || "Login gagal");
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-4">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="text-center mb-4">Hotel Reservation</h2>

              <form onSubmit={login}>
                <input
                  className="form-control mb-3"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <input
                  className="form-control mb-3"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button className="btn btn-primary w-100">Login</button>
              </form>

              <br />

              <a href="/register">Belum punya akun?</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
