
# :warning: Depricated repo, please use https://github.com/mindsdb/mindsdb-js-sdk :warning:

# <a href='https://www.mindsdb.com/'><img src='https://assets.website-files.com/5c7e77a16fbaf30ffda0de72/5cc69a9fd9da3369c3848e5b_logo.png' height='40' alt='MindsDB' aria-label='mindsdb.com/' /></a>

[![npm version](https://img.shields.io/badge/npm-v6.13.7-orange)](https://www.npmjs.com/package/mindsdb-js-sdk)
[![axios](https://img.shields.io/badge/axios-v0.18.1-orange)](https://www.npmjs.com/package/mindsdb-js-sdk)
[![install size](https://img.shields.io/badge/install%20size-202%20KB-green)](https://www.npmjs.com/package/mindsdb-js-sdk)

## JS MindsDB SDK

MindsDB generates metadata about your specific machine learning task, that you can visualize through our graphical user interface [MindsDB GUI](https://www.mindsdb.com/).

## Installing

Using npm:

```bash
$ npm install mindsdb-js-sdk
```

Using yarn:

```bash
$ yarn add mindsdb-js-sdk
```

## Install and build

Commands should executed from `javascript/` folder.

1. install dependencies:

```
yarn
```

```
npm install
```

2. build:

```
yarn build
```

```
npm run build
```


## Usage

example of usage:

```
import MindsDB from 'mindsdb-js-sdk';

//connection

const connectData = {
    email : 'user@muser.com', // mindsdb user
    password : '' // mindsdb Password
}

const test = async () => {
    const connect  = await MindsDB.connect(connectData);
    const getFiles = await MindsDB.getFiles();
    const setQuery = await MindsDB.setQuery("SELECT * FROM example_db.demo_data.home_rentals LIMIT 10;");
    
    
    
    console.log('=Get Account Status=>');
    console.log(connect);
    console.log('=Get Files=>');
    console.log(getFiles);
    console.log('=Set Files=>');
    console.log(setQuery);
};

test();

```

## Documentation

### root methods

### `MindsDB.connect(url)`

Initialize connection to MindsDB server

**params**

- email - mindsdb Email
- password - mindsdb Password

**returns** Mindsdb User Info

### `MindsDB.disconnect()`

Clear connection data

**returns** undefined

### `MindsDB.setQuery()`

Send query

**returns** query response


## License

[MIT](LICENSE)
