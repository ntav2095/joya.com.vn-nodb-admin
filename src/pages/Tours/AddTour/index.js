import { useEffect } from "react";
import {
  // main
  useNavigate,
  useRef,
  Link,

  // components
  AdminLayout,
  SpinnerModal,
  TourForm,
  ErrorMessage,
  NotifyModal,

  // other
  usePageTitle,
  initialValues,
  dataPacker,
  addNewTour,
  useAxios,

  // css
  styles,
} from "./import";
import { addTour, resetToursState } from "../../../store/tours.slice";
import { useDispatch, useSelector } from "react-redux";

function CreateFullTour() {
  const [sendRequest, isLoading, data, error1, reset] = useAxios();
  const submitRef = useRef();
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.tours);

  const submitHandler = (values) => {
    const formData = dataPacker(values);
    dispatch(addTour(formData));
  };

  const submitTrigger = () => {
    if (submitRef.current) {
      submitRef.current.click();
    }
  };

  let notify = {};
  if (status.addTour === "succeeded") {
    notify = {
      type: "success",
      show: status.addTour === "succeeded",
      message: "Tạo tour mới thành công.",
      btn: {
        component: "button",
        cb: () => {
          dispatch(resetToursState("addTour"));
        },
      },
    };
  }

  if (error.addTour) {
    notify = {
      type: "error",
      show: Boolean(error.addTour),
      message: error.addTour.message,
      btn: {
        component: "button",
        cb: () => {
          dispatch(resetToursState("addTour"));
        },
      },
    };
  }

  usePageTitle("Tạo tour mới | Joya Travel");

  return (
    <>
      <SpinnerModal show={status.addTour === "pending"} />
      <NotifyModal {...notify} />

      <AdminLayout>
        {error && <ErrorMessage msg={error.message} />}

        <div className={styles.header}>
          <h1 className="fs-4 m-0">Tạo tour mới</h1>
          <button
            type="button"
            onClick={submitTrigger}
            className="btn btn-primary "
          >
            Lưu
          </button>
        </div>

        <div className="p-2">
          <TourForm
            ref={submitRef}
            initialValues={initialValues}
            onSubmit={submitHandler}
          />
        </div>
      </AdminLayout>
    </>
  );
}

export default CreateFullTour;
