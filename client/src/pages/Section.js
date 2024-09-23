import React, { useState, useContext, useEffect } from "react";
import { Data } from "../Context/PostContext";
const Section = () => {
  const [sortBy, setSortBy] = useState("Lowest Price");
  const [arrivalTime, setArrivalTime] = useState("");
  const [stops, setStops] = useState("");
  const [isRoundTrip, setIsRoundTrip] = useState(true);
  const [airline, setAirline] = useState("");
  const discount = 200;
  const initialPrice = 2000;
  const finalPrice = initialPrice - discount;

  const {
    handleFilter,
    formatDate,
    setFilteredFlights,
    flights,
    flightCountries,
    dateOptions,
    setSelectedLandingDate,
    setSelectedScheduleDate,
    filteredFlights,
    setSelectedFlight,
    selectedFlight,
    setSelectedDestination,
    airlines,
    FormBasket,
    form,
    formatTime,
    handleButtonClick,
  } = useContext(Data);
  const calculateTimeDifference = (time1, time2) => {
    const date1 = new Date(time1);
    const date2 = new Date(time2);

    const differenceInMilliseconds = Math.abs(date2 - date1);
    const differenceInMinutes = Math.floor(differenceInMilliseconds / 60000);

    const hours = Math.floor(differenceInMinutes / 60);
    const minutes = differenceInMinutes % 60;

    if (hours > 0) {
      return `${hours}h ${minutes} m`;
    }
    return `${minutes}m`;
  };
  useEffect(() => {
    setFilteredFlights(flights);
  }, [flights]);

  return (
    <div className="container-fluid m-0 p-3">
      <div className="row">
        <div className="col-lg-9 col-12">
          <div
            className="col-12 p-4"
            style={{
              background: "white",
              borderRadius: "10px",
              height: "auto",
            }}
          >
            <div
              className="row p-0 m-0"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <p>
                <span>
                  <i className="fa-solid fa-plane pr-2"></i>
                </span>
                <span style={{ fontSize: "15px" }}>
                  <strong>BOOK YOUR FLIGHT</strong>
                </span>
              </p>
              <p>
                <span style={{ fontSize: "15px" }}>
                  <button
                    onClick={() => setIsRoundTrip(true)}
                    style={{
                      backgroundColor: isRoundTrip
                        ? "rgb(68,8,145)"
                        : "rgb(246,244,248)",
                      color: isRoundTrip ? "white" : "rgb(68,8,145)",
                      padding: "10px",
                      width: "110px",
                      border: "none",
                      marginRight: "5px",
                      borderRadius: "50px 0 0 50px ",
                    }}
                  >
                    Round trip
                  </button>
                  <button
                    onClick={() => setIsRoundTrip(false)}
                    style={{
                      backgroundColor: !isRoundTrip
                        ? "rgb(68,8,145)"
                        : "rgb(246,244,248)",
                      color: !isRoundTrip ? "white" : "rgb(68,8,145)",
                      padding: "10px",
                      width: "110px",
                      borderRadius: "0 50px 50px 0",
                      border: "none",
                    }}
                  >
                    One way
                  </button>
                </span>
              </p>
            </div>

            <br />
            <form>
              <div className="form-row mb-3">
                {isRoundTrip ? (
                  <>
                    <div className="col-md-3 col-6 pb-1">
                      <i
                        className="fa-solid fa-plane-departure ml-2"
                        style={{
                          color: "rgb(68,8,145)",
                          position: "absolute",
                          top: "10px",
                        }}
                      ></i>
                      <input
                        type="text"
                        className="form-control pl-5"
                        placeholder="AMD"
                        style={{ borderRadius: " 50px 0 0 50px" }}
                        disabled
                      />
                    </div>
                    <div className="col-md-3 col-6">
                      <i
                        className="fa-solid fa-plane-arrival ml-2"
                        style={{
                          color: "rgb(68,8,145)",
                          position: "absolute",
                          top: "10px",
                        }}
                      ></i>
                      <select
                        className="form-control pl-5"
                        style={{ borderRadius: "0 50px 50px 0" }}
                        id="flight-destination-select"
                        onChange={(e) => setSelectedDestination(e.target.value)}
                      >
                        <option value=""></option>
                        {Array.from(
                          new Set(
                            flights.map(
                              (flight) => flight.route.destinations[0]
                            )
                          )
                        ).map((destination, index) => (
                          <option key={index} value={destination}>
                            {destination || "Unknown Destination"}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-3 col-6">
                      <i
                        className="fa-regular fa-calendar ml-2"
                        style={{
                          color: "rgb(68,8,145)",
                          position: "absolute",
                          top: "10px",
                        }}
                      ></i>
                      <select
                        className="form-control pl-5"
                        style={{ borderRadius: "50px 0 0 50px" }}
                        id="flight-landing-select"
                        onChange={(e) => setSelectedLandingDate(e.target.value)}
                      >
                        <option value=""></option>
                        {dateOptions.map((date, index) => (
                          <option key={index} value={date}>
                            {date}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-3 col-6">
                      <i
                        className="fa-regular fa-calendar ml-2"
                        style={{
                          color: "rgb(68,8,145)",
                          position: "absolute",
                          top: "10px",
                        }}
                      ></i>
                      <select
                        id="flight-schedule-select"
                        className="form-control pl-5"
                        onChange={(e) =>
                          setSelectedScheduleDate(e.target.value)
                        }
                        style={{ borderRadius: "0 50px 50px 0" }}
                      >
                        <option value=""></option>
                        {dateOptions.map((date, index) => (
                          <option key={index} value={date}>
                            {date}
                          </option>
                        ))}
                      </select>
                    </div>{" "}
                  </>
                ) : (
                  <>
                    {" "}
                    <div className="col">
                      <i
                        className="fa-solid fa-plane-departure ml-2"
                        style={{
                          color: "rgb(68,8,145)",
                          position: "absolute",
                          top: "10px",
                        }}
                      ></i>
                      <input
                        type="text"
                        className="form-control pl-5"
                        style={{ borderRadius: "50px" }}
                      />
                    </div>
                    <div className="col">
                      <i
                        className="fa-solid fa-plane-arrival ml-2"
                        style={{
                          color: "rgb(68,8,145)",
                          position: "absolute",
                          top: "10px",
                        }}
                      ></i>
                      <input
                        type="text"
                        className="form-control pl-5"
                        style={{ borderRadius: "50px" }}
                      />
                    </div>
                    <div className="col">
                      <i
                        className="fa-regular fa-calendar ml-2"
                        style={{
                          color: "rgb(68,8,145)",
                          position: "absolute",
                          top: "10px",
                        }}
                      ></i>
                      <input
                        type="text"
                        className="form-control pl-5"
                        style={{ borderRadius: "50px" }}
                      />
                    </div>
                  </>
                )}
              </div>
            </form>
            <div className="col p-2">
              <button
                onClick={handleFilter}
                className="btn btn-primary"
                style={{
                  background: "#440891",
                  border: "none",
                  fontSize: "15px",
                }}
              >
                Show Flights
              </button>
            </div>
          </div>

          <div className="row  m-1">
            <div className="col-md-9 p-0 mt-4 scrollable-card">
              {filteredFlights.length > 0 ? (
                filteredFlights.map((flight, index) => {
                  const destinations = flight.route?.destinations;
                  const iataCode = destinations ? destinations[0] : "N/A";
                  const country = flightCountries[iataCode] || "Loading...";
                  const landingTime = flight.actualLandingTime;
                  const scheduledTime = flight.scheduleDateTime;
                  const actualLandingTime = landingTime
                    ? new Date(landingTime)
                    : null;
                  const today = new Date();
                  const formatDateToday = (date) => {
                    const day = String(date.getDate()).padStart(2, '0');
                    const month = String(date.getMonth() + 1).padStart(2, '0'); 
                    const year = date.getFullYear();
                
                    return `${day}.${month}.${year}`;
                };
              
                  // Doğrudan tarih nesneleriyle karşılaştırdık
                  const canFly =
                    actualLandingTime &&
                    formatDate(actualLandingTime) < formatDateToday(today);

                  const timeDifference =
                    landingTime && scheduledTime
                      ? calculateTimeDifference(landingTime, scheduledTime)
                      : null;

                  return (
                    <>
                      <div className="col-12 p-0 m-0" key={index}>
                        <div className="card cardBilet">
                          <div className="card-body">
                            <div className="row">
                              <div className="col-3 ">
                                <p>
                                  <strong>Amsterdam-{country}</strong>
                                </p>

                                <ul
                                  className="p-0 m-0"
                                  style={{ listStyle: "none" }}
                                >
                                  <li style={{ fontSize: "13px" }}>
                                    {" "}
                                    <span>
                                      <i
                                        className="fa-solid fa-plane-departure "
                                        style={{
                                          color: "rgb(68,8,145)",
                                        }}
                                      ></i>
                                      &nbsp; Departure
                                    </span>{" "}
                                  </li>
                                  <li>
                                    <strong>
                                      {flight.actualLandingTime
                                        ? formatTime(flight.actualLandingTime)
                                        : "Unknown Time"}
                                    </strong>
                                  </li>
                                  <li style={{ fontSize: "14px" }}>
                                    Airport: AMS
                                  </li>
                                </ul>
                                <br />
                                <ul
                                  className="p-0 m-0"
                                  style={{ listStyle: "none" }}
                                >
                                  <li
                                    style={{
                                      color: "rgb(68,8,145)",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    Price: $2000
                                  </li>
                                  <li>Round Trip</li>
                                </ul>
                              </div>
                              <div
                                className="col-2"
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <img
                                  src="/images/cizgi.png"
                                  width="100%"
                                  height="3px"
                                  alt=""
                                />
                              </div>
                              <div
                                className="col-3"
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <ul
                                  className="p-0 m-0"
                                  style={{
                                    listStyle: "none",
                                    padding: "0",
                                    margin: "0",
                                    textAlign: "center",
                                  }}
                                >
                                  <li
                                    style={{
                                      listStyle: "none",
                                      padding: "0",
                                      margin: "0",
                                    }}
                                  >
                                    <img
                                      src="/images/schiphol.png"
                                      alt=""
                                      width="70"
                                      height="20"
                                      style={{
                                        display: "block",
                                        margin: "auto",
                                      }}
                                    />
                                  </li>
                                  <li style={{ float: "center" }}>
                                    <i
                                      className="fa-solid fa-plane "
                                      style={{
                                        color: "rgb(68,8,145)",
                                      }}
                                    ></i>
                                  </li>
                                  <li style={{ fontSize: "10px" }}>
                                    {" "}
                                    {timeDifference !== null
                                      ? timeDifference
                                      : "Unknown"}{" "}
                                    (Nonstop)
                                  </li>
                                </ul>
                              </div>
                              <div
                                className="col-2"
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <img
                                  src="/images/cizgi.png"
                                  width="100%"
                                  height="3px"
                                  alt=""
                                />
                              </div>
                              <div
                                className="col-2"
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <ul
                                  className="p-0 m-0"
                                  style={{ listStyle: "none" }}
                                >
                                  <li style={{ fontSize: "12px" }}>
                                    {" "}
                                    <span>
                                      <i className="fas fa-plane-arrival"></i>
                                      &nbsp;<span>Arrival</span>
                                    </span>{" "}
                                  </li>
                                  <li>
                                    <strong>
                                      {" "}
                                      {flight.scheduleDateTime
                                        ? formatTime(flight.scheduleDateTime)
                                        : "Unknown Time"}
                                    </strong>
                                  </li>

                                  <li style={{ fontSize: "12px" }}>
                                    Airport: {iataCode}
                                  </li>
                                </ul>
                              </div>
                              <div
                                className="col-md-3 d-flex  p-0 m-0 flex-column justify-content-end align-items-end"
                                style={{
                                  position: "absolute",
                                  right: "0px",
                                  bottom: "0px",
                                }}
                              >
                                <button
                                  data-toggle="modal"
                                  data-target="#exampleModalX"
                                  onClick={() => handleButtonClick(flight)}
                                  className="btn bookflight"
                                  disabled={canFly} 
                                >
                                  Book Flight
                                </button>

                                <div
                                  className="modal fade"
                                  id="exampleModalX"
                                  tabIndex="-1"
                                  role="dialog"
                                  aria-labelledby="exampleModalLabel"
                                  aria-hidden="true"
                                >
                                  <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                      <div className="modal-header">
                                        <h5
                                          className="modal-title"
                                          id="exampleModalLabel"
                                        >
                                          flight cart
                                        </h5>
                                        <button
                                          type="button"
                                          className="close"
                                          data-dismiss="modal"
                                          aria-label="Close"
                                          onClick={() =>
                                            setSelectedFlight(null)
                                          }
                                        >
                                          <span aria-hidden="true">
                                            &times;
                                          </span>
                                        </button>
                                      </div>
                                      <div className="modal-body">
                                        <form onSubmit={FormBasket}>
                                          {selectedFlight ? (
                                            <div>
                                              {form ? (
                                                <>
                                                  <p>
                                                    <strong>
                                                      Name Surname:
                                                    </strong>
                                                    {form.firstName}{" "}
                                                    {form.lastName}
                                                  </p>
                                                  <p>
                                                    <strong>Email:</strong>{" "}
                                                    {form.email}
                                                  </p>
                                                </>
                                              ) : (
                                                <>
                                                  <div className="col-md-12 form-group p-0 m-0">
                                                    <label
                                                      htmlFor="firstName"
                                                      style={{
                                                        fontSize: "13px",
                                                      }}
                                                    >
                                                      Name
                                                    </label>
                                                    <input
                                                      type="text"
                                                      className="form-control"
                                                      placeholder="Name"
                                                      name="firstName"
                                                      style={{
                                                        backgroundColor:
                                                          "transparent",
                                                      }}
                                                    />
                                                  </div>

                                                  <div className="col-md-12 form-group p-0">
                                                    <label
                                                      htmlFor="lastName"
                                                      style={{
                                                        fontSize: "13px",
                                                      }}
                                                    >
                                                      Last Name
                                                    </label>
                                                    <input
                                                      type="text"
                                                      className="form-control"
                                                      placeholder="Last Name"
                                                      name="lastName"
                                                      style={{
                                                        backgroundColor:
                                                          "transparent",
                                                      }}
                                                    />
                                                  </div>

                                                  <div className="col-md-12 form-group p-0 m-0">
                                                    <label
                                                      htmlFor="email"
                                                      style={{
                                                        fontSize: "13px",
                                                      }}
                                                    >
                                                      Email
                                                    </label>
                                                    <input
                                                      type="email"
                                                      className="form-control"
                                                      placeholder="email"
                                                      name="email"
                                                      style={{
                                                        backgroundColor:
                                                          "transparent",
                                                      }}
                                                    />
                                                  </div>
                                                </>
                                              )}

                                              <p>
                                                <strong>
                                                  Depature-Arrival:
                                                </strong>{" "}
                                                <span className="destination">
                                                  AMS-
                                                  {selectedFlight.route.destinations.join(
                                                    ", "
                                                  )}
                                                </span>
                                              </p>
                                              <p>
                                                <strong>Aircraft Type:</strong>{" "}
                                                {
                                                  selectedFlight.aircraftType
                                                    .iataMain
                                                }{" "}
                                                {
                                                  selectedFlight.aircraftType
                                                    .iataSub
                                                }
                                              </p>
                                              <p>
                                                <strong>Airline:</strong>
                                                <span className="airline-name">
                                                  {airlines.publicName ||
                                                    "Unknown Airline"}
                                                </span>
                                              </p>
                                              <p>
                                                <strong>Scheduled Time:</strong>{" "}
                                                {formatTime(
                                                  selectedFlight.scheduleDateTime
                                                )}
                                              </p>
                                              <p>
                                                <strong>Scheduled Date:</strong>{" "}
                                                {formatDate(
                                                  selectedFlight.scheduleDateTime
                                                )}
                                              </p>
                                              <p>
                                                <strong>
                                                  Actual Landing Time:
                                                </strong>{" "}
                                                {formatTime(
                                                  selectedFlight.actualLandingTime
                                                )}
                                              </p>
                                              <p>
                                                <strong>
                                                  Actual Landing Date:
                                                </strong>{" "}
                                                {formatDate(
                                                  selectedFlight.actualLandingTime
                                                )}
                                              </p>

                                              {form ? (
                                                <p>
                                                  <strong>Price:</strong> $
                                                  {finalPrice} Coupon applied
                                                </p>
                                              ) : (
                                                <p>
                                                  <strong>Price:</strong>$2000
                                                </p>
                                              )}
                                            </div>
                                          ) : (
                                            <p>No flight selected.</p>
                                          )}
                                          <div className="form-container">
                                            <button
                                              type="submit"
                                              className="btn btn-secondary formclose"
                                            >
                                              Submit
                                            </button>
                                          </div>
                                        </form>
                                      </div>

                                      <div className="modal-footer">
                                        <button
                                          onClick={() =>
                                            setSelectedFlight(null)
                                          } 
                                          type="button"
                                          className="btn btn-secondary close"
                                          data-dismiss="modal"
                                        >
                                          Close
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div
                                  className="modal fade"
                                  id="exampleModall"
                                  tabIndex="-1"
                                  role="dialog"
                                  aria-labelledby="exampleModalLabell"
                                  aria-hidden="true"
                                >
                                  <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                      <div className="modal-header">
                                        <h5
                                          className="modal-title"
                                          id="exampleModalLabel"
                                        >
                                          Check Details
                                        </h5>
                                        <button
                                          onClick={() =>
                                            setSelectedFlight(null)
                                          } 
                                          type="button"
                                          className="close"
                                          data-dismiss="modal"
                                          aria-label="Close"
                                        >
                                          <span aria-hidden="true">
                                            &times;
                                          </span>
                                        </button>
                                      </div>
                                      <div className="modal-body">
                                        {" "}
                                        {selectedFlight ? (
                                          <div className="modal-body">
                                            <div className="modal-item">
                                              <p>
                                                <strong>Flight Number:</strong>{" "}
                                                {selectedFlight.flightNumber}
                                              </p>
                                            </div>
                                            <div className="modal-item">
                                              <p>
                                                <strong>Aircraft Type:</strong>
                                                <span className="aircraft-type">
                                                  {
                                                    selectedFlight.aircraftType
                                                      .iataMain
                                                  }{" "}
                                                  {
                                                    selectedFlight.aircraftType
                                                      .iataSub
                                                  }
                                                </span>
                                              </p>
                                            </div>
                                            <div className="modal-item">
                                              <p>
                                                <strong>Airline:</strong>
                                                <span className="airline-name">
                                                  {airlines.publicName ||
                                                    "Unknown Airline"}
                                                </span>
                                              </p>
                                            </div>
                                            <div className="modal-item">
                                              <p>
                                                <strong>Scheduled Time:</strong>
                                                <span className="time">
                                                  {formatTime(
                                                    selectedFlight.scheduleDateTime
                                                  )}
                                                </span>
                                              </p>
                                            </div>
                                            <div className="modal-item">
                                              <p>
                                                <strong>
                                                  Actual Landing Time:
                                                </strong>
                                                <span className="time">
                                                  {formatTime(
                                                    selectedFlight.actualLandingTime
                                                  )}
                                                </span>
                                              </p>
                                            </div>
                                            <div className="modal-item">
                                              <p>
                                                <strong>
                                                  Estimated Landing Time:
                                                </strong>
                                                <span className="time">
                                                  {formatTime(
                                                    selectedFlight.estimatedLandingTime
                                                  )}
                                                </span>
                                              </p>
                                            </div>
                                            <div className="modal-item">
                                              <p>
                                                <strong>Baggage Claim:</strong>
                                                <span className="baggage">
                                                  {selectedFlight.baggageClaim &&
                                                  selectedFlight.baggageClaim
                                                    .belts
                                                    ? selectedFlight.baggageClaim.belts.join(
                                                        ", "
                                                      )
                                                    : "N/A"}
                                                </span>
                                              </p>
                                            </div>
                                            <div className="modal-item">
                                              <p>
                                                <strong>Flight Status:</strong>
                                                <span className="status">
                                                  {selectedFlight.publicFlightState.flightStates.join(
                                                    ", "
                                                  )}
                                                </span>
                                              </p>
                                            </div>
                                            <div className="modal-item">
                                              <p>
                                                <strong>Destination:</strong>
                                                <span className="destination">
                                                  {selectedFlight.route.destinations.join(
                                                    ", "
                                                  )}
                                                </span>
                                              </p>
                                            </div>
                                            <div className="modal-item">
                                              <p>
                                                <strong>Terminal:</strong>
                                                <span className="terminal">
                                                  {selectedFlight.terminal}
                                                </span>
                                              </p>
                                            </div>
                                            <div className="modal-item">
                                              <p>
                                                <strong>Visa Required:</strong>
                                                <span className="visa">
                                                  {selectedFlight.route.visa
                                                    ? "Yes"
                                                    : "No"}
                                                </span>
                                              </p>
                                            </div>
                                          </div>
                                        ) : (
                                          <p>No flight selected.</p>
                                        )}
                                      </div>
                                      <div className="modal-footer">
                                        <button
                                          onClick={() =>
                                            setSelectedFlight(null)
                                          }
                                          type="button"
                                          className="btn btn-secondary close"
                                          data-dismiss="modal"
                                        >
                                          Close
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => handleButtonClick(flight)}
                          data-toggle="modal"
                          data-target="#exampleModall"
                          className="btn checkthedetail"
                        >
                          Check the Details
                        </button>
                      </div>

                      <br />
                    </>
                  );
                })
              ) : (
                <p>No flights found</p>
              )}
              <br />
            </div>

            <div className="col-md-3 p-0 m-0">
              {" "}
              <br />
              <div className="filter-section p-3">
                <div className="form-group">
                  <label className="filter-heading">Sort by:</label>
                  <select
                    style={{ border: "none" }}
                    className="custom-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="Lowest Price">Lowest Price</option>
                    <option value="Highest Price">Highest Price</option>
                    <option value="Earliest Arrival">Earliest Arrival</option>
                  </select>
                </div>

                <div className="form-group mt-4">
                  <label className="filter-heading">Arrival Time</label>
                  <div className="custom-control custom-radio">
                    <input
                      type="radio"
                      id="arrival1"
                      name="arrival"
                      className="custom-control-input"
                      value="5:00 AM - 11:59 AM"
                      checked={arrivalTime === "5:00 AM - 11:59 AM"}
                      onChange={(e) => setArrivalTime(e.target.value)}
                    />
                    <label
                      className="custom-control-label filter-label"
                      htmlFor="arrival1"
                    >
                      5:00 AM - 11:59 AM
                    </label>
                  </div>
                  <div className="custom-control custom-radio">
                    <input
                      type="radio"
                      id="arrival2"
                      name="arrival"
                      className="custom-control-input"
                      value="12:00 PM - 5:59 PM"
                      checked={arrivalTime === "12:00 PM - 5:59 PM"}
                      onChange={(e) => setArrivalTime(e.target.value)}
                    />
                    <label
                      className="custom-control-label filter-label"
                      htmlFor="arrival2"
                    >
                      12:00 PM - 5:59 PM
                    </label>
                  </div>
                </div>


                <div className="form-group mt-4">
                  <label className="filter-heading">Stops</label>
                  <div className="custom-control custom-radio">
                    <input
                      type="radio"
                      id="stops1"
                      name="stops"
                      className="custom-control-input"
                      value="Nonstop $230"
                      checked={stops === "Nonstop $230"}
                      onChange={(e) => setStops(e.target.value)}
                    />
                    <label
                      className="custom-control-label filter-label d-flex justify-content-between"
                      htmlFor="stops3"
                    >
                      <span>Nonstop</span>
                      <span>$230</span>
                    </label>
                  </div>
                  <div className="custom-control custom-radio">
                    <input
                      type="radio"
                      id="stops2"
                      name="stops"
                      className="custom-control-input"
                      value="1 Stop $230"
                      checked={stops === "1 Stop $230"}
                      onChange={(e) => setStops(e.target.value)}
                    />
                    <label
                      className="custom-control-label filter-label d-flex justify-content-between"
                      htmlFor="stops3"
                    >
                      <span>1 Sto</span>
                      <span>$230</span>
                    </label>
                  </div>
                  <div className="custom-control custom-radio">
                    <input
                      type="radio"
                      id="stops3"
                      name="stops"
                      className="custom-control-input"
                      value="2+ Stops $230"
                      checked={stops === "2+ Stops $230"}
                      onChange={(e) => setStops(e.target.value)}
                    />
                    <label
                      className="custom-control-label filter-label d-flex justify-content-between"
                      htmlFor="stops3"
                    >
                      <span>2+ Stops</span>
                      <span>$230</span>
                    </label>
                  </div>
                </div>

                <div className="form-group mt-4  p-0 airlines-list">
                  <label className="filter-heading">Airlines Included</label>
                  <div className="custom-control custom-radio">
                    <input
                      type="radio"
                      id="airline1"
                      name="airline"
                      className="custom-control-input"
                      value="Alitalia $230"
                      checked={airline === "Alitalia $230"}
                      onChange={(e) => setAirline(e.target.value)}
                    />
                    <label
                      className="custom-control-label filter-label d-flex justify-content-between"
                      htmlFor="stops3"
                    >
                      <span>Alitalia</span>
                      <span>$230</span>
                    </label>
                  </div>
                  <div className="custom-control custom-radio">
                    <input
                      type="radio"
                      id="airline2"
                      name="airline"
                      className="custom-control-input"
                      value="Lufthansa $230"
                      checked={airline === "Lufthansa $230"}
                      onChange={(e) => setAirline(e.target.value)}
                    />
                    <label
                      className="custom-control-label filter-label d-flex justify-content-between"
                      htmlFor="stops3"
                    >
                      <span>Lufthansa</span>
                      <span>$230</span>
                    </label>
                  </div>
                  <div className="custom-control custom-radio">
                    <input
                      type="radio"
                      id="airline3"
                      name="airline"
                      className="custom-control-input"
                      value="Air France $230"
                      checked={airline === "Air France $230"}
                      onChange={(e) => setAirline(e.target.value)}
                    />
                    <label
                      className="custom-control-label filter-label d-flex justify-content-between"
                      htmlFor="stops3"
                    >
                      <span>Air France</span>
                      <span>$230</span>
                    </label>
                  </div>
                  <div className="custom-control custom-radio">
                    <input
                      type="radio"
                      id="airline3"
                      name="airline"
                      className="custom-control-input"
                      value="Air France $230"
                      checked={airline === "Air France $230"}
                      onChange={(e) => setAirline(e.target.value)}
                    />
                    <label
                      className="custom-control-label filter-label d-flex justify-content-between"
                      htmlFor="stops3"
                    >
                      <span>Brussels Airlines</span>
                      <span>$230</span>
                    </label>
                  </div>
                  <div className="custom-control custom-radio">
                    <input
                      type="radio"
                      id="airline3"
                      name="airline"
                      className="custom-control-input"
                      value="Air France $230"
                      checked={airline === "Air France $230"}
                      onChange={(e) => setAirline(e.target.value)}
                    />
                    <label
                      className="custom-control-label filter-label d-flex justify-content-between"
                      htmlFor="stops3"
                    >
                      <span>Air Italy</span>
                      <span>$230</span>
                    </label>
                  </div>
                  <div className="custom-control custom-radio">
                    <input
                      type="radio"
                      id="airline3"
                      name="airline"
                      className="custom-control-input"
                      value="Air France $230"
                      checked={airline === "Air France $230"}
                      onChange={(e) => setAirline(e.target.value)}
                    />
                    <label
                      className="custom-control-label filter-label d-flex justify-content-between"
                      htmlFor="stops3"
                    >
                      <span>Siberia</span>
                      <span>$230</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="row">
            <div className="col-md-4 col-lg-12 col-sm-12 image-wrapper mb-3 ">
              <img
                src="images/car.jpg"
                className="card-img-top"
                alt="Car Rentals"
              />
              <p className="p ml-4">
                <span>
                  <i className="fa fa-car"></i>
                </span>
                <br />
                <span style={{ color: "white" }}>
                  <strong>CAR RENTALS</strong>
                </span>
              </p>
            </div>
            <div className="col-md-4 col-lg-12 col-sm-12 image-wrapper mb-3">
              <img
                src="images/hotel.jpg"
                className="card-img-top"
                alt="Car Rentals"
              />
              <p className="p ml-4">
                <span>
                  <i className="fa-solid fa-hotel"></i>
                </span>
                <br />
                <span style={{ color: "white" }}>
                  <strong>HOTELS</strong>
                </span>
              </p>
            </div>
            <div className="col-md-4 col-lg-12 col-sm-12 image-wrapper mb-3">
              <img
                src="images/packages.jpg"
                className="card-img-top"
                alt="Car Rentals"
              />
              <p className="p ml-4">
                <span>
                  <i className="fa-solid fa-umbrella-beach"></i>
                </span>
                <br />
                <span style={{ color: "white" }}>
                  <strong>TRAVEL PACKAGES</strong>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section;
