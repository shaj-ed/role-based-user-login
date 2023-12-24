/* eslint-disable react/prop-types */
import { signInWithEmailAndPassword } from "firebase/auth";
import { createContext, useState } from "react";
import { auth, db, storage } from "../firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { getMetadata, listAll, ref, uploadBytes } from "firebase/storage";

export const UserContext = createContext("");

export const UserContextProvider = ({ children }) => {
  const [errorMessage, setErrorMessage] = useState({
    isError: false,
    message: null,
  });
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState([]);

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
        // const newUserData = users.filter((doc) => doc.id === curUser.uid)[0];
        tempArray.push({ ...newUserData.data(), id: curUser.uid });
        console.log(tempArray);
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

  const addFile = (file, docId) => {
    console.log(file);
    const metaData = {
      contentType: file.type,
      name: file.name,
      customMetadata: {
        docId,
      },
    };
    const fileRef = ref(storage, `audio/${docId}${file.name}`);
    uploadBytes(fileRef, file, metaData).then((snapshot) => {
      console.log("Uploaded a blob or file!", snapshot);
    });
  };

  const getFileUrl = (contact) => {
    let audioLink = "";
    const listRef = ref(storage, "audio");
    listAll(listRef)
      .then((res) => {
        res.items.map((itemRef) => {
          getMetadata(ref(storage, `audio/${itemRef.name}`))
            .then((metadata) => {
              if (metadata.customMetadata.docId === contact.id) {
                console.log(metadata);
              }
            })
            .catch((error) => {
              console.log(error);
            });
        });
      })
      .catch((error) => {
        console.log(error);
      });
    console.log();
    // getDownloadURL(ref(storage, file))
    //   .then((url) => {
    //     console.log(url);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    return audioLink;
  };

  const addContactList = async (contact, file) => {
    try {
      const docRef = await addDoc(collection(db, "contactList"), {
        ...contact,
      });
      addFile(file, docRef.id);
      console.log(docRef.id);
    } catch (error) {
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
        login,
        setNewUser,
        setErrorMessage,
        addFile,
        addContactList,
        getFileUrl,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
