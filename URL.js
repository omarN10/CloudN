var dataOrder = process.processOrder;
var basket = dataOrder.getHelper().catalogBasket;
/*var PS_MSISDN                 = common.getPSFromTlxItemBeingProcessedId(process);
var PO_MSISDN                = eoc_commons.getParentPOItemByBasketItemId(dataOrder, PS_MSISDN.id);
var PO_SIM                         = common.getPO_SIMFromMSISDNPOId(process, PO_MSISDN.basketitemid);
/*
var MSISDNProcessId            = common.getMSISDNProcessFromPSMSISDNId(PO_MSISDN.getAllChildren(false)[0].id);
var MSISDNProcess              = Process.getProcessInfo(MSISDNProcessId);
*/
//var msisdn = PO_MSISDN.msisdnNumber;
var orderId = dataOrder.id;
//var mapRequest                         = new DataStructure("sugarCRM.POST_createTelcoOder_InputMessage");
var mapRequest = document; // new DataStructure("party.Individual_Create");
var requestId                       = jawwyOM.createUUID();
var processIdExt                    = jawwyOM.fullConvertDateToString(new Date(), true);// To be checked
var globalTransactionId = orderId;
/*==========================================================================***********************************************=======================================================================*/
var url         = Config.getServiceLocation('sugarCRM.Customer_x0020_Management','default_Port');
UserProfile.setInterfaceLocation(url + 'address');
var globalTransactionId = orderId;
var headers =  common.generateRequestHeader(dataOrder);
UserProfile.setInterfaceHttpHeaders(headers);
mapRequest                                       = sugarCRM.populateCreateAddress(mapRequest, process);
//mapRequest.action                                = common.getExternalConstantValue("ESB_022","action","MAP");
//mapRequest.subAction                             = common.getExternalConstantValue("ESB_022","subAction","PRE_PAIRING_BLANKSIM");

var processIdExt=jawwyOM.fullConvertDateToString(new Date(), true);// To be checked
common.upsertMessageLog(UserProfile.getMsgLogDoc(),process,null,process.processOrder.id,'createContact_ESB_108',processIdExt);
/*
var msgLogDataDoc                                 = new Document("common.messageLog");
msgLogDataDoc.messageID                       = UserProfile.nextMessageLogId();
msgLogDataDoc                                 = common.upsertMessageLog(UserProfile.getMsgLogDoc(),MSISDNProcess,null,MSISDNProcess.processOrder.id,'ManageMSISDNStatus',processIdExt);
var data                                          = mapRequest.toJson();
var msgLogDataDoc = UserProfile.getMsgLogDoc();
common.updateMessageLogDoc2(msgLogDataDoc, process, dataOrder.id, "ManageMSISDNStatus", response);
*/
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  Global.logInfo("ESB_117 Request:" + mapRequest.toXML());
return mapRequest;