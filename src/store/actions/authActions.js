import {
  LOADING,
  LOADING_FINISHED,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  SIGNOUT_SUCCESS,
  SIGNUP_ERROR,
  SIGNUP_SUCCESS,
} from "../types/authType";

export const signIn = (credentials) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch({ type: LOADING });
    const firebase = getFirebase();
    const firestore = getFirestore();
    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(async (auth) => {
        var name = "";
        const usersRef = firestore.collection("users");
        const snapshot = await usersRef.get();
        if (snapshot.empty) {
          console.log("No matching documents.");
        } else {
          snapshot.forEach((doc) => {
            if (doc.id === auth.user.uid) {
              name = doc.data().firstName + " " + doc.data().lastName;
            }
          });
        }

        window.M.toast({
          html: "Welcome " + name.toUpperCase(),
        });
        dispatch({ type: LOGIN_SUCCESS });
        dispatch({ type: LOADING_FINISHED });
      })
      .catch((err) => {
        dispatch({ type: LOGIN_ERROR, err });
        dispatch({ type: LOADING_FINISHED });
      });
  };
};

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: SIGNOUT_SUCCESS });
      });
  };
};

export const signUp = (user) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch({ type: LOADING });
    const firebase = getFirebase();
    const firestore = getFirestore();

    firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((resp) => {
        return firestore
          .collection("users")
          .doc(resp.user.uid)
          .set({
            firstName: user.firstName,
            lastName: user.lastName,
            initials: user.firstName[0] + user.lastName[0],
          });
      })
      .then(() => {
        window.M.toast({
          html: "Welcome " + user.firstName + " " + user.lastName,
        });
        dispatch({ type: SIGNUP_SUCCESS });
        dispatch({ type: LOADING_FINISHED });
      })
      .catch((err) => {
        dispatch({ type: SIGNUP_ERROR, err });
        dispatch({ type: LOADING_FINISHED });
      });
  };
};
