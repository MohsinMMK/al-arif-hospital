import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Website from "./multipage/Website";
import "./index.css";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Website />
  </StrictMode>,
);
