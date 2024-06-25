import { routeNames } from '../config/route-name.config'
import Account from '../pages/Account/Account'
import ChangePassword from '../pages/ChangePassword/ChangePassword'
import Dashboard from '../pages/Dashboard/Dashboard'
import SignIn from '../pages/SignIn/SignIn'
import TutorRequest from '../pages/TutorRequest/TutorRequest'
import UserEdit from '../pages/UserEdit/UserEdit'
import UserInfo from '../pages/UserInfo/UserInfo'
import RegisterRequest from '../pages/RegisterRequest/RegisterRequest'

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
      path: routeNames.RegisterRequest,
      element: <RegisterRequest />,
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
    {
      path: routeNames.TutorRequest,
      element: <TutorRequest />,
    },
  ],
}
