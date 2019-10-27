({
    getOppProducts : function(component, event, helper) {
        var action = component.get("c.getOppProducts");
        action.setParams({
            oppid : component.get("v.recordId")
        });
        action.setCallback(this,function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var rows = response.getReturnValue();
                for (var i = 0; i < rows.length; i++) {
                    var row = rows[i];
                    if (row.Product2)
                        row.Product2Name = row.Product2.Name;
                }
                component.set("v.data", rows);
            }
        });
        $A.enqueueAction(action);
    },

    /*
     * This function get called when user clicks on Save button
     * user can get all modified records
     * and pass them back to server side controller
     * */
    saveDataTable : function(component, event, helper) {
        var editedRecords =  component.find("accountDataTable").get("v.draftValues");
        var totalRecordEdited = editedRecords.length;
        var action = component.get("c.updateEditOppProducts");
        action.setParams({
            'editedProductList' : editedRecords
        });
        action.setCallback(this,function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                //if update is successful
                if(response.getReturnValue() === true){
                    helper.showToast({
                        "title": "Record Update",
                        "type": "success",
                        "message": totalRecordEdited+" Account Records Updated"
                    });
                    helper.reloadDataTable();
                    component.find("overlayLib").notifyClose();
                } else{ //if update got failed
                    helper.showToast({
                        "title": "Error!!",
                        "type": "error",
                        "message": "Error in update"
                    });
                }
            }
        });
        $A.enqueueAction(action);
    },
    
    deleteAction: function(component, event, helper){
        var action = event.getParam('action');
        var row = event.getParam('row');
        if (action.name == 'delete') {
            if(confirm('Are you sure ?')) {
                var rows = component.get('v.data');
                var rowIndex = rows.indexOf(row);
                var rowID = rows[rowIndex].Id;
                
                var action = component.get("c.deleteOLI");
                action.setParams({
                    'oppProductToDelete' : rowID
                });
                action.setCallback(this,function(response) {
                    var state = response.getState();
                    if (state === "SUCCESS") {
                        //if Delete is successful
                        if(response.getReturnValue() === true){
                            helper.showToast({
                                "title": "Record Delete",
                                "type": "success",
                                "message":"Opportunity Product Record has been deleted"
                            });
                            helper.reloadDataTable();
                        } else{ //if Delete got failed
                            helper.showToast({
                                "title": "Error!!",
                                "type": "error",
                                "message": "Error in delete"
                            });
                        }
                    }
                });
                $A.enqueueAction(action);
                rows.splice(rowIndex, 1);
                component.set('v.data', rows);
            }
        }  
    },

    /*
     * Show toast with provided params
     * */
    showToast : function(params){
        var toastEvent = $A.get("e.force:showToast");
        if(toastEvent){
            toastEvent.setParams(params);
            toastEvent.fire();
        } else{
            alert(params.message);
        }
    },

    /*
     * reload data table
     * */
    reloadDataTable : function(){
    var refreshEvent = $A.get("e.force:refreshView");
        if(refreshEvent){
            refreshEvent.fire();
        }
    }
})