# ToonLibraryApi

## Info
GraphQL API serving a small subset of [Newcastle libraries open data](https://github.com/ToonLibraries/library-open-data).

Built with MongoDB, Nx, Nest.js, TypeScript.

[Have a play](https://toon-library-api-zano3hgo5q-lz.a.run.app/graphql) 🚀

Please note that this project is in very early stages of development.

## Running locally

## Prerequisites
- Create a MongoDB instance and create a collection called toon-library (or something else if you prefer)

## Seeding the data
- `npm i` in the project root
- Set the env variables to connect to your MongoDB instance
- `npx nx serve toon-library-data-ingestor`

## Start the application
- `npm i` in the project root
- Set the env variables to connect to your MongoDB instance
- Run `npx nx serve toon-library-api` to start the development server
