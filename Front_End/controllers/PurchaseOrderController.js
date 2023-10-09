
//load all items from the database
loadAllItems();
loadAllCustomers();
setDates();
searchCustomer();

function loadAllItems() {
    $("#selectItemCode").empty();
    $.ajax({
        url: BASE_URL + "item",
        headers:{
            Auth:"user=admin,pass=admin"
        },
        success: function (res) {
            for (let c of res.data) {
                let code = c.code;
                $("#selectItemCode").append(`<option value="${code}">${code}</option>`);
            }
        },
        error: function (error) {
            let message = JSON.parse(error.responseText).message;
            alert(message);
        }
    });
}

function loadAllCustomers() {
    $("#selectCusID").empty();
    $.ajax({
        url: BASE_URL + "customer",
        dataType: "json",
        headers:{
            Auth:"user=admin,pass=admin"
        },
        success: function (resp) {
            console.log(resp);
            for (let cus of resp.data) {
                $("#selectCusID").append(`<option value="${cus.id}">${cus.id}</option>`);
            }
        }
    });
}

function setDates() {
    let date = new Date().toJSON().split("T")[0];
    $("#txtDate").val(date);
}

function searchCustomer(cusID) {
    let response = "";
    $.ajax({
        url: BASE_URL + "customer",
        dataType: "json",
        async: false,
        headers:{
            Auth:"user=admin,pass=admin"
        },
        success: function (resp) {
            response = resp.data.filter((c) => {
                return c.id == cusID;
            });
        }
    });
    return response;
}

function searchItem(code) {
    let response = "";
    $.ajax({
        url: BASE_URL + "item",
        dataType: "json",
        async: false,
        headers:{
            Auth:"user=admin,pass=admin"
        },
        success: function (resp) {
            response = resp.data.filter((i) => {
                return i.code == code;
            });
        }
    });
    return response;
}


$("#selectCusID").change(function () {
    let cusID = $("#selectCusID").val();
    $("#orderCustomerID").val(cusID);
    let res = searchCustomer(cusID);
    if (res.length > 0) {
        $("#orderCustomerName").val(res[0].name);
        $("#orderCustomerSalary").val(res[0].salary);
        $("#orderCustomerAddress").val(res[0].address);
    }

});


$("#selectItemCode").change(function () {
    let code = $("#selectItemCode").val();
    $("#txtItemCode").val(code);
    let res = searchItem(code);
    if (res.length > 0) {
        $("#txtItemDescription").val(res[0].description);
        $("#txtItemPrice").val(res[0].unitPrice);
        $("#txtQTYOnHand").val(res[0].qty);
    }
});


$("#btnAddToTable").click(function () {
    let code = $("#selectItemCode").val();
    let description = $("#txtItemDescription").val();
    let itemPrice = $("#txtItemPrice").val();
    let buyQty = $("#txtQty").val();
    let avQty = $("#txtQTYOnHand").val();
    let total = parseFloat(itemPrice) * parseFloat(buyQty);
    $("#orderTable").append(`<tr><td>${code}</td><td>${description}</td><td>${itemPrice}</td><td>${avQty}</td><td>${buyQty}</td><td>${total}</td></tr>`);
});


$("#btnSubmitOrder").click(function () {
    let orderID = $("#txtOrderID").val();
    let customerID = $("#orderCustomerID").val();
    let orderDate = $("#txtDate").val();
    let orderD = getItemDetails();

    let ob = {
        oid: orderID,
        date: orderDate,
        cusID: customerID,
        orderDetails: orderD
    }

    //send request
    $.ajax({
        url: BASE_URL + "purchase_order",
        method: "post",
        dataType: "json",
        headers:{
            Auth:"user=admin,pass=admin"
        },
        data: JSON.stringify(ob),
        contentType: "application/json",
        success: function (resp) {
            alert(resp.message);
            clearAllPOTexts();
        },
        error: function (error) {
            alert(JSON.parse(error.responseText).message);
        }
    });


});

function getItemDetails() {
    let rows = $("#orderTable").children().length;
    var array = [];
    for (let i = 0; i < rows; i++) {
        let itCode = $("#orderTable").children().eq(i).children(":eq(0)").text();
        let avQty = $("#orderTable").children().eq(i).children(":eq(3)").text();
        let itQty = $("#orderTable").children().eq(i).children(":eq(4)").text();
        let itPrice = $("#orderTable").children().eq(i).children(":eq(2)").text();
        array.push({code: itCode,avQty:avQty, qty: itQty, price: itPrice});
    }
    return array;
}

function clearAllPOTexts(){
    $("#orderTable").empty();
    $("#txtOrderID").val("");
    $("#orderCustomerName").val("");
    $("#orderCustomerAddress").val("");
    $("#txtItemCode").val("");
    $("#txtItemDescription").val("");
    $("#txtItemPrice").val("");
    $("#txtQTYOnHand").val("");
    $("#txtQty").val("");


}
