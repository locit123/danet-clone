import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppRouter from "./routers/AppRouter";
import { GlobalLayout } from "./components";
import ProviderContextHover from "./providers/providerHover";
import ProviderDataShare from "./providers/providerDataShare";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalLayout>
      <ProviderContextHover>
        <ProviderDataShare>
          <AppRouter />
        </ProviderDataShare>
      </ProviderContextHover>
    </GlobalLayout>
  </StrictMode>
);
