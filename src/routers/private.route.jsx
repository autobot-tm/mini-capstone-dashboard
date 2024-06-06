import { Navigate, useLocation } from 'react-router-dom'
import { routeNames } from '../config'
// import { useSelector } from 'react-redux';

// eslint-disable-next-line react/prop-types
export function PrivateRoute({ children }) {
  //   const { access_token } = useSelector(state => state.auth);
  const token = '1'
  const { pathname } = useLocation()

  return token ? (
    <>{children}</>
  ) : (
    <Navigate to={routeNames.SignIn} replace state={{ redirect: pathname }} />
  )
}
