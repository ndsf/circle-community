# Awesome Douban Social App - MERNG Stack

MERNG stands for MongoDB, Express, React, Node.js & GraphQL. This is a simple social app which user may comment or like on other users post.
[Demo Site](https://mysterious-thicket-27635.herokuapp.com/)

#### Disclaimer:

Full source codes(server/client) from a youtube tutorial, which you may visit his youtube channel at

[Server](https://www.youtube.com/watch?v=YBydg_Ui02Q&list=PLMhAeHCz8S3_CTiWMQhL6YxX7vZ7z84Zo) |
[Client](https://www.youtube.com/watch?v=_DqPiZPKkgY&list=PLMhAeHCz8S3_pgb-j51QnCEhXNj5oyl8n)

If you found his tutorial useful, please consider to support him by becoming patreon at
<https://www.patreon.com/classsed>

I have made some modifications in order to deploy to heroku

- Turn config.js into using dotenv file
- Use apollo-server-express instead of apollo-server to serve static files from client
- Change the graphql path from / to /graphql
- Modify some variable and file names which don't affect any functionalities

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Make sure you have all the requirements installed

```
- A MLab, Mongo Atlas or local Mongo instance is required
- Node.js installed
```

### Installing

Clone this git repo

```
# Open a terminal
git clone git@github.com:oldwolf/merng.git
yarn install

cd client
yarn install

# Note: graphql playground path is changed to http://localhost:5000/graphql

```

Create a new '.env' file under your root folder, paste the following code into it and change the MONGO_URI to whatever your mongo instance will be, and SECRET_KEY to whatever the key you want

```
MONGO_URI='mongodb://db_username:db_password@db_url:db_port/db_name'
SECRET_KEY='TopSecretDontLetOtherPeopleKnow'
PORT=5000
```

### Up and Running

```
# Open a terminal, at the root folder
yarn start:dev

# Open another terminal
cd client
yarn start
```

### Deploy to heroku

You must have heroku toolbelt installed before continue

```
# Open a terminal, at the root folder
heroku login
heroku create

git add .
git commit -am "Whatever message"
git push heroku master

heroku config:set MONGO_URI=mongodb://db_username:db_password@db_url:db_port/db_name
heroku config:set SECRET_KEY=TopSecretDontLetOtherPeopleKnow

heroku open
```
