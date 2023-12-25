<H1 align ="center" > THAI ID OCR APP  </h1>
<h5  align ="center"> 
Fullstack ID Text Detection application made with MongoDB, Express, React & Nodejs (MERN) </h5>
<br/>

<video src='https://drive.google.com/file/d/1Rs0-lsfCMLaiq_owI3KVahhrnMTyIvx7/view?usp=drive_link' width=180/>

  * [Configuration and Setup](#configuration-and-setup)
  * [Key Features](#key-features)
  * [Technologies used](#technologies-used)
      - [Frontend](#frontend)
      - [Backend](#backend)
      - [Database](#database)



## Configuration and Setup

In order to run this project locally, simply fork and clone the repository or download as zip and unzip on your machine.

- Open the project in your prefered code editor.
- Go to terminal -> New terminal (If you are using VS code)
- Split your terminal into two (run the Frontend on one terminal and the Backend on the other terminal)

In the first terminal

```
$ cd Frontend
$ npm install (to install frontend-side dependencies)
$ npm run  start (to start the frontend)
```

In the second terminal

- cd Backend and Set environment variables in .env
- Create your mongoDB connection url, which you'll use as your MONGO_URI
- Supply the following credentials

```
#  --- .env  ---

NODE_ENV = development
PORT =5000
URI =http://localhost:3000
MONGO_URI =
client_email =
private_key = 

```
# --- Terminal ---

$ npm install (to install backend-side dependencies)
$ npm start (to start the backend)
```


##  Key Features

- User Verify Thai ID
- CRUD operations (Data create, read, update and delete)
- Upload ID ımages to the server
- Responsive Design

<br/>

##  Technologies used

This project was created using the following technologies.

####  Frontend 

- [React js ](https://www.npmjs.com/package/react) - JavaScript library that is used for building user interfaces specifically for single-page applications
- [React Hooks  ](https://reactjs.org/docs/hooks-intro.html) - For managing and centralizing application state
- [react-router-dom](https://www.npmjs.com/package/react-router-dom) - To handle routing
- [axios](https://www.npmjs.com/package/axios) - For making Api calls
- [Css](https://developer.mozilla.org/en-US/docs/Web/CSS) - For User Interface


####  Backend 


- [Node js](https://nodejs.org/en/) -A runtime environment to help build fast server applications using JS
- [Express js](https://www.npmjs.com/package/express) -The server for handling and routing HTTP requests
- [Mongoose  ](https://reactjs.org/docs/hooks-intro.html) - For modeling and mapping MongoDB data to JavaScript
- [dotenv](https://developer.mozilla.org/en-US/docs/Web/CSS) - Zero Dependency module that loads environment variables
- [multer](https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/frameworks/react.html) - Node.js middleware for uploading files 
- [cors](https://www.npmjs.com/package/uuid) - Provides a Connect/Express middleware


####  Database 

 - [MongoDB ](https://www.npmjs.com/package/uuid) - It provides a free cloud service to store MongoDB collections.
