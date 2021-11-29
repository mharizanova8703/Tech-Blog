const routes = require('./controllers');
const sequelize = require('./config/connection');
const express = require('express');


const app = express();
const PORT = process.env.PORT || 3001;
