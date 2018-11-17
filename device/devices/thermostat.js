const Device = require('./index');

class Thermostat extends Device {
  constructor (state = {}) {
    state = Object.assign({
      type: 'thermostat',
      floorHeating: false,
      airConditioning: false,
      floorTemp: 19,
      airTemp: 22,
      floorTarget: 19,
      airTarget: 22,
    }, state);

    const commands = {
      floorOn: {
        time: 1000, // Час виконання команди в мс
        executor: () => this.state.floorHeating = true,
      },
      floorOff: {
        time: 1000, // Час виконання команди в мс
        executor: () => this.state.floorHeating = false,
      },
      airOn: {
        time: 3000, // Час виконання команди в мс
        executor: () => this.state.airConditioning = true,
      },
      airOff: {
        time: 3000, // Час виконання команди в мс
        executor: () => this.state.airConditioning = false,
      },
    };

    super(state, commands);
  }
}

module.exports = Thermostat;
