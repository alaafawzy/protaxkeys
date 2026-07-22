"use client";

import { ThemeProvider, createTheme } from "@mui/material";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { prefixer } from "stylis";
import stylisRTLPlugin from "stylis-plugin-rtl";
import { Toaster } from "react-hot-toast";
import { useMemo, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
// import { UserProvider } from "../context/UserContext";

export default function Providers({ children, direction }) {
  // إنشاء ثيم افتراضي مبدئي يمكن تحديثه لاحقاً
  const [theme1] = useState(createTheme({ direction }));

  const cacheRtl = useMemo(() => {
    if (direction === 'rtl') {
      return createCache({
        key: "muirtl",
        stylisPlugins: [prefixer, stylisRTLPlugin],
      });
    }
    return createCache({ key: "muiltr" });
  }, [direction]);

  return (
    <ThemeContext.Provider value={{ theme1, setThemeLang: () => {} }}>
      {/* <UserProvider> */}
        <CacheProvider value={cacheRtl}>
          <ThemeProvider theme={theme1}>
            {children}
            <Toaster
              toastOptions={{
                success: {
                  iconTheme: { primary: "green", secondary: "white" },
                  style: { background: "#5bb94e", color: "white" },
                },
                error: {
                  iconTheme: { primary: "red", secondary: "white" },
                  style: { background: "#b30101", color: "white" },
                },
              }}
            />
          </ThemeProvider>
        </CacheProvider>
      {/* </UserProvider> */}
    </ThemeContext.Provider>
  );
}