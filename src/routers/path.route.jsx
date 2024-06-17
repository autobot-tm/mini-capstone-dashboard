import { routeNames } from '../config/route-name.config'
import Account from '../pages/Account/Account'
import ChangePassword from '../pages/ChangePassword/ChangePassword'
import Dashboard from '../pages/Dashboard/Dashboard'
import SignIn from '../pages/SignIn/SignIn'
import Tutor from '../pages/Tutor/Tutor'
import UserEdit from '../pages/UserEdit/UserEdit'
import UserInfo from '../pages/UserInfo/UserInfo'

export const routePaths = {
  public: [
    {
      path: routeNames.SignIn,
      element: <SignIn />,
    },
  ],
  private: [
    {
      path: routeNames.Home,
      element: <Dashboard />,
    },
    {
      path: routeNames.Tutor,
      element: <Tutor />,
    },
    {
      path: routeNames.Account,
      element: <Account />,
    },
    {
      path: routeNames.UserInfo,
      element: <UserInfo />,
    },
    {
      path: routeNames.UserEdit,
      element: <UserEdit />,
    },
    {
      path: routeNames.ChangePassword,
      element: <ChangePassword />,
    },
  ],
}
