import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { App as AntdApp } from "antd";
import { BrowserRouter } from "react-router-dom";
import { StyleProvider } from "@ant-design/cssinjs";
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AntdApp>
          <StyleProvider hashPriority="low">
            <App />
          </StyleProvider>
        </AntdApp>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
