import React from "react";
import Modal from "./Modal";
import { ErrorMessage, Form, Formik, Field } from "formik";
import { addDoc, collection, updateDoc, doc } from "firebase/firestore";
import { db } from "../config/Firebase";
import { toast } from "react-toastify";
import * as Yup from "yup";

const contactSchemaValidation = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const AddAndUpdateContact = ({ isOpen, onClose, isUpdate, contact }) => {
  const addContact = async (contact) => {
    try {
      const contactRef = collection(db, "contact-us");
      await addDoc(contactRef, contact);
      onClose();
      toast.success("Contact added successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to add contact");
    }
  };

  const updateContact = async (contact, id) => {
    try {
      const contactRef = doc(db, "contact-us", id);
      await updateDoc(contactRef, contact);
      onClose();
      toast.success("Contact updated successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update contact");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Formik
        validationSchema={contactSchemaValidation}
        initialValues={{
          name: isUpdate ? contact.name : "",
          email: isUpdate ? contact.email : "",
        }}
        onSubmit={(values) => {
          isUpdate ? updateContact(values, contact.id) : addContact(values);
        }}
      >
        {({ errors, touched }) => (
          <Form className="bg-white p-6 rounded-lg shadow-md">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <Field
                name="name"
                className={`mt-1 p-2 border rounded-md w-full ${
                  errors.name && touched.name ? "border-red-500" : ""
                }`}
                placeholder="Enter name"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <Field
                name="email"
                type="email"
                className={`mt-1 p-2 border rounded-md w-full ${
                  errors.email && touched.email ? "border-red-500" : ""
                }`}
                placeholder="Enter email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
            >
              {isUpdate ? "Update Contact" : "Add Contact"}
            </button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default AddAndUpdateContact;
