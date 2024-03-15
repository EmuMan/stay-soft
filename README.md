# [PolyPicks](https://orange-sky-03c89531e.5.azurestaticapps.net/)

For people related to Cal Poly who like betting and want to engage in the Cal Poly community, PolyPicks is a virtual betting app that allows people to create bets with fake money on campus related topics. Unlike regular virtual gambling apps which focus on more mainstream topics, our product creates a consolidated gambling environment for all Cal Poly related events and activities, such as sports, classes, and clubs.

[UI Prototype](https://www.figma.com/file/nyqFiB0Ol0SHSbyNZR9DpW/Main-app?type=design&node-id=0%3A1&mode=design&t=AIoxeM1mcSafvNH7-1) (last updated 2/22/24)

[UML Class Diagram](https://github.com/EmuMan/stay-soft/wiki/UML-Class-Diagram) (last updated 3/15/24)

# Development environment set up
1. Clone the github repository onto your local machine.
2. Use npm install in both react-frontend and express-backend to get the necessary libraries.
3. Create a .env file in both react-frontend and express-backend.
4. In the backend .env, fill out:
ATLAS_USERNAME=
ATLAS_PASSWORD=
ATLAS_CLUSTER=
SALT=
JWT_SECRET=
NODE_ENV=
Obtain the necessary info given by a team member.
5. In the frontend .env, fill out:
REACT_APP_API_ENDPOINT='http://localhost:8000'
This will set the proper backend endpoint on your local machine.
6. To run the development environment, in one terminal run 'npm start' in the root folder, and in another terminal run 'npm run dev' in packages/express-backend. This will run the frontend on localhost:3000, and the backend on localhost:8000.