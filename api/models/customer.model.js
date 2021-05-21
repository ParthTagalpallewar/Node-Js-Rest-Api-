const sql = require('./db.js');

const Customer = function(customer) {
    this.Name = customer.Name,
    this.Address = customer.Address,
    this.Country = customer.Country,
    this.Phone = customer.Phone
}


Customer.create = (newCustomer,result) => {
    sql.query("Insert INTO customer SET ?",newCustomer,(err, res )=>{
        if(err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
      

        console.log("Created New Customer : ", { id : res.insertId, ...newCustomer})
        result(null, {id : res.insertId, ...newCustomer});
    })
}


Customer.findById = (customerId, result) => {
    sql.query(`SELECT * FROM customer WHERE Id = ${customerId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found customer: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Customer with the id
      result({ kind: "not_found" }, null);
    });
  };
  

Customer.getAll = result => {
    sql.query("SELECT * FROM customer", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("customers: ", res);
      result(null, res);
    });
  };
  
Customer.updateById = (id, customer, result) => {
    sql.query(
      "UPDATE customer SET Name = ?, Address = ?, Country = ?,Phone = ? WHERE Id = ?",
      [customer.Name, customer.Address, customer.Country,customer.Phone, id],

      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Customer with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated customer: ", { id: id, ...customer });
        result(null, { id: id, ...customer });
      }
    );
  };
  
  Customer.remove = (id, result) => {
    sql.query("DELETE FROM customer WHERE Id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted customer with id: ", id);
      result(null, res);
    });
  };
  
  Customer.removeAll = result => {
    sql.query("DELETE FROM customer", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} customers`);
      result(null, res);
    });
  };
  
  module.exports = Customer;
