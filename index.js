import React from "react";
import ReactDOM from "react-dom/client";
import MyComponent from "./MyComponent";
import "./index.css";  // <-- Import Tailwind CSS here

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MyComponent />
  </React.StrictMode>
);
