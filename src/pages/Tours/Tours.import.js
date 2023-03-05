// main
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// components
import AdminLayout from "../../layout/AdminLayout";
import SpinnerModal from "../../components/SpinnerModal";
import ErrorMessage from "../../components/ErrorMessage";
import Filter from "./Filter";
import NotifyModal from "../../components/NotifyModal";

// apis
import useAxios from "../../hooks/useAxios";
import { fetchTours, deleteTour } from "../../services/apis";

// other
import * as svg from "../../assets/svgs";
import placesMap from "../../services/constants/placesMap";
import usePageTitle from "../../hooks/usePageTitle";

// css
import styles from "./Tours.module.css";

const PAGE_SIZE = 6;

const toursFilter = (tours, { page, search, category }) => {
  let t = tours;

  // Tour châu Âu
  if (category === "chau-au") {
    t = t.filter((item) => item.is_eu_tour);
  }

  // Tour trong nước
  if (category === "viet-nam") {
    t = t.filter((item) => item.is_vn_tour);
  }

  // search
  if (search) {
    t = t.filter((tour) =>
      tour.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  const showedTours = t.slice((page - 1) * 6, (page - 1) * 6 + 6);

  return {
    tours: showedTours,
    tours_total: t,
    tours_total_count: t.length,
  };
};

export {
  // main
  useEffect,
  useState,
  Link,
  useNavigate,

  // components
  AdminLayout,
  ErrorMessage,
  SpinnerModal,
  NotifyModal,
  Filter,

  // other
  fetchTours,
  deleteTour,
  useAxios,
  PAGE_SIZE,
  usePageTitle,
  toursFilter,
  placesMap,
  svg,
  styles,
};
