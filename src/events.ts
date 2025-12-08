import { emit, EventCallback, listen, Options } from "@tauri-apps/api/event";

type LoginEvent = "login::success" | "login::failed";

export const emitLoginEvent = async (event: LoginEvent, payload?: any) => {
  console.log(`Login event emitted: ${event}`);
  await emit(event, payload);
};

export const listenLoginEvent = (
  event: LoginEvent,
  handler: EventCallback<unknown>,
  options?: Options,
) => {
  return listen(event, handler, options);
};
