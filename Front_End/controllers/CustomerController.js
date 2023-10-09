const BASE_URL = "http://localhost:8080/jpa/";

//load all existing customers
getAllCustomers();

//add customer event
$("#btnCustomer").click(function () {
    if (checkAll()) {
        saveCustomer();
    } else {
        alert("Error");
    }

});

//get all customer event
$("#btnGetAll").click(function () {
    getAllCustomers();
});

//bind tr events for getting back data of the rows to text fields
function bindTrEvents() {
    $('#tblCustomer>tr').click(function () {
        //get the selected rows data
        let id = $(this).children().eq(0).text();
        let name = $(this).children().eq(1).text();
        let address = $(this).children().eq(2).text();
        let salary = $(this).children().eq(3).text();

        //set the selected rows data to the input fields
        $("#txtCustomerID").val(id);
        $("#txtCustomerName").val(name);
        $("#txtCustomerAddress").val(address);
        $("#txtCustomerSalary").val(salary);
    })
}

//delete btn event
$("#btnCusDelete").click(function () {
    let id = $("#txtCustomerID").val();

    let consent = confirm("Do you want to delete.?");
    if (consent) {
        let response = deleteCustomer(id);
        if (response) {
            alert("Customer Deleted");
            clearCustomerInputFields();
            getAllCustomers();
        } else {
            alert("Customer Not Removed..!");
        }
    }


});

//update  btn event
$("#btnUpdate").click(function () {
    let id = $("#txtCustomerID").val();
    updateCustomer(id);
    clearCustomerInputFields();
});

//clear btn event
$("#btn-clear1").click(function () {
    clearCustomerInputFields();
});


// CRUD operation Functions
function saveCustomer() {
    let customerID = $("#txtCustomerID").val();
    //check customer is exists or not?
    if (searchCustomer(customerID.trim()) == undefined) {

        let formData = $("#customerForm").serialize();
        $.ajax({
            url: BASE_URL + "customer",
            method: "post",
            headers:{
                Auth:"user=admin,pass=admin"
            },
            data: formData,
            success: function (res) {
                alert(res.message);
                clearCustomerInputFields();
                getAllCustomers();
            },
            error: function (error) {
                alert(error.responseJSON.message);
            }
        });


    } else {
        alert("Customer already exits.!");
        clearCustomerInputFields();
    }
}

function getAllCustomers() {
    //clear all tbody data before add
    $("#tblCustomer").empty();

    $.ajax({
        url: BASE_URL + 'customer',
        dataType: "json",
        headers:{
            Auth:"user=admin,pass=admin"
        },
        success: function (response) {
            let customers = response.data;
            for (let i in customers) {
                let cus = customers[i];
                let id = cus.id;
                let name = cus.name;
                let address = cus.address;
                let salary = cus.salary;
                let row = `<tr><td>${id}</td><td>${name}</td><td>${address}</td><td>${salary}</td></tr>`;
                $("#tblCustomer").append(row);
            }
            bindTrEvents();
        },
        error: function (error) {
            alert(error.responseJSON.message);
        }
    });
}

function deleteCustomer(id) {
    $.ajax({
        url: BASE_URL + 'customer?cusID=' + id,
        method: 'delete',
        headers:{
            Auth:"user=admin,pass=admin"
        },
        success: function (resp) {
            alert(resp.message);
            getAllCustomers();
            clearCustomerInputFields()
            return true;
        },
        error: function (error) {
            alert(error.responseJSON.message);
            return false;
        }
    });
}

function searchCustomer(id) {
    let resp = false;
    $.ajax({
        url: BASE_URL + 'customer',
        dataType: "json",
        headers:{
            Auth:"user=admin,pass=admin"
        },
        async: false,
        success: function (response) {
            let customers = response.data;
            resp = customers.find(function (customer) {
                //if the search id match with customer record
                //then return that object
                return customer.id == id;
            });

        },
        error: function (error) {
            resp=false;
            alert(error.responseJSON.message);
        }
    });
    return resp;
}

function updateCustomer(id) {
    if (searchCustomer(id) == undefined) {
        alert("No such Customer..please check the ID");
    } else {
        let consent = confirm("Do you really want to update this customer.?");
        if (consent) {
            let customer = searchCustomer(id)[0];
            //if the customer available can we update.?
            console.log(customer);
            let customerName = $("#txtCustomerName").val();
            let customerAddress = $("#txtCustomerAddress").val();
            let customerSalary = $("#txtCustomerSalary").val();
            customer.id = id;
            customer.name = customerName;
            customer.address = customerAddress;
            customer.salary = customerSalary;

            $.ajax({
                url: BASE_URL + 'customer',
                method: 'put',
                headers:{
                    Auth:"user=admin,pass=admin"
                },
                contentType: "application/json",
                data: JSON.stringify(customer),
                success: function (resp) {
                    alert(resp.message);
                    getAllCustomers();
                    clearCustomerInputFields();
                },
                error: function (error) {
                    alert(error.responseJSON.message);
                }
            });
        }
    }

}



