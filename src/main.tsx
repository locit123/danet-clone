import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import GlobalLayout from "@components/globalLayout/GlobalLayout.tsx";
import AppRouter from "./routers/AppRouter";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalLayout>
      <AppRouter />
    </GlobalLayout>
  </StrictMode>
);
