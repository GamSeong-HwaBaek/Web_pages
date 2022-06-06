import dotenv from 'dotenv';
dotenv.config();

function required(key, defaultValue = undefined) {
  const value = process.env[key] || defaultValue;
  if (value == null) {
    throw new Error(`Key ${key} is undefined`);
  }
  return value;
}

export const config = {
  jwt: {
    secretKey: 'F2dN7x8HVzBWaQuEEDnhsvHXRWqAR63z',
    expiresInSec: 172800,
  },
  bcrypt: {
    saltRounds: 12,
  },
  host: {
    port: 8080,
  },
  db: {
    host: '127.0.0.1',
    user: 'root',
    database: 'Gamsung',
    password: 'haeun0987'
  }
};