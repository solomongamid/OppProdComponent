({
    //Fetch the result from getProducts query on the first form
	doInit : function(component, event, helper) {
        var action = component.get("c.getProducts");
        action.setParams({
            oppid : component.get("v.recordId")
        });

       	action.setCallback(this, function(response){
            var state = response.getState();
       		if (state === "SUCCESS") {
            	var products = response.getReturnValue();
            	component.set("v.products", products);
                component.set("v.oppLength", products.length);
                var myList = [];
                var parsed = parseInt(component.get("v.oppLength"));
       			for (var i = 0; i < parsed; i++) myList[i] = false;
                component.set("v.checkedList", myList);
                console.log('myList ::'+myList);
            }
        });
        $A.enqueueAction(action);
    },
    
    //Get the values from the CheckBox 
    onChecked : function(component,event,helper){
        //Returns true or false
        var currentSelectedValue = event.getSource().get("v.value");
        // Returns Id of the record
        var currentSelectedIndex = event.getSource().get("v.name");
        //modification valeurs checkedList
        var checkedList = component.get("v.checkedList");
     	checkedList[parseInt(currentSelectedIndex)] = currentSelectedValue;
        component.set("v.checkedList",checkedList);
    },
    
    handleClick : function(component, event, helper) {     
    	//CHECKBOX
        var checkedList = component.get("v.checkedList");
        var products = component.get("v.products");
        for(var i = 0; i < component.get("v.oppLength"); i++){
            if(checkedList[i]){
                var id = products[i].Id;
                var name = products[i].Name;
                var action = component.get("c.getProduct");
        		action.setParams({
            		prodId : id
        		});
                var listIDchecked = component.get("v.checkedProduct");
            	var listID = component.get("v.IDList");
        		var listName = component.get("v.NameList");                      
            	listID.push(id);
            	listName.push(name);
            	component.set("v.IDList",listID);
            	component.set("v.NameList", listName);
                action.setCallback(this, function(response){
            		var state = response.getState();
       				if (state === "SUCCESS") {
            			var prod = response.getReturnValue();
                        listIDchecked.push(prod);
                		component.set("v.checkedProduct", listIDchecked);
                  	}
        		});
        		$A.enqueueAction(action);   
            }
        }
        component.set("v.saved", true);
        
        //Initialize the second form and Display the Product Name 
        component.set('v.columns', [
            {label: 'PRODUCT', fieldName: 'Name', type: 'text' ,editable: false},
            {label: 'QUANTITY', fieldName: 'Quantity', type: 'number' ,editable: true, cellAttributes: { class: {  }}}
        ]);
        
    },
    
    backButton : function (component, event, helper) {
        var checkedList = component.get("v.checkedList");
        console.log("checkedList ::" + checkedList);
        var newList = [];
        component.set("v.checkedProduct", newList);
        for(var i = 0; i < checkedList.length; i++){
            if(checkedList[i] === true){
                checkedList[i] === false;
            }
        }
       	component.set("v.saved", false);
   	},
    
    // Save the input values in Opp Product object
    onSave : function (component, event, helper) {
       helper.saveProducts(component, event, helper);
   },
    
    /* The search bar */
    searchField : function(component, event, helper) {
        if (event.which == 13){
            alert('Enter key pressed');
        var currentText = event.getSource().get("v.value");
        var resultBox = component.find('resultBox');
        /*component.set("v.LoadingText", true);
        if(currentText.length > 0) {
            $A.util.addClass(resultBox, 'slds-is-open');
        }
        else {
            $A.util.removeClass(resultBox, 'slds-is-open');
        }*/
        var action = component.get("c.getResults");
        action.setParams({
            "oppid" : component.get("v.recordId"),
            "value" : currentText
        });
        
        action.setCallback(this, function(response){
            var state = response.getState();
       		if (state === "SUCCESS") {
            	var products = response.getReturnValue();
                console.log("products ::" + products);
            	component.set("v.products", products);
                component.set("v.oppLength", products.length);
                var myList = [];
                var parsed = parseInt(component.get("v.oppLength"));
       			for (var i = 0; i < parsed; i++) myList[i] = false;
                component.set("v.checkedList", myList);
                console.log("myList ::" + myList);
            } else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                                    errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
        
        $A.enqueueAction(action);
        }
    },
    
    setSelectedRecord : function(component, event, helper) {
        var currentText = event.currentTarget.id;
        var resultBox = component.find('resultBox');
        $A.util.removeClass(resultBox, 'slds-is-open');
        console.log("currentText ::" + currentText);
        console.log("resultBox ::" + resultBox);
        /* put the result in the search bar */
        //component.set("v.selectRecordName", event.currentTarget.dataset.name);
        //component.set("v.selectRecordId", currentText);
        //component.find('userinput').set("v.readonly", true);
        /* End put the result in the search bar */
        
        
    },
    
    resetData : function(component, event, helper) {
        component.set("v.selectRecordName", "");
        component.set("v.selectRecordId", "");
        component.find('userinput').set("v.readonly", false);
    }
    /* END The search bar */
})