import { props, state } from 'cerebral/tags';
import * as factories from "./factories";
import * as actions from "./actions";
import { set } from 'cerebral/factories'

/* Routes */
export const rootRouted = [
  set(state`data.page`, 'main'),
  set(state`data.isObserver`, false),
  set(state`data.login`, ''),
  set(state`data.sessionId`, null),
  set(state`data.token`, null),
];

/* Загальні послідовності */
export const updateIsConnected = set(state`data.isConnected`, props`value`);
export const updateField = set(state`${props`path`}`, props`value`);

/* Отримання повідомлень з сервера */
export const serverMessage = actions.serverMessage;

/* Відправлення повідомлень на сервер */
export const getDevices = factories.messageHandlerFactory([actions.getDevices]);
export const addDevice = factories.messageHandlerFactory([actions.addDevice]);
export const sendCommand = factories.messageHandlerFactory([actions.sendCommand]);
export const remove = factories.messageHandlerFactory([actions.remove]);
