import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Loading from "./Loading";

const ContactList = () => {
  const { newUser, getFileUrl } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState({
    isError: false,
    message: "",
  });

  useEffect(() => {
    const getContactList = async () => {
      try {
        await getDocs(collection(db, "contactList")).then((querySnapshot) => {
          const contacts = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          const filterContacts = contacts.filter(
            (contact) => contact.sentUser.id === newUser.id
          );
          if (filterContacts.length > 0) {
            setContacts(filterContacts);
            filterContacts.forEach(() => {
              // getFileUrl(newUser.id)
            });
            setLoading(false);
            setError({
              isError: false,
              message: "",
            });
          } else {
            setLoading(false);
            setError({
              isError: true,
              message: "No Contact found.",
            });
          }
        });
      } catch (error) {
        setLoading(false);
        setError({
          isError: true,
          message: error.message,
        });
      }
    };
    getContactList();
  }, [newUser.id]);

  const formatTime = (dt) => {
    const dateTIme = new Date(dt);
    const year = dateTIme.getUTCFullYear();
    const month = dateTIme.getMonth();
    const date = dateTIme.getDate();
    return `${date}/${month + 1}/${year}, ${dateTIme.toLocaleTimeString()}`;
  };

  return (
    <div className="mt-8">
      {loading && <Loading />}
      {error.isError && <span className="">{error.message}</span>}
      <ul className="flex flex-col gap-4">
        {contacts.length > 0 &&
          contacts.map((contact) => {
            return (
              <li key={Math.random()}>
                <h3 className="text-xl font-semibold">Name: {contact.name}</h3>
                <h3>Phone: {contact.number}</h3>
                <h3>Timestamp: {formatTime(contact.timestamp)}</h3>
                <h3>
                  Sent By:{" "}
                  <span className="capitalize text-lg">
                    {contact.createdBy}
                  </span>
                </h3>
                <h3>{contact.sendFile}</h3>
                <h3>File: {getFileUrl(contact)}</h3>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default ContactList;
