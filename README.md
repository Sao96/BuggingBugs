![enter image description here](https://i.imgur.com/lvezULG.png)

### Enjoy simple bug tracking.

# What is BuggingBugs?

A live version of this app can be found at https://buggingbugs.herokuapp.com.

## Why?

Bug tracking can be a pain. So is navigating slow and cluttered applications that have more features than necessary to maintain a long term project. It aims to help make bug management quick and painless.

## What's it got?

Currently, BuggingBugs provides the ability to create bug tracking groups, and create tickets in them. It is still currently under development.

Every project contains project leaders and members. Leaders manage the tickets, and members are assigned tickets. Once a user is done with the task on a ticket, they submit a request for a leader to review the ticket. Once approved, the ticket is closed, or re-opened on rejection.

The life cycle of bug tickets can be seen as:

![An image of a tickets lifecycle](https://i.imgur.com/eRIuIhh.jpg)

## Getting Started

Sufficient enough versions of node & npm are required to run this application. To begin, run `npm install` to get all frontend dependencies, then the same in the `backend` directory.

To launch a dev server to host the front end, simply run `npm run dev` from the main root.
To launch a backend dev server, in the `backend` directory, run `npx babel-node server.js`, or the convenient `run` bash script to shortcut this command.

Warning: Currently, a backend server if required to use the application, even in a development setting. Make sure to run a local instance of a backend dev server as well to handle requests.

By default, the webpack dev server runs on port 8080, and the backend dev server listens on 3000. To allow for fast and dynamic updates, on the frontend, all backend requests are proxied to go from the frontend dev server's port to the backend dev server's port. The respective ports can be updated on the `webpack.config` file.

### Building

The frontend app can be compiled and built with webpack running `npm run build`. By default, the output is sent to `server/build`, where the files are then hosted by the server.

## Codebase

The codebase is split into two primary sections, the frontend and back end.

### Frontend

The primary web application is a react SPA. All source files are compiled through babel and bundled through webpack. More information can be found in the `src` directory.

### Backend

The server of this application is an express.js powered application which uses a Mongo database to store all data. More information can be found in the `server` directory.
