import React from "react";
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
  // sayfa konturolu yapıldı
  const navigate = useNavigate();
  const storedData = JSON.parse(localStorage.getItem("form"));
  const LogOut = () => {
    localStorage.removeItem("form");
    navigate("/login");
  };
  return (
    <div className="container-fluid p-0 m-0">
      <>
        {storedData ? (
          <></>
        ) : (
          <div className="container-fluid">
            <div className="row p-1 marque">
              <div className="col">
                <h5 className="marquee-text">
                  <span className="offer-text">
                    🎉 Exclusive Offer for New Members:{" "}
                    <span className="offer-highlight">Discount Coupon!</span>
                  </span>
                </h5>
              </div>
            </div>
          </div>
        )}
      </>

      <div className="row m-0 p-2">
        <div className="col">
          <Link to="/">
            {" "}
            <img src="./images/logo.png" width="160" height="40" alt="" />
          </Link>
        </div>
        <div className="col d-flex justify-content-end">
          <button className="btn btn-link btnLink">
            <i className="fas fa-bullhorn "></i>
            &nbsp;Deals
          </button>
          <button className="btn btn-link btnLink">
            <i className="fa-solid fa-earth-americas "></i>
            &nbsp;Discover
          </button>
          {storedData ? (
            <button className="btn btn-link btnDeals" onClick={LogOut}>
              <i className="far fa-user pr-2"></i>
              {storedData.firstName} {storedData.lastName}
            </button>
          ) : (
            <button className="btn btn-link btnDeals" onClick={()=>navigate("/login")}>
              <strong>&nbsp;Member Login</strong>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
