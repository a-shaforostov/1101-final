// const { getPlayers, getAvgTimes, mostDifferent, varStories } = require('./helpers');
const uuidv1 = require('uuid/v1');
// const sha1 = require('sha1');
const EventEmitter = require('events');
const axios = require('axios');
// const salt = '72rt81btcv723vx111b73rvc871bx36';

class Sessions extends EventEmitter {
  constructor() {
    super();
    this.connections = {};
    this.devices = {};
  }

  addDevice({ ip, port }) {
    const url = `http://${ip}:${port}`;
    return axios.get(url)
      .then(response => {
        this.devices[`${ip}:${port}`] = response.data;
        return true;
      })
      .catch(err => {
        return false;
      })
  }

  remove({ url }) {
    delete this.devices[url];
  }

  sendCommand({ command, url }) {
    return axios.post(`http://${url}/${command}`)
      .then(response => {
        this.devices[url] = response.data;
        return true;
      })
      .catch(err => {
        return false;
      })
  }

  // createSession(connectionId, opt) {
  //   const id = uuidv1();
  //   const token = sha1(salt + id);
  //   const s = {
  //     id,
  //     observer: {
  //       login: opt.login,
  //       connectionId,
  //       token,
  //       state: 'pending',
  //       jira: opt.jira,
  //     },
  //     marks: opt.marks || [],
  //     players: [],
  //     stories: [],
  //     currentStory: null,
  //     sessionStarted: new Date().getTime(),
  //   };
  //   this.pool.push(s);
  //   return s;
  // }
  //
  // checkToken(session, token) {
  //   if (session.observer.token !== token) {
  //     throw new Error('Користувач не має прав керувати сесією')
  //   }
  // }
  //
  // stopSession(connectionId, opt) {
  //   const s = this.getSession(opt.sessionId);
  //   this.checkToken(s, opt.token);
  //
  //   s.sessionFinished = new Date().getTime();
  //   this.calcStats(s);
  //   // this.emit('sessionFinished', { sessionId: s.id, time: s.sessionFinished });
  // }
  //
  // newStory(connectionId, opt) {
  //   const s = this.getSession(opt.sessionId);
  //   this.checkToken(s, opt.token);
  //
  //   s.currentStory = null;
  // }
  //
  // createStory(connectionId, opt) {
  //   const s = this.getSession(opt.sessionId);
  //   this.checkToken(s, opt.token);
  //
  //   if (!s.players.length) {
  //     throw new Error('Не поспішайте. Гравці ще не зібралися')
  //   }
  //
  //   s.currentStory = {
  //     num: s.stories.length + 1,
  //     start: new Date().getTime(),
  //     finish: null,
  //     text: opt.story,
  //     players: s.players.map(player => ({
  //       ...player,
  //       mark: false,
  //       time: null,
  //     }))
  //   };
  //
  //   s.stories.push(s.currentStory);
  // }
  //
  // revoteStory(connectionId, opt) {
  //   const s = this.getSession(opt.sessionId);
  //   this.checkToken(s, opt.token);
  //
  //   const story = s.stories.find(story => story.num === opt.storyNum);
  //   story.start = new Date().getTime();
  //   story.finish = null;
  //   story.result = null;
  //   story.players = s.players.map(player => ({
  //     ...player,
  //     mark: false,
  //     time: null,
  //   }));
  //
  //   s.currentStory = story;
  // }
  //
  // createStoryFromJira(connectionId, opt) {
  //   const s = this.getSession(opt.sessionId);
  //   this.checkToken(s, opt.token);
  //
  //   return Promise.resolve()
  //     .then(() => {
  //       if (!s.players.length) {
  //         throw new Error('Не поспішайте. Гравці ще не зібралися')
  //       }
  //
  //       const url = `${s.observer.jira.url}/rest/api/latest/issue/${opt.issue}`;
  //       const auth = s.observer.jira.auth;
  //       return axios.get(url, {
  //         headers: {
  //           Authorization: `Basic ${auth}`,
  //         },
  //       })
  //     })
  //     .then(data => {
  //       if (!data.data) return null;
  //
  //       s.currentStory = {
  //         num: s.stories.length + 1,
  //         start: new Date().getTime(),
  //         finish: null,
  //         text: data.data.fields.description,
  //         issue: opt.issue,
  //         players: s.players.map(player => ({
  //           ...player,
  //           mark: false,
  //           time: null,
  //         }))
  //       };
  //
  //       s.stories.push(s.currentStory);
  //       return s.currentStory;
  //     })
  // }
  //
  // updateIssue(sessionId, story) {
  //   if (story.result === '?' || !story.issue) return Promise.resolve();
  //   const s = this.getSession(sessionId);
  //
  //   const url = `${s.observer.jira.url}/rest/api/latest/issue/${story.issue}`;
  //   const auth = s.observer.jira.auth;
  //   return axios.put(url, {
  //     headers: {
  //       Authorization: `Basic ${auth}`,
  //       'X-Atlassian-Token': 'no-check',
  //     },
  //     body: JSON.stringify({
  //       'fields': {
  //         'timetracking': {
  //           'originalEstimate': `${story.result}h`,
  //         }
  //       }
  //     })
  //   });
  // }
  //
  // giveMark(connectionId, opt) {
  //   const s = this.getSession(opt.sessionId);
  //
  //   return Promise.resolve()
  //     .then(() => {
  //       const story = s.currentStory;
  //       const user = story.players.find(p => p.connectionId === connectionId);
  //       if (!user) {
  //         throw new Error('Гравця не знайдено');
  //       }
  //
  //       user.mark = opt.mark;
  //       user.time = new Date().getTime();
  //
  //       if (story.players.every(p => p.mark !== false)) {
  //         // Всі проголосували
  //         story.finish = new Date().getTime();
  //
  //         // Якщо всі оцінки однакові - прийняти іх за результат
  //         const marks = story.players.reduce((marks, player) => ({ ...marks, [player.mark]: true }), {});
  //         if (Object.keys(marks).length === 1) {
  //           story.result = Object.keys(marks)[0];
  //           return this.updateIssue(opt.sessionId, story);
  //         }
  //       }
  //     });
  // }
  //
  // finishStory(connectionId, opt) {
  //   const s = this.getSession(opt.sessionId);
  //   this.checkToken(s, opt.token);
  //
  //   const story = s.currentStory;
  //   story.result = opt.result;
  //   story.finish = story.finish || new Date().getTime();
  //   return story;
  // }
  //
  // joinSession(connectionId, opt) {
  //   const session = this.getSession(opt.sessionId);
  //
  //   const user = session.players.find(p => p.login === opt.login);
  //   if (user) {
  //     throw new Error(`Ім'я вже використовується`);
  //   }
  //
  //   session.players.push({
  //     login: opt.login,
  //     connectionId,
  //   });
  //
  //   return session;
  // }
  //
  // deleteSession(id) {
  //   const s = this.getSession(id);
  //
  //   this.pool = this.pool.filter(s => s.id !== id);
  //   const connection = this.connections[s.observer.connectionId];
  //   if (connection) {
  //     connection.close(1001, 'Сесію закрито');
  //   }
  //   s.players.forEach(p => {
  //     const connection = this.connections[p.connectionId];
  //     if (connection) {
  //       connection.close(1001, 'Сесію закрито');
  //     }
  //   })
  // }
  //
  // getSession(id) {
  //   const s = this.pool.find(item => item.id === id);
  //   if (!s) {
  //     throw new Error('Сесію не знайдено');
  //   }
  //   return s;
  // }
  //
  getPublicState() {
    return {
      devices: this.devices,
    }
  }

  addConnection(ws) {
    ws.id = uuidv1();
    this.connections[ws.id] = ws;
  }

  removeConnection(id) {
    delete this.connections[id];
  }

  getConnectionsSize() {
    return Object.keys(this.connections).length;
  }
}

module.exports =  new Sessions();
