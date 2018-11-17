import { setError } from "../helpers";

export function sendState({ state }, payload) {
  const devices = payload.devices;
  Object.keys(payload.devices).forEach(key => devices[key].pending = false);
  state.set(`data.devices`, devices);
}

export function errorMessage({ state }, payload) {
  setError({ state, props: { error: `${payload.message}\n${payload.reason}` } });
}
