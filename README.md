# Platform Cookie Statement

Sample platform with GDPR Cookie Statement and Node.js cookie handlers 🍪

## Requirements

-   If [Google Tag Manager](https://marketingplatform.google.com/about/tag-manager/) is included, add the tracking code to `views/components/google_tag_head.ejs` and `views/components/google_tag_body.ejs`
-   If [HotJar](https://www.hotjar.com/) is included, add the tracking code to `views/components/hotjar_head.ejs`
-   If [Google reCAPTCHA V3](https://www.google.com/recaptcha/about/) is included, add the script to `views/components/recaptcha.ejs`

## Implementation

-   If Google Tag Manager is included, the `dataLayer` triggers specified in `src/js/modules/cookies.js` must be added to your GTM workspace and enabled to activate any attached services

## Running Locally

#### 1. Setup

-   Ensure everything is pulled down from the working branch
-   Ensure `.env` file is present in the working directory
-   Make sure you have at least Node 12.0. `node --version`

#### 2. Install Dependencies

-   Run `npm install` and ensure `node_modules` builds with no errors
-   Clean the `build` build folder by running `npm run clean`

#### 3. Set Up Database

-   Install mongo locally using http://docs.mongodb.org/master/tutorial/install-mongodb-on-os-x/
-   Run `mongo` to connect to your database, just to make sure it's working. Once you see a mongo prompt, exit with Control-D
-   Run `mongod --port 27017` to run the database
-   Run `npm run seed` to seed the database before development

#### 4. Run in Specified Environment

-   The site is built to automatically handle environmental vars and code-watching depending on the specified environment. The available environment start commands are:

    -   `npm run development`
    -   `npm run qa`
    -   `npm run staging`
    -   `npm run production`

-   The `development` environment is optimized for faster development by running a separate development server and removing bundle hashing

#### 5. Time to Develop! 🤓

-   By default the server will use a path of /\_api/v1 for the API routes. To change this, update the `.env` file before launching the server.
-   You now have a database named "wave" that contains your app data
-   The default running port for the server is 1337
-   The default running port for the app is 3000

## Best Practices

-   Place environmental vars, such as API keys, server info, and other resuable values into the specfic `.env` files, and reference the values in code with `process.env.{VALUE}`

## Deployment

Make sure to bump the version number of the codebase in `package.json` on each production deployment

The `qa`, `staging`, and `production` run commands, as well as the generic `build` and `start` commands for Heroku, run several build processes on release.

1. `.js` and `.css` assets are minified and a chunkhash added to each file name
2. Images, video, and other static assets are copied to the `build` folder
3. The `build` folder is uploaded to an Amazon S3 bucket distributed through a CloudFront CDN, which automatically GZIPs the assets
4. The new asset filenames are appended to the base CDN url and inserted into the EJS templates
5. The build is deployed! 😁

## Code Quality

This project is set up with an automatic system to `lint` and `format` files on **_every commit_**. The packages `husky` and `lint-staged` both tie into `git-hooks` and run arbitrary shell commands against a list of `staged files`.

It will fail if eslint encounters any errors. That can be very annoying, but there is a universe of IDE tools available to show you undefined variables or a missing closing bracket in real time -- making line number hunting a thing of the past.

See [documentation](https://www.npmjs.com/package/lint-staged) for lint-staged.
