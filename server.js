const express = require("express");
const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');
const session = require('express-session');
const helpers = require('./utils/helpers');

//replace this when/if we find a different templating engine
const exphbs = require('express-handlebars');
const hbs = exphbs.create({ helpers });

//install pug templating engine
const pug = require('pug');
// const compiledFunction = pug.compileFile('home-page.pug');
//initialize pug usage somehow based on online documentation 'https://pugjs.org/api/getting-started.html'
//make sure to include the helpers utility

const app = express();
const PORT = process.env.PORT || 3001;

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    secret: 'Ultra secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sess));
app.use(routes);

//replace this when/if we find a different templating engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});