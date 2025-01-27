import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

async function testDatabaseConnection() {
  const dbUrl = process.env.DB_URL;

  if (!dbUrl) {
    console.error('Error: DB_URL is not set in the .env file');
    process.exit(1);
  }

  const sequelize = new Sequelize(dbUrl, {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,      
        rejectUnauthorized: false, 
      },
    },
    logging: false, 
  });

  try {
    console.log('Attempting to connect to the database...');
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully!');
  } catch (error) {
    console.error('❌ Error connecting to the database:', error.message);
  } finally {
    await sequelize.close();
    console.log('🔌 Database connection closed.');
  }
}

testDatabaseConnection();
