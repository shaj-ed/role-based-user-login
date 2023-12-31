/* eslint-disable react/prop-types */
import { signInWithEmailAndPassword } from "firebase/auth";
import { createContext, useState } from "react";
import { auth, db, storage } from "../firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const UserContext = createContext("");

export const UserContextProvider = ({ children }) => {
  const [errorMessage, setErrorMessage] = useState({
    isError: false,
    message: null,
  });
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState([]);
  const [fileUrl, setFileUrl] = useState("");

  const login = async (userRole, email, password) => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      const curUser = auth.currentUser;
      const tempArray = [];
      await getDocs(collection(db, "users")).then((querySnapshot) => {
        const users = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setUsers(users);
        const newUserData = querySnapshot.docs.filter(
          (doc) => doc.id === curUser.uid
        )[0];
        tempArray.push({ ...newUserData.data(), id: curUser.uid });
        setNewUser(tempArray);
        loadUser(userRole, { ...newUserData.data(), id: curUser.uid });
      });
    } catch (error) {
      setNewUser([]);
      setErrorMessage({
        isError: true,
        message: error.message,
      });

      setLoading(false);
    }
  };

  const loadUser = (userRole, user) => {
    if (user.role === userRole) {
      setErrorMessage({
        isError: false,
        message: null,
      });

      setLoading(false);
      if (user.role === "admin") {
        setNewUser(user);
      } else {
        setNewUser(user);
      }
    } else {
      setNewUser([]);
      setLoading(false);
      setErrorMessage({
        isError: true,
        message: "Invalid user or unauthorized access.",
      });
    }
  };

  const addContactList = async (contact, file, id) => {
    setLoading(true);
    const fileRef = ref(storage, `audio/${id}${file.name}`);
    uploadBytes(fileRef, file).then((snapshot) => {
      getDownloadURL(ref(storage, `audio/${snapshot.metadata.name}`))
        .then((url) => {
          setFileUrl(url);
          addListWithUrl(contact, url);
        })
        .catch((error) => {
          return error;
        });
    });
  };

  const addListWithUrl = async (contact, url) => {
    const newContact = { ...contact, url };
    try {
      await addDoc(collection(db, "contactList"), {
        ...newContact,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        newUser,
        errorMessage,
        loading,
        users,
        fileUrl,
        login,
        setLoading,
        setNewUser,
        setErrorMessage,
        addContactList,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
