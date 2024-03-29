import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';

import Failed from '../components/Failed';

import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

import arrowL from '../assets/posts/arrowL.svg';

import { useAppSelector } from '../reducers/hooks';

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
        <div className="singlepost-fetching-wrapper" />
      ) : isFetching === 1 ? (
        <>
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
                <div className="info-box--content">
                  <p className="info-box--content-author">
                    Created By
                    <span className="info-box--content-author--name">
                      {postData.authorUID === 'iaBmTalxlBOJ8Fnat8klUtY5CJI3'
                        ? ' Swappnet'
                        : ' MrFLocker'}
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
                Back to Posts{' '}
                <img alt="" className="back-link--icon" src={arrowL} />
              </Link>
              <div className="singlepost-content--footer">
                {copySuccess ? (
                  <div className="copied--wrapper">Copied</div>
                ) : (
                  ''
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
};

export default SinglePostWrapper;
