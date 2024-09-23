import Navbar from "../components/Navbar";

const Home = (props) => {
  // layout alanı
  return (
    <div
      className="container-fluid p-0 "
      style={{ background: "rgb(246,244,248)", height: "auto" }}
    >
      <Navbar />
      {props.content && props.content}
    </div>
  );
};

export default Home;
