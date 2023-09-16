# Superheroes Library

This is the back-end part of the project responsible for handling requests and uploading images to AWS S3.

## Dependencies

Make sure you have the following dependencies installed on your server:

- Node.js
- npm (or Yarn)
- MongoDB
- AWS S3 account and access configurations (access keys)

## Build Instructions

To build the project, run the following command:

```bash
yarn
```

## Running Instructions
For local development mode, use the following command:

```bash
yarn dev
```

For running the server in production mode, use:

```bash
yarn start
```
_Make sure you have environment variables set up for connecting to your database and AWS S3._

## AWS S3 Configuration
Your server uses AWS S3 for image uploads. You need to have an AWS S3 account set up with the appropriate access keys. Add these keys to the .env file in the project's root folder:

```dotenv
S3_ACCESS_KEY_ID=Your_Access_Key
S3_SECRET_ACCESS_KEY=Your_Secret_Access_Key
```
## MongoDB Configuration
To connect to your MongoDB database, specify the connection string in the .env file:

```dotenv
MONGODB_URI=Your_MongoDB_Connection_String
```

## Known Issues or Limitations

Currently, there are no known issues or limitations.
