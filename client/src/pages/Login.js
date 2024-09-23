import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Data } from "../Context/PostContext";

const Login = () => {
  const { user, handleSubmitLogin, handleChange } = useContext(Data);
  return (
    <div className="container-fluid loginSection">
      <div className="row">
        <div className="col-md-8 col-sm-7 col-12 d-flex align-items-center justify-content-center imglogin">
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: "70%",
              backdropFilter: "blur(5px)",
            }}
          ></div>
          <h1 className="h1" style={{}}>
            Plane Scape Welcome
          </h1>
        </div>

        <div className="col-md-4 col-sm-5 col-12 d-flex align-items-center justify-content-center p-2 imgLoginn">
          <div style={{ width: "100%", maxWidth: "400px" }}>
            <h2>Login</h2>
            <form onSubmit={handleSubmitLogin}>
              <div className="form-group">
                <label htmlFor="email" style={{ fontSize: "13px" }}>
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  style={{ backgroundColor: "transparent" }}
                  required
                />
              </div>
              <div className="form-group mt-3">
                <label htmlFor="password" style={{ fontSize: "13px" }}>
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  style={{ backgroundColor: "transparent"}}
                  required
                />
              </div>
              <div
                className="row "
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div className="col-md-8 col-9">
                  <button
                    className="btn btnlogin"
           
                  >
                    <strong>Login</strong>
                  </button>
                </div>
                <div className="col-md-4 col-3 p-0 ">
                  <Link to="/register" className="importLogin">
                    <strong>Register ?</strong>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
