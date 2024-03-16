# [PolyPicks](https://orange-sky-03c89531e.5.azurestaticapps.net/)

For people related to Cal Poly who like betting and want to engage in the Cal Poly community, PolyPicks is a virtual betting app that allows people to create bets with fake money on campus related topics. Unlike regular virtual gambling apps which focus on more mainstream topics, our product creates a consolidated gambling environment for all Cal Poly related events and activities, such as sports, classes, and clubs.

## Resource Links

* [UI Prototype](https://www.figma.com/file/nyqFiB0Ol0SHSbyNZR9DpW/Main-app?type=design&node-id=0%3A1&mode=design&t=AIoxeM1mcSafvNH7-1) (last updated 2/22/24)

* [UML Class Diagram](https://github.com/EmuMan/stay-soft/wiki/UML-Class-Diagram) (last updated 3/15/24)

* [Hosted Webapp](https://orange-sky-03c89531e.5.azurestaticapps.net/)

* [Documentation and Info](https://github.com/EmuMan/stay-soft/tree/main/docs)

## Development Environment Setup

1. Clone the GitHub repository onto your local machine.
2. Use `npm install` in both `packages/react-frontend` and `packages/express-backend` to get the necessary libraries. This requires Node.js and npm to be installed on your computer; follow [these](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) steps to do so if you haven't already.
3. Create a `.env` file in both `packages/react-frontend` and `packages/express-backend`.
4. In the backend `.env`, fill out the following fields:
    * `ATLAS_USERNAME=`
    * `ATLAS_PASSWORD=`
    * `ATLAS_CLUSTER=`
    * `SALT=`
    * `JWT_SECRET=`
    * `NODE_ENV=`

    Obtain the necessary info given by a team member. This will allow the project to connect to the database and handle authentication.

5. In the frontend .env, fill out:
    * `REACT_APP_API_ENDPOINT='http://localhost:8000'`

    This will set the proper backend address and port for your local machine.

6. To run the development environment, in one terminal run `npm start` in the root folder (or `packages/react-frontend`), and in another terminal run `npm run dev` in `packages/express-backend`. This will run the frontend on `localhost:3000`, and the backend on `localhost:8000`. It should automatically open up a webpage with the React app, but you can manually enter the frontend address if necessary.
