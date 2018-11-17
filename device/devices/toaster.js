const Device = require('./index');

class Toaster extends Device {
  constructor (state = {}) {
    state = Object.assign({
      type: 'toaster',
      works: false,
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

module.exports = Toaster;
