import {
  // main
  useNavigate,
  useRef,
  useParams,
  useEffect,

  // components
  AdminLayout,
  SpinnerModal,
  TourForm,
  ErrorMessage,
  NotifyModal,

  // other
  usePageTitle,
  dataPacker,
  useAxios,
  placesMap,

  // css
  styles,
} from "./import";
import { fetchSingleTour } from "../../../services/apis";
import { updateTour, resetToursState } from "../../../store/tours.slice";
import { useDispatch, useSelector } from "react-redux";

function UpdateTour() {
  const [fetchTour, isFetching, fetchedData, fetchingError] = useAxios();
  const { status, error } = useSelector((state) => state.tours);
  const submitRef = useRef();
  const { tourCode } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = (values) => {
    const formData = dataPacker({ ...values, old_code: tourCode });
    dispatch(updateTour(formData));
  };

  const submitTrigger = () => {
    if (submitRef.current) {
      submitRef.current.click();
    }
  };

  const goFetchTour = (code) => {
    fetchTour(fetchSingleTour(code));
  };

  useEffect(() => {
    goFetchTour(tourCode);
  }, [tourCode]);

  let notify = {};
  if (status.updateTour === "succeeded") {
    notify = {
      type: "success",
      show: status.updateTour === "succeeded",
      message: "Cập nhật thành công",
      btn: {
        component: "button",
        cb: () => {
          dispatch(resetToursState("updateTour"));
          navigate(`/tours`);
        },
      },
    };
  }

  if (error.updateTour) {
    notify = {
      type: "error",
      show: Boolean(error.updateTour),
      message: error.updateTour.message,
      btn: {
        component: "button",
        cb: () => {
          dispatch(resetToursState("updateTour"));
        },
      },
    };
  }

  usePageTitle("Cập nhật tour | Joya Travel");

  let initialValues;
  if (fetchedData) {
    const tour = fetchedData.data;

    initialValues = {
      ...tour,
      price: tour.price.toLocaleString(),
    };
  }

  return (
    <>
      <SpinnerModal show={status.updateTour === "pending" || isFetching} />
      <NotifyModal {...notify} />

      <AdminLayout>
        {error && <ErrorMessage msg={error.message} />}

        <div className={styles.header}>
          <h1 className="fs-4 m-0">Cập nhật tour</h1>
          <button
            type="button"
            onClick={submitTrigger}
            className="btn btn-primary "
          >
            Lưu
          </button>
        </div>

        {initialValues && (
          <div className="p-2">
            <TourForm
              ref={submitRef}
              initialValues={initialValues}
              onSubmit={submitHandler}
            />
          </div>
        )}
      </AdminLayout>
    </>
  );
}

export default UpdateTour;
