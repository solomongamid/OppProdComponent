({
	//Fetch the result from getProducts query on the first form
	doInit : function(component, event, helper) {
        var action = component.get("c.getLastOppProducts");
        action.setParams({
            oppid : component.get("v.recordId")
        });

       	action.setCallback(this, function(response){
            var state = response.getState();
       		if (state === "SUCCESS") {
            	var products = response.getReturnValue();
            	component.set("v.OLIs", products);
                switch(products.length){
                    case 0:
                        component.set("v.counter", 0);
                        break;
                    case 1:
                        component.set("v.counter", '(1)');
                        break;
                    case 2:
                        component.set("v.counter", '(2)');
                        break;
                    case 3:
                        component.set("v.counter", '(3)');
                        break;
                    default:
                        component.set("v.counter", '(3+)');
                }
            }
        });
        $A.enqueueAction(action);
    },
    
    NavigateToCreateProduct : function(component, event, helper) {
		$A.createComponent("c:opp_addProductsBTN_CMP", { recordId : component.get("v.recordId") },
                           function(content, status) {
                               if (status === "SUCCESS") {
                                   component.find('overlayLib').showCustomModal({
                                       header: "Add Products",
                                       body: content, 
                                       showCloseButton: true,
                                       
                                   })
                               }                               
                           });
		/*var actionAPI = component.find("qaAPI");
        //Assign Quick Action field values
        var fields = {Status: {value: "Working"}};
        //Quick Action with target field values
        var args = {actionName: "Opportunity.Add_Opp_Products", entityName: "Opportunity", targetFields: fields};
        actionAPI.setActionFieldValues(args).then(function(){
            actionAPI.invokeAction(args);
        }).catch(function(e){
            console.error(e.errors);
        });*/
	},
    
    NavigateToEditProduct : function(component, event, helper) {
		$A.createComponent("c:opp_editProductsBTN_CMP", { recordId : component.get("v.recordId") },
                           function(content, status) {
                               if (status === "SUCCESS") {
                                   component.find('overlayLib').showCustomModal({
                                       header: "Edit Products",
                                       body: content, 
                                       showCloseButton: true,
                                       
                                   })
                               }                               
                           });
		/*var actionAPI = component.find("qaAPI");
        //Assign Quick Action field values
        var fields = {Status: {value: "Working"}};
        //Quick Action with target field values
        var args = {actionName: "Opportunity.Edit_Opp_Product", entityName: "Opportunity", targetFields: fields};
        actionAPI.setActionFieldValues(args).then(function(){
            actionAPI.invokeAction(args);
        }).catch(function(e){
            console.error(e.errors);
        });*/
	}
    
})