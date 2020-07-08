# Frontend

## Tree Layout

```
├── actions	--- All redux actions for each reducer
├── fields --- All redux fields for each reducer
├── img --- All static images used in app
├── initialstates --- All redux initial states for each reducer
├── oauth2 --- Any oauth2 information is saved in here
│   └── GoogleOAuth2Data
├── pages --- The web page components that will be rendered to the user
│   ├── Dashboard
│   ├── Index
│   ├── Landing
│   ├── Login
│   ├── Logout
│   ├── Register
│   ├── Settings
│   └── Ticketboard
├── reducers --- All redux reducers
├── routes --- Contains all routes for both API calls and web navigation
│   ├── apiRoutes
│   └── navRoutes
├── svg --- All static SVG's used for app
└── util --- Global items used across entire app
    ├── altTexts
	├── apiCalls
    ├── generateUserMap
    ├── helperFunctions
    ├── responsive
    ├── routes
    ├── statusCodes
    ├── styles
    ├── themeColors
    └── ticketStatusCodes
```

## Aliasing

Many of the above directories are aliased for convenience. See the webpack config file in the root directory for what those are.

## Code Style

### Importing

Aliases should always be used when possible. Never call for a previous directory, e.g., `../../dont/do/this`.

### File/ folder layout

In most cases, files should serve one purpose only, and primarily hold a folder containing what exactly it holds. The main content should be saved in a file named `index.js`. A folder should either contain an index of other items, or **_just_** be the item itself. There shouldn't be more than one index file in most directories. This allows for quick, easy, and consistent importing, as well as much easier testing. For example, if you have a component `Robot` and it has the sub components `Arm`, `Head`, `Leg`, and `Body`, then we can expect the layout to look like:

```
.
├── components
│   ├── Arm
│   │   └── index.js --- the definition of Arm
│   ├── Body
│   │   └── index.js --- the definition of Body
│   ├── Head
│   │   └── index.js --- the definition of Head
│   ├── Leg
│   │   └── index.js --- the definition of Leg
│   └── index.js --- imports to each component, then exports them
└── index.js - the definition of Robot
```

It may be tedious, but it provides extremely clean and consistent code.

### Avoid multiple functions/ components/ constants/etc... in a single file

This is related to code maintainability. The more definitions, the more to test in a single file, the more complex it becomes. It also demotes the idea of modularity. Any component/function/constant/... at any time, if it isn't global, should be easy to make it global.

### No API call definitions in the middle of functions/ components!

All API calls should be defined in `/util/apiCalls`. This allows for easier testing and for api calls to be re-usable throughout the app.

### Components are always defined using function **\_** (params){} instead of arrow/ anonymous functions

This is to avoid confusing what is a component and what is not.

### Avoid hardcoded colors that are re-used

Just add the definition to `/util/themeColors`.

### Do not use hardcoded URL's

Use a global definition, in case the endpoint gets changed. For example, this is done with all routes found in `/routes`. A resource generally has an object which has mappings to each resource.
