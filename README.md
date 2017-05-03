#FastRailsRedux

## A super slick react / rails framework

Based on some great, popular projects from around the nets, combined together
for awesomeness and speed.

* Rails Backend, React/Redux client.  

* Hosted completely independently on Heroku and GH static pages, respectively.

* react-toolbox for quickly leveraging redux friendly components styled with
Material Design

* Various features you "always" need are done! Including
 - Authentication system, email/pass using JWT tokens, ready to go, as well as
 Facebook(wip) and Google(wip)
 - Simple deploy scripts, done!
 - Admin portal


Client system is based primarily on
https://github.com/react-boilerplate/react-boilerplate
with hints of https://github.com/CodingZeal/react-boilerplate
More details below.

Server is just a simple Rails 5 server for now. Considering basing
 the rails system on https://github.com/thoughtbot/suspenders

## Requirements

### Client
* node `^4.5.0`
* yarn `^0.17.0` or npm `^3.0.0`

### Server
* Ruby 2+

## Getting Started

### Setting up locally
* Clone the repo
* In the 'server' directory, install the gems with `bundle`
  (hint: consider creating a gemset for housekeeping)
* In the 'client' directory, install the node modules with yarn install
* Run the rails server; cd to 'server' and run `env PORT=3001 rails server`
* Run the React client; cd to 'client' and run `yarn start`
* If you like foreman, do both at once with foreman start Procfile in the
  root dir.

### Setting up for 'prod' deploy
* Set up a heroku instance for the rails server (FREE!)
* In the './deploy-script.sh' file, change the name of heroku instance
  (the one you just created), and change to your static GitHub page
* Update the API_URL variable with the URL of your heroku instance
* Run a deploy
* Run `heroku run rake db:migrate`
* Browse to <your-GH-name>.github.io to see your awesome website!

## More about React client
### Updating global js variables
See the 'API_URL' example in the client/config/environments.config.js file.
WIP

## More about Rails server
WIP
