//request

var orderItems = request.orderItems;

for (var i = 0; i < orderItems.length; i++) {
  var item = orderItems[i].item;
  var productOfferingId = item.productOffering.id;
  var catItem = theCatalog.getItem(productOfferingId);

  //create variable to check the type
  var requestType = item.relatedEntities.type;
  if (requestType == "Account") {
    return true;
  } else {
    return createError("Action", null, "requestType is not Account");
  }
}

//a.	Validate if the category of PO is “INTERNET” then attribute “bandwidth” must be passed under the PO in createOrder request
for (var i = 0; i < orderItems.length; i++) {
  var item = orderItems[i].item;
  var productOfferingId = item.productOffering;
  if (po == "INTERNET") {
  }
}
