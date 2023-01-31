import { useState, useMemo, useEffect } from "react";
import ReactPaginate from "react-paginate";

import mainBGDlarge from "../assets/backgrounds/mainBGDlarge.webp";
import mainBGLlarge from "../assets/backgrounds/mainBGLlarge.webp";

import { useAppSelector } from "../reducers/hooks";

interface Data {
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

  const theme = useAppSelector((state) => state.theme.theme);

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
    window.scrollTo({ top: 200, left: 0, behavior: "smooth" });

    const newOffset = (event.selected * itemsPerPage) % posts.length;
    setItemOffset(newOffset);
  };

  const post = currentItems.map((item) => {
    return <Post key={item.id} item={item} />;
  });

  return (
    <div className="posts">
      <div className="posts-bg">
        <img
          className="posts-bg--image"
          alt=""
          src={theme === "dark" ? mainBGDlarge : mainBGLlarge}
        />
      </div>
      <div className="posts-content">
        <div className="content-posts">
          <div className="posts-title">
            <div className="posts-icon"></div>
            <h2 className="posts-title--text"> POSTS</h2>
          </div>

          <div className="posts-tools">
            <div className="tools--edit">
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
          </div>

          {isFetching === 0 ? (
            <div className="loader-wrapper">
              <div className="loader-image"></div>
              <div className="loader-content">
                <div className="loader-title"></div>
                <div className="loader-desc"></div>
                <div className="loader-desc"></div>
                <div className="loader-desc"></div>
              </div>
            </div>
          ) : (
            post
          )}
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
