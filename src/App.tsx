import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch } from "./reducers/hooks";
import { collection, getDocs } from "firebase/firestore";
import { updateDataSuccess, updateDataError } from "./reducers/postsReducer";

import { db } from "./firebase";

import Home from "./pages/Home";
import Posts from "./pages/Posts";
import Error from "./pages/Error";
import SinglePost from "./pages/SinglePost";
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

  const getPosts = async () => {
    try {
      const posts = await getDocs(collection(db, "posts"));

      posts.forEach((item) => {
        let dateFormatCreated = new Date(
          item.data()._createdBy.timestamp.seconds * 1000
        );
        dispatch(
          updateDataSuccess({
            id: item.id,
            title: item.data().title,
            content: item.data().content,
            date: `${dateFormatCreated.getDate()}/${
              dateFormatCreated.getMonth() + 1
            }/${dateFormatCreated.getUTCFullYear()}`,
            fulldate: new Date(item.data()._createdBy.timestamp.seconds * 1000),
            image: item.data().image[0].downloadURL,
            authorUID: item.data()._createdBy.uid,
          })
        );
      });
    } catch {
      dispatch(updateDataError());
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className={`App`}>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<Home />} />
            <Route path="/Posts" element={<Posts />} />
            <Route path="/Posts/:id" element={<SinglePost />} />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
