class Device {
  constructor (state, commands) {
    this.state = state;
    this.commands = commands;
  }

  async executeCommand(command) {
    const cmd = this.commands[command] || {};
    const executor = cmd.executor;
    return new Promise((resolve, reject) => {
      if (executor) {
        executor();
        setTimeout(() => resolve(this.state), cmd.time);
      } else {
        reject(new Error('Немає такої команди'));
      }
    })
  }
}

module.exports = Device;
