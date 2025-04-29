import { Navigate, Outlet } from 'react-router-dom'
import { useAuthContext } from '../contexts/Auth'

const IsLogged = () => {
  const { refreshToken } = useAuthContext()

  // useEffect(() => {
  //   console.log(refreshToken)
  // }, [refreshToken])

  return <>{refreshToken ? <Outlet /> : <Navigate to="/login" />}</>
}

export default IsLogged
