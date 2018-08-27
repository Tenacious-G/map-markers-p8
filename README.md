## Google Udacity Frontend Nanodegree. Project 8 - Neighbourhood App 

### This is not a completed project - this only shows a Map with markers and does not fully use React architecture.

> This is the 8th and final project for the Udacity [Front-End Web Dev Nanodegree](https://udacity.com/course/front-end-web-developer-nanodegree--nd001/) .

This single page application was built using [Google Maps](https://cloud.google.com/maps-platform/) JavaScript API with data gathered from the [Foursquare](https://developer.foursquare.com/) Places 3rd party API.

## Installation and Launch Instructions

- Copy/clone repository from Github using Git:

```
$ git clone https://github.com/Tenacious-G/map-markers-p8.git
```

- Navigate into project directory by typing,
- ```cd map-markers-p8```
- Install dependencies with `npm install` or `yarn install` e.g.,
- ```npm install -g react-google-maps```
- Start app server with `npm start`
- After a few seconds, your browser should open. Alternatively,
- Visit [http://localhost:3000](http://localhost:3000/)

## Dependencies

This project was initialized by [Create React App](https://github.com/facebookincubator/create-react-app). More information on how to perform common tasks can be found [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Note on Service Worker

Full service worker functionality has been provided in developer mode (result of being bootstrapped with Create React App). To see offline functionality in action though, the App needs to be built in production mode:

- Build app server with `npm run build` and then `serve -s build`
- Visit [http://localhost:5000](http://localhost:5000/)