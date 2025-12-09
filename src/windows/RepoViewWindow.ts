import { WebviewWindow } from "@tauri-apps/api/webviewWindow";

const LABEL = "repo-view-window";

export default {
  getWindow: () => {
    return WebviewWindow.getByLabel(LABEL);
  },
};
