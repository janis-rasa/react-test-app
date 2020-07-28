## Table generator

Technical requirement:

- The form of adding records to the table, it is also the form of editing records (add changes to edit), it is one common to all tables.
- You can add entries only in the first table, the rest of the tables can only be edited.
- The “copy” button for the table means that its current state is copied, and its copy appears under the current table.
- Button "delete" - deletes the current table (the first table cannot be deleted).
- Removing columns - the entire row is deleted, only the table in which we are manipulating
- Data editing - the data from the table is loaded into the form, after saving the row in the table is updated.
- In the fill form, the placeholder should disappear with focus.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Demo page

[https://janis-rasa.github.io/react-test-app/](https://janis-rasa.github.io/react-test-app/)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
