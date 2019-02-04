// In this chapter, we shall study 1) github and SSH keys, 2) Heroku. I have removed the comments created
// in Chapter 41, Chapter 42, Chapter 43, Chapter 44, Chapter 45, and Chapter 46 for readability. Note,
// I have combined Chapter 47, 48 and 49 in this one file.

// 1. Load modules.
// Load express.
const express = require('express');
// Load handlebars.
const hbs = require('hbs');
// Load file module.
const fs = require('fs');

// Set variables
// Set environment variable.
const port = process.env.PORT || 3000;

// 2. Start express.
// Create app, since app denotes the express application.
var app = express();

// 3. Start the viewing engine.
// Tell express that we want to use hbs as the view engine.
app.set('view engine', 'hbs');

// 4. Define the partial method and the helper method that handlebar viewing engine allows.
// Add the registerPartial method, which allows us to create files used within templates.
hbs.registerPartials(__dirname + '/views/partials');
// Add the registerHelper function so we can add Javascript code within templates. This callback without arguments.
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
// Add the registerHelper function so we can add Javascript code within templates. This callback with arguments.
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

// 5. Use middleware.
// Middleware to record timestamp, method used in request, and url requested.
app.use((req, resp, next) => {
    var now = new Date().toString(); // Makes the date easy to read with toString()
    console.log(`${now}, ${req.method}, ${req.url}, ${req.path}`);
    var log = `${now}, ${req.method}, ${req.url}, ${req.path}`;
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append data to server.log')
        }
    });
    next();
});
// Middleware to enable maintenance. This ought to be commented out, if we are not in maintenance.
app.use((req, resp, next) => {
    resp.render('maintenance.hbs', {
        maintMsg: 'Server is down for maintenance',
        maintReturn: 'We will be back at 2 AM PST'
    });
});
// Serve up static web page, using bulit-in middleware.
app.use(express.static(__dirname + '/public'));

// 6. Define routes.
// Home page route, using a template.
app.get('/', (req, resp) => {
    resp.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMsg: 'Welcome to my Website',
        currentYear: new Date().getFullYear() // This should be removed. I have left in there to show how it is done if we did not use a helper.
    })
});
// Another route that sends JSON.
app.get('/name', (req, resp)  => {
    resp.send({
        firstName: 'Biki',
        lastName: 'Malik',
        likes: {
            cutlets: 'mutton',
            croissants: 'chicken'
        }
    })
});
// Another route that sends text.
app.get('/bad', (req, resp) => {
    resp.send({
        errorMessage: 'The server was unable to server up a page'
    })
});
// About route using a template.
app.get('/about', (req, resp) => {
    resp.render('about.hbs', {
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear() // This should be removed. I have left in there to show how it is done if we did not use a helper.
    });
});

// 7. Start server.
// Start server on port 3000. 
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
