import firebase from "firebase/app";
import "firebase/firestore";
import { firebaseConfig } from "../Secrets";
// import "./dives.json";
// import { dives } from "./Dives";

// removes multiple FB initialization error
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

let divesRef = firebase.firestore().collection("dives");
let dives = [];

//loadDives
querySnap.forEach(qDocSnap => {
  let key = qDocSnap.id;
  let dive = qDocSnap.data();
  dive.key = key;
  dives.push(dive);
});

// createDive
let blankDive = {
  country: "",
  diver: "9lnN5X4zdxeznPfWXp20",
  diveSite: "",
  gas: "",
  location: "",
  notes: "",
  pictureURL: "",
  timestamp: Date.now(),
  favorite: false,
  rating: 0,
  maxDepth: 0,
  tempBottom: 0,
  tempSurface: 0,
  totalTime: 0,
  weights: 0,

  latitude: 0,
  longitude: 0
  // coordinates: ???, // geopoint, [41.0153513° N, 83.9355813° W] 
}

// addDive
await divesRef.add(newDive);