import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppRouter from "./routers/AppRouter";
import { GlobalLayout } from "./components";
import ProviderContextHover from "./providers/providerHover";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalLayout>
      <ProviderContextHover>
        <AppRouter />
      </ProviderContextHover>
    </GlobalLayout>
  </StrictMode>
);
