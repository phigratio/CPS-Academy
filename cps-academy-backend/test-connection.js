const { Client } = require('pg');

const client = new Client({
  host: 'dpg-ct7k5el2ng1s73b4volg-a.singapore-postgres.render.com',
  port: 5432,
  user: 'cpsacademybackend',
  password: 'ZPKPZt0zBY3Xd9dL4XrT55YvEBygLd57',
  database: 'cpsacademybackend',
  ssl: { rejectUnauthorized: false },
});

client.connect()
  .then(() => console.log('Connected successfully'))
  .catch(err => console.error('Connection error', err.stack))
  .finally(() => client.end());
