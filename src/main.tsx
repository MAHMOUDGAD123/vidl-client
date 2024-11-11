import { createRoot } from "react-dom/client";
import App from "./App";
import "./main.css";
import "@flaticon/flaticon-uicons/css/all/all.css";
import { StrictMode } from "react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
