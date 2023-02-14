// main
import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";

// components
import AdminLayout from "../../../layout/AdminLayout";
import SpinnerModal from "../../../components/SpinnerModal";
import ErrorMessage from "../../../components/ErrorMessage";
import TourForm from "../TourForm";
import NotifyModal from "../../../components/NotifyModal";
import StatusBar from "../../../layout/AdminLayout/StatusBar";

// apis
import useAxios from "../../../hooks/useAxios";
import { addNewTour, fetchCats } from "../../../services/apis";

// other
import usePageTitle from "../../../hooks/usePageTitle";
import StringHandler from "../../../services/helpers/stringHandler";

// css
import styles from "./NewTour.module.css";

const DELTA = { ops: [{ insert: "\n" }] };

const initialValues = {
  destinations: [],

  code: "",
  name: "",
  journey: "",
  description: "",
  highlights: DELTA,

  price: "",
  duration: {
    days: "",
    nights: "",
  },

  departure_dates: [],

  price_policies: {
    includes: DELTA,
    excludes: DELTA,
    other: DELTA,
  },

  terms: {
    registration: DELTA,
    cancellation: DELTA,
    payment: DELTA,
    notes: DELTA,
  },

  thumb: "",
  banner: "",

  itinerary: [],
  rating: [],

  en: {
    name: "",
    journey: "",
    description: "",
    highlights: DELTA,

    price_policies: {
      includes: DELTA,
      excludes: DELTA,
      other: DELTA,
    },

    terms: {
      registration: DELTA,
      cancellation: DELTA,
      payment: DELTA,
      notes: DELTA,
    },

    itinerary: [],
  },
};

const dataPacker = (values) => {
  const formData = new FormData();
  formData.append("code", values.code);
  formData.append("name", values.name);
  formData.append("journey", values.journey);
  formData.append("description", values.description);
  formData.append("highlights", JSON.stringify(values.highlights));
  formData.append("price", Number(values.price.replace(/,/g, "")));
  formData.append("destinations", JSON.stringify(values.destinations));
  formData.append("departure_dates", JSON.stringify(values.departure_dates));
  formData.append("duration", JSON.stringify(values.duration));
  const itinerary = values.itinerary.map((item) => ({
    id: item.id,
    day: item.day,
    destination: item.destination,
    content: item.content,
    images: item.images.map((imgItem) => ({
      ...imgItem,
      image: typeof imgItem.image === "string" ? imgItem.image : null,
    })),
  }));
  formData.append("itinerary", JSON.stringify(itinerary));
  formData.append("terms", JSON.stringify(values.terms));
  formData.append("price_policies", JSON.stringify(values.price_policies));
  const rating = values.rating.map((item) => ({
    name: item.name,
    stars: item.stars,
    content: item.content,
  }));
  formData.append("rating", JSON.stringify(rating));
  formData.append("en", JSON.stringify(values.en));

  // images
  formData.append("thumb", values.thumb);
  formData.append("banner", values.banner);

  // itinerary images
  const itineraryImages = [];
  values.itinerary.forEach((iti) => {
    iti.images.forEach((imgItem) => {
      if (typeof imgItem.image !== "string") {
        const originalName = imgItem.image.name;
        const extension = originalName.slice(originalName.lastIndexOf("."));
        const fileName = imgItem.caption + extension;

        itineraryImages.push({
          id: imgItem.id,
          fileName: fileName,
          file: imgItem.image,
        });
      }
    });
  });

  itineraryImages.forEach((item) => {
    formData.append(
      "itineraryImages",
      item.file,
      `${item.id}-joyadivider-${StringHandler.slugify(item.fileName)}`
    );
  });

  return formData;
};

export {
  // main
  useState,
  useRef,
  useEffect,
  useNavigate,
  Link,

  // components
  AdminLayout,
  SpinnerModal,
  StatusBar,
  NotifyModal,
  TourForm,
  ErrorMessage,

  // other
  useAxios,
  addNewTour,
  fetchCats,
  usePageTitle,
  initialValues,
  dataPacker,
  styles,
};
