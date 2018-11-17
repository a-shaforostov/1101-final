const Device = require('./index');

class Kettle extends Device {
  constructor (state = {}) {
    state = Object.assign({
      type: 'kettle',
      works: false,
      amount: 1,
      temperature: 40,
    }, state);

    const commands = {
      on: {
        time: 100, // Час виконання команди в мс
        executor: () => this.state.works = true,
      },
      off: {
        time: 100, // Час виконання команди в мс
        executor: () => this.state.works = false,
      }
    };

    super(state, commands);
  }
}

module.exports = Kettle;
