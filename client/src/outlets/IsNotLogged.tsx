import { Navigate, Outlet } from 'react-router-dom'
import { useAuthContext } from '../contexts/Auth'

const IsNotLogged = () => {
  const { refreshToken } = useAuthContext()

  // useEffect(() => {
  //   console.log(refreshToken)
  // }, [refreshToken])

  return <>{!refreshToken ? <Outlet /> : <Navigate to="/articles" />}</>
}

export default IsNotLogged
