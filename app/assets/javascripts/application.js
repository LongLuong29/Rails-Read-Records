//= require jquery3
//= require jquery_ujs
//= require_tree .

var myData = []
$(document).ready(function() {
    loadData()

    $(document).on('click', '#createRecordBtn', function() {
        $("#nameInput").val("")
        $("#descriptionInput").val("")
        $("#priceInput").val("")
        $("#categoryInput").val("")
    })

    $(document).on('click', 'button.deleteRecord', function(){
        var clickedButton = $(this)
        var deletedRecordId =  clickedButton.val()
   
        console.log(deletedRecordId)
        clickedButton.closest("tr").remove();
        deleteRecordByButton(deletedRecordId)
    })

    //lay thong tin record len edit
    $(document).on("click", ".recordEdit", function () {
        //Lay thong tin
        var selectedRecord = $(this).closest("tr");
        var name = selectedRecord.find("td:nth-child(2)").text()
        var description = selectedRecord.find("td:nth-child(3)").text()
        var price = selectedRecord.find("td:nth-child(4)").text()
        var category = selectedRecord.find("td:nth-child(5)").text()
        var index = selectedRecord.find("td:nth-child(6)").text()

        //Hien thi
        $("#nameEdit").val(name)
        $("#descriptionEdit").val(description)
        $("#priceEdit").val(price.split("$")[1])
        $("#categoryEdit").val(category)
        $("#recordIndex").val(index)
    })
})











//Delete a record
function deleteRecordByButton(deletedRecordId) {
        $.ajax({
            url: '/records/' + deletedRecordId,
            type: 'DELETE',
            success: function () {
                console.log("delete successfully")
                // loadData();
            },
            error: function (error) {
                console.log("delete failed")
                console.error('Error:', error);
            }
        })
}

//Load data
function loadData() {
    $.ajax({
        url: '/records',
        type: 'GET',
        dataType: 'json',
        success: function (records) {
            // myData = records;
            displayRecords(records);
        },
        error: function (error) {
            console.log("loi roi")
            console.error('Error:', error);
        }
    })
}

//Display data
function displayRecords(records) {
    var tableBody = $("#myTable");
    tableBody.empty();

    $.each(records, function (index, record) {
        var row = '<tr class="deletedCheckbox" value="' + record.id + '">' +
            '<td><input class="recordCheckbox" value="' + record.id + '" type="checkbox"/></td>' +
            '<td>' + record.name + '</td>' +
            '<td>' + record.description + '</td>' +
            '<td>$' + record.price + '</td>' +
            '<td>' + record.category + '</td>' +
            '<td class="hidden">' + record.id + '</td>' +
            '<td>' +
            '<button type="button" class="recordEdit btn btn-info" ' +
            'data-toggle="modal" ' +
            'data-target="#updateModal">' +
            '<span class="glyphicon glyphicon-edit"></span> Edit' +
            '</button>' +
            ' <button type="button" class="deleteRecord btn btn-danger" ' +
            'value="' + record.id + '">' +
            '<span class="glyphicon glyphicon-trash"></span> Delete' +
            '</button>' +
            '</td>' +
            '</tr>';
        tableBody.append(row);
    });
}

//save new Record
function saveData() {
    var nameValue = $("#nameInput").val();
    var descriptionValue = $("#descriptionInput").val();
    var priceValue = $("#priceInput").val();
    var categoryValue = $("#categoryInput").val();

    var record = {
        name: nameValue,
        description: descriptionValue,
        price: priceValue.toString(),
        category: categoryValue
    };

    //send data to backend
    $.ajax({
        url: '/records',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(record),
        success: function () {
            console.log('Record created successfully');
            loadData(); // reload
        },
        error: function (error) {
            console.log(JSON.stringify(record))
            console.error('Error:', error);
        }
    });
    // myData.push(record);
}

// select all records clicked
function selectAllRecords() {
    var checkedSelectedAll = $("input#selectAllRecords");
    var allRecordCheckbox = $("input.recordCheckbox");
    if (checkedSelectedAll.is(":checked") == true) {
        for (var i = 0; i < allRecordCheckbox.length; i++) {
            allRecordCheckbox[i].checked = true;
        }
    } else {
        for (var i = 0; i < allRecordCheckbox.length; i++) {
            allRecordCheckbox[i].checked = false;
        }
    }
}