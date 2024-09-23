import React, { createContext, useState, useEffect } from "react";
import { fetchRegister, fetchSignin } from "../Data";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { formatInTimeZone } from "date-fns-tz";
export const Data = createContext();
const PostContext = (props) => {
  const navigate = useNavigate();
  const form = JSON.parse(localStorage.getItem("form"));
  const [flights, setFlights] = useState([]);
  const [airlines, setAirlines] = useState({});
  const [details, setDetails] = useState({});
  const [flightCountries, setFlightCountries] = useState({});
  const [selectedScheduleDate, setSelectedScheduleDate] = useState("");
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [selectedLandingDate, setSelectedLandingDate] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("");
  const [data, setData] = useState([]);
  // saat formatı
  const formatDate = (dateString, timeZone = "Europe/Amsterdam") => {
    if (!dateString) return "Unknown Date";

    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }

    return formatInTimeZone(date, timeZone, "dd.MM.yyyy");
  };
  const formatTime = (timeString, timeZone = "Europe/Amsterdam") => {
    if (!timeString) return "Unknown Time";

    const date = new Date(timeString);

    if (isNaN(date.getTime())) {
      return "Invalid Time";
    }

    return formatInTimeZone(date, timeZone, "hh:mm a");
  };
  const generateDateOptions = () => {
    const dates = [];
    const year = 2024;

    for (let day = 1; day <= 30; day++) {
      dates.push(
        `${String(day).padStart(2, "0")}.${String(9).padStart(2, "0")}.${year}`
      );
    }

    return dates;
  };

  const [login, setLogin] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const Temizle = () => {
    setLogin({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const onChange = (e) =>
    setLogin({ ...login, [e.target.name]: e.target.value });
  const handleChange = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetchRegister(login);
      if (response.status === 200) {
        toast("Registration successful!", {
          className: "purple-toast",
        });
        setTimeout(() => {
          // JSON verisini localStorage'a kaydetme
          localStorage.setItem("form", JSON.stringify(login));
          Temizle(); // Formu temizle
          navigate("/login"); // Login sayfasına yönlendir
        }, 1000);
      } else {
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };
  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetchSignin(user);
      if (response.status === 200) {
        await fetchSignin(user);
        navigate("/");
        Temizle();
      } else {
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };
// uçus api işlemi iata gore country almak
  useEffect(() => {
    const fetchFlights = async () => {
      const flightSettings = {
        method: "GET",
        url: "/public-flights/flights",
        headers: {
          app_id: "9a05aec3",
          app_key: "293a64b25b302c226f12d775f8eea351",
          ResourceVersion: "v4",
          "Content-Type": "application/json",
        },
      };

      try {
        const flightResponse = await axios(flightSettings);
        const flights = flightResponse.data.flights;
        setFlights(flights); // Uçuş verilerini state'e ata

        // Her uçuş için `route.destinations[0]` kullanarak IATA kodunu al
        flights.forEach(async (flight) => {
          const destinations = flight.route?.destinations; // `route.destinations` dizisini kontrol et
          if (destinations && destinations.length > 0) {
            const iataCode = destinations[0]; // İlk destinasyonun IATA kodunu al

            const destinationSettings = {
              method: "GET",
              url: `/public-flights/destinations/${iataCode}`, // IATA koduna göre destinasyon API'si
              headers: {
                app_id: "9a05aec3",
                app_key: "293a64b25b302c226f12d775f8eea351",
                ResourceVersion: "v4",
                "Content-Type": "application/json",
              },
            };

            try {
              const destinationResponse = await axios(destinationSettings);
              const destinationData = destinationResponse.data;
              const country = destinationData.city;
              setFlightCountries((prevCountries) => ({
                ...prevCountries,
                [iataCode]: country,
              }));
            } catch (destError) {}
          }
        });
      } catch (error) {}
    };

    fetchFlights();
  }, []);

  const [filteredFlights, setFilteredFlights] = useState([]);
// filter işlemi inputlar
  const handleFilter = () => {
    let result = flights;
    if (selectedLandingDate || selectedScheduleDate || selectedDestination) {
      result = flights.filter((flight) => {
        const isLandingDateMatch = selectedLandingDate
          ? formatDate(flight.actualLandingTime) === selectedLandingDate
          : true;
        const isScheduleDateMatch = selectedScheduleDate
          ? formatDate(flight.scheduleDate) === selectedScheduleDate
          : true;

        const isDestinationMatch = selectedDestination
          ? flight.route.destinations[0] === selectedDestination
          : true;

        return isLandingDateMatch && isScheduleDateMatch && isDestinationMatch;
      });
    }

    setFilteredFlights(result);
  };
// havayolu ismini almak
  const handleButtonClick = async (flight) => {
    const iataCode = flight.prefixIATA;
    const icaoCode = flight.prefixICAO;

    try {
      const airlineResponse = await axios.get(
        `/public-flights/airlines/${iataCode}`,
        {
          headers: {
            app_id: "9a05aec3",
            app_key: "293a64b25b302c226f12d775f8eea351",
            ResourceVersion: "v4",
          },
        }
      );

      setAirlines(airlineResponse.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        try {
          const airlineResponse = await axios.get(
            `/public-flights/airlines/${icaoCode}`,
            {
              headers: {
                app_id: "9a05aec3",
                app_key: "293a64b25b302c226f12d775f8eea351",
                ResourceVersion: "v4",
              },
            }
          );

          setAirlines(airlineResponse.data);
        } catch (error) {
          console.error(
            "Error fetching airlines:",
            error.response ? error.response.data : error.message
          );
        }
      } else {
        console.error(
          "Error fetching airlines:",
          error.response ? error.response.data : error.message
        );
      }
    }

    setSelectedFlight(flight);
  };
// yeni üyelere 200 tl kupon tanımlamak
  const dateOptions = generateDateOptions();

  const discount = 200;
  const initialPrice = 2000;
  const finalPrice = initialPrice - discount;
// sepet islemi
  const FormBasket = async (e) => {
    e.preventDefault();

    const formData = {
      name: form ? form.firstName : e.target.firstName.value,
      surname: form ? form.lastName : e.target.lastName.value,
      email: form ? form.email : e.target.email.value,
      depature: `AMS - ${selectedFlight.route.destinations.join(",")}`,
      aircraftType: `${selectedFlight.aircraftType.iataMain} ${selectedFlight.aircraftType.iataSub}`,
      airline: airlines.publicName ? airlines.publicName : null,
      schedule: formatTime(selectedFlight.scheduleDateTime),
      scheduleDate: formatDate(selectedFlight.scheduleDateTime),
      actual: formatTime(selectedFlight.actualLandingTime),
      actualDate: formatDate(selectedFlight.actualLandingTime),
      price: form ? finalPrice : 2000,
    };

    try {
      await axios
        .post("http://localhost:9360/post/appfellas", formData)
        .then((response) => {
          toast("Your flight has been recorded! sent to your mail", {
            className: "purple-toast",
          });

          if (form) {
            setTimeout(() => {
              navigate("/flights");
            }, 7000);
          } else {
            setTimeout(() => {
              navigate("/register");
            }, 7000);
          }
        })
        .catch((error) => {
          console.error("Error posting data:", error);
          toast("There was an error recording your flight.", {
            className: "error-toast",
          });
        });
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };
//  detay apisi 
  const Details = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:9360/post/detail/${id}`
      );
      setDetails(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const MyFlights = async () => {
    try {
      const response = await axios.get("http://localhost:9360/post/appFellas");
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Data.Provider
        value={{
          dateOptions,
          setSelectedLandingDate,
          setSelectedScheduleDate,
          filteredFlights,
          setSelectedFlight,
          selectedFlight,
          setSelectedDestination,
          flightCountries,
          airlines,
          handleFilter,
          FormBasket,
          form,
          formatTime,
          handleButtonClick,
          flights,
          setFlights,
          login,
          setFilteredFlights,
          onChange,
          handleSubmitLogin,
          user,
          handleChange,
          handleSubmit,
          formatDate,
          MyFlights,
          data,
          Details,
          details,
        }}
      >
        {props.children}
      </Data.Provider>
    </>
  );
};

export default PostContext;
