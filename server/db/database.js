import mysql from 'mysql2';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'Gamsung',
  password: 'haeun0987',
});

export const db = pool.promise();