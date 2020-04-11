
const dotEnv = require("dotenv");
dotEnv.config();

module.exports = {
    development: {
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DATABASE,
        host: process.env.POSTGRES_HOST,
        url: process.env.DATABASE_URL,
        use_env_variable: "DATABASE_URL",
        logging: false,
    },
    test: {
        url: process.env.DATABASE_URL,
        use_env_variable: "DATABASE_URL",
    },
    production: {
        url: process.env.DATABASE_URL,
        use_env_variable: "DATABASE_URL",
        logging: false,
    },
};