({
    /*
     * This finction defined column header
     * and calls getProducts helper method for column data
     * editable:'true' will make the column editable
     * */
	doInit : function(component, event, helper) {
    	var actions = [
            { label: 'Delete', name: 'delete' }
        ];
        component.set('v.columns', [
            {label: 'Product Name', fieldName: 'Product2Name', editable: false, type: 'text'},
            {label: 'Quantity', fieldName: 'Quantity', editable:'true', type: 'number'},
            { type: 'action', typeAttributes: { rowActions: actions } }
            
        ]);        
        helper.getOppProducts(component, helper);
    },

    /*
     * This function is calling saveDataTable helper function
     * to save modified records
     * */
    onSave : function (component, event, helper) {
        helper.saveDataTable(component, event, helper);
    },
    
    deleteAction: function (component, event, helper) {
        helper.deleteAction(component, event, helper);
    },
    
    closeButton: function (component, event, helper) {
        component.find("overlayLib").notifyClose();
    }
})