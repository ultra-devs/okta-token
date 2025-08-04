require('dotenv').config();
const axios = require('axios');
const qs = require('qs');

const {
  OKTA_DOMAIN,
  OKTA_CLIENT_ID,
  OKTA_CLIENT_SECRET,
  OKTA_SCOPE,
  OKTA_TOKEN_URL,
} = process.env;

async function getToken() {
  try {
    const tokenEndpoint = `${OKTA_DOMAIN}${OKTA_TOKEN_URL}`;

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + Buffer.from(`${OKTA_CLIENT_ID}:${OKTA_CLIENT_SECRET}`).toString('base64'),
    };

    const data = qs.stringify({
      grant_type: 'client_credentials',
      scope: OKTA_SCOPE,
    });

    const response = await axios.post(tokenEndpoint, data, { headers });

    console.log('Access Token:', response.data.access_token);
  } catch (err) {
    console.error('Failed to fetch token:', err.response?.data || err.message);
  }
}

getToken();
