let linkItem = "http://localhost:8080/Back_End_Web_exploded/item";

loadAllItems();

function loadAllItems(){

    $.ajax({
        url : linkItem,
        success : function(res){
            let item = $(res);
            $('#tblItem').empty();

            for(let i = 0; i < item.length; i++){
                let code = item[i].code;
                let name = item[i].name;
                let qty = item[i].qty;
                let price = item[i].price;

                let row =`<tr><td>${code}</td><td>${name}</td><td>${qty}</td><td>${price}</td></tr>`;
                $('#tblItem').append(row);
            }
        }
    });

}

function clearItemField(){
    $('#itemCode').val("");
    $('#itemName').val("");
    $('#itemQty').val("");
    $('#itemPrice').val("");
}


$('#btnItemGetAll').click(function(){
    loadAllItems();
});

$('#btnItemAdd').click(function(){
    let data = $('#itemForm').serialize();

    $.ajax({
        url : linkItem,
        data : data,
        method : "post",
        success : function(){
            clearItemField();
            loadAllItems();
        },
        error : function(){
            clearItemField();
            loadAllItems();
        }
    });
});

$('#btnItemUpdate').click(function(){
    let code = $('#itemCode').val();
    let name = $('#itemName').val();
    let qty = $('#itemQty').val();
    let price = $('#itemPrice').val();

    let item = {
        code : code,
        name : name,
        qty : qty,
        price : price
    }

    $.ajax({
        url : linkItem,
        method : "put",
        data : JSON.stringify(item),
        contentType : 'application/json',
        success:function(){
            clearItemField();
            loadAllItems();
        },
        error : function(){
            clearItemField();
            loadAllItems();
        }
    });
});


$('#btnItemDelete').click(function(){
    let code = $('#itemCode').val();

    $.ajax({
        url: linkItem + '?code=' + code,
        method: "delete",
        success: function(){
            clearItemField();
            loadAllItems()
        },
        error: function(){
            clearItemField();
            loadAllItems()
        }
    });
});
