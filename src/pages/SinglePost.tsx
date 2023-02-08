import { useParams, Link } from "react-router-dom";
import { useState } from "react";

import mrflockerFull from "../assets/posts/mrflocker-full.png";
import swappnetFull from "../assets/posts/swappnet-full.png";

import Failed from "../components/Failed";

import "lazysizes";
import "lazysizes/plugins/parent-fit/ls.parent-fit";

import arrowL from "../assets/posts/arrowL.svg";

import { useAppSelector } from "../reducers/hooks";
import { Data } from "./Posts";

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

  const postData: Data | undefined = posts.find(
    (item) => String(item.id) === id
  );

  if (postData != undefined) {
    return (
      <div className="singlepost-wrapper">
        {isFetching === 0 ? (
          <div className="singlepost-fetching-wrapper" />
        ) : isFetching === 1 ? (
          <>
            {" "}
            <div className="singlepost-wrapper--main">
              <div className="singlepost-image--container">
                <img
                  data-src={postData.image}
                  className="singlepost-image lazyload"
                  alt={`${postData.title} image`}
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
                      alt=""
                      data-src={
                        postData.authorUID === "iaBmTalxlBOJ8Fnat8klUtY5CJI3"
                          ? swappnetFull
                          : mrflockerFull
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
                  role="button"
                  title="Back to Posts"
                  aria-label="Back to Posts"
                  className="back-link"
                  to="/Posts"
                >
                  Back to Posts{" "}
                  <img alt="" className="back-link--icon" src={arrowL} />
                </Link>
                <div className="singlepost-content--footer">
                  {copySuccess ? (
                    <div className="copied--wrapper">Copied</div>
                  ) : (
                    ""
                  )}
                  <button
                    tabIndex={0}
                    className="share-btn"
                    title="Share Post"
                    aria-label="Share Post"
                    onClick={() => handleCopyToBuffer()}
                  >
                    <i className="gg-share"></i>
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <Failed />
        )}
      </div>
    );
  }
};

export default SinglePostWrapper;
