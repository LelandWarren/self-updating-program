const axios = require('axios');
const inquirer = require('inquirer');
require('dotenv').config();  // Load environment variables from .env file

// Get BASE_URL and OS from environment variables or use defaults
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000/version';
const OS = process.env.OS || 'windows';

async function checkForUpdates() {
  try {
    const response = await axios.get(`${BASE_URL}/latest?os=${OS}`);
    const version = response.data;

    console.log('Latest Version:', version.version);
    console.log('Release Notes:', version.release_notes);
    console.log('Files:');
    version.files.forEach((file) => {
      console.log(`- ${file.os}: ${file.download_url}`);
    });

  } catch (error) {
    console.error('Failed to check for updates:', error.message);
  }
}

checkForUpdates();
