import {
  emit as emitBase,
  emitTo as emitToBase,
  EventCallback,
  EventName as EventNameBase,
  listen as listenBase,
  Options,
} from "@tauri-apps/api/event";

type EventName = "user::login";

export const emit = <T>(event: EventName, payload?: T) => {
  return emitBase(event, payload);
};

export const emitTo = <T>(target: string, event: EventName, payload?: T) => {
  return emitToBase(target, event, payload);
};

export const listen = (
  event: EventName & EventNameBase,
  handler: EventCallback<unknown>,
  options?: Options,
) => {
  return listenBase(event, handler, options);
};
