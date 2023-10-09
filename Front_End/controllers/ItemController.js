//load all existing items
getAllItems();

//add item event
$("#btnItem").click(function () {
    if (checkAllItems()){
        saveItem();
    }

});

//get all items event
$("#itemGetAll").click(function () {
    getAllItems();
});

//bind tr events for getting back data of the rows to text fields
function bindItemTrEvents() {
    $('#tblItem>tr').click(function () {
        //get the selected rows data
        let code = $(this).children().eq(0).text();
        let name = $(this).children().eq(1).text();
        let qty = $(this).children().eq(2).text();
        let unitPrice = $(this).children().eq(3).text();

        //set the selected rows data to the input fields
        $("#itemCode").val(code);
        $("#itemName").val(name);
        $("#itemQty").val(qty);
        $("#itemPrice").val(unitPrice);
    })
}

//delete btn event
$("#btnItemDelete").click(function () {
    let code = $("#itemCode").val();

    let consent = confirm("Do you want to delete.?");
    if (consent) {
        let response = deleteItem(code);
        if (response) {
            alert("Item Deleted");
            clearItemInputFields();
            getAllItems();
        } else {
            alert("Item Not Removed..!");
        }
    }


});

//update  btn event
$("#btnItemUpdate").click(function () {
    let code = $("#itemCode").val();
    updateItem(code);
    clearItemInputFields();
});

//clear btn event
$("#btn-clear").click(function () {
    clearItemInputFields();
});



// CRUD operation Functions
function saveItem() {
    let itemCode = $("#itemCode").val();
    //check item is exists or not?
    if (searchItem(itemCode.trim()) == undefined) {

        //if the customer is not available then add him to the array
        let itemFormData = $("#itemForm").serialize();
        $.ajax({
            url: BASE_URL + "item",
            method: "post",
            data: itemFormData,
            headers:{
                Auth:"user=admin,pass=admin"
            },
            success: function (res) {
                alert(res.message);
                clearItemInputFields();
                getAllItems();
            },
            error: function (error) {
                alert(error.responseJSON.message);
            }
        });




    } else {
        alert("Item already exits.!");
        clearItemInputFields();
    }
}

function getAllItems() {
    //clear all tbody data before add
    $("#tblItem").empty();

    $.ajax({
        url: BASE_URL+'item',
        dataType: "json",
        headers:{
            Auth:"user=admin,pass=admin"
        },
        success: function (response) {
            let items = response.data;
            for (let i in items) {
                let item = items[i];
                let code = item.code;
                let description = item.description;
                let qtyOnHand = item.qty;
                let unitPrice = item.unitPrice;
                let row = `<tr><td>${code}</td><td>${description}</td><td>${qtyOnHand}</td><td>${unitPrice}</td></tr>`;
                $("#tblItem").append(row);
            }
            bindItemTrEvents();
        },
        error: function (error) {
            alert(error.responseJSON.message);
        }
    });
}



function deleteItem(code) {
    $.ajax({
        url: BASE_URL + 'item?code=' + code,
        method: 'delete',
        headers:{
            Auth:"user=admin,pass=admin"
        },
        success: function (resp) {
            alert(resp.message);
            getAllItems();
            clearItemInputFields()
            return true;
        },
        error: function (error) {
            alert(error.responseJSON.message);
            return false;
        }
    });
}

function searchItem(code) {
    let resp = false;
    $.ajax({
        url: BASE_URL + 'item',
        dataType: "json",
        async: false,
        success: function (response) {
            let items = response.data;
            resp = items.find(function (item) {
                //if the search id match with customer record
                //then return that object
                return item.code == code;
            });

        },
        error: function (error) {
            resp=false;
            alert(error.responseJSON.message);
        }
    });
    return resp;
}

function updateItem(code) {
    if (searchItem(code) == undefined) {
        alert("No such Item..please check the Code");
    } else {
        let consent = confirm("Do you really want to update this Item.?");
        if (consent) {
            let item = searchItem(code)[0];
            //if the item available can we update.?

            let itemName = $("#itemName").val();
            let itemQty = $("#itemQty").val();
            let itemPrice = $("#itemPrice").val();

            item.code=code;
            item.description = itemName;
            item.qtyOnHand = itemQty;
            item.unitPrice = itemPrice;

            $.ajax({
                url: BASE_URL + 'item',
                method: 'put',
                headers:{
                    Auth:"user=admin,pass=admin"
                },
                contentType: "application/json",
                data: JSON.stringify(item),
                success: function (resp) {
                    alert(resp.message);
                    getAllItems();
                },
                error: function (error) {
                    alert(error.responseJSON.message);
                }
            });

        }
    }

}

function clearItemInputFields() {
    $("#itemCode,#itemName,#itemQty,#itemPrice").val("");
    $("#itemCode,#itemName,#itemQty,#itemPrice").css("border", "1px solid #ced4da");
    $("#itemCode").focus();
    setItemBtn();
}



