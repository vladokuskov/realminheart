import { useState, useMemo, useEffect, ChangeEvent } from "react";
import ReactPaginate, { ReactPaginateProps } from "react-paginate";

import Post from "../components/Post";
import Failed from "../components/Failed";
import SkeletonM from "../components/skeletons/SkeletonM";

import { useAppSelector } from "../reducers/hooks";

export interface Data {
  id: string;
  title: string;
  content: string;
  date: string;
  fulldate: Date;
  image: string;
  authorUID: string;
}

function Posts() {
  const posts = useAppSelector((state) => state.posts.data);
  const isFetching = useAppSelector((state) => state.posts.fetchingStatus);

  const [sortType, setSortType] = useState("ascending");
  const [isSorted, setIsSorted] = useState(false);

  const [itemOffset, setItemOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [currentItems, setCurrentItems] = useState<Data[]>([]);
  const itemsPerPage = 5;

  const sortedData = useMemo(() => {
    let result = posts;

    if (sortType === "descending") {
      result = [...posts].sort((a, b) => {
        return +new Date(a.fulldate) - +new Date(b.fulldate);
      });
      setIsSorted(true);
    } else if (sortType === "ascending") {
      result = [...posts].sort((a, b) => {
        return +new Date(b.fulldate) - +new Date(a.fulldate);
      });
      setIsSorted(false);
    }

    return result;
  }, [posts, sortType]);

  function handleSort() {
    if (sortType === "descending") {
      setSortType("ascending");
    } else if (sortType === "ascending") {
      setSortType("descending");
    }
  }

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(sortedData.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(posts.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, sortedData]);

  const handlePageClick = (event: any) => {
    window.scrollTo({ top: 200, left: 0 });

    const newOffset = (event.selected * itemsPerPage) % posts.length;
    setItemOffset(newOffset);
  };

  const post = currentItems.map((item) => {
    return <Post key={item.id} data={item} />;
  });

  return (
    <div className="posts-wrapper">
      <div className="posts-content">
        <div className="home-header-wrapper">
          <h2 className="header-title">POSTS</h2>
        </div>
        <div className="articles-section">
          <div className="articles-header-wrapper">
            <h3 className="articles-title"> All articles</h3>
            <button
              className="tools-btn"
              onClick={handleSort}
              title="Click to sort posts"
              aria-label="Click to sort posts"
            >
              <span className="sort-icon--wrapper">
                {isSorted ? (
                  <i className="gg-arrows-exchange-alt-v" />
                ) : (
                  <i className="gg-arrows-exchange-v" />
                )}
              </span>
              <span>{isSorted ? " OLDEST" : " NEWEST"}</span>
            </button>
          </div>
          <div className="articles-wrapper">
            {isFetching === 0 ? (
              <div className="posts-skeletons-wrapper">
                <SkeletonM />
              </div>
            ) : isFetching === 1 ? (
              post
            ) : (
              <Failed />
            )}
          </div>
          <ReactPaginate
            className="posts-pagination--wrapper"
            breakLabel="..."
            nextLabel="next"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="prev"
          />
        </div>
      </div>
    </div>
  );
}

export default Posts;
