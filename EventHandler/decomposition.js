//Order instances stands for order document
var dataOrder = process.processOrder;
var basket = dataOrder.getHelper().catalogBasket;

var CFSS = basket.getItemByType("CustomerFacingServiceSpec");
var CFSS_action = null;

var workFlows = new Array();
var workFlowsCFSS = new Array();

for (var i = 0; i < CFSS.length; i++) {
  CFSS_action = CFSS[i].action;
  theCatalog.setCatalogBasketItem(CFSS[i]);
  var itemAction = CFSS[i].catalogItem.getItemActions(CFSS_action.toUpperCase());

  for (var k = 0; k < itemAction.length; k++) {
    if (itemAction[k].isEligible() == true) {
      //in jaawwy project they are using the process document in common
      var processDoc = new Document("Task01.processDocument");

      processDoc.workFlow = itemAction[k].getImplementationValue();
      processDoc.save();
      //to start the subFlow use process.startSubProcess
      var processid = Process.startSubProcess(processDoc.workFlow,process.id, processDoc);
    }
  }
}