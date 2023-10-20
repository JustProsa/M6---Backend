import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-blue-800 p-3 text-white flex flex-wrap justify-between">
      <div>LOGO</div>
      <div>
        <ul className="flex gap-4">
          <li>link 1</li>
          <li>link 2</li>
          <li>link 3</li>
          <li>link 4</li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
