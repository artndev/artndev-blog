import "./styles/css/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./outlets/Layout.jsx";
import Articles from "./routes/Articles.jsx";
import NotFound from "./routes/NotFound.jsx";
import Article from "./routes/Article.jsx";
import Home from "./routes/Home.jsx";
import IsNotLogged from "./outlets/IsNotLogged.jsx";
import LoginForm from "./routes/LoginForm.jsx";
import RegisterForm from "./routes/RegisterForm.jsx";
import IsLogged from "./outlets/IsLogged.jsx";
import Profile from "./routes/Profile.jsx";
import IsAdmin from "./outlets/IsAdmin.jsx";
import UpdateForm from "./routes/UpdateForm.jsx";
import CreateForm from "./routes/CreateForm.jsx";


function App() {
  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            
            <Route element={<Layout />}>
              <Route path="/articles">
                <Route index element={<Articles />} />
                <Route path=":article_id" element={<Article />} />

                <Route element={<IsLogged />}>
                  <Route element={<IsAdmin />}>
                    <Route path=":article_id/update" element={<UpdateForm />} />
                    <Route path="create" element={<CreateForm />} />
                  </Route>
                </Route>
              </Route>

              <Route element={<IsNotLogged />}>
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
              </Route>

              <Route element={<IsLogged />}>
                <Route path="/profile" element={<Profile />} />
              </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
