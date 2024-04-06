import React from "react";

const NotContactFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img
        src="images\Hands Contact.png"
        alt="No Contact Found"
        className="h-40 w-40 mb-4"
      />
      <h3 className="text-2xl font-semibold text-dark_yellow">
        Contact Not Found
      </h3>
    </div>
  );
};

export default NotContactFound;
