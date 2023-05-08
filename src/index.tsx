import React from "react";
import { createRoot } from "react-dom/client";
import App from "~/components/App/App";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import axios from 'axios';
import { theme } from "~/theme";
import Alert from "@mui/material/Alert";
import { Collapse } from "@mui/material";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, retry: false, staleTime: Infinity },
  },
});

// if (import.meta.env.DEV) {
//   const { worker } = await import("./mocks/browser");
//   worker.start({ onUnhandledRequest: "bypass" });
// }

const container = document.getElementById("app");
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);



axios.interceptors.response.use(
  response => response,
  error => {
    debugger;
    if (error.response.status === 401) {
      alert('You are unauthorized');
    }

    if (error.response.status === 403) {
      alert('Forbidden to upload file');
    }

    return Promise.reject();
  });

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
          {/* <Collapse in={open}>
            <Alert
            sx={{ mb: 2 }}
          >
            Close me!
          </Alert>
        </Collapse> */}
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
