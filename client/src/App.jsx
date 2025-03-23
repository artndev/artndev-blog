import "./css/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./routes/Layout.jsx";
import Articles from "./routes/Articles.jsx";
import NotFound from "./routes/NotFound.jsx";
import Article from "./routes/Article.jsx";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/articles" element={<Articles />} />
            <Route path="/articles/:article_id" element={<Article />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
