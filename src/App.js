import logo from "./logo.svg";
import "./App.css";
import Navbar from "./component/Navbar";
import { FiSearch } from "react-icons/fi";
import { AiFillPlusCircle } from "react-icons/ai";
import { useState, useEffect } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "./config/Firebase";
import ContactCard from "./component/ContactCard";
import AddAndUpdateContact from "./component/AddAndUpdateContact";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useDisclouse from "./hooks/useDisclouse";
import NotContactFound from "./component/NotContactFound";

function App() {
  const [contactUs, setContactUs] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclouse();

  const getContacts = async () => {
    try {
      const contactsRef = collection(db, "contact-us");

      onSnapshot(contactsRef, (snapshot) => {
        const contactLists = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        setContactUs(contactLists);
        return contactLists;
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  const filterContacts = (e) => {
    const value = e.target.value;

    const contactsRef = collection(db, "contact-us");

    onSnapshot(contactsRef, (snapshot) => {
      const contactLists = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      const filteredContacts = contactLists.filter((contact) =>
        contact.name.toLowerCase().includes(value.toLowerCase())
      );

      setContactUs(filteredContacts);

      return filteredContacts;
    });
  };

  return (
    <>
      <div className="mx-auto max-w-[370px] px-4 flex flex-col">
        <Navbar />
        <div className="flex gap-2 items-center">
          <div className="relative flex flex-grow items-center bg-gray-100 rounded-md p-2">
            <FiSearch className="absolute ml-2 text-gray-500" />
            <input
              onChange={filterContacts}
              type="text"
              className="flex-grow rounded-md bg-transparent border-none pl-10 text-lg outline-none"
              placeholder="Search contacts..."
            />
          </div>
          <div>
            <AiFillPlusCircle
              onClick={onOpen}
              className="text-5xl text-blue-500 cursor-pointer hover:text-blue-700"
            />
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-3">
          {contactUs.length <= 0 ? (
            <NotContactFound />
          ) : (
            contactUs.map((contact) => (
              <ContactCard key={contact.id} contact={contact} />
            ))
          )}
        </div>
      </div>
      <ToastContainer position="top-center" />
      <AddAndUpdateContact onClose={onClose} isOpen={isOpen} />
    </>
  );
}

export default App;
