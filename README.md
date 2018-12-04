This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

1. In the project directory, you can run:

## `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>

2. I have integrated following npm packages to run this project.
   "react": "^16.6.3",
   "react-bootstrap": "^0.32.4", //styling purpose
   "react-dom": "^16.6.3",
   "react-scripts": "2.1.1",
   "xml2js": "^0.4.19" //used to convert xml to json

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

3. Used 2 API fetch calls : I was not getting 'description' field in json object through first call hence made 2nd API call for getting it
   Ex : https://www.goodreads.com/search/index.xml?key=l68ue8I3hm1QYNJP7kA&q=Hatchet
   https://www.goodreads.com/book/show/50.xml?key=l68ue8I3hm1QYNJP7kA (50 is bookid which i am passing to get description field from API)
