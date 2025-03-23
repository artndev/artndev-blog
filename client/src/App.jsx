import "./css/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./routes/Layout.jsx";
import Articles from "./routes/Articles.jsx";
import NotFound from "./routes/NotFound.jsx";
import Article from "./routes/Article.jsx";
import Home from "./routes/Home.jsx";
import { useContext, useEffect } from "react";
import AuthContext from "./contexts/auth_context.js";


function App() {
  const { auth, setAuth } = useContext(AuthContext);
  
  useEffect(() => {
    console.log(auth)
  }, [auth])

  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />

            <Route element={<Layout />}>
              <Route path="/articles">
                <Route index element={<Articles />} />
                <Route path=":article_id" element={<Article />} />
              </Route>

              <Route path="/login" element={<></>} />
              <Route path="/register" element={<></>} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
