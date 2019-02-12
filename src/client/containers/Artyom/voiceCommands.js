// voiceCommands.js
export default class RosieCommandsManager {
  // The ArtyomCommandsManager class expects as argument in the constructor
  // an already declared instance of Artyom.js
  constructor(ArtyomInstance) {
    this._artyom = ArtyomInstance
  }

  // Execute the loadCommands method to inject the methods to the instance of Artyom
  loadCommands() {
    let Artyom = this._artyom

    // Here you can load all the commands that you want to Artyom
    return Artyom.addCommands([
      {
        indexes: ['fasdfasdf'],
        action: () => {
          Artyom.say('Indeed.')
        }
      }
    ])
  }
}
