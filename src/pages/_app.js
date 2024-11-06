import "@/styles/globals.css";
import { CacheProvider } from "@emotion/react";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import { createTheme, ThemeProvider } from "@mui/material";
import createCache from "@emotion/cache";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const theme = createTheme({
  direction: "rtl",
  palette: {
    primary: { main: "#F1AB1F" },
    secondary: { main: "#A87715" },
    text: { secondary: "#F2F2F3" },
    success: {main: '#2bd447'},
    warning: {main: "#ecab28"}
  },
  shape: {
    borderRadius: "16px",
  },
  typography: {
    fontFamily: "Vazir"
  }
});

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
    </QueryClientProvider>
  );
}
