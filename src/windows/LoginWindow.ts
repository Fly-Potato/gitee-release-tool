import { WebviewWindow } from "@tauri-apps/api/webviewWindow";

const LABEL = "login-window";
export default {
  openWindow: () => {
    return new WebviewWindow(LABEL, {
      url: "/login",
      width: 400,
      height: 400,
      title: "登录",
    });
  },
  getWindow: () => {
    return WebviewWindow.getByLabel(LABEL);
  },
  closeWindow: () => {
    WebviewWindow.getByLabel(LABEL).then((window) => {
      window?.close();
    });
  },
};
