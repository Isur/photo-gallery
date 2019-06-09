# Node & React Boilerplate

Boilerplate for fullstack Node.js and React applications.

## Table of contents
- [Getting Started](#getting-started)
- [Running the tests](#running-the-tests)
- [Deployment](#deployment)
- [Built with](#built-with)
- [Authors](#authors)
- [License](#license)

## Getting Started:

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

To start this project you need `node`. It can be downloaded here:

https://nodejs.org/en/download/

### Installing

To install packages:

`npm install`

To run development envinronment use

`npm run dev`

It will test code with eslint rules and fix it if possible. Afterwards webpack will build and launch both server and client.

To run server and client separately use:

`npm run dev:server`

`npm run dev:client`

## Running the tests
### Unit tests

There is no unit tests yet.

### Linter
Currently you can test your code with linter:

`npm run linter`

and fix if possible:

`npm run linter-fix`

## Deployment:

If you want to deploy your app on live system use:

`npm run build`

It will check your code and build client and server.

To start it use:

`npm run start`

## Built with

- [Webpack](https://webpack.js.org/)
- [Node.js](https://nodejs.org/en/)
- [Express](https://www.npmjs.com/package/express)
- [React](https://reactjs.org/)
- [Babel](https://babeljs.io/)
- [Typescript](https://www.typescriptlang.org/index.html)
- [SASS](https://sass-lang.com/)
- [Eslint](https://eslint.org/)
- [Semantic UI](https://react.semantic-ui.com/)

## Authors
- **Artur Bednarczyk** - *Initial work* -  [Isur](https://github.com/isur)

## License

This project is licensed under the MIT License
