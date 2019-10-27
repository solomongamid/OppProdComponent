({
	saveProducts : function(component, event, helper) {
        var editedRecords =  component.find("productDataTable").get("v.draftValues");
        var oppID = component.get("v.recordId");
        var totalRecordEdited = editedRecords.length;
        var listID = component.get("v.IDList");
        var listName = component.get("v.NameList");
        var newOppProducts = [];
        //Get input data 
        for (var i = 0; i < totalRecordEdited; i++){
            var productId = editedRecords[i].Id;
            var quantity = editedRecords[i].Quantity;
            var serviceDate =  editedRecords[i].ServiceDate;
            var description = editedRecords[i].Description;
 			var index = listID.indexOf(productId);
            var name = listName[index];
            
            newOppProducts.push({'sobjectType':'OpportunityLineItem',  'Product2Id':productId, 'Quantity': quantity, 'ServiceDate' : serviceDate, 'Description' : description, 'OpportunityId' : oppID });
        }

        var action = component.get("c.updateOppProducts");
        action.setParams({
            'editedProductList' : newOppProducts
        });
        action.setCallback(this,function(response) {
            var state = response.getState();
            if (state == "SUCCESS") {
                //if update is successful
                if(response.getReturnValue() === true){
                    helper.showToast({
                        "title": "Add Record",
                        "type": "success",
                        "message": totalRecordEdited+" Account Records Have Been Added"
                    });
                    helper.reloadDataTable();
                    component.find("overlayLib").notifyClose();
                } else{ 
                    //if save got failed
                    helper.showToast({
                        "title": "Error!!",
                        "type": "error",
                        "message": "Error in save"
                    });
                }
            }
        });
        $A.enqueueAction(action);
    },

    //Show toast with provided params
    showToast : function(params){
        var toastEvent = $A.get("e.force:showToast");
        if(toastEvent){
            toastEvent.setParams(params);
            toastEvent.fire();
        } else{
            alert(params.message);
        }
    },

    //Reload data table
    reloadDataTable : function(){
    var refreshEvent = $A.get("e.force:refreshView");
        if(refreshEvent){
            refreshEvent.fire();
        }
    }
})