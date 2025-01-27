import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Sequelize with connection details
const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: 'postgres', // Using PostgreSQL
  dialectOptions: {
    ssl: {
      require: true,             // Enforce SSL
      rejectUnauthorized: false, // Allow self-signed certificates
    },
  },
  logging: false, // Disable query logging
});

// Test database connection
(async () => {
  try {
    console.log('Attempting to connect to the database...');
    await sequelize.authenticate(); // Ensure this is inside an async context
  } catch (err) {
    console.error('❌ Error connecting to the database:', err.message);
  }
})();

export default sequelize;




// import { Sequelize } from 'sequelize';
// import dotenv from 'dotenv';

// dotenv.config();

// const sequelize = new Sequelize(process.env.DB_URL, {
//     dialect: 'mysql',
//     logging: false, // Disable SQL query logging
//   });

// // const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
// //   host: process.env.DB_HOST,
// //   dialect: 'mysql',
// //   logging: false,
// // });
// console.log('look: ', process.env.DB_URL);

// try {
//   await sequelize.authenticate();
//   console.log('Database connected successfully');
// } catch (err) {
//   console.error('Error connecting to the database:', err.message);
// }

// export default sequelize;
