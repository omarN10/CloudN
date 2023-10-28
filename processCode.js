var dataOrder = process.processOrder;
var basket = dataOrder.getHelper().catalogBasket();
var CFSS = basket.getItemByType("Customer FacingServiceSpec");
var CFSS_action = null;

var workFlows = new Array();
var workFlowsPs = new Array();

for (var i = 0; i < CFSS.length; i++) {
  CFSS_action = CFSS[i].action;

  theCatalog.setCatalogBasketItem(CFSS[i]);
  var itemAction = CFSS[i].catalogItem.getItemActions(CFSS_action.toUpperCase());
  for (var k = 0; k < itemAction.length; k++) {
    if (itemAction[k].isEligible()==true) {
        var processDoc = new Document("cwt_om.processDocument");
        processDoc.workFlows= itemAction[k].getImplementationValue();
        processDoc.save();
        //to run a process
        var processid = Process.startSubProcess(processDoc.workFlows,process.id,processDoc);
    }
  }
  
}
