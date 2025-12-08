import React from "react";
import ReactDOM from "react-dom/client";
import "@/index.css";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { StyleProvider } from "@ant-design/cssinjs";
import "dayjs/locale/zh-cn";
import zhCN from "antd/locale/zh_CN";
import { routeTree } from "./routeTree.gen";
import ReactQueryClientProvider from "./providers/ReactQueryClientProvider";
import { App, ConfigProvider } from "antd";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <StyleProvider>
      <ConfigProvider locale={zhCN}>
        <App>
          <ReactQueryClientProvider>
            <RouterProvider router={router} />
          </ReactQueryClientProvider>
        </App>
      </ConfigProvider>
    </StyleProvider>
  </React.StrictMode>,
);
