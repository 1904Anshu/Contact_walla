import React from "react";

const Navbar = () => {
  return (
    <div className="flex items-center justify-center h-16 bg-blue-500 text-white font-semibold shadow-md px-4">
      <img
        src="\images\logos_firebase.png"
        alt="Firebase Logo"
        className="w-10 h-10 mr-2"
      />
      <h1 className="text-xl">My Contact Wala App</h1>
    </div>
  );
};

export default Navbar;
