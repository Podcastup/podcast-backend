import path from "path";

const dotEnv = require("dotenv");
dotEnv.config();

import sequelize, { Sequelize } from "sequelize";
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
// import { databaseConfig as conf } from "../../config";

// ============================================================
// Connect to Template1 Database
// ============================================================


class PostgresInit {
  db;

  constructor(){
    let sequelizeInitURL = `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}/template1`;
    this.db = new Sequelize(sequelizeInitURL);
  }

  async init(){
    let exists = await this.databaseExists();
    if(!exists){
      await this.createDatabase();
    }
    await this.grantAccess();
  }

  async grantAccess(){
    return new Promise((resolve, reject) => {
      const createUserQuery = `grant all privileges on database ${process.env.POSTGRES_DATABASE} to ${process.env.POSTGRES_USER};`
      this.db.query(createUserQuery)
          .then(() => {
            console.log(`PostgresInit: Priviledges granted on database [${process.env.POSTGRES_DATABASE}] for user [${process.env.POSTGRES_USER}].`)
            resolve();
          })
          .catch(err => {
            console.log("PostgresInit: grantAccess Error: Can't grant access to database: ", err);
            reject(err);
          })
    })
  }

  async createDatabase(){
    return new Promise((resolve, reject) => {
      const createQuery = `CREATE DATABASE ${process.env.POSTGRES_DATABASE} WITH OWNER = ${process.env.POSTGRES_USER} ENCODING = 'UTF8';`
      this.db.query(createQuery)
          .then(() => {
            console.log(`PostgresInit: Database [${process.env.POSTGRES_DATABASE}] created`)
            resolve();
          })
          .catch(err => {
            console.log("PostgresInit: createDatabase Error: Can't create database: ", err)
            reject(err);
          })
    });
  }

  async databaseExists(){
    return new Promise((resolve, reject) => {
      const createQuery = `SELECT datname FROM pg_catalog.pg_database WHERE lower(datname) = lower('${process.env.POSTGRES_DATABASE}');`;
      this.db.query(createQuery)
          .then((result) => {
            let results = result[0];
            if(results.length && results[0] && results[0].datname == process.env.POSTGRES_DATABASE){
              resolve(true)
            } else {
              resolve(false);
            }
          })
          .catch(err => {
            console.log("PostgresInit: Error: Can't create database: ", err);
            reject(err);
          });
    });
  }
}

let pg = new PostgresInit();
pg.init();


// ============================================================
// Connect to Project Database
// ============================================================

const db = {
  sequelize: {} as Sequelize,
  // tslint:disable-next-line:object-literal-sort-keys
  Sequelize: {} as Sequelize,
};

db.sequelize = new Sequelize(process.env.DATABASE_URL);

export  { db };