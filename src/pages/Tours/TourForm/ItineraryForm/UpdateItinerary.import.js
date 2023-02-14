// main
import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import Accordion from "react-bootstrap/Accordion";

// components
// import Editor from "../../../../../containers/Editor";
import Editor from "./ItineraryEditor";

// assets
import { xMark as closeSVG } from "../../../../assets/svgs";

// css
import styles from "./UpdateItinerary.module.css";

export {
  // main
  useState,
  useEffect,
  uuid,
  Accordion,

  // components
  Editor,
  closeSVG,
  styles,
};
