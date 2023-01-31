import { Link } from "react-router-dom";
import creeper404 from "../assets/404/creeper-404.png";

const Error = () => {
  return (
    <div className="error--wrapper">
      <div className="error-image-wrapper">
        <img src={creeper404} alt="404 Image" className="error-image" />
      </div>
      <div className="error-content">
        <h1 className="error-title">Oops! You seem to be lost.</h1>{" "}
        <p className="error-description">Here are some helpful links:</p>{" "}
        <Link to="/" className="error-link">
          - Home
        </Link>{" "}
        <Link to="/Posts" className="error-link">
          - Posts
        </Link>{" "}
      </div>
    </div>
  );
};

export default Error;
