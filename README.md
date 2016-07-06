# FocusDays 2016 - API portal

## Start

```sh
npm install

npm run bundle

# don't forget the env variables
npm start

open http://localhost:8080
```

### Mandatory env variables

Some variables are absolutely necessary in order
for this app to work. You have to provide the following
variables when you `npm start` this whole thing:

Variable | Default | Description
--- | --- | ---
SESSION_SECRET | *none* | A long secret key that will encrypt all sessions.
PASSAXA_DOMAIN | *none* | Domain of the PassAXA OAuth2 provider.
PASSAXA_CLIENT_ID | *none* | Client ID of the PassAXA OAuth2 provider.
PASSAXA_CLIENT_SECRET  | *none* | Client secret of the PassAXA OAuth2 provider.
PASSAXA_CALLBACK_URL  | '/passaxa/callback' | The callback URL that is called by the OAuth workflow.

### Optional env variables

Variable | Default | Description
--- | --- | ---
DEBUG | *none* | Set to `fd16-api` in order to see fancy debug messages or simply understand the app better.

## Development

You want to improve the app! Awesome! 🎉

This is how you run the development mode. It
restarts and rebuilds the app on every file change.
There's no live reloading of the browser yet,
so make sure you do that manually.

```sh
# don't forget the env variables
npm run watch

open http://localhost:8080
```

Don't forget the set all the mandatory env variables from the table above.

### Structure

All the client side js, css and assets are placed
in the `/src` folder. The apps entry point
is the `server.js` file, with more code located
in the `/lib` folder.

Just raise an issue if you don't understand something,
we'll fix it!

## Use with Docker

There's a Docker image that you can use to start this project.
It's `tutum.co/davidknezic/fd16-api`.

### Running the image

In order to run the image, use the following command.

```sh
docker run \
  -p 8080 \
  -e SESSION_SECRET=... \
  -e PASSAXA_DOMAIN=... \
  -e PASSAXA_CLIENT_ID=... \
  -e PASSAXA_CLIENT_SECRET=... \
  -e PASSAXA_CALLBACK_URL=... \
  tutum.co/davidknezic/fd16-api
```

### Building the image

If you need to build a new Docker image from the source code,
simply run the following.

```
docker build -t tutum.co/davidknezic/fd16-api .
```
