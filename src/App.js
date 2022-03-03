import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import {
  UserList,
  Dashboard,
  DevicesAll,
  DevicesLegal,
  DevicesPhysical,
  DevicesNotReg,
  Users,
  Login,
  NotFound,
  Statistics,
  Settings,
  SpecificDevice,
  Profile,
} from "./pages";
import { getCookie } from "./utils/cookies";
import { TOKEN } from "./const";
import LayOut from "./comps/common/Layout";
import { ToastContainer } from "react-toastify";

function App() {
  const isLoggedIn = getCookie(TOKEN);

  const pages = [
    {
      path: "dashboard",
      comp: Dashboard,
    },
    {
      path: "devices",
      comp: DevicesAll,
    },
    {
      path: "devices_legal",
      comp: DevicesLegal,
    },
    {
      path: "devices_physical",
      comp: DevicesPhysical,
    },
    {
      path: "devices_not_registered",
      comp: DevicesNotReg,
    },
    {
      path: "users",
      comp: Users,
    },
    {
      path: "userList",
      comp: UserList,
    },
    {
      path: "statistics",
      comp: Statistics,
    },
    {
      path: "settings",
      comp: Settings,
    },
    {
      path: "/devices/:id",
      comp: SpecificDevice,
    },
    {
      path: "profile",
      comp: Profile,
    },
  ];

  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Navigate replace to="devices" />
              ) : (
                <Navigate replace to="login" />
              )
            }
          ></Route>
          <Route path="login" element={<Login />} />
          {!isLoggedIn && (
            <Route path="/">
              {pages.map((page, index) => (
                <Route
                  key={index}
                  path={page.path}
                  element={
                    <LayOut>
                      <page.comp />
                    </LayOut>
                  }
                />
              ))}
            </Route>
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
