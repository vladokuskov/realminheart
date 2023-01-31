import { useParams, Link } from "react-router-dom";
import { useState } from "react";

import "lazysizes";
import "lazysizes/plugins/parent-fit/ls.parent-fit";

import copyL from "../assets/posts/copyL.svg";
import arrowL from "../assets/posts/arrowL.svg";

import { useAppSelector } from "../reducers/hooks";

const SinglePostWrapper = () => {
  const { id } = useParams();

  const posts = useAppSelector((state) => state.posts.data);
  const isFetching = useAppSelector((state) => state.posts.fetchingStatus);

  const [copySuccess, setCopySuccess] = useState(false);
  const url = window.location.href;

  const handleCopyToBuffer = async () => {
    await navigator.clipboard.writeText(url);
    setCopySuccess(true);

    const timer: number = window.setTimeout(() => {
      setCopySuccess(false);
    }, 1500);

    return () => clearTimeout(timer);
  };

  const postData: any = posts.find((item) => String(item.id) === id);

  return (
    <div className="singlepost-wrapper">
      {isFetching === 0 ? (
        <div className="loader-line"></div>
      ) : (
        <>
          {" "}
          <div className="singlepost-wrapper--main">
            <div className="singlepost-image--container">
              <img
                data-src={postData.image}
                className="singlepost-image lazyload"
                alt=""
                title={`${postData.title} image`}
                aria-label={`${postData.title} image`}
              />
            </div>
            <div className="singlepost-content">
              <div className="singlepost--info-box">
                <div className="info-box--image--wrapper">
                  <img
                    className="info-box--image lazyload"
                    title="Creator Image"
                    aria-label="Creator Image"
                    data-src={
                      postData.authorUID === "iaBmTalxlBOJ8Fnat8klUtY5CJI3"
                        ? "https://crafatar.com/renders/body/825e1bbf-66b8-4461-9ca5-448a3b1c6c66"
                        : "https://crafatar.com/renders/body/07317b3e-7ad6-456a-b59f-7a1f14f8daf2"
                    }
                  />
                </div>
                <div className="info-box--content">
                  <p className="info-box--content-author">
                    Created By
                    <span className="info-box--content-author--name">
                      {postData.authorUID === "iaBmTalxlBOJ8Fnat8klUtY5CJI3"
                        ? " Swappnet"
                        : " MrFLocker"}
                    </span>
                  </p>
                  <p className="info-box--content-date">{postData.date}</p>
                </div>
              </div>
              <p className="singlepost-content--title">{postData.title}</p>
              <p className="singlepost-content--description">
                {postData.content}
              </p>
              <Link
                title="View More Posts"
                aria-label="View More Posts"
                className="back-link"
                to="/Posts"
              >
                View More Posts{" "}
                <img alt="" className="back-link--icon" src={arrowL} />
              </Link>
              <div className="singlepost-content--footer">
                {copySuccess ? (
                  <div className="copied--wrapper">Copied</div>
                ) : (
                  ""
                )}
                <a
                  tabIndex={0}
                  className="share-btn"
                  title="Share Post"
                  aria-label="Share Post"
                  onClick={() => handleCopyToBuffer()}
                >
                  <img className="share-btn--icon" alt="" src={copyL} />
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SinglePostWrapper;
