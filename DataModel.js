import firebase from "firebase/app";
import "firebase/firestore";
// import "firebase/storage";

import { firebaseConfig } from "./Secrets";

class DataModel {
  constructor() {
    // removes multiple FB initialization error
    if (firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig);
    }

    this.usersRef = firebase.firestore().collection("users");
    this.divesRef = firebase.firestore().collection("dives");
    // this.jumpsRef = firebase.firestore().collection("jumps");
    // this.storageRef = firebase.storage().ref();

    this.users = [];
    this.dives = [];
    // this.jumps = [];
    this.loadUsers();
  }

  // users
  loadUsers = async () => {
    let querySnap = await this.usersRef.get();
    querySnap.forEach(qDocSnap => {
      let key = qDocSnap.id;
      let data = qDocSnap.data();
      data.key = key;
      this.users.push(data);
    });
  }

  getUsers = () => {
    return this.users;
  }

  addUser = async (email, pass, dispName) => {
    let newUser = {
      email: email,
      password: pass,
      displayName: dispName
    }

    // add data to FB
    let newUserDocRef = await this.usersRef.add(newUser);

    // get new FB ID and add to app data model
    let key = newUserDocRef.id;
    newUser.key = key;
    this.users.push(newUser);

    return newUser;
  }

  // dives
  loadDives = async () => {
    this.dives = []; // if called again, avoid duplicates
    let querySnap = await this.divesRef.orderBy("timestamp", "desc").get();
    querySnap.forEach(qDocSnap => {
      let key = qDocSnap.id;
      let dive = qDocSnap.data();
      dive.key = key;
      this.dives.push(dive);
    });
  }

  cleanDives = (userKey) => {
    let cleanedDives = [];
    for (let dive of this.dives) {
      if (dive.diver === userKey) {
        cleanedDives.push(dive);
      }
    }
    this.dives = cleanedDives;
  }

  getDives = () => {
    return this.dives;
  }

  createDive = (userKey) => {
    let blankDive = {
      country: "",
      diver: userKey,
      diveSite: "",
      gas: "",
      location: "",
      notes: "",
      pictureURL: "",
      timestamp: Date.now(),
      favorite: false,
      rating: 0,
      pictureHeight: 0,
      pictureWidth: 0,
      maxDepth: 0,
      tempBottom: 0,
      tempSurface: 0,
      totalTime: 0,
      weights: 0,

      latitude: 0,
      longitude: 0
      // coordinates: ???, // geopoint, [41.0153513° N, 83.9355813° W] 
    }

    return blankDive;
  }

  addDive = async (newDive) => {
    // add data to FB
    let newDiveDocRef = await this.divesRef.add(newDive);

    // get new FB ID and add to app data model
    let key = newDiveDocRef.id;
    newDive.key = key;
    this.dives.push(newDive);
  }

  editDive = async (editedDive) => {
    // update FB
    let editedDiveDocRef = this.divesRef.doc(editedDive.key);
    let editedDiveWithoutKey = {...editedDive};
    delete editedDiveWithoutKey.key;
    await editedDiveDocRef.update(editedDiveWithoutKey);
    
    // update app data model
    let divesList = this.dives;
    let foundIndex = -1;
    for (let idx in divesList) {
      if (divesList[idx].key === editedDive.key) {
        foundIndex = idx;
        break;
      }
    }

    // silently fail if item not found
    if (foundIndex !== -1) {
      divesList[foundIndex] = editedDive;
      this.dives = divesList;
    }
  }

  deleteDive = async (diveKey) => {
    // delete from FB
    let docRef = this.divesRef.doc(diveKey);
    await docRef.delete();

    // delete from app data model
    let foundIndex = -1;
    for (let idx in this.dives) {
      if (this.dives[idx].key === diveKey) {
        foundIndex = idx;
        break;
      }
    }

    // silently fail if item not found
    if (foundIndex !== -1) {
      this.dives.splice(foundIndex, 1);
    }
  }

  // addDivePicture = async (diveKey, pictureObject) => {
  //   let fileName = diveKey;
  //   let pictureRef = this.storageRef.child(fileName);

  //   // fetch picture object from the local filesystem
  //   let response = await fetch(pictureObject.uri);
  //   let pictureBlob = await response.blob();

  //   // upload to FB Storage
  //   await pictureRef.put(pictureBlob);

  //   // get picture URL
  //   let downloadURL = await pictureRef.getDownloadURL();
    
  //   // update dive with picture and store in FB
  //   let diveRef = this.divesRef.doc(diveKey);
  //   await diveRef.update({
  //     pictureURL: downloadURL,
  //     pictureHeight: pictureObject.height,
  //     pictureWidth: pictureObject.width
  //   });
  // }

  // // jumps
  // loadJumps = async () => {
  //   this.jumps = []; // if called again, avoid duplicates
  //   let querySnap = await this.jumpsRef.orderBy("timestamp", "desc").get();
  //   querySnap.forEach(qDocSnap => {
  //     let key = qDocSnap.id;
  //     let jump = qDocSnap.data();
  //     jump.key = key;
  //     this.jumps.push(jump);
  //   });
  // }

  // cleanJumps = (userKey) => {
  //   let cleanedJumps = [];
  //   for (let jump of this.jumps) {
  //     if (jump.skydiver === userKey) {
  //       cleanedJumps.push(jump);
  //     }
  //   }
  //   this.jumps = cleanedJumps;
  // }

  // getJumps = () => {
  //   return this.jumps;
  // }

  // createJump = (userKey) => {
  //   let blankJump = {
  //     country: "",
  //     skydiver: userKey,
  //     dropZone: "",
  //     location: "",
  //     notes: "",
  //     canopySize: "",
  //     staff: "",
  //     aircraft: "",
  //     type: "",
  //     typeDetail: "",
  //     pictureURL: "",
  //     timestamp: Date.now(),
  //     favorite: false,
  //     rating: 0,
  //     pictureHeight: 0,
  //     pictureWidth: 0,
  //     altJump: 0,
  //     altOpen: 0,
  //     freeFall: 0,

  //     latitude: 0,
  //     longitude: 0
  //     // coordinates: ???, // geopoint, [41.0153513° N, 83.9355813° W] 
  //   }

  //   return blankJump;
  // }

  // addJump = async (newJump) => {
  //   // add data to FB
  //   let newJumpDocRef = await this.jumpsRef.add(newJump);

  //   // get new FB ID and add to app data model
  //   let key = newJumpDocRef.id;
  //   newJump.key = key;
  //   this.jumps.push(newJump);
  // }

  // editJump = async (editedJump) => {
  //   // update FB
  //   let editedJumpDocRef = this.jumpsRef.doc(editedJump.key);
  //   let editedJumpWithoutKey = {...editedJump};
  //   delete editedJumpWithoutKey.key;
  //   await editedJumpDocRef.update(editedJumpWithoutKey);
    
  //   // update app data model
  //   let jumpsList = this.jumps;
  //   let foundIndex = -1;
  //   for (let idx in jumpsList) {
  //     if (jumpsList[idx].key === editedJump.key) {
  //       foundIndex = idx;
  //       break;
  //     }
  //   }

  //   // silently fail if item not found
  //   if (foundIndex !== -1) {
  //     jumpsList[foundIndex] = editedJump;
  //     this.jumps = jumpsList;
  //   }
  // }

  // deleteJump = async (jumpKey) => {
  //   // delete from FB
  //   let docRef = this.jumpsRef.doc(jumpKey);
  //   await docRef.delete();

  //   // delete from app data model
  //   let foundIndex = -1;
  //   for (let idx in this.jumps) {
  //     if (this.jumps[idx].key === jumpKey) {
  //       foundIndex = idx;
  //       break;
  //     }
  //   }

  //   // silently fail if item not found
  //   if (foundIndex !== -1) {
  //     this.jumps.splice(foundIndex, 1);
  //   }
  // }
}


let theDataModel = undefined;

export function getDataModel() {
  if (!theDataModel) {
    theDataModel = new DataModel();
  }

  return theDataModel;
}