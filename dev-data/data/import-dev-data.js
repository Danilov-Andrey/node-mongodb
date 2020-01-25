const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../../models/tourModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log('Cool');
  });

const tours = fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8');

const importData = async () => {
  try {
    await Tour.create(JSON.parse(tours));
    console.log('Все норм импортнулось');
  } catch (err) {
    console.log(err);
  } finally {
    process.exit();
  }
};

const deleteData = async () => {
  try {
    await Tour.deleteMany({});
    console.log('Все норм делетнулось');
  } catch (err) {
    console.log(err);
  } finally {
    process.exit();
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

console.log(process.argv);
