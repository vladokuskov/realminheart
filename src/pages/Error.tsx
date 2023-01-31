import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="error--wrapper">
      <h1 className="error-title">Oops! You seem to be lost.</h1>{" "}
      <p className="error-description">Here are some helpful links:</p>{" "}
      <Link to="/" className="error-link">
        Home
      </Link>{" "}
      <Link to="/Posts" className="error-link">
        Posts
      </Link>{" "}
    </div>
  );
};

export default Error;
