import React, { useContext } from "react";
import { Data } from "../Context/PostContext";

const Register = () => {
  const { handleSubmit, login, onChange } = useContext(Data);

  return (
    <div className="container-fluid loginSection" >
      <div className="row ">
        <div
          className="col-md-8 col-sm-7 col-12 d-flex align-items-center justify-content-center imglogin"
      
        >
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
          <h1 className="h1"
     
          >
            Plane Scape Welcome
          </h1>
        </div>


        <div
          className="col-md-4 col-sm-5 col-12 d-flex align-items-center justify-content-center  imgLoginn"
       
        >
          <div style={{ width: "100%", maxWidth: "400px" }}>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
              <div className="col-md-12 form-group  p-0 m-0">
                <label htmlFor="firstName" style={{ fontSize: "13px" }}>
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  name="firstName"
                  value={login.firstName}
                  onChange={onChange}
                  style={{ backgroundColor: "transparent"}}
                  required
                />
              </div>

              <div className="col-md-12 form-group p-0">
                <label htmlFor="lastName" style={{ fontSize: "13px" }}>
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Last Name"
                  name="lastName"
                  value={login.lastName}
                  onChange={onChange}
                  style={{ backgroundColor: "transparent"}}
                  required
                />
              </div>

              <div className="form-group p-0">
                <label htmlFor="email" style={{ fontSize: "13px" }}>
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={login.email}
                  onChange={onChange}
                  placeholder="Enter email"
                  style={{ backgroundColor: "transparent" }}
                  required
                />
              </div>

              <div className="row pt-0">
                <div className="col-md-6 form-group">
                  <label htmlFor="password" style={{ fontSize: "13px" }}>
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={login.password}
                    onChange={onChange}
                    placeholder="Enter password"
                    style={{ backgroundColor: "transparent" }}
                    required
                  />
                </div>

                <div className="col-md-6 form-group">
                  <label htmlFor="confirmPassword" style={{ fontSize: "13px" }}>
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    name="confirmPassword"
                    value={login.confirmPassword}
                    onChange={onChange}
                    placeholder="Confirm password"
                    style={{ backgroundColor: "transparent"}}
                    required
                  />
                </div>
              </div>

              <div className="col-12 p-0 m-0 ">
                <button
                  type="submit"
                  className="btn btnlogin"
                                  
                >
                  <strong>Register</strong>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
