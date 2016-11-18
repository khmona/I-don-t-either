'use strict';

module.exports = class mySQL {
  constructor() {
    // KOPPLING TILL SQL DATABAS
    this.settings = g.settings.mySQL;
    this.mySql = new g.classes.mySQL();
    // this.mySql = m.mysql;
    this.app = express;

    this.router();
  }

  router() {
    // router.post('/techgeek/v1/createEmployee', function (req, res, next) {
    //   try {
    //     var reqObj = req.body;
    //     console.log(reqObj);
    //     req.getConnection(function (err, conn) {
    //       if (err) {
    //         console.error('SQL Connection error: ', err);
    //         return next(err);
    //       }
    //       else {
    //         var insertSql = "INSERT INTO employee SET ?";
    //         var insertValues = {
    //           "Emp_Name": reqObj.empName,
    //           "Role_Id": reqObj.roleId,
    //           "Dept_Id": reqObj.deptId
    //         };
    //         var query = conn.query(insertSql, insertValues, function (err, result) {
    //           if (err) {
    //             console.error('SQL error: ', err);
    //             return next(err);
    //           }
    //           console.log(result);
    //           var Employee_Id = result.insertId;
    //           res.json({ "Emp_id": Employee_Id });
    //         });
    //       }
    //     });
    //   }
    //   catch (ex) {
    //     console.error("Internal error:" + ex);
    //     return next(ex);
    //   }
    // });

    // /* Get Employee Service. */
    // router.get('/techgeek/v1/getEmployeeDetails', function (req, res, next) {
    //   try {
    //     /*var roleId = req.param('roleId');
    //     var deptId = req.param('deptId');*/
    //     var query = url.parse(req.url, true).query;
    //     console.log(query);
    //     var roleId = query.roleId;
    //     var deptId = query.deptId;
    //     console.log(roleId);
    //     console.log(deptId);
    //     req.getConnection(function (err, conn) {
    //       if (err) {
    //         console.error('SQL Connection error: ', err);
    //         return next(err);
    //       } else {
    //         conn.query('select E.Emp_Name, Date_Format(E.Doj,"%d-%m-%Y") AS DOJ, D.Dept_Name, R.Role_Name from employee E, role R, department D where E.Role_Id = R.Role_Id and E.Dept_Id = D.Dept_Id and E.Role_Id = ? and E.Dept_Id = ? order by DOJ', [roleId, deptId], function (err, rows, fields) {
    //           if (err) {
    //             console.error('SQL error: ', err);
    //             return next(err);
    //           }
    //           var resEmp = [];
    //           for (var empIndex in rows) {
    //             var empObj = rows[empIndex];
    //             resEmp.push(empObj);
    //           }
    //           res.json(resEmp);
    //         });
    //       }
    //     });
    //   } catch (ex) {
    //     console.error("Internal error:" + ex);
    //     return next(ex);
    //   }
    // });
    //Allaroutes kommer in hit först, sen anropas efter metod
  }

  connect() {
    this.connection = this.mySql.createConnection({
      host: '127.0.0.1',
      user: 'root',
      password: 'admin',
      // database: 'wreckstadSql'
      database: 'wreckstad'
    });

    this.connection.connect((err) => {
      if (!err) {
        console.log("Database is connected");
        return;
      }
      console.log("Error connecting database", err);
    });
  }
};



//   POST(model, params, req, res) {

//   }

//   GET(model, params, req, res) {

//   }

//   PUT(model, params, req, res) {

//   }

//   DELETE(model, params, req, res) {

//   }
// };




// READ(table, callback) {
//   this.connection.query("SELECT * FROM " + table, (err, rows, fields) => {
//     callback(err, rows, fields);
//   });
// }

// UPDATE(){

//   var table = 'insert_table_here';
//   this.connection.query('UPDATE ' + table + 'SET row = ?, row2 = ? WHERE id = ?', [row, row2, id], (err, rows, fields) => {
//     if (!err) {
//       console.log('No error');
//     } console.log("error", err.stack);
//   });
// }

// POST(){
//   var data = {}
//   var table = 'insert_table_here';
//   this.connection.query('INSERT INTO' + table + 'SET', data, (err, result) => {
//     if (!err) {
//       console.log(result);
//     }
//   });
// }
// }
