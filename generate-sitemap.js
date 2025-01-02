import * as fs from 'node:fs';

const fs = require('fs');
const path = require('path');
const { Sitemap } = require('react-router-sitemap'); // Import the Sitemap generator


const router = require('./src/Routers/CustomerRouter'); 

// Generate sitemap and save it to the public folder
new Sitemap(router)
  .build('https://trendinsta.vercel.app')  
  .save(path.resolve(__dirname, 'public/sitemap.xml'));  // Saves the sitemap in the public folder
