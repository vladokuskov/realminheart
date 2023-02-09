import { Link } from "react-router-dom";
import { useAppSelector } from "../reducers/hooks";

import SkeletonL from "../components/skeletons/SkeletonL";
import SkeletonS from "../components/skeletons/SkeletonS";
import Failed from "../components/Failed";

import "lazysizes";
import "lazysizes/plugins/parent-fit/ls.parent-fit";

const Home = () => {
  const posts = useAppSelector((state) => state.posts.data);
  const isFetching = useAppSelector((state) => state.posts.fetchingStatus);

  const postMain = posts
    .slice(0, 1)
    .sort((a, b) => +new Date(b.fulldate) - +new Date(a.fulldate))
    .map((item, i) => {
      return (
        <Link
          to={`/Posts/${item.id}`}
          className="post-main-wrapper"
          title={`Open ${item.title} post`}
          aria-label={`Open ${item.title} post`}
          key={item.id}
        >
          <div className="post-main-content">
            <div className="post-image-wrapper">
              <img
                data-src={item.image}
                className="post-image lazyload"
                aria-label={item.id}
                alt=""
              />
            </div>
            <p className="post-content-date">{item.convertedDate}</p>
            <div className="post-content-text-wrapper">
              <p className="post-content-title">{item.title}</p>
              <p className="post-content-text">{item.content}</p>
            </div>
          </div>
        </Link>
      );
    });

  const post = posts
    .slice(1, 4)
    .sort((a, b) => +new Date(b.fulldate) - +new Date(a.fulldate))
    .map((item, i) => {
      return (
        <Link
          to={`/Posts/${item.id}`}
          className="post-others-wrapper"
          title={`Open ${item.title} post`}
          aria-label={`Open ${item.title} post`}
          key={item.id}
        >
          <div className="post-others-content">
            <div className="post-image-others-wrapper">
              <img
                data-src={item.image}
                className="post-image lazyload"
                aria-label={item.id}
                alt=""
              />
            </div>
            <div className="post-content-text-wrapper">
              <p className="post-content-date">{item.convertedDate}</p>
              <p className="post-content-title">{item.title}</p>
            </div>
          </div>
        </Link>
      );
    });

  return (
    <div className="home-wrapper">
      <div className="home-content">
        <div className="home-header-wrapper">
          <h2 className="header-title">RECENT</h2>
          <p className="header-subtitle">Latest news from the server</p>
        </div>
        {isFetching === 0 ? (
          <div className="home-skeletons-wrapper">
            <SkeletonL />
            <SkeletonS />
          </div>
        ) : isFetching === 1 ? (
          <div className="home-posts-wrapper">
            {postMain}
            <div className="home-posts-other-wrapper">{post}</div>
          </div>
        ) : (
          <Failed />
        )}

        <div className="home-about-wrapper">
          <h2 className="about-title">ABOUT US</h2>
          <p className="about-content">
            What is this realms about? This is a realm where only the best
            players play, who know their stuff and are always happy for others
            to join. There are no specific rules on the server, except that you
            need to respect others and what they create there. The main goal is
            to have the best experience and have fun.
          </p>
          <a
            className="about-link"
            href="https://www.youtube.com/@realminheart"
            title="Go to Our Channel"
            target="_blank"
          >
            OUR CHANNEL
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
