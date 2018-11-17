import * as wsHandlers from './wsHandlers';
import { setError } from "./helpers";

export const ws = {
  comp: null,
};

export function getDevices({ state, props }) {
  ws.comp.send(JSON.stringify({
    action: 'getDevices',
  }));
}

export function addDevice({ state, props }) {
  ws.comp.send(JSON.stringify({
    action: 'addDevice',
    payload: {
      ip: state.get(`data.newIp`),
      port: state.get(`data.newPort`),
    },
  }));
}

export function sendCommand({ state, props }) {
  ws.comp.send(JSON.stringify({
    action: 'sendCommand',
    payload: {
      command: props.command,
      url: props.url,
    },
  }));
  const devices = state.get(`data.devices`);
  devices[props.url].pending = true;
  state.set(`data.devices`, devices);
}

export function remove({ state, props }) {
  ws.comp.send(JSON.stringify({
    action: 'remove',
    payload: {
      url: props.url,
    },
  }));
}

export function serverMessage(context) {
  const { action, payload } = context.props;
  if (action === 'error') {
    setError({ state: context.state, props: { error: payload.error } });
  } else {
    wsHandlers[action](context, payload);
  }
  const devices = context.state.get(`data.devices`);
  Object.keys(devices).forEach(key => devices[key].pending = false);
  context.state.set(`data.devices`, devices);
}
