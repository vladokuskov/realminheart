import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch } from "./reducers/hooks";
import { updateDataSuccess, updateDataError } from "./reducers/postsReducer";

import { getPosts } from "./utils/firebase";

import Home from "./pages/Home";
import Posts from "./pages/Posts";
import Error from "./pages/Error";
import SinglePostWrapper from "./pages/SinglePost";
import SharedLayout from "./pages/SharedLayout";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => {
  const dispatch = useAppDispatch();

  const getDataFromFirebase = async () => {
    const posts = await getPosts();
    if (posts) {
      dispatch(updateDataSuccess(posts));
    } else if (!posts) {
      dispatch(updateDataError());
    }
  };

  useEffect(() => {
    getDataFromFirebase();
  }, []);

  return (
    <div className={`App`}>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<Home />} />
            <Route path="/Posts" element={<Posts />} />
            <Route path="/Posts/:id" element={<SinglePostWrapper />} />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
