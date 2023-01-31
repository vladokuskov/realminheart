import creeper404 from "../assets/404/creeper-404.png";

import "lazysizes";
import "lazysizes/plugins/parent-fit/ls.parent-fit";

const Failed = () => {
  return (
    <div className="failed-wrapper">
      <div className="failed-image-wrapper">
        <img
          data-src={creeper404}
          alt=""
          title="Creeper"
          className="failed-image lazyload"
        />
      </div>
      <div className="failed-content-wrapper">
        <p className="failed-title">Something went wrong :c</p>
        <a
          className="failed-button"
          title="Refresh page"
          onClick={() => window.location.reload()}
        >
          Click to refresh
        </a>
      </div>
    </div>
  );
};

export default Failed;
