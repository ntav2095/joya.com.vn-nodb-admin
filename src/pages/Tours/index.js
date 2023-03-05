import {
  // main
  useState,
  Link,
  useNavigate,

  // components
  AdminLayout,
  SpinnerModal,
  ErrorMessage,
  Filter,
  NotifyModal,

  // other
  PAGE_SIZE,
  usePageTitle,
  useAxios,
  toursFilter,
} from "./Tours.import";
import { Navigate, useParams } from "react-router-dom";

import TopBar from "../../components/TopBar";

import "./Tours.override.css";
import CustomPagination from "../../containers/customerPagination";
import TourList from "./TourList";
import {
  selectTours,
  deleteTour,
  resetToursState,
} from "../../store/tours.slice";
import { useDispatch, useSelector } from "react-redux";

function Tours() {
  const [confirmDelete, setConfirmDelete] = useState(null); // null | tourCode
  const { tours, status, error } = useSelector(selectTours);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoading =
    status.fetchTours === "idle" ||
    status.fetchTours === "pending" ||
    status.deleteTour === "pending";

  const params = new URL(document.location).searchParams;
  let { page, category } = useParams();
  if (!page) {
    page = 1;
  } else {
    page = Number(page);
  }

  const search = params.get("search") || "";

  // notifications
  let notify = {};
  if (status.deleteTour === "succeeded") {
    notify = {
      type: "success",
      message: "Xóa thành công",
      btn: {
        text: "OK",
        cb: () => {
          dispatch(resetToursState("deleteTour"));
        },
        component: "button",
      },
      show: status.deleteTour === "succeeded",
    };
  }

  if (error.deleteTour) {
    notify = {
      type: "error",
      message: error.deleteTour.message,
      btn: {
        text: "OK",
        cb: () => {
          dispatch(resetToursState("deleteTour"));
        },
        component: "button",
      },
      onHide: () => {
        dispatch(resetToursState("deleteTour"));
      },
      show: Boolean(error.deleteTour),
    };
  }

  if (confirmDelete) {
    notify = {
      type: "normal",
      message: `Bạn có chắc muốn xóa tour [${confirmDelete}] không?`,
      leftBtn: {
        text: "Có",
        cb: () => {
          dispatch(deleteTour(confirmDelete));
          setConfirmDelete(null);
        },
        component: "button",
      },
      rightBtn: {
        text: "Không",
        cb: () => {
          setConfirmDelete(null);
        },
        component: "button",
      },
      onHide: () => {
        setConfirmDelete(null);
      },
      show: confirmDelete,
    };
  }

  // handle page and filter tours
  const results = toursFilter(tours, {
    page: page,
    search: search,
    category: category,
  });
  let current_page_tours = results.tours;
  let total_page_tours_count = results.tours_total_count;

  // handlers
  const confirmDeleteHandler = (tourCode) => {
    setConfirmDelete(tourCode);
  };

  const paginationHandler = (current) => {
    let path = "";
    if (category) {
      path = `/tours/phan-loai/${category}`;
      if (current > 1) {
        path += `/${current}`;
      }
    }

    if (!category) {
      path = `/tours`;
      if (current > 1) {
        path += `/${current}`;
      }
    }

    if (search) {
      path += `?search=${search}`;
    }

    navigate(path);
  };

  usePageTitle("Quản lý tour | Joya Travel");

  if (
    (category && !["chau-au", "viet-nam"].includes(category.trim())) ||
    !page ||
    isNaN(page) ||
    !Number.isInteger(page) ||
    page < 1
  )
    return <Navigate to="/tours" />;

  return (
    <>
      <NotifyModal {...notify} />
      <SpinnerModal show={isLoading} />

      <AdminLayout>
        <TopBar title="Quản lý tour">
          <Link to="/tours/them-moi" className="btn btn-primary me-2">
            Tạo tour mới
          </Link>
          <Link to="/tours/slider" className="btn btn-primary me-2">
            Quản lý slider
          </Link>
          <Link className="btn btn-primary" to="/tours/noi-bat">
            Quản lý tour nổi bật
          </Link>
        </TopBar>

        <div className="p-2">
          <Filter />

          {status.fetchTours === "succeeded" &&
            current_page_tours.length > 0 && (
              <TourList
                tours={current_page_tours}
                onDelete={confirmDeleteHandler}
                page={page}
              />
            )}

          {status.fetchTours === "succeeded" &&
            current_page_tours.length === 0 && <h5>Không có tour nào cả</h5>}

          {status.fetchTours === "succeeded" && total_page_tours_count > 0 && (
            <CustomPagination
              total={Math.ceil(total_page_tours_count / PAGE_SIZE)}
              pagenumber={page}
              callback={paginationHandler}
            />
          )}

          {error.fetchTours && <ErrorMessage msg={error.fetchTours.message} />}
        </div>
      </AdminLayout>
    </>
  );
}

export default Tours;
