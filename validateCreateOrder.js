//get attrs from json request
var attrs = request.attrs;
//get orderItems from json request
var orderIems = request.orderIems;

var configurePO = false;
var isCustomer = false;
for(var i = 0; i< attrs.length; i++){
    if(attrs[i].name == "Bandwidth"){
        isCustomer= true;
    }

}
if(!isCustomer){
    return createError("Please a Customer name", null, "relatedParties is not Customer");
}
//Task 1 Q3.a. Validate if the category of PO is “INTERNET” then attribute “bandwidth” must be passed under the PO in createOrder request
//loop in orderItems
for (var i = 0; i < orderIems.length; i++) {
    var item = orderIems[i].item;
    //get productOffering id
    var productOfferingId = item.productOffering.id;
    //getItem from catalog
    var catItem = theCatalog.getItem(productOfferingId);

    //check if the catalog item is empty or not
    if(catItem !=null){
        //check product category
        var productCategory = null;
        if (catItem.attributeExists('productCategory ')) {
            productCategory =catItem.productCategory.getDefaultValue();
        }
        //check if the productCategory == "INTERNET"
        if(productCategory == "INTERNET"&& item.action=="Add"){
            var configurePO = true ;
        }

    }
}


//function to return error
function createError(paramName, paramValue, desc) {

    return eoc_commons.createAPIFault(null, "400", "EOC_ERROR_1002", [paramName, paramValue], desc);

}



//for (var i = 0; i < orderItems.length; i++) {
  //var item = orderItems[i].item;
  //var productOfferingId = item.productOffering.id;
  //var catItem = theCatalog.getItem(productOfferingId);

  //create variable to check the type
  //var requestType = item.relatedEntities.type;
  //if (requestType == "Account") {
    //return true;
  //} else {
    //return createError("Action", null, "requestType is not Account");
    //return false;
  //}
//}
//a.      Validate if the category of PO is “INTERNET” then attribute “bandwidth” must be passed under the PO in createOrder request

//for (var i = 0; i < orderItems.length; i++) {
//  var item = orderItems[i].item;
//  var po = item.productOffering;
//  if(po =="INTERNET"){

//  }
//}
//trigger the createOrderProcess