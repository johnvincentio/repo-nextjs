---
meta-title: "TaskMuncher Overview | John Vincent"
meta-description: "John Vincent's discussion on TaskMuncher Overview"
meta-keywords: "TaskMuncher, Digital Ocean, AWS"

title: "TaskMuncher Overview"
subtitle: ""
lead: ""

category: [Taskmuncher, Digital Ocean, Aws]
permalink: /taskmuncher/overview/
---

<a href="https://www.taskmuncher.com" title="TaskMuncher">
	<img class="post-image" src="/images/taskmuncher/app/taskmuncher-app.png" alt="TaskMuncher" />
</a>

<!-- end -->

# TaskMuncher

[TaskMuncher](https://www.taskmuncher.com) is a Task Management Productivity application.

[TaskMuncher](https://www.taskmuncher.com) is the easiest way to get it done, whether you're making a shopping list, planning a holiday or managing multiple work projects.

Use [TaskMuncher](https://www.taskmuncher.com) to organize and keep track of everything so you can get it all done and enjoy more peace of mind.

<a href="https://www.taskmuncher.com">
<img style="width:100%;height:auto" src="/images/taskmuncher/app/taskmuncher-app.png" alt="TaskMuncher" />
</a>

## Live Deployment

[TaskMuncher at Digital Ocean](https://www.taskmuncher.com)

[TaskMuncher at AWS](https://www.johnvincentio.com)

Demo login

```
email: demo@taskmuncher.com
password: 123456
```

<a href="https://www.taskmuncher.com">
<img style="width:100%;height:auto" src="/images/taskmuncher/app/taskmuncher-calendar.png" alt="TaskMuncher" />
</a>

[![TaskMuncher](/images/taskmuncher/app/mobile/goals.png)](https://www.taskmuncher.com)

[![TaskMuncher](/images/taskmuncher/app/mobile/edit-task.png)](https://www.taskmuncher.com)

[![TaskMuncher](/images/taskmuncher/app/mobile/starred.png)](https://www.taskmuncher.com)


## Technical

* [TaskMuncher](https://www.taskmuncher.com) is a [Progressive Web App (PWA)](/blog/#Pwa)

* [TaskMuncher](https://www.taskmuncher.com) is built using the MERN stack. The front-end is built using [React](/blog/#React), [Material-UI](/blog/#Material-UI), [Redux](/blog/#Redux), [HTML5](/blog/#Html), [Sass](/blog/#Sass) and [CSS3](/blog/#Css), the server-side using [Node](/blog/#Node) with [Express](/blog/#Express) as the web server and [Mongo](/blog/#Mongo) as the database.

* [TaskMuncher](https://www.taskmuncher.com) is fully responsive, adapting for mobile, table and desktop viewports.

* All routing is handled in the front-end by [React](/blog/#React)

* Extensive form validation and error handling is demonstrated throughout the app. On the front-end, field type, value, length etc is validated using [HTML5](/blog/#Html), [React](/blog/#React) and [Redux](/blog/#Redux). On the server-side, [JOI](/blog/#Joi) performs detailed validation and a [Mongoose](/blog/#Mongoose) schema provides further error checking for field values and uniqueness.

* A fully-featured user registration system is integral to the application, with user registration and username / password recovery functionality provided.

* Extensive use of [HTML5](/blog/#Html) DnD and [React](/blog/#React) DnD.

* [TaskMuncher](https://www.taskmuncher.com) supports [Google Authentication](/taskmuncher/deploy/google-authentication/)

* Server-side email functionality is provided by a [Nodemailer OAuth 2.0 implementation](/blog/#Nodemailer), using [Google Gmail](/node/express-emails-gmail/)

* An extensive API has been built to provide database access to the [TaskMuncher App](https://www.taskmuncher.com) using [Express](/blog/#Express), with 27 separate endpoints constructed.

* [TaskMuncher](https://www.taskmuncher.com) is fully unit tested on the front and server-side. For [React](/blog/#React) testing, Jest has been used. For the server-side, [Mocha](/blog/#Mocha) and [Chai](/blog/#Chai), with extensive use of the [Faker](/blog/#Faker) library to mock-out dependencies.

* User authentication uses [Json Web Tokens JWT](/blog/#Json_Web_Tokens)

* All client and server communications are performed using https.

* [TaskMuncher](https://www.taskmuncher.com) fully implements [Google Analytics](/taskmuncher/deploy/google-analytics/)

* [TaskMuncher](https://www.taskmuncher.com) fully supports [Google Webmaster Tools](/taskmuncher/deploy/google-webmaster-tools/)

* [TaskMuncher](https://www.taskmuncher.com) is deployed to an [Ubuntu 16.04 droplet at Digital Ocean](/taskmuncher/overview/#deploy) and kept running using [Pm2](/blog/#Pm2)

* [TaskMuncher at AWS](https://www.johnvincentio.com) is also deployed to an [Ubuntu 16.04 droplet at AWS](/taskmuncher/aws/taskmuncher) for test purposes.

* [TaskMuncher](https://www.taskmuncher.com) resources are served from [Nginx Server](/blog/#Nginx) with a [reverse proxy](/taskmuncher/deploy/configure-https-nginx/) to pass certain requests to a [Node](/blog/#Node) [Express](/blog/#Express) Server.

* The [Ubuntu 16.04 droplet at Digital Ocean](/taskmuncher/overview/#deploy) can only be accessed with [SSH from a particular client](/taskmuncher/deploy/create-ubuntu-droplet/). All other access is disabled.

<a href="https://www.taskmuncher.com">
<img style="width:100%;height:auto" src="/images/taskmuncher/app/taskmuncher-edit-task.png" alt="TaskMuncher" />
</a>


<a name="deploy"></a>

## Deploy TaskMuncher 

[TaskMuncher](https://www.taskmuncher.com) is deployed to a Digital Ocean Droplet.

[TaskMuncher](https://www.johnvincentio.com) is also deployed to an AWS EC2 instance.

The following describe a series of tasks. They should be performed in the order shown.

1. [Create Ubuntu Droplet at Digital Ocean](/taskmuncher/deploy/create-ubuntu-droplet/)
2. [Digital Ocean - Install Mongo](/taskmuncher/deploy/install-ubuntu-mongo/)
3. [Digital Ocean - Install Nginx](/taskmuncher/deploy/install-ubuntu-nginx/)
4. [Configuring Domains at Google Domains](/taskmuncher/deploy/configuring-domains/)
5. [Configure non-SSL Nginx at Digital Ocean](/taskmuncher/deploy/configure-http-nginx/)
6. [SSL Certificates - Let’s Encrypt & Nginx](/taskmuncher/deploy/ssl-nginx/)
7. [Configure SSL Nginx at Digital Ocean](/taskmuncher/deploy/configure-https-nginx/)
8. [Backup TaskMuncher from Digital Ocean](/taskmuncher/deploy/backup/)
9. [Deploy TaskMuncher React App to Digital Ocean](/taskmuncher/deploy/taskmuncher/)
10. [Create Sitemap](/taskmuncher/deploy/create-sitemap/)
11. [Google Webmaster Tools](/taskmuncher/deploy/google-webmaster-tools/)
12. [TaskMuncher Images and Favicons](/taskmuncher/deploy/taskmuncher-images-favicons/)
13. [Facebook Application Id](/taskmuncher/deploy/facebook-applicationid/)
14. [Configuring Meta Tags](/taskmuncher/deploy/configuring-meta-tags/)
15. [Adding Google Analytics](/taskmuncher/deploy/google-analytics/)
16. [Google Gmail Configuration](/taskmuncher/deploy/configure-google-gmail/)
17. [Google Authentication](/taskmuncher/deploy/google-authentication/)


## Maintenance

The following describe tasks required for the maintenance of [TaskMuncher](https://www.taskmuncher.com) at Digital Ocean.

[Update SSL Certificates to Ubuntu at Digital Ocean](/taskmuncher/deploy/update-ssl-certificates/)

[Maintaining Droplets at Digital Ocean](/taskmuncher/deploy/maintaining-droplet/)

[Website Review](/website/website-review/)

## Production Problems

[TaskMuncher React Production Issues](/taskmuncher/deploy/taskmuncher-react-production/)

## Website Validation

The following describe tasks required for the validation of [TaskMuncher](https://www.taskmuncher.com) at Digital Ocean.

[Website Validation Reference](/website/website-validation/)

[TaskMuncher Website Validation](/taskmuncher/deploy/website-validation/)

## TaskMuncher Version Updates

[Update TaskMuncher V2 to Webpack v4, Babel v7, Material-UI v3](/taskmuncher/update-taskmuncher-v2/)

[Update TaskMuncher V3 to use BrowserRouter rather than HashRouter](/taskmuncher/update-taskmuncher-v3/)

[Update TaskMuncher V4 to Progressive Web App](/taskmuncher/update-taskmuncher-v4/)

## TaskMuncher Updates

[Optimizing TaskMuncher](/taskmuncher/optimize-taskmuncher/)

[TaskMuncher Performance](/taskmuncher/taskmuncher-performance/)

[Using Webpack Bundle Analysis](/react/webpack-bundle-analyzer/)

[Add TaskMuncher to Material-UI Showcase](/material-ui/material-ui-showcase/)

[TaskMuncher Lighthouse Fixes](/taskmuncher/taskmuncher-lighthouse-findings-1/)

## Deploy TaskMuncher to AWS

[Deploy TaskMuncher to AWS](/taskmuncher/aws/taskmuncher/)

<a name="technologies"></a>

## Technologies

### Client

* [React](/blog/#React)
* [React DnD](/blog/#React)
* [React Router](/blog/#React)
* [Material-UI](/blog/#Material-UI)
* [Progressive Web App](/blog/#Pwa)
* [Redux](/blog/#Redux)
* [Redux Devtools](/blog/#Redux)
* [Styled Components](/blog/#Styled_Components)
* [HTML5](/blog/#Html)
* [CSS3](/blog/#Css)
* [Sass](/blog/#Sass)
* [Webpack](/blog/#Webpack)
* [Jest](/blog/#Jest)
* [Enzyme](/blog/#Enzyme)
* [Eslint](/blog/#Eslint)
* [Prettier](/blog/#Prettier)
* [Balsamiq](/blog/#Balsamiq)

### Server

* [Node](/blog/#Node)
* [Express](/blog/#Express)
* [Mongo](/blog/#Mongo)
* [Mongoose](/blog/#Mongoose)
* [JWT](/blog/#Jwt)
* [JOI](/blog/#Joi)
* [Mocha](/blog/#Mocha)
* [Chai](/blog/#Chai)
* [Winston](/blog/#Winston)
* [Morgan](/blog/#Morgan)
* [Mailgun](/blog/#Mailgun)
* [Gmail OAuth 2](/blog/#Gmail)
* [Google Authentication](/blog/#Google)
* [JS Doc](/blog/#JSDoc)
* [Eslint](/blog/#Eslint)
* [Prettier](/blog/#Prettier)

### Production Deployment

* [Digital Ocean](/blog/#Digital_Ocean)
* [Ubuntu](/blog/#Ubuntu)
* [Nginx](/blog/#Nginx)
* [SSL certificates](/blog/#Ssl)
* [Node](/blog/#Node)
* [Npm](/blog/#Npm)
* [Mongo](/blog/#Mongo)
* [PM2](/blog/#Pm2)
* [AWS](/blog/#Aws)

### Testing Deployment

For a simple application deployed from a single Github repository:

* [Heroku](/blog/#Heroku)
* [TravisCI](/blog/#Travis)
* [Mongo](/blog/#Mongo)

[TaskMuncher](https://www.taskmuncher.com) has multiple Github repositories and thus is not suitable for Heroku. The testing deployment is another droplet at [Digital Ocean](/blog/#Digital_Ocean), in effect a duplicate of the actual production environment.


<a name="wireframes"></a>

### Wireframes

Wireframes built using [Balsamiq](https://www.balsamiq.com) may be [downloaded here](/wireframes/taskmuncher/taskmuncher.bmpr)


## TaskMuncher Project

### Purpose of App

Task management tool. Allow user to easily organize and manage tasks by goals and projects. Provide a calendar to easily manage tasks and events.

### Proposed Name

TaskMuncher

### User Stories

As a user, I should be able to:

* sign up
* remove my account
* log in
* change my password
* reset my password
* add, edit, delete, clone a goal
* add, edit, delete, clone a project
* add, edit, delete, clone a task
* search and be presented with a list of goals, projects and tasks containing the search expression
* move goals
* move projects within a goal or to another goal
* move tasks within a project or to another project
* change status of a goal or a project
* allow starred tasks
* list starred tasks
* list all tasks
* list scheduled tasks
* list late tasks
* differentiate between scheduled task and an event
* edit task status
* list tasks by status, including none, started, completed, planning and waiting
* edit task priority
* list tasks by priority, including none, top, high, medium and low
* edit task tags
* list tasks by tags
* add, edit, delete task start date/time
* add, edit, delete task due date/time
* repeat tasks with an interval
* show tasks on a calendar
* add, edit, delete tasks in a calendar
* authenticate with Google 
* authenticate with Facebook
* request help
* show added tasks for various time frames
* show updated tasks for various time frames
* show completed tasks for various time frames
* administration section allowing an administrator full access to all data

### Descope

A list of user stories to be supported in the MVP:

As a user, I should be able to:

* add, edit, delete a task
* list tasks
* add a goal
* add a project

Other requirements:

* Fast (page speed score)
* Responsive
* SEO friendly

### User Screens

List of the distinct screens or pages that your end user will interact with.

Screen for:

* add, edit, delete a task
* list tasks
* add a goal
* add a project

### User Journey for Each Screen

For each screen, specify the way(s) the user journeys through the page. Use **User Flows**

A user flow describes:

* what the user sees
* what they do
* what they see next after doing that thing

#### User Journey - Screen for add, edit, delete a task

User has a list of articles.
User selects an article
User is presented with the article.

User Journey - Screen for selecting a news channel
User requests a list of news channel.
User requests a news channel.
User sees latest news from that channel

User Journey - Screen for adding a news channel
User requests a list of news channels.
User adds news channel.
If error, show error.
Else, add news channel.
Add news channel to list of news channels.

User Journey - Screen for adding news channel to my channels
User requests a list of news channels.
User requests channel be added to my channels.
List of My Channels is updated.
List of My Channels is shown.


### Project Requirements

Server must

* use Node/Express
* use a db
* have RESTful API and/or `Socket.io` layer
* serve static assets
* have comprehensive testing
* have high code quality. Among other things that means
	* choosing good variable names
	* writing functions that have a single responsibility
	* consistently following a style guide
* well architected

Client must have

* polished UI
* responsive
* follows accessibility best practices, for instance, all inputs wrapped in forms, all inputs have labels
* bundled and optimized for delivery
* comprehensive testing
* high code quality
* well architected
* cross browser tested, with support for current version of popular browsers


### Implement MVP

* CI and Deployment. Set up continuous integration with Heroku and Travis CI right away, and have tests automatically run each time you push to GitHub
* Git and GitHub. Develop each user story with a feature branch and when ready to deploy to your production environment, do a pull request from your feature branch into master, triggering an automatic deploy from Travis CI.
* Start with mock data. Define API resources and the schema for the data they return as code up the front end.
* Both server and client side unit testing. As complete a feature or support a user story, write tests. Strive for comprehensive test coverage for both server- and client-side code. At a minimum, that means testing routes, components, actions, and reducers.

### Gather User Feedback and Iterate

Now that MVP is live, it's time to get user feedback. The sorts of things you're going to want to find out about are:

* Do my users think the app is interesting or valuable?
* Did my users use the app as I intended?
* Did my users encounter any bugs or broken features?
* Did my users understand how to use the app?
* Get feedback from real life people who are not you and your mentor. 

Then, based on what you learn, do a round of iteration on your MVP to address any issues that came up.

Note findings from user feedback. Note what, if anything, I did about it.

#### Feedback

* New user should be stepped through the process. Add a goal and a project, then add a task.

* under status, categories which are empty shouldn't be shown at all
* Would be cool that instead of clicking the 3 dots and then editing something, that default action by clicking on something is edit. This would be better user experience. Now you can't really click on anything and feels strange.
* I think that it would be better if the list view is the default one and the grid one secondary
* When I want to expand a project, I have to click on the arrow pointing down. It would be just better that this happens on clicking on the project itself.
* List view is confusing when browsing projects etc. It doesn't imply which list I'm viewing (from which project, it seams that all of them aggregated in the same list)
* Would be nice to create a task by using the calendar, by clicking on some specific date

Also on your landing page, you should probably have 3 or 4 items per row
(those things with icons and description)
aside those comments and generally some UX stuff.

Amazing job, this is a very valuable project for your CV. Also feel super fast and fluid.
