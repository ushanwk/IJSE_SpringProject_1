let linkCus = "http://localhost:8080/Back_End_war/customer";


loadAllCus();

function loadAllCus(){

    $.ajax({
        url : linkCus,
        success : function(res){
            let customers = $(res);
            $('#tblCustomer').empty();

            for(let i = 0; i < customers.length; i++){
                let id = customers[i].id;
                let name = customers[i].name;
                let address = customers[i].address;
                let salary = customers[i].salary;

                let row =`<tr><td>${id}</td><td>${name}</td><td>${address}</td><td>${salary}</td></tr>`;
                $('#tblCustomer').append(row);
            }
        }
    });

}

function clearCusField(){
    $('#txtCustomerID').val("");
    $('#txtCustomerName').val("");
    $('#txtCustomerAddress').val("");
    $('#txtCustomerSalary').val("");
}



$('#btnCusGetAll').click(function(){
    loadAllCus();
});



$('#btnCusAdd').click(function(){
    let data = $('#customerForm').serialize();

    $.ajax({
        url : linkCus,
        method : "post",
        data : data,
        success : function() {
            loadAllCus();
        },
        error : function() {
            loadAllCus();
        }
    });

});



$('#btnCusUpdate').click(function(){
    let cusId = $('#txtCustomerID').val();
    let cusName = $('#txtCustomerName').val();
    let cusAddress = $('#txtCustomerAddress').val();
    let cusSalary = $('#txtCustomerSalary').val();

    let customer = {
        id : cusId,
        name : cusName,
        address : cusAddress,
        salary : cusSalary
    }

    $.ajax({
        url : linkCus,
        method : "put",
        data : JSON.stringify(customer),
        contentType : 'application/json',
        success:function(){
            clearCusField();
            loadAllCus();
        },
        error : function(){
            clearCusField();
            loadAllCus();
        }
    });

});


$('#btnCusDelete').click(function(){
    let cusId = $('#txtCustomerID').val();

    $.ajax({
        url: linkCus + '?cusID=' + cusId,
        method: "delete",
        success: function(){
            clearCusField();
            loadAllCus();
        },
        error: function(){
            clearCusField();
            loadAllCus();
        }
    });
});


$('#btnCusClear').click(function(){
    clearCusField();
});