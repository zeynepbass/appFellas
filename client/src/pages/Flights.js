import React, { useEffect, useContext } from "react";
import { Data } from "../Context/PostContext";
const Flight = () => {
  const form = JSON.parse(localStorage.getItem("form"));
  // contextapisinden ihtiyac dahilindeki verileri cekmek
  const { MyFlights, data, Details, details } = useContext(Data);
  useEffect(() => {
    MyFlights();
  });
  // saat farkını almak
  const parseTime = (timeString) => {
    const [time, modifier] = timeString.split(" ");

    let [hours, minutes] = time.split(":");
    if (hours === "12") {
      hours = "00";
    }
    if (modifier === "PM") {
      hours = parseInt(hours, 10) + 12;
    }

    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    return date;
  };

  const calculateTimeDifference = (schedule, actual) => {
    const scheduledDate = parseTime(schedule);
    const actualDate = parseTime(actual);

    let diffInMilliseconds = actualDate - scheduledDate;

    if (diffInMilliseconds < 0) {
      diffInMilliseconds += 24 * 60 * 60 * 1000;
    }

    const diffInMinutes = Math.floor(diffInMilliseconds / 1000 / 60);

    const hours = Math.floor(diffInMinutes / 60);
    const minutes = diffInMinutes % 60;


    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  return (
    <div className="container-fluid p-0 m-0 ">
      <div className="container-fluid p-2 m-0 banner">
        <div className="row m-0">
          <div className="col-md-9 ">
            {" "}
            <div className="row">
              <div className="col-md-2 col-4 p-1 ">
                <button className="btn btn-outline-secondary btn-spacing">
                  Times
                </button>
              </div>
              <div className="col-md-2 col-4 p-1 ">
                <button className="btn btn-outline-secondary btn-spacing">
                  Stops
                </button>
              </div>
              <div className="col-md-2 col-4 p-1 ">
                <button className="btn btn-outline-secondary btn-spacing">
                  Airlines
                </button>
              </div>

              <div className="col-md-2 col-4 p-1 ">
                <button className="btn btn-outline-secondary btn-spacing">
                  Airports
                </button>
              </div>
              <div className="col-md-2 col-4 p-1 ">
                <button className="btn btn-outline-secondary btn-spacing">
                  Amenities
                </button>
              </div>
              <div className="col-md-2 col-4 p-1 ">
                <select
                  className="form-control editSearch"
                  style={{
                    width: "auto",
                    fontWeight: "bold",
                    background: "tranparent",
                    color: "rgb(68,8,145)",
                    border: "none",
                  }}
                >
                  <option>Edit Search</option>
                </select>
              </div>
            </div>
          </div>
          <div className="col-md-3 p-0 m-0">
            <div className="row p-0 m-0 starsRow">
              <div className="stars col-3">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-regular fa-star"></i>
                <i className="fa-regular fa-star"></i>
                <i className="fa-regular fa-star"></i>
                <i className="fa-regular fa-star"></i>
              </div>

              <div className="stars col-3">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-regular fa-star"></i>
                <i className="fa-regular fa-star"></i>
                <i className="fa-regular fa-star"></i>
              </div>

              <div className="stars col-3">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-regular fa-star"></i>
                <i className="fa-regular fa-star"></i>
              </div>

              <div className="stars col-3">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="justify-content-between d-flex align-items-center">
            <span>Sort by: </span>
            <span>
              <select className="form-control p-0 selectFilter">
                <option>Recommended</option>
              </select>
            </span>
          </div>

          <div>
            <i className="fa-solid fa-circle-info"></i> Avg Fare:{" "}
            <strong>$2000</strong>
          </div>
        </div>

        <div className="container-fluid p-0 mt-4 airlines-list-user">
          <div className="row">
            {data.some((item) => item.email === form.email) ? (
              data
                .filter((item) => item.email === form.email)
                .map((item, index) => {
                  const landingTime = item.actual;
                  const scheduledTime = item.schedule;

                  const timeDifference =
                    landingTime && scheduledTime
                      ? calculateTimeDifference(scheduledTime, landingTime)
                      : null;
                  return (
                    <div className="col-12  flight-box p-5" key={index}>
                      <div className="row ">
                        <div className="col-sm-7 ">
                          <div className="row">
                            <div className="col-sm-1 flight-timeDiv p-0 pt-1 m-0 flightsImg">
                              <img
                                src="/images/amsterdam.png"
                                width="40"
                                height="40"
                                style={{ borderRadius: "40px" }}
                                className="img"
                                alt=""
                              />
                            </div>

                            <div className="col-sm-11 flight-timeDiv p-0 m-0">
                              <span className="flight-time">
                                {" "}
                                <strong>
                                  {item.schedule}-{item.actual}
                                </strong>
                              </span>
                              <br />
                              <div className="row">
                                <div className="col-sm-4 col-12 details pl-3">
                                  {" "}
                                  <p>
                                    <strong>{item.airline}</strong>{" "}
                                  </p>
                                </div>
                                <div className="col-sm-4 col-12 details ">
                                  {" "}
                                  <p>
                                    <span>Nonstop</span>
                                    <br />
                                    <span
                                      className="text-muted"
                                      style={{
                                        fontSize: "14px",
                                        textAlign: "center",
                                      }}
                                    >
                                      {timeDifference !== null
                                        ? timeDifference
                                        : "Unknown"}{" "}
                                    </span>
                                  </p>
                                </div>
                                <div className="col-sm-4 col-12 details">
                                  {" "}
                                  <p>
                                    <span>{item.depature}</span>
                                    <br />
                                    <span
                                      className="text-muted"
                                      style={{ fontSize: "14px" }}
                                    >
                                      {item.aircraftType}
                                    </span>
                                  </p>{" "}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-5 pt-2 ">
                          <div className="row  justify-content-around">
                            <div className="col-sm-2  flightsCard p-2 text-center d-flex flex-column">
                              <span className="flight-price">$156</span>
                              <br />
                              <span className="text-gray">Main</span>
                            </div>
                            <div className="col-sm-2  flightsCard p-2 text-center d-flex flex-column">
                              <span className="flight-price">$204</span>
                              <br />
                              <span className="text-gray">Comfort+</span>
                            </div>
                            <div
                              className="col-sm-2  flightsCard p-2 text-center d-flex flex-column "
                              style={{
                                border: "1px solid rgb(223,233,223)",
                                borderRadius: "10px",
                                background: "#e0e0e0",
                              }}
                            >
                              <span className="flight-price">. . .</span>
                              <br />
                            </div>
                            <div className="col-sm-2  flightsCard p-2 text-center d-flex flex-column">
                              <span className="flight-price">$386</span>
                              <br />
                              <span className="text-gray">Delta One</span>
                            </div>
                            <div className="col-sm-2  flightsCard p-2 text-center d-flex flex-column ">
                              <span className="flight-price">. . .</span>
                              <br />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12 pl-4">
                          <button
                            onClick={() => Details(item._id)}
                            data-toggle="collapse"
                            data-target="#collapseExample"
                            aria-expanded="false"
                            aria-controls="collapseExample"
                            style={{
                              background: "transparent",
                              border: "none",
                              fontSize: "14px",
                              outline: "none",
                            }}
                          >
                            <span className="flight-details pl-5 m-0">
                              Flight Details{" "}
                              <i className="fa-solid fa-caret-down"></i>
                            </span>
                          </button>
                          <div className="collapse" id="collapseExample">
                            <div className="card card-body p-0 m-0 ">
                              {details ? (
                                <div className="modal-body">
                                  <div className="modal-item">
                                    <p>
                                      <strong>Name:</strong> {details.name}
                                    </p>
                                  </div>
                                  <div className="modal-item">
                                    <p>
                                      <strong>Surname:</strong>
                                      <span className="aircraft-type">
                                        {details.surname}{" "}
                                      </span>
                                    </p>
                                  </div>
                                  <div className="modal-item">
                                    <p>
                                      <strong>Email:</strong>
                                      <span className="airline-name">
                                        {details.email}
                                      </span>
                                    </p>
                                  </div>
                                  <div className="modal-item">
                                    <p>
                                      <strong>Depature:</strong>
                                      <span className="time">
                                        {details.depature}
                                      </span>
                                    </p>
                                  </div>
                                  <div className="modal-item">
                                    <p>
                                      <strong>Aircraft Type</strong>
                                      <span className="time">
                                        {details.aircraftType}
                                      </span>
                                    </p>
                                  </div>
                                  <div className="modal-item">
                                    <p>
                                      <strong>Airline</strong>
                                      <span className="time">
                                        {details.airline}
                                      </span>
                                    </p>
                                  </div>
                                  <div className="modal-item">
                                    <p>
                                      <strong>Schedule</strong>
                                      <span className="baggage">
                                        {details.schedule}
                                      </span>
                                    </p>
                                  </div>
                                  <div className="modal-item">
                                    <p>
                                      <strong>Schedule Date</strong>
                                      <span className="baggage">
                                        {details.scheduleDate}
                                      </span>
                                    </p>
                                  </div>
                                  <div className="modal-item">
                                    <p>
                                      <strong>Actual</strong>
                                      <span className="status">
                                        {details.actual}
                                      </span>
                                    </p>
                                  </div>
                                  <div className="modal-item">
                                    <p>
                                      <strong>Actual Date</strong>
                                      <span className="status">
                                        {details.actualDate}
                                      </span>
                                    </p>
                                  </div>
                                  <div className="modal-item">
                                    <p>
                                      <strong>Price</strong>
                                      <span className="status">
                                        {details.price}
                                      </span>
                                    </p>
                                  </div>
                                </div>
                              ) : (
                                <p>No flight.</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
            ) : (
              <p>No matching email found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flight;
