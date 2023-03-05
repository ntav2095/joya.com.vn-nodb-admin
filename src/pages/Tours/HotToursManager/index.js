// main
import { NotifyModal } from "../Tours.import";
import HotToursTab from "./HotToursTab";
import { useState, useEffect } from "react";
import { AdminLayout, SpinnerModal } from "../Tours.import";
import TopBar from "../../../components/TopBar";
import { useDispatch, useSelector } from "react-redux";
import {
  updateHotTours,
  fetchTours,
  selectTours,
  resetToursState,
} from "../../../store/tours.slice";

function HotToursManager() {
  const { tours, status, error } = useSelector(selectTours);

  const [chosenTours, setChosenTours] = useState([]);
  const dispatch = useDispatch();

  const vnTours = tours.filter((tour) =>
    tour.destinations.every((dest) => dest.region)
  );
  const euTours = tours.filter((tour) =>
    tour.destinations.some((dest) => dest.continent === "europe")
  );

  const remainEUTours = euTours.filter(
    (tour) => !chosenTours.some((item) => item.code === tour.code)
  );

  const remainVNTours = vnTours.filter(
    (tour) => !chosenTours.some((item) => item.code === tour.code)
  );

  const chosenEUTours = chosenTours.filter((tour) =>
    tour.destinations.some((dest) => dest.continent === "europe")
  );
  const chosenVNTours = chosenTours.filter((tour) =>
    tour.destinations.every((dest) => dest.region)
  );

  const addTour = (tour) => {
    setChosenTours((prev) => [...prev, tour]);
  };

  const removeTour = (tour) => {
    setChosenTours((prev) => prev.filter((item) => item._id !== tour._id));
  };

  const submitHandler = () => {
    dispatch(updateHotTours(chosenTours.map((tour) => tour.code)));
  };

  useEffect(() => {
    setChosenTours(tours.filter((tour) => tour.hot));
  }, [tours]);

  // notification
  let notify = {};
  if (status.updateHotTours === "succeeded") {
    notify = {
      show: status.updateHotTours === "succeeded",
      type: "success",
      message: "Thành công",
      btn: {
        component: "button",
        text: "OK",
        cb: () => {
          dispatch(resetToursState("updateHotTours"));
        },
      },
    };
  }

  if (error.updateHotTours) {
    notify = {
      show: Boolean(error.updateHotTours),
      type: "error",
      message: error.updateHotTours.message,
      btn: {
        component: "button",
        text: "OK",
        cb: () => {
          dispatch(fetchTours());
        },
      },
    };
  }
  return (
    <>
      <SpinnerModal show={status.updateHotTours === "pending"} />
      <NotifyModal {...notify} />
      <AdminLayout>
        <TopBar title="Quản lý tour nổi bật">
          <button
            className="btn btn-primary"
            type="button"
            onClick={submitHandler}
          >
            Lưu
          </button>
        </TopBar>

        <div className="p-3">
          <div className="row p-2">
            <div className="col-12 col-md-6 border-end">
              <HotToursTab
                title="Tour châu Âu"
                remainTours={remainEUTours}
                chosenTours={chosenEUTours}
                addTour={addTour}
                removeTour={removeTour}
              />
            </div>

            <div className="col-12 col-md-6">
              <HotToursTab
                title="Tour trong nước"
                remainTours={remainVNTours}
                chosenTours={chosenVNTours}
                addTour={addTour}
                removeTour={removeTour}
              />
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
}

export default HotToursManager;
