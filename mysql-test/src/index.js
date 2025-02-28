const mysql = require('mysql2')

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'lee123',
  database: 'hello_mysql'
})
// console.log(connection)
connection.query(`select * from use_info`, (err, results, fields) => {
  // console.log(results);
  console.log(fields?.map(item => item.name));
})

connection.query(`select * from use_info where projectName like ?`, ['an%'], (err, results, fields) => {
  console.log(results);
  // console.log(fields?.map(item => item.name));
})


connection.execute(`insert into use_info (userName, projectName, mrLink, resultLink) values (?, ?, ?, ?)`,
  ['', '', '', ''], 
  (err, results) => {
    if (err) {
      console.log(err);
    } else {
      console.log(results);
    }
})


// connection.execute(`update use_info set resultLink=? where id=?`,
//   ['', '2'],
//   (err, results) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(results);
//     }
//   }
// )

// connection.execute(`delete from use_info where id=?`,
//   [2],
//   (err, results) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(results);
//     }
//   }
// )
