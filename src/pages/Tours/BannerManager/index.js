// main
import { useState, useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useDispatch } from "react-redux";

// components
import AdminLayout from "../../../layout/AdminLayout";
import SpinnerModal from "../../../components/SpinnerModal";
import NotifyModal from "../../../components/NotifyModal";

// other
import usePageTitle from "../../../hooks/usePageTitle";
import {
  fetchTours,
  updateSliderTours,
  resetToursState,
  selectTours,
} from "../../../store/tours.slice";

import TourSlider from "./TourSlider";
import TopBar from "../../../components/TopBar";
import { useSelector } from "react-redux";
import "./SliderManager.override.css";

function SliderManager() {
  const { tours, status, error } = useSelector(selectTours);
  const [updatingTours, setUpdatingTours] = useState([]);
  const dispatch = useDispatch();
  const isLoading = status.updateSliderTours === "pending";

  const HOME_KEY = "is_home_slider";
  const DOMESTIC_KEY = "is_domestic_slider";
  const EUROPE_KEY = "is_europe_slider";

  const vnTours = updatingTours.filter((tour) => tour.is_vn_tour);
  const euTours = updatingTours.filter((tour) => tour.is_eu_tour);

  const submitHandler = () => {
    // send server tours those are set as slider (home or europe or domestic)
    // [ { _id, is_home_slider, is_domestic_slider, is_europe_slider } ]
    dispatch(
      updateSliderTours(
        updatingTours
          .filter(
            (tour) =>
              tour.is_home_slider ||
              tour.is_domestic_slider ||
              tour.is_europe_slider
          )
          .map((tour) => ({
            code: tour.code,
            is_home_slider: tour.is_home_slider,
            is_domestic_slider: tour.is_domestic_slider,
            is_europe_slider: tour.is_europe_slider,
          }))
      )
    );
  };

  const chooseHandler = (sliderKey, tourCode) => {
    setUpdatingTours((prev) =>
      prev.map((tour) =>
        tour.code === tourCode ? { ...tour, [sliderKey]: true } : tour
      )
    );
  };

  const removeHandler = (sliderKey, tourCode) => {
    setUpdatingTours((prev) =>
      prev.map((tour) =>
        tour.code === tourCode ? { ...tour, [sliderKey]: false } : tour
      )
    );
  };

  const getRemainTours = (totalTours, sliderKey) =>
    totalTours.filter((tour) => !tour[sliderKey]);

  const getChosenTours = (totalTours, sliderKey) =>
    totalTours.filter((tour) => tour[sliderKey]);

  // notification
  let notify = {};
  const isSuccess = status.updateSliderTours === "succeeded";
  if (isSuccess) {
    notify = {
      show: isSuccess,
      type: "success",
      message: "Thành công",
      btn: {
        component: "button",
        text: "OK",
        cb: () => {
          dispatch(resetToursState("updateSliderTours"));
        },
      },
    };
  }

  if (error.updateSliderTours) {
    notify = {
      show: Boolean(error.updateSliderTours),
      type: "error",
      message: error.updateSliderTours.message,
      btn: {
        component: "button",
        text: "OK",
        cb: () => {
          dispatch(fetchTours());
        },
      },
    };
  }

  useEffect(() => {
    setUpdatingTours(tours);
  }, [tours]);

  usePageTitle("Quản lý tour sliders | Joya Travel");

  return (
    <>
      <NotifyModal {...notify} />
      <SpinnerModal show={isLoading} />
      <AdminLayout>
        <TopBar title="Quản lý slider">
          <button className="btn btn-primary" onClick={submitHandler}>
            Lưu
          </button>
        </TopBar>

        <div className="p-2  layoutManager">
          {tours && (
            <Tabs defaultActiveKey="Trang chủ">
              <Tab eventKey="Trang chủ" title="Trang chủ" className="bg-white">
                <TourSlider
                  onChoose={(tourCode) => chooseHandler(HOME_KEY, tourCode)}
                  onRemove={(tourCode) => removeHandler(HOME_KEY, tourCode)}
                  remainTours={getRemainTours(updatingTours, HOME_KEY)}
                  chosenTours={getChosenTours(updatingTours, HOME_KEY)}
                />
              </Tab>
              <Tab
                eventKey="Tour Việt Nam"
                title="Tour Việt Nam"
                className="bg-white"
              >
                <TourSlider
                  onChoose={(tourCode) => chooseHandler(DOMESTIC_KEY, tourCode)}
                  onRemove={(tourCode) => removeHandler(DOMESTIC_KEY, tourCode)}
                  remainTours={getRemainTours(vnTours, DOMESTIC_KEY)}
                  chosenTours={getChosenTours(vnTours, DOMESTIC_KEY)}
                />
              </Tab>
              <Tab
                eventKey="Tour Châu Âu"
                title="Tour Châu Âu"
                className="bg-white"
              >
                <TourSlider
                  onChoose={(tourCode) => chooseHandler(EUROPE_KEY, tourCode)}
                  onRemove={(tourCode) => removeHandler(EUROPE_KEY, tourCode)}
                  remainTours={getRemainTours(euTours, EUROPE_KEY)}
                  chosenTours={getChosenTours(euTours, EUROPE_KEY)}
                />
              </Tab>
            </Tabs>
          )}
        </div>
      </AdminLayout>
    </>
  );
}

export default SliderManager;
