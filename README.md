# Dummy React Conf Server

#### Linked repos :

- [Dummy React Conf Website](https://github.com/salimdellali/dummy-react-conf-website)
- [Dummy React Conf Dashboard](https://github.com/salimdellali/dummy-react-conf-dashboard)

---

#### Built with :

[![badge](https://img.shields.io/static/v1?logo=node.js&logoColor=ffffff&message=Node.js&label=%20&color=339933&style=flat)](https://nodejs.org/en/)
[![badge](https://img.shields.io/static/v1?logo=express&logoColor=ffffff&message=Express.js&label=%20&color=000000&style=flat)](https://expressjs.com)
[![badge](https://img.shields.io/static/v1?logo=mongodb&logoColor=ffffff&message=MongoDB&label=%20&color=47a248&style=flat)](https://www.mongodb.com/3)
[![badge](https://img.shields.io/static/v1?logo=mongodb&logoColor=ffffff&message=Mongoose&label=%20&color=8A0C00&style=flat)](https://mongoosejs.com)

#### Server link :

[![badge](https://img.shields.io/static/v1?label=Visit%20Server&message=Here&color=61DAFB&style=flat)](https://dummy-react-conf-server.onrender.com)

#### Project status :

![badge](https://img.shields.io/badge/Project%20Status-Finished-success)

### Repo structure :

- `middleware/` folder : functions that execute during the lifecycle of a request to the Express server, containes `auth` function for authentification using JWT .
- `models/` folder : mongoose models provide an interface to the MongoDB database for creating, querying, updating and deleting documents.
- `routes/` folder : application’s endpoints (URIs) to respond to requests, contains a RESTful API of the React Conf.
- `database.js` file: handles the connection to MongoDB.
- `server.js` file: entry point, bootstraps the RESTful API Server.

### Usage :

- This repo serves as the RESTful API server to the [Dummy React Conf Website](https://github.com/salimdellali/dummy-react-conf-website) and [Dummy React Conf Dashboard](https://github.com/salimdellali/dummy-react-conf-dashboard)
- the data is stored in a MongoDB Database, and Mongoose is chosen as the ODM.

---

### Main technologies used :

- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Token
