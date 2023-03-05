// main
import { useState, useEffect, useRef } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";

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
import placesMap from "../../../services/constants/placesMap";

// css
import styles from "./UpdateTour.module.css";

const dataPacker = (values) => {
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

  const rating = values.rating.map((item) => ({
    name: item.name,
    stars: item.stars,
    content: item.content,
  }));

  const destinations = values.destinations;

  const formData = new FormData();

  const j = (data) => JSON.stringify(data);

  formData.append("code", values.code);
  formData.append("name", values.name);
  formData.append("journey", values.journey);
  formData.append("description", values.description);
  formData.append("highlights", j(values.highlights));
  formData.append("price", Number(values.price.replace(/,/g, "")));
  formData.append("destinations", j(destinations));
  formData.append("departure_dates", j(values.departure_dates));
  formData.append("departure_dates_text", values.departure_dates_text);
  formData.append("duration", j(values.duration));
  formData.append("itinerary", j(itinerary));
  formData.append("terms", j(values.terms));
  formData.append("price_policies", j(values.price_policies));
  formData.append("rating", j(rating));
  formData.append("en", j(values.en));
  formData.append("thumb", values.thumb);
  formData.append("banner", values.banner);
  formData.append("old_code", values.old_code);
  formData.append("start_at", values.start_at);
  formData.append("start_at_text", values.start_at_text);

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
      `${item.id}-joyadivider-${item.fileName}`
    );
  });

  return formData;
};

export {
  // main
  useState,
  useRef,
  useEffect,
  useParams,
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
  dataPacker,
  placesMap,
  styles,
};
