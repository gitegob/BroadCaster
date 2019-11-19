# BroadCaster

[![Build Status](https://travis-ci.org/gitego-brian/BroadCaster.svg?branch=develop)](https://travis-ci.org/gitego-brian/BroadCaster) [![Coverage Status](https://coveralls.io/repos/github/gitego-brian/BroadCaster/badge.svg)](https://coveralls.io/github/gitego-brian/BroadCaster) [![Maintainability](https://api.codeclimate.com/v1/badges/7a78c9b7624a7bc0fe7c/maintainability)](https://codeclimate.com/github/gitego-brian/BroadCaster/maintainability)

Broadcaster enables any/every citizen to bring any form of corruption to the notice of appropriate authorities and the general public. Users can also report on things that need government intervention.

![Screenshot (1)](https://user-images.githubusercontent.com/53472419/69162345-5cbb1b80-0aa1-11ea-912f-1831b908f0b0.png)

## [Documentation](https://documenter.getpostman.com/view/8741834/SW7Z48w7)
# API Endpoints included

- **POST /auth/signup:** Create an account
- **POST /auth/signin:** Log into your account
- **POST /records/:** Create a new record
- **GET /records/:recordID:** Fetch a single record
- **GET /records:** Fetch all records
- **GET /records/red-flags:** Fetch all red-flag records
- **GET /records/interventions:** Fetch all intervention records
- **PATCH /records/:recordID:** Update a record
- **DELETE /records/:recordID:** Delete a record

# Installation and Environment Setup

**Clone the repository from [Github](https://github.com/gitego-brian/BroadCaster).**

( You will need **Git** for this if you are running a Windows PC, Get it [HERE](https://git-scm.com/) )

```
git clone https://github.com/gitego-brian/BroadCaster.git
```

**To Install all dependencies:**

```
npm install
```
**To run the tests:**

```
npm run test
```

**Now to start the app:**

```
npm run start
``` 
**To start the app in development mode:**

( You need **nodemon** installed for this, run `npm i -g nodemon` to install it )

```
npm run dev
```

Test the endpoints in your favorite API client, I strongly recommend [Postman](https://www.getpostman.com/) though :ok_hand:

## Sample Request
### Request body for sign up

```js
{
    "firstName": "John",
    "lastName": "Smith",
    "email": "jsmith@gmail.com",
    "password": "complicatedPswd@111",
    "userName": "jsmith",
    "phone": "+112233445566"
}
```
### Response body for signup
```js
{
    "status": 201,
    "message": "User created successfully",
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZmlyc3ROYW1lIjoiQmVuIiwibGFzdE5hbWUiOiJHaXNhIiwiZW1haWwiOiJnaXRlZ29iN0B5YWhvby5jb20iLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNTc0MTczOTk1fQ.aEsCstbsBKGiGCGhF5GrShADpbxnTpq6wSBKXLlhIU"
    }
}
```
# Tools used

- Server-Side Framework: **Node/Express**
- Linter: **ESLint**
- Style Guide: **Airbnb**
- Testing framework: **Mocha/Chai**

# More Tools

- Continuous integration: **[Travis-Ci](travis-ci.org)**
- ES6 Transpiler: **[Babel](babeljs.io)**
- Test coverage: **[nyc](https://www.npmjs.com/package/nyc)**
- Maintainability: **[Code climate](https://codeclimate.com)**
- Deployment: **[Heroku](https://www.heroku.com)** and **[Github pages](https://pages.github.com)**

# Deployments

- The UI template is hosted on Github pages at https://gitego-brian.github.io/BroadCaster/UI

- The API is hosted on Heroku at http://brian-broadcaster.herokuapp.com/

# Contribute

If you ever have an idea on how you might help improve the app, yo are welcome to contribute your changes to the repository, Just follow the steps below:

Assumming you have the repo cloned on your PC,
- Pull the latest changes to the remote repo by running:
```
git pull origin develop
```
NB: You need to be on the develop branch when you do this

- Create & switch the new branch where you will add your changes by running:
```
git checkout -b yournewbranchname
```

- After adding your changes, commit and push them then create a pull request for against the develop branch. I will review and merge them if they are helpful.

# Author:
**Brian GITEGO**
