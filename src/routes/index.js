// pages
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";

// visa
import EditVisa from "../pages/Visas/EditVisa";
import AddVisa from "../pages/Visas/AddVisa";
import Visas from "../pages/Visas";

// tour
// import Tours from "../pages/Tours";
import Tours from "../pages/Tours";
import AddTour from "../pages/Tours/AddTour";
import UpdateTour from "../pages/Tours/UpdateTour";
import BannerManager from "../pages/Tours/BannerManager";
import HotToursManager from "../pages/Tours/HotToursManager";

// guides
import Guides from "../pages/Guides";
import NewArticle from "../pages/Guides/NewArticle";
import EditArticle from "../pages/Guides/EditArticle";
import GuidesCategory from "../pages/Guides/GuidesCategory";

// term
import Terms from "../pages/Terms";

// about
import AboutManager from "../pages/AboutManager";
import CompanyInfo from "../pages/CompanyInfo";

// user
import Users from "../pages/Users";
import CreateUser from "../pages/Users/CreateUser";
import ChangePassword from "../pages/Users/ChangePassword";

// components
import Destinations from "../pages/Destinations";

export default [
  {
    path: "/login",
    element: <Login />,
  },
  // dashboard
  {
    path: "/",
    element: <Dashboard />,
    requiredAuth: true,
  },
  // diem den
  {
    paths: [
      "/diem-den",
      "/diem-den/:page",
      "/diem-den/phan-loai/:category",
      "/diem-den/phan-loai/:category/:page",
    ],
    element: <Destinations />,
    requiredAuth: true,
  },
  // tours
  {
    paths: [
      "/tours",
      "/tours/:page",
      "/tours/phan-loai/:category",
      "/tours/phan-loai/:category/:page",
    ],
    element: <Tours />,
    requiredAuth: true,
  },
  {
    path: "/tours/slider",
    element: <BannerManager />,
    requiredAuth: true,
  },
  {
    path: "/tours/them-moi",
    element: <AddTour />,
    requiredAuth: true,
  },
  {
    path: "/tours/noi-bat",
    element: <HotToursManager />,
    requiredAuth: true,
  },
  {
    path: "/tours/cap-nhat/:tourCode",
    element: <UpdateTour />,
    requiredAuth: true,
  },
  // guides
  {
    paths: [
      "/guides",
      "/guides/:page",
      "/guides/phan-loai/:category",
      "/guides/phan-loai/:category/:page",
    ],
    element: <Guides />,
    requiredAuth: true,
  },
  {
    path: "/guides/quan-ly-danh-muc",
    element: <GuidesCategory />,
    requiredAuth: true,
  },
  {
    path: "guides/them-moi",
    element: <NewArticle />,
    requiredAuth: true,
  },
  {
    path: "/guides/cap-nhat/:articleId",
    element: <EditArticle />,
    requiredAuth: true,
  },
  // visa
  {
    path: "/visa-products",
    element: <Visas />,
    requiredAuth: true,
  },
  {
    path: "/add-visa-product",
    element: <AddVisa />,
    requiredAuth: true,
  },
  {
    path: "/edit-visa-product/:visaId",
    element: <EditVisa />,
    requiredAuth: true,
  },
  // tenrs
  {
    path: "/dieu-khoan",
    element: <Terms />,
    requiredAuth: true,
  },

  {
    path: "/ve-cong-ty",
    element: <AboutManager />,
    requiredAuth: true,
  },
  // users
  {
    path: "/users",
    element: <Users />,
    requiredAuth: true,
  },
  {
    path: "/users/create-user",
    element: <CreateUser />,
    requiredAuth: true,
  },
  {
    path: "/users/change-password/:username",
    element: <ChangePassword />,
    requiredAuth: true,
  },
  // company info
  {
    path: "/thong-tin-cong-ty",
    element: <CompanyInfo />,
    requiredAuth: true,
  },
  // not found
  {
    path: "/*",
    element: <NotFound />,
    requiredAuth: true,
  },
];
