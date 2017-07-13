#R3-GO!

## A full-featured react / rails framework

Based on some popular projects from around the nets, combined together for awesomeness and speed.

* Rails Backend, React/Redux/Saga client.  

* Hosted completely independently on Heroku and Netlify, respectively.

* React-toolbox for quickly leveraging redux friendly components styled with Material Design

* Various features you "always" need are done! Including
 - Authentication system, email/pass using JWT tokens, ready to go, as well as Facebook and Google(wip)
 - Simple deploy scripts, done!
 - Rails admin portal


Client system is based primarily on
https://github.com/react-boilerplate/react-boilerplate

Server is just a simple Rails 5 server for now. Considering basing
 the rails system on https://github.com/thoughtbot/suspenders but for now it seems like overkill

## Requirements

### Client
* node `^4.5.0`
* yarn `^0.17.0` or npm `^3.0.0`

### Server
* Ruby 2+

## Getting Started

### Setting up locally
* Fork or clone the repo
* In the 'server' directory, install the gems with `bundle`
  (hint: consider creating a gemset for housekeeping)
* The repo is currently configured to work with postgres, but feel free to change that. You will need to initialize a database. go into the database.yml file and set the name of your database. Run `rake db:create` then `rake db:migrate` then `rake db:seed`
* Create a figaro config file for your environment variables with `bundle exec figaro install`. This will generate for you an application.yml file which will feed environment variables to your application. Do not check this file into github. For the content of this file, see the sample_application.yml file and replace the values in application.yml as needed.
* In the 'client' directory, install the node modules with yarn install
* Run the rails server; cd to 'server' and run `env PORT=3001 rails server`
* In another terminal window, run the React client; cd to 'client' and run `yarn start`
* If you like foreman, do both at once with foreman start Procfile in the
  root dir.

#### Facebook auth
You'll need to create a facebook application, and test application, for your site. Make sure to add http://localhost:3000 to the Website -> Site URL field in order to get the callbacks working correctly on your development server. Use the 'test app' key/secret in your application.yml default section, and the production key/secret under production.

You will also need to put the Facebook key in webpack.dev.babel.js and webpack.prod.babel.js

### Setting up for 'prod' deploy
#### Deploying the Rails server
* Set up a free heroku instance for the rails server on heroku.com.
* Connect your server app to heroku with `heroku git:remote -a <yourAppNameInHeroku>`
* Push env variables to heroku: cd into 'server' and run `figaro heroku:set -e production`
* Back to the root dir, run `deploy-server.sh` ** https://stackoverflow.com/questions/28417845/pushing-a-large-github-repo-fails-with-unable-to-push-to-unqualified-destinatio if you get an error pushing to heroku.
* Run `heroku run rake db:migrate`
* Run `heroku run rake db:seed`
* Add an admin user by connecting to the Heroku rails console at herokupp.<yourapp>.com/admin
#### Deploying the JS client
* Update the API_URL variable in 'webpack.prod.babel.js' with the URL of your heroku instance
* Configure a free netlify instance for your JS client, configuring it to auto-deploy on push to a branch called 'r3-go/production'
* Run the deploy-client.sh script
* Browse to your netlify page to see your awesome website and test your login flow!

## More about React client

### Updating global js variables
See the 'API_URL' example in the webpack.<env>.babel.js files.
WIP

## More about Rails server
WIP
### Figaro config settings
WIP
