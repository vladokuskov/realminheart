import mrflockerHead from "../assets/posts/mrflockerSmall.png";
import swappnetHead from "../assets/posts/swappnetSmall.png";

import { Link } from "react-router-dom";

import "lazysizes";
import "lazysizes/plugins/parent-fit/ls.parent-fit";

const Post = (props: any) => {
  return (
    <Link
      to={`/Posts/${props.data.id}`}
      className="post-link-wrapper"
      title={`Open ${props.data.title} post`}
      aria-label={`Open ${props.data.title} post`}
      key={props.data.id}
    >
      <div className="post-wrapper">
        <div className="post-image-wrapper">
          <img
            alt=""
            src={props.data.image}
            className="post-image lazyload"
          ></img>
        </div>
        <div className="post-content-wrapper">
          <div className="info-wrapper">
            <div className="author-image-wrapper">
              <img
                className="author-image lazyload"
                data-src={
                  props.data.authorUID === "iaBmTalxlBOJ8Fnat8klUtY5CJI3"
                    ? swappnetHead
                    : mrflockerHead
                }
                alt=""
              />
            </div>
            <p className="date-title">{props.data.date}</p>
          </div>
          <p className="post-title">{props.data.title}</p>
          <p className={`post-cat ${props.data.cat}`}>{props.data.cat}</p>
          <p className="post-tags">
            <span>TAGS: </span>
            {props.data.tags}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Post;
