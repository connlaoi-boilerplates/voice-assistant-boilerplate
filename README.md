# Voice Assistant Boilerplate

[![Build Status](https://travis-ci.org/connlaoi/voice-assistant-boilerplate.svg?branch=master)](https://travis-ci.org/connlaoi/voice-assistant-boilerplate.svg?branch=master)

This boilerplate uses Snips and Artyom to process and handle intents to your hearts content!

It uses the [Voice Assistant API](https://github.com/connlaoi/voice-assistant-api) to serve voice commands.

> If you plan on using this boilerplate, please start with the API. :)

## Features

* Artyom & Snips Voice Assistant w/ Fully Customizable Intents and Wakeword
* Easy WaveNet Integration
* Pre-Configured BrowserRouter
* Ant Design UI
* Pre-Configured Modal Windows
* Pre-Configured eslint and Prettier code formatter
* React Hot Loader
* Linux/MacOS/Windows

## Built With

* [Antd](https://ant.design/) - UI Design library
* [Node](https://nodejs.org/) - Dependency and Deployment Manager
* [Express](https://expressjs.com/) - Routing Framework for Node
* [React](https://reactjs.org/) - Framework for state-based UI
* [Redux](https://redux.js.org/) - Predictable state container

## Example

![Demo GIF](https://github.com/connlaoi/voice-assistant-boilerplate/blob/master/src/client/assets/demo.gif)

### Prerequisites

```
Node.js must be installed. Other libraries will be managed within Node.
```

### Installing

```bash
git clone git@github.com:connlaoi/voice-assistant-boilerplate.git
cd voice-assistant-boilerplate
npm install

# remove boilerplate git references
rm ./.git

# create a new repo on GitHub
https://github.com/new

# initialize a new local repo
git init

# connect your local repo to your new GitHub repo
git remote add origin https://github.com/user/repo.git

# push your local repo to your GitHub repo
git push origin master
```

### Scripts

```bash
# run development mode
npm run dev

# run prettier (cleans up your code)
npm run prettier

# run lint (your laundry list)
npm run lint

# run production mode
npm run build
npm start
```

### Configure for Personal Voice API

Now that we have our files in place and the site is able to run, let's integrate our new voice api route!

Simply open the 'src/client/constants/voiceProperties.js' file and edit it to match your own personal information.

That should do it!

_Default Login credentials are any email and password._

---

#### Congratulations, you are now serving a voice assistant in the browser!

---

## Authors

* **Connlaoi Smith** - _Ongoing Development_ - [connlaoi](https://github.com/connlaoi)

See also the list of [contributors](https://github.com/connlaoi/voice-assistant-boilerplate/graphs/contributors) who participated in this project.

## Acknowledgments

* **Amit Maraj** - _Initial work on React Boilerplate_ - [maraja](https://github.com/maraja)
