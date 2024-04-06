import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { HiOutlineUserCircle } from "react-icons/hi";
import { IoIosAirplane, IoMdTrash } from "react-icons/io";
import { db } from "../config/Firebase";
import useDisclouse from "../hooks/useDisclouse";
import AddAndUpdateContact from "./AddAndUpdateContact";
import { toast } from "react-toastify";
import { useState } from "react";

const ContactCard = ({ contact }) => {
  const { isOpen, onOpen, onClose } = useDisclouse();

  const deleteContact = async (id) => {
    try {
      await deleteDoc(doc(db, "contact-us", id));
      toast.success("Contact Deleted Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between rounded-lg bg-yellow-200 p-4 shadow-md mb-4">
        <div className="flex items-center gap-4">
          <HiOutlineUserCircle className="text-4xl text-orange-500" />
          <div>
            <h2 className="font-medium text-lg">{contact.name}</h2>
            <p className="text-sm text-gray-600">{contact.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <IoIosAirplane
            onClick={onOpen}
            className="text-3xl text-orange-500 cursor-pointer hover:text-orange-700 transition-colors"
          />
          <IoMdTrash
            onClick={() => deleteContact(contact.id)}
            className="text-3xl text-orange-500 cursor-pointer hover:text-orange-700 transition-colors"
          />
        </div>
      </div>
      <AddAndUpdateContact
        contact={contact}
        isUpdate
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};

export default ContactCard;
