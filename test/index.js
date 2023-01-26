import MindsDB from '../lib/main.js';

/*
 * @email  MindsDB user
 * @password  MindsDB password
 */
const connectData = {
  email: '',
  password: '',
};

const test = async () => {
  const connect = await MindsDB.connect(connectData);
  const getFiles = await MindsDB.getFiles();
  const setQuery = await MindsDB.setQuery(
    'SELECT * FROM example_db.demo_data.home_rentals LIMIT 10;'
  );

  console.log('//---- Get Account Status ----//');
  console.log(connect);

  console.log('//---- Get Files ----//');
  console.log(getFiles);

  console.log('//---- Set Files ----//');
  console.log(setQuery);
};

test();
