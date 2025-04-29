import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import IsAdmin from './outlets/IsAdmin'
import IsLogged from './outlets/IsLogged'
import IsNotLogged from './outlets/IsNotLogged'
import Layout from './outlets/Layout'
import Article from './routes/Article'
import Articles from './routes/Articles'
import CreateForm from './routes/CreateForm'
import Error from './routes/Error'
import Home from './routes/Home'
import LoginForm from './routes/LoginForm'
import Profile from './routes/Profile'
import RegisterForm from './routes/RegisterForm'
import UpdateForm from './routes/UpdateForm'
import './styles/css/App.css'
import './styles/css/Hero.css'

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

          <Route path="/errors/:code" element={<Error />} />
          <Route path="*" element={<Navigate to={'/errors/404'} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
