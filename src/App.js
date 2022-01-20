import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { getCookie } from "./utils/cookies";
import { TOKEN } from "./const/index";
import Dashboard from "./pages/Dashboard";
import LayOut from "./comps/common/Layout";

function App() {
  const isLoggedIn = getCookie(TOKEN);

  const pages = [
    {
      path: "dashboard",
      comp: Dashboard,
    },
  ];

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate replace to="dashboard" />
            ) : (
              <Navigate replace to="login" />
            )
          }
        ></Route>
        <Route path="login" element={<Login />} />
        {isLoggedIn && (
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
  );
}

export default App;
