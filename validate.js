//validateCreateORder requestedCompletionDate
/*
 * This script validates the createOrder request parameters as per their usage in fulfillment process based on orderRequestType and orderRequestSubType
 * and creates API fault if any mandatory parameter is missing
 */

var isMobileDevice = false;
var tempFlagIsStadard = false;
var tempFlagIsPickup = false;
var isAccountManagementPO = false;
var isModifyMobileLinePO = false;
var isTransferOwnershipUC = false;
var modifyMobileLinePO = null;

var resumeMobileLinePO = false;
var CardsNCodesPO = false;
var CardsNCodesUC = false;
var resumeSubscription_UC_Flag = false;
var simSwap_PO_Flag = false;
var simSwapSubscriptionCorrelationId = new Array();
var simSwapBundlPO_Flag = false;
var esimSwapBundlPO_Flag = false;
var simSwap_UC_Flag = false;
var simSwapAssisted_UC_Flag = false;
var esimSwapUCFlag = false;

var simSwapPOArr = new Array();
var suspendSubscription = false;
var renewalSubsription = false;
var configureSubscription = false;
var msisdn_PO = false;
var sim_PO = false;
var esim_PO = false;
var recharge_PO = false;
var shipping_PO = false;
var isMobileLine = false;
var setRecurrence_PO = false;
var mobileLineOrderItemArr = new Array();
var orderItems = request.orderItems;
var setRecurrencesmobileLinePO = false;
var setRecurrenseSubscriberLevel = false;
var configurePO = false;
var configurePOArr = new Array();
var subscriberLevelPO = false;
var subscriberLevelPOArr = new Array();
var accountLevelPO = false;
var accountLevelPOArr = new Array();
var upgradeDowngradeMOD = false;
var renewalPOArr = new Array();
var upgradeDowngradeDelete = false;
var upgradeDowngradeAdd = false;
var sharingLimitPO = false;
var sharingLimitProductUsageSpecId = false;
var sharingLimitValueType = false;
var sharingLimitSubscriptionCorrelationId = false;
var isSetShareLimitExsist = false;
var isSetShareRecipientExsist = false;
var sharingLimitRecipientFlags = new Array();
var allowSettingSharingLimits = false;
var sharingLimitOfferInstanceId = false;
var sharingLimitFlags = new Array();
var updownRefArr = new Array();
var updownBYOPInstanceId = false;
var updownBYOPApplyChangeNextCycle = false;
var updownBYOPSubscriptionCorrelation = false;
var updowngradeBYOPLANDelSubscriptionSubCorrelationId = false;
var updowngradeBYOPLANAddSubscriptionSubCorrelationId = false;
var updownRef = false;
var updownRefDEL = false;
var updownRefArrDEL = false;
var updownRole = false;
var updownRoleDEL = false;
var updownRoleArr = new Array();
var updownRoleArrDEL = new Array();
var donorOperatorValidation = false;
var planStartDatePO = false;
var planStartDateSubscriptionCorrelationId = false;
var planStartDateOfferInstanceId = false;
var planStratDateSubscriberLevelPO = false;
var planStratDateMobileLinePO = false;
var planStratDateSubscriptionCorrelationId = false;
var planStratDateSubscriptionIdML = false;
var planStratDateSubscriptionCorrelationIdML = false;
var bundlPOId = null;
var simSwapBundlPO = null;
var sourceOrganizationId = null;
var walletSharingUC = false;
var flagWalletCreditLimit = false;
var flagPaygEnablement = false;
var mnpPortOutPO = false;
var walletSharingArr = new Array();
var MNPPortoutportReqFormID = false;
var MNPPortoutportReqFormValue = null;
var MNPPortoutSubscriptionCorrelationId = false;
var portInUC = false;
var portInAssistedUC = false;
var portInMsisdn = false;
var editSimAlisPO = false;
var simAliasSubscriptionCorrelationId = false;
var simAliasSubscriptionId = false;
var simAliasMsisdn = false;
var simAliasAttribute = false;
var simAliasAction = false;
var terminateSubscriptionPO = false;
var terminateSubscriptionAction = false;
var terminateSubscriptionSubCorrelationId = false;
var terminateSubscriptionSubscriptionId = false;
var terminateSubscriptionImsi = false;
var terminateSubscriptionIccid = false;
var terminateSubscriptionMsisdn = false;
var newActivationOffline = false;
var deleteSubscription = false;
var isWalkinPO = false;
var transfer2AcctUC, isNewAccount, acctTransferReason, modifyMobileLine, childOfMobileLine;
var esimIccid = false;
var esimSubcriptionCorrelation = false;
var esimActivationCode = false;
var adjustmentCode = false;
var Adjust_WalletPO = false;

//usage Restrictions intl. barring
var usageRestrictionsLite = false;
//usage Restrictions intl. barring

var terminateAccountUC = false;

//var itemEsim;

var mobileSubscriptionCorrelationId = false, mobileSubscriptionId = false, mobileImsi = false, mobileIccid = false, mobileMsisdn = false, mobileActionReason = false, isSourceAccountAdmin = false, transferSubscriptionCorrelationId = false, transferSourceAccountId = false, isAdminTrans;
for (var i = 0; i < orderItems.length; i++) {
    var item = orderItems[i].item;
    var productOfferingId = item.productOffering.id;
    var catItem = theCatalog.getItem(productOfferingId);
    //catItem not empty
    if (catItem != null) {

        var accountAction = null;
        if (catItem.attributeExists('accountAction'))
            accountAction = catItem.accountAction.getDefaultValue();
        var productCategory = null;
        if (catItem.attributeExists('productCategory'))
            productCategory = catItem.productCategory.getDefaultValue();
        //var productCategory = theCatalog.getItem(productOfferingId).productCategory.getDefaultValue();
        if ((productCategory == common.constants().CONSTANTS.PRODUCT_CATEGORY.Combo_Plan_Offer ||
            productCategory == common.constants().CONSTANTS.PRODUCT_CATEGORY.ALLOWANCE_ADDON ||
            productCategory == common.constants().CONSTANTS.PRODUCT_CATEGORY.BYOP ||
            productCategory == common.constants().CONSTANTS.PRODUCT_CATEGORY.CardsNCodes ||
            productCategory == common.constants().CONSTANTS.PRODUCT_CATEGORY.REWARDCOUPON


        ) &&
            item.action == common.constants().CONSTANTS.PRODUCT_ACTION.ADD) {
            configurePO = true;
            configurePOArr.push(orderItems[i].item);
        }

        //usage Restrictions intl. barring validation

        //barring int calls / sms
        if ((productCategory == common.constants().CONSTANTS.PRODUCT_CATEGORY.INCOMING_INT_VOICE_BAR
            || productCategory == common.constants().CONSTANTS.PRODUCT_CATEGORY.INCOMING_INT_SMS_BAR
        ) && (item.action.toUpperCase() == common.constants().CONSTANTS.PRODUCT_ACTION.ADD || item.action == common.constants().CONSTANTS.PRODUCT_ACTION.DELETE)) {
            usageRestrictionsLite = true;
        }
        //usage Restrictions intl. barring validation

        if (catItem.attributeExists('provisioningType') && productCategory == common.constants().CONSTANTS.PRODUCT_CATEGORY.Mobile_Line_Offer && item.action == common.constants().CONSTANTS.PRODUCT_ACTION.MODIFY) {
            isModifyMobileLinePO = true;
            modifyMobileLinePO = item;
        }
        if (catItem.attributeExists('provisioningType') && productCategory == common.constants().CONSTANTS.PRODUCT_CATEGORY.TRANSFER_OWNERSHIP && item.action == common.constants().CONSTANTS.PRODUCT_ACTION.ADD) {
            isAccountManagementPO = true;
        }
        if (catItem.attributeExists('provisioningType') && catItem.provisioningType.getDefaultValue() == 'SUBSCRIPTION' && productCategory == common.constants().CONSTANTS.PRODUCT_CATEGORY.Mobile_Line_Offer &&
            item.action == common.constants().CONSTANTS.PRODUCT_ACTION.RESUME) {
            resumeMobileLinePO = true;
        }
        if (catItem.attributeExists('provisioningType') && catItem.provisioningType.getDefaultValue() == 'SUBSCRIPTION' && productCategory != common.constants().CONSTANTS.PRODUCT_CATEGORY.Mobile_Line_Offer) {
            subscriberLevelPO = true;
            subscriberLevelPOArr.push(item);
        }
        if (catItem.attributeExists('provisioningType') && catItem.provisioningType.getDefaultValue() == 'ACCOUNT' && productCategory != common.constants().CONSTANTS.PRODUCT_CATEGORY.Mobile_Line_Offer) {
            accountLevelPO = true;
            accountLevelPOArr.push(item);
        }

        if ((productCategory == common.constants().CONSTANTS.PRODUCT_CATEGORY.PLAN ||
            productCategory == common.constants().CONSTANTS.PRODUCT_CATEGORY.ALLOWANCE_ADDON ||
            productCategory == common.constants().CONSTANTS.PRODUCT_CATEGORY.BYOP) &&
            item.action == common.constants().CONSTANTS.PRODUCT_ACTION.RENEW) {
            renewalPOArr.push(item);
            renewalSubsription = true;
        }
        if (productCategory == 'TRANSFER_SUBSCRIPTION' && item.action == common.constants().CONSTANTS.PRODUCT_ACTION.ADD) {
            transfer2AcctUC = true;
        }
        if (productCategory == common.constants().CONSTANTS.PRODUCT_CATEGORY.ADJUST_WALLET && item.action == common.constants().CONSTANTS.PRODUCT_ACTION.ADD) {
            Adjust_WalletPO = true;
        }


        if (productCategory == common.constants().CONSTANTS.PRODUCT_CATEGORY.MSISDN && item.action == common.constants().CONSTANTS.PRODUCT_ACTION.ADD) {
            msisdn_PO = true;

            if (catItem && catItem.attributeExists('isPortIn') && catItem.isPortIn.getDefaultValue() == true) {
                portInMsisdn = true;

                if (catItem && catItem.attributeExists('numberClass') && catItem.numberClass.getDefaultValue() == 'PORTIN') {
                    donorOperatorValidation = true;
                }
            }


        }
        else if (productCategory == common.constants().CONSTANTS.PRODUCT_CATEGORY.SIM && item.action == common.constants().CONSTANTS.PRODUCT_ACTION.ADD) {
            sim_PO = true;
        } else if (productCategory == common.constants().CONSTANTS.PRODUCT_CATEGORY.ESIM && item.action == common.constants().CONSTANTS.PRODUCT_ACTION.ADD) {
            esim_PO = true;
            //itemEsim = item;
            for (var esimCount = 0; esimCount < item.product.productCharacteristics.length; esimCount++) {
                if (item.product.productCharacteristics[esimCount].name != null
                    && item.product.productCharacteristics[esimCount].name == 'iccid'
                    && item.product.productCharacteristics[esimCount].value != null && item.product.productCharacteristics[esimCount].value != '') {
                    esimIccid = true;
                }
                if (item.product.productCharacteristics[esimCount].name != null
                    && item.product.productCharacteristics[esimCount].name == 'SubscriptionCorrelationId'
                    && item.product.productCharacteristics[esimCount].value != null && item.product.productCharacteristics[esimCount].value != '') {
                    esimSubcriptionCorrelation = true;
                }
                if (item.product.productCharacteristics[esimCount].name == common.constants().CONSTANTS.PRODUCT_CHARACTERISTICS.activationCode
                    && item.product.productCharacteristics[esimCount].value != ""
                    && item.product.productCharacteristics[esimCount].value != null) {
                    esimActivationCode = true;
                }
            }

        } else if (productCategory == common.constants().CONSTANTS.PRODUCT_CATEGORY.SIM_SWAP_Bundle && item.action == common.constants().CONSTANTS.PRODUCT_ACTION.ADD) {
            simSwapBundlPO_Flag = true;
            simSwapBundlPO = item;
            bundlPOId = item.id;
        } else if (productCategory == common.constants().CONSTANTS.PRODUCT_CATEGORY.ESIM_SWAP_Bundle && item.action == common.constants().CONSTANTS.PRODUCT_ACTION.ADD) {
            esimSwapBundlPO_Flag = true;
            simSwapBundlPO = item;
            bundlPOId = item.id;
        } else if ((productCategory == common.constants().CONSTANTS.PRODUCT_CATEGORY.SIM_SWAP || productCategory == common.constants().CONSTANTS.PRODUCT_CATEGORY.ESIM_SWAP) && item.action == common.constants().CONSTANTS.PRODUCT_ACTION.ADD) {
            simSwap_PO_Flag = true;
            for (var simSwapCount = 0; simSwapCount < item.product.productCharacteristics.length; simSwapCount++) {
                if (item.product.productCharacteristics[simSwapCount].name != null
                    && item.product.productCharacteristics[simSwapCount].name == common.constants().CONSTANTS.PRODUCT_CHARACTERISTICS.SubscriptionCorrelationId
                    && item.product.productCharacteristics[simSwapCount].value != null && item.product.productCharacteristics[simSwapCount].value != '') {
                    simSwapSubscriptionCorrelationId.push(item.product.productCharacteristics[simSwapCount].value);
                }
            }
        } else if (productCategory == common.constants().CONSTANTS.PRODUCT_CATEGORY.Recharge && item.action == common.constants().CONSTANTS.PRODUCT_ACTION.ADD) {
            recharge_PO = true;
        }
        /*else if (productCategory == common.constants().CONSTANTS.PRODUCT_CATEGORY.CardsNCodes && item.action == common.constants().CONSTANTS.PRODUCT_ACTION.ADD) {
            CardsNCodesPO = true;
        }*/
        else if (productCategory == common.constants().CONSTANTS.PRODUCT_CATEGORY.Shipping && item.action == common.constants().CONSTANTS.PRODUCT_ACTION.ADD) {

            if (catItem.attributeExists('isWalkin') && catItem.isWalkin.getDefaultValue() == true)
                isWalkinPO = true;

            shipping_PO = true;
            simSwapPOArr.push(item.productOffering.id);
            if (item.productOffering.id == "STANDARD") {
                tempFlagIsStadard = true;
            } else if (item.productOffering.id == "PICKUP") {
                tempFlagIsPickup = true;
            }
        } else if (productCategory == common.constants().CONSTANTS.PRODUCT_CATEGORY.Mobile_Line_Offer && item.action == common.constants().CONSTANTS.PRODUCT_ACTION.NO_CHANGE) {
            isMobileLine = true;
            mobileLineOrderItemArr.push(orderItems[i].item);
        } else if (productCategory == common.constants().CONSTANTS.PRODUCT_CATEGORY.Mobile_Line_Offer && item.action == common.constants().CONSTANTS.PRODUCT_ACTION.SUSPEND) {
            suspendSubscription = true;
        } else if (productCategory == common.constants().CONSTANTS.PRODUCT_CATEGORY.WALLET_CREDIT_LIMIT && (item.action.toUpperCase() == common.constants().CONSTANTS.PRODUCT_ACTION.ADD.toUpperCase() || item.action.toUpperCase() == common.constants().CONSTANTS.PRODUCT_ACTION.DEL.toUpperCase() || item.action.toUpperCase() == common.constants().CONSTANTS.PRODUCT_ACTION.DELETE.toUpperCase())) {
            flagWalletCreditLimit = true;
            // if(item.action.toUpperCase() == common.constants().CONSTANTS.PRODUCT_ACTION.ADD.toUpperCase())
            walletSharingArr.push(orderItems[i].item);
        } else if (productCategory == common.constants().CONSTANTS.PRODUCT_CATEGORY.PAYG_ENABLEMENT && (item.action.toUpperCase() == common.constants().CONSTANTS.PRODUCT_ACTION.ADD.toUpperCase() || item.action.toUpperCase() == common.constants().CONSTANTS.PRODUCT_ACTION.DEL.toUpperCase() || item.action.toUpperCase() == common.constants().CONSTANTS.PRODUCT_ACTION.DELETE.toUpperCase())) {
            flagPaygEnablement = true;
            walletSharingArr.push(orderItems[i].item);
        } else if (item.product != null) {
            var productCharacteristics = item.product.productCharacteristics;

            if (item.product.productCharacteristics != null) {

                for (var w = 0; w < productCharacteristics.length; w++) {

                    if (productCharacteristics[w].name != null && productCharacteristics[w].name == "setRecurrence") { //&& item.action == "Modify" how can i diffrentiate Mobile Line offer

                        if (productCategory != common.constants().CONSTANTS.PRODUCT_CATEGORY.Mobile) {
                            if (item.action.toUpperCase() != "MODIFY")
                                return createError("Action", null, "item.action setRecurrence not Modify");
                        }

                        if (productCharacteristics[w].value != null && (productCharacteristics[w].value == "ENABLE" || productCharacteristics[w].value == "DISABLE"))
                            setRecurrence_PO = true;

                        if (catItem.attributeExists('provisioningType') && catItem.provisioningType.getDefaultValue() == "SUBSCRIPTION") {
                            setRecurrenseSubscriberLevel = true;
                        }

                    }
                }
            }
        }

        //Upgradegrade/Downgrade

        if (productCategory != null && productCategory == common.constants().CONSTANTS.PRODUCT_CATEGORY.BYOP) {

            if (item.action == common.constants().CONSTANTS.PRODUCT_ACTION.MODIFY) {
                upgradeDowngradeMOD = true;
            }
        }
        if (productCategory != null && productCategory == common.constants().CONSTANTS.PRODUCT_CATEGORY.BYOP_PACKAGE) {
            if (item.action == common.constants().CONSTANTS.PRODUCT_ACTION.DELETE) {
                upgradeDowngradeDelete = true;
            } else if (item.action == common.constants().CONSTANTS.PRODUCT_ACTION.ADD) {
                upgradeDowngradeAdd = true;
            }
        }
        // Sharing Limit
        if (item.action == common.constants().CONSTANTS.PRODUCT_ACTION.ADD) {
            if (catItem.attributeExists('OfferCapability') && catItem.OfferCapability != null && catItem.OfferCapability.getDefaultValue() == "SET_SHARING_LIMITS") {
                if (productCategory != null && productCategory == "SERVICE_CHANGE_OFFER") {
                    sharingLimitPO = true;
                }
            }
        }

        if (item.product != null) {
            if (item.product.productCharacteristics != null) {
                for (var j = 0; j < item.product.productCharacteristics.length; j++) {
                    if (item.action == common.constants().CONSTANTS.PRODUCT_ACTION.ADD) {
                        if (productCategory != null && productCategory == common.constants().CONSTANTS.PRODUCT_CATEGORY.BYOP_PACKAGE) {
                            if (item.product.productCharacteristics[j].name != null && item.product.productCharacteristics[j].name == "SubscriptionCorrelationId" && item.product.productCharacteristics[j].value != null && item.product.productCharacteristics[j].value != '') {
                                updowngradeBYOPLANAddSubscriptionSubCorrelationId = true;
                            }

                            if (item.relatedOrderItems == null || item.relatedOrderItems.length == 0) {
                                updownRole = true;
                                updownRef = true;
                            }

                            if (item.relatedOrderItems != null || item.relatedOrderItems.length > 0) {
                                var relatedOrderItems = item.relatedOrderItems;
                                for (var r = 0; r < relatedOrderItems.length; r++) {
                                    if (relatedOrderItems[r].role == null || relatedOrderItems[r].role == '')
                                        updownRole = true;
                                    else
                                        updownRoleArr.push(relatedOrderItems[r].role);
                                    if (relatedOrderItems[r].reference == null || relatedOrderItems[r].reference == '')
                                        updownRef = true;
                                    else
                                        updownRefArr.push(relatedOrderItems[r].reference);
                                }

                            }
                        }
                        if (item.product.productCharacteristics[j].name != null && item.product.productCharacteristics[j].name == "productUsageSpecId") {
                            sharingLimitProductUsageSpecId = true;
                        } else if (item.product.productCharacteristics[j].name != null && item.product.productCharacteristics[j].name == "sharingLimitValueType" && (item.product.productCharacteristics[j].value == "PERCENT" || item.product.productCharacteristics[j].value == "ABSOLUTE")) {
                            sharingLimitValueType = true;
                        }
                        for (var k = 1; k <= 5; k++) {
                            var concatLimitNum = "limit" + k.toString();
                            //var concatRecipient = "recipient" + k.toString();
                            var concatRecipient = "recipientMSISDN" + k.toString();
                            if (item.product.productCharacteristics[j].name == concatLimitNum || item.product.productCharacteristics[j].name == concatRecipient != null) {
                                if (item.product.productCharacteristics[j].name == concatLimitNum && item.product.productCharacteristics[j].value != null) {
                                    sharingLimitFlags.push(concatLimitNum);
                                }
                                if (item.product.productCharacteristics[j].name == concatRecipient && item.product.productCharacteristics[j].value != null) {
                                    sharingLimitRecipientFlags.push(concatRecipient);
                                }
                            }
                        }
                    } else if (item.action == common.constants().CONSTANTS.PRODUCT_ACTION.NO_CHANGE) {
                        if (item.product.productCharacteristics[j].name != null && item.product.productCharacteristics[j].name == "SubscriptionCorrelationId" && item.product.productCharacteristics[j].value != null) {
                            sharingLimitSubscriptionCorrelationId = true;
                        }
                        if (item.product.productCharacteristics[j].name != null && item.product.productCharacteristics[j].name == "offerInstanceId" && item.product.productCharacteristics[j].value != null) {
                            sharingLimitOfferInstanceId = true;
                        }
                        /*if (catItem.attributeExists('allowSettingSharingLimits') && catItem.allowSettingSharingLimits != null) {
                        if (catItem.allowSettingSharingLimits.getDefaultValue() == "TRUE" || catItem.allowSettingSharingLimits.getDefaultValue() == 1) {
                        allowSettingSharingLimits = true;
                        }
                        }*/
                    }
                }
            }
        }
        //End Sharing Limit

        //Start Account managment configure plan start date
        if (item.product != null) {
            if (item.product.productCharacteristics != null) {

                for (var ind = 0; ind < item.product.productCharacteristics.length; ind++) {
                    if (productCategory != null && (productCategory == common.constants().CONSTANTS.PRODUCT_CATEGORY.PLAN ||
                        productCategory == common.constants().CONSTANTS.PRODUCT_CATEGORY.ALLOWANCE_ADDON || productCategory == common.constants().CONSTANTS.PRODUCT_CATEGORY.BYOP ||
                        productCategory == common.constants().CONSTANTS.PRODUCT_CATEGORY.PROMOTION)) {
                        if (item.action != null && item.action == "Modify") {

                            if (productCategory != null && productCategory == common.constants().CONSTANTS.PRODUCT_CATEGORY.BYOP) {
                                if (item.product.productCharacteristics[ind].name != null && item.product.productCharacteristics[ind].name == "SubscriptionCorrelationId" && item.product.productCharacteristics[ind].value != null && item.product.productCharacteristics[ind].value != '') {
                                    updownBYOPSubscriptionCorrelation = true;
                                }
                                if (item.product.productCharacteristics[ind].name != null && item.product.productCharacteristics[ind].name == "applyChangeNextCycle" && item.product.productCharacteristics[ind].value != null && item.product.productCharacteristics[ind].value != '') {
                                    updownBYOPApplyChangeNextCycle = true;
                                }
                                if (item.product.productCharacteristics[ind].name != null && item.product.productCharacteristics[ind].name == "offerInstanceId" && item.product.productCharacteristics[ind].value != null && item.product.productCharacteristics[ind].value != '') {
                                    updownBYOPInstanceId = true;
                                }
                            }

                            if (item.product.productCharacteristics[ind].name != null && item.product.productCharacteristics[ind].name == "actionReason" &&
                                item.product.productCharacteristics[ind].value == common.constants().CONSTANTS.PRODUCT_ACTION_REASON.ACTIVATE_NOW) {
                                planStartDatePO = true;
                            }
                            if (item.product.productCharacteristics[ind].name != null && item.product.productCharacteristics[ind].name == "SubscriptionCorrelationId" && item.product.productCharacteristics[ind].value != null) {
                                planStartDateSubscriptionCorrelationId = true;
                            }
                            if (item.product.productCharacteristics[ind].name != null && item.product.productCharacteristics[ind].name == "offerInstanceId" && item.product.productCharacteristics[ind].value != null) {
                                planStartDateOfferInstanceId = true;
                            }
                            if (catItem.attributeExists('provisioningType') && catItem.provisioningType.getDefaultValue() == 'SUBSCRIPTION' && productCategory == common.constants().CONSTANTS.PRODUCT_CATEGORY.Mobile_Line_Offer) {
                                planStratDateSubscriberLevelPO = true;
                            }
                        }
                    }
                    if (productCategory == common.constants().CONSTANTS.PRODUCT_CATEGORY.Mobile_Line_Offer && item.action == common.constants().CONSTANTS.PRODUCT_ACTION.NO_CHANGE) {
                        planStratDateMobileLinePO = true;
                        if (item.product.productCharacteristics[ind].name != null && item.product.productCharacteristics[ind].name == "SubscriptionCorrelationId" && item.product.productCharacteristics[ind].value != null) {
                            planStratDateSubscriptionCorrelationIdML = true;
                        }
                        if (item.product.productCharacteristics[ind].name != null && item.product.productCharacteristics[ind].name == "subscriptionId" && item.product.productCharacteristics[ind].value != null) {
                            planStratDateSubscriptionIdML = true;
                        }
                    }
                    if (productCategory == 'TRANSFER_SUBSCRIPTION' && item.action.toUpperCase() == 'ADD') {
                        if (item.product.productCharacteristics[ind].name != null && item.product.productCharacteristics[ind].name == "SubscriptionCorrelationId" && item.product.productCharacteristics[ind].value != null) {
                            transferSubscriptionCorrelationId = true;
                        }
                        if (item.product.productCharacteristics[ind].name != null && item.product.productCharacteristics[ind].name == "sourceAccountId" && item.product.productCharacteristics[ind].value != null) {
                            transferSourceAccountId = true;
                        }
                    }
                    // changed related to EVO-782
                    if (productCategory == common.constants().CONSTANTS.PRODUCT_CATEGORY.Mobile_Line_Offer && item.action == common.constants().CONSTANTS.PRODUCT_ACTION.MODIFY) {
                        if (item.product.productCharacteristics[ind].name != null && item.product.productCharacteristics[ind].name == "isAdmin" && item.product.productCharacteristics[ind].value != null && item.product.productCharacteristics[ind].value != false) {
                            isAdminTrans = true;
                        }
                    }

                }
            }
        }

        //End Account managment configure plan start date

        //start mnp port out
        if (productCategory == common.constants().CONSTANTS.PRODUCT_CATEGORY.PORTOUT && item.action == common.constants().CONSTANTS.PRODUCT_ACTION.ADD) {
            mnpPortOutPO = true;
            if (item.product != null) {
                if (item.product.productCharacteristics != null) {
                    for (var index = 0; index < item.product.productCharacteristics.length; index++) {
                        if (item.product.productCharacteristics[index].name != null && item.product.productCharacteristics[index].name == "portID" && item.product.productCharacteristics[index].value != null) {
                            MNPPortoutportReqFormID = true;
                            MNPPortoutportReqFormValue = item.product.productCharacteristics[index].value;
                        }

                        if (item.product.productCharacteristics[index].name != null && item.product.productCharacteristics[index].name == "SubscriptionCorrelationId" && item.product.productCharacteristics[index].value != null) {
                            MNPPortoutSubscriptionCorrelationId = true;
                        }
                    }
                }
            }
        }
        // start edit sim alis
        if (productCategory == common.constants().CONSTANTS.PRODUCT_CATEGORY.Mobile_Line_Offer) {

            if (item.product != null) {
                if (item.product.productCharacteristics != null) {
                    for (var index = 0; index < item.product.productCharacteristics.length; index++) {
                        if (item.product.productCharacteristics[index].name != null && item.product.productCharacteristics[index].name == "actionReason"
                            && item.product.productCharacteristics[index].value == common.constants().CONSTANTS.PRODUCT_ACTION_REASON.EDIT_SIMALIAS) {
                            editSimAlisPO = true;
                        }
                        if (item.product.productCharacteristics[index].name != null && item.product.productCharacteristics[index].name == "actionReason"
                            && item.product.productCharacteristics[index].value == 'ACCTRANSFER') {
                            acctTransferReason = true;
                        }

                        if (item.action == common.constants().CONSTANTS.PRODUCT_ACTION.MODIFY) {
                            simAliasAction = true;
                            modifyMobileLine = true;
                        }

                        if (item.product.productCharacteristics[index].name != null
                            && item.product.productCharacteristics[index].name == "SubscriptionCorrelationId" && item.product.productCharacteristics[index].value != null
                            && item.product.productCharacteristics[index].value != "") {
                            simAliasSubscriptionCorrelationId = true;
                            mobileSubscriptionCorrelationId = true;
                        }
                        if (item.product.productCharacteristics[index].name != null
                            && item.product.productCharacteristics[index].name == "subscriptionId" && item.product.productCharacteristics[index].value != null
                            && item.product.productCharacteristics[index].value != "") {
                            simAliasSubscriptionId = true;
                            mobileSubscriptionId = true;
                        }
                        if (item.product.productCharacteristics[index].name != null
                            && item.product.productCharacteristics[index].name == "msisdn" && item.product.productCharacteristics[index].value != null
                            && item.product.productCharacteristics[index].value != "") {
                            simAliasMsisdn = true;
                            mobileMsisdn = true;
                        }
                        if (item.product.productCharacteristics[index].name != null
                            && item.product.productCharacteristics[index].name == "simAlias" && item.product.productCharacteristics[index].value != null
                            && item.product.productCharacteristics[index].value != "") {
                            simAliasAttribute = true;

                        }
                        if (item.product.productCharacteristics[index].name != null
                            && item.product.productCharacteristics[index].name == "actionReason" && item.product.productCharacteristics[index].value != null
                            && item.product.productCharacteristics[index].value != "") {
                            mobileActionReason = true;

                        }
                        if (item.product.productCharacteristics[index].name != null
                            && item.product.productCharacteristics[index].name == "imsi" && item.product.productCharacteristics[index].value != null
                            && item.product.productCharacteristics[index].value != "") {
                            mobileImsi = true;
                        }
                        if (item.product.productCharacteristics[index].name != null
                            && item.product.productCharacteristics[index].name == "iccid" && item.product.productCharacteristics[index].value != null
                            && item.product.productCharacteristics[index].value != "") {
                            mobileIccid = true;
                        }

                    }
                }
            }
        }
        // end edit sim alis
        //start Terminate subsscription
        // Adding && !MNP-Portout inside validation at endof script
        if (item.action == common.constants().CONSTANTS.PRODUCT_ACTION.DELETE) {

            if (productCategory == common.constants().CONSTANTS.PRODUCT_CATEGORY.Mobile_Line_Offer) {
                terminateSubscriptionPO = true;
                terminateSubscriptionAction = true;
            }

            if (item.product != null) {
                if (item.product.productCharacteristics != null) {
                    for (var index = 0; index < item.product.productCharacteristics.length; index++) {

                        if (item.action == common.constants().CONSTANTS.PRODUCT_ACTION.DELETE) {

                            if (terminateSubscriptionPO && terminateSubscriptionAction) {
                                if (item.product.productCharacteristics[index].name != null &&
                                    item.product.productCharacteristics[index].name == common.constants().CONSTANTS.PRODUCT_CHARACTERISTICS.SubscriptionCorrelationId && item.product.productCharacteristics[index].value != null &&
                                    item.product.productCharacteristics[index].value != "") {
                                    terminateSubscriptionSubCorrelationId = true;
                                }
                                if (item.product.productCharacteristics[index].name != null &&
                                    item.product.productCharacteristics[index].name == common.constants().CONSTANTS.PRODUCT_CHARACTERISTICS.subscriptionId && item.product.productCharacteristics[index].value != null &&
                                    item.product.productCharacteristics[index].value != "") {
                                    terminateSubscriptionSubscriptionId = true;
                                }
                                if (item.product.productCharacteristics[index].name != null &&
                                    item.product.productCharacteristics[index].name == common.constants().CONSTANTS.PRODUCT_CHARACTERISTICS.imsi && item.product.productCharacteristics[index].value != null &&
                                    item.product.productCharacteristics[index].value != "") {
                                    terminateSubscriptionImsi = true;
                                }
                                if (item.product.productCharacteristics[index].name != null &&
                                    item.product.productCharacteristics[index].name == common.constants().CONSTANTS.PRODUCT_CHARACTERISTICS.iccid && item.product.productCharacteristics[index].value != null &&
                                    item.product.productCharacteristics[index].value != "") {
                                    terminateSubscriptionIccid = true;
                                }
                                if (item.product.productCharacteristics[index].name != null &&
                                    item.product.productCharacteristics[index].name == common.constants().CONSTANTS.PRODUCT_CHARACTERISTICS.msisdn && item.product.productCharacteristics[index].value != null &&
                                    item.product.productCharacteristics[index].value != "") {
                                    terminateSubscriptionMsisdn = true;
                                }
                            }
                            if (productCategory != null && productCategory == common.constants().CONSTANTS.PRODUCT_CATEGORY.BYOP_PACKAGE) {
                                if (item.product.productCharacteristics[index].name != null && item.product.productCharacteristics[index].name == "SubscriptionCorrelationId" && item.product.productCharacteristics[index].value != null && item.product.productCharacteristics[index].value != '') {
                                    updowngradeBYOPLANDelSubscriptionSubCorrelationId = true;
                                }
                                if (item.relatedOrderItems == null || item.relatedOrderItems.length == 0) {
                                    updownRoleDEL = true;
                                    updownRefDEL = true;
                                }
                                if (item.relatedOrderItems != null || item.relatedOrderItems.length > 0) {
                                    var relatedOrderItems = item.relatedOrderItems;
                                    for (var r = 0; r < relatedOrderItems.length; r++) {
                                        if (relatedOrderItems[r].role == null || relatedOrderItems[r].role == '')
                                            updownRoleDEL = true;
                                        else
                                            updownRoleArr.push(relatedOrderItems[r].role);
                                        if (relatedOrderItems[r].reference == null || relatedOrderItems[r].reference == '')
                                            updownRefDEL = true;
                                        else
                                            updownRoleArrDEL.push(relatedOrderItems[r].reference);
                                    }

                                }
                            }


                        }


                    }
                }
            }

        }
        //end terminate subscription
        // start delete subsription added by Waleed Aamer
        if (item.action == common.constants().CONSTANTS.PRODUCT_ACTION.DELETE) {

            if (
                productCategory == common.constants().CONSTANTS.PRODUCT_CATEGORY.PLAN ||
                productCategory == common.constants().CONSTANTS.PRODUCT_CATEGORY.BYOP ||
                productCategory == common.constants().CONSTANTS.PRODUCT_CATEGORY.ALLOWANCE_ADDON ||
                productCategory == common.constants().CONSTANTS.PRODUCT_CATEGORY.CardsNCodes
            ) {

                deleteSubscription = true;

            }

        }
        // end delete subsription added by Waleed Aamer
        // terminateAccount added by Waleed Aamer
        if (item.action == common.constants().CONSTANTS.PRODUCT_ACTION.ADD) {
            if (productCategory == common.constants().CONSTANTS.PRODUCT_CATEGORY.ACCOUNT_MANAGEMENT
                && accountAction == common.constants().CONSTANTS.ACCOUNT_ACTION.ACCOUNT_TERMINATE) {
                terminateAccountUC = true;
            }
        }



        // end terminateAccountadded by Waleed Aamer
    }
    //catItem not empty

}
//ORDER ITEMS LOOP END

if (deleteSubscription) {
    var response = jawwyOM.deleteSubscription.validateDeleteSubscription(orderItems);
    if (response instanceof eoc_commons.fault)
        return response;
}
//intl Call Barring
if (usageRestrictionsLite) {

    var response = jawwyOM.configure.validateUsageRestrictions(orderItems);
    if (response instanceof eoc_commons.fault)
        return response;

}
//intl Call Barring
//-------------Terminate Subscription---------------
if (terminateAccountUC) {
    var response = jawwyOM.terminate.validateTerminateAccount(orderItems, request);
    if (response instanceof eoc_commons.fault)
        return response;
}

//-------------Terminate Subscription---------------
/*if (deleteCategorycheck && deleteOfferInstanceId ) {
    deleteSubscription = true;
} else {
    return createError("offerInstanceId", null, "Value is missing or null");
}*/

// M Ali A code for CardsNCodesUC start
CardsNCodesUC = CardsNCodesPO;

// M Ali A code for CardsNCodesUC end

// M Ali A code for Transfer Of Ownership start
if (isAccountManagementPO && isModifyMobileLinePO) {
    for (var transferIndex = 0; transferIndex < modifyMobileLinePO.product.productCharacteristics.length; transferIndex++) {
        if (modifyMobileLinePO.product.productCharacteristics[transferIndex].name != null && modifyMobileLinePO.product.productCharacteristics[transferIndex].name == "actionReason" &&
            modifyMobileLinePO.product.productCharacteristics[transferIndex].value == common.constants().CONSTANTS.PRODUCT_ACTION_REASON.OWNERTRANSFER) {
            isTransferOwnershipUC = true;
            break;
        }
    }
}

// M Ali A code for Transfer Of Ownership end

// M Ali A code for Resume Subscription start
resumeSubscription_UC_Flag = resumeMobileLinePO;

// M Ali A code for Resume Subscription end


// M Ali A code for SimSwap start
if (simSwap_PO_Flag && sim_PO && shipping_PO && isMobileLine && simSwapBundlPO_Flag && (bundlPOId != null) && (simSwapBundlPO != null)) {
    var isShipping = false;
    var isWalkIn = false;
    if (isWalkinPO) {
        isWalkIn = true;
    }
    else {
        isShipping = true;
    }

    var isSubscriptionCorrelationIdsame = false;
    for (var i = 0; i < orderItems.length; i++) {
        var item = orderItems[i].item;
        var productOfferingId = item.productOffering.id;
        var catItem = theCatalog.getItem(productOfferingId);
        var productCategory = null;
        if (catItem.attributeExists('productCategory'))
            productCategory = catItem.productCategory.getDefaultValue();

        if (productCategory == common.constants().CONSTANTS.PRODUCT_CATEGORY.Mobile_Line_Offer && item.action == common.constants().CONSTANTS.PRODUCT_ACTION.NO_CHANGE) {
            for (var simSwapCount2 = 0; simSwapCount2 < item.product.productCharacteristics.length && !isSubscriptionCorrelationIdsame; simSwapCount2++) {
                if (item.product.productCharacteristics[simSwapCount2].name != null && item.product.productCharacteristics[simSwapCount2].name == common.constants().CONSTANTS.PRODUCT_CHARACTERISTICS.SubscriptionCorrelationId) {
                    for (var simSwapCount = 0; simSwapCount < simSwapSubscriptionCorrelationId.length; simSwapCount++) {
                        if (simSwapSubscriptionCorrelationId[simSwapCount] == item.product.productCharacteristics[simSwapCount2].value) {
                            isSubscriptionCorrelationIdsame = true;
                            break;
                        }
                    }
                }
            }
        }
    }

    if (!isSubscriptionCorrelationIdsame) {
        return createError("subscriptionCorrelationId", null, "Attribute value productCharacteristics.value of productCategory MOBILE_LINE Dose not match with Sim Swap PO subscriptionCorrelationId");
    }
    if (isShipping)
        simSwap_UC_Flag = true;
    else if (isWalkIn)
        simSwapAssisted_UC_Flag = true;
}
// M Ali A code for SimSwap end
var newActivationEsim = (msisdn_PO && esim_PO && !portInMsisdn);
var newActivation = (msisdn_PO && sim_PO && shipping_PO && !portInMsisdn);

var portInUC = (msisdn_PO && sim_PO && shipping_PO && portInMsisdn && !isWalkinPO);
var portInAssistedUC = (msisdn_PO && sim_PO && shipping_PO && portInMsisdn && isWalkinPO);

var portInUCEsim = (msisdn_PO && esim_PO && portInMsisdn);
var recharge = recharge_PO;
var newActivationOffline = (msisdn_PO && sim_PO && shipping_PO && !portInMsisdn && isWalkinPO);
var upgradeDowngrade_PO = (upgradeDowngradeMOD && upgradeDowngradeDelete && upgradeDowngradeAdd);
walletSharingUC = flagPaygEnablement || flagWalletCreditLimit;
configureSubscription = (!recharge_PO && configurePO && !setRecurrence_PO && !newActivation && !upgradeDowngrade_PO && !sharingLimitPO && !planStartDatePO && !walletSharingUC && !mnpPortOutPO && !portInUC && !portInAssistedUC && !editSimAlisPO && !terminateSubscriptionPO && !portInUCEsim && !newActivationOffline && !newActivationEsim);
var lobDS = null;

//if (newActivation || recharge || suspendSubscription || setRecurrence_PO || configureSubscription) {
//if (newActivationOffline || newActivationEsim || newActivation || recharge || suspendSubscription || setRecurrence_PO || configureSubscription || renewalSubsription || upgradeDowngrade_PO || sharingLimitPO || planStartDatePO || simSwap_UC_Flag || simSwapAssisted_UC_Flag || walletSharingUC || mnpPortOutPO || portInUC || portInAssistedUC || portInUCEsim || editSimAlisPO || resumeSubscription_UC_Flag || terminateSubscriptionPO || deleteSubscription || CardsNCodesUC || isTransferOwnershipUC) {

// if (newActivation || recharge || suspendSubscription || setRecurrence_PO || configureSubscription) {

// checking shoppingCartId
if (request.shoppingCartId == null || request.shoppingCartId == "")
    return createError("shoppingCartId", null, "Value is missing or null");
var finder = new Finder("common:shoppingCartforOrderInstanceFinder");
finder.searchDocument.shoppingCartId = request.shoppingCartId;
var searchResult = finder.search();
if (searchResult != null && searchResult.length != 0) {
    return createErrorWithSpecificReason("shoppingCartId value is duplicated", "shoppingCartId", "Value for shoppingCartId is duplicated", "Value for shoppingCartId is duplicated");
}

// checking isLocked
if (request.isLocked == null)
    return createError("isLocked", null, "Value is missing or null");

// requestedStartDate
if (request.requestedStartDate == null)
    return createError("requestedStartDate", null, "Value is missing or null");

// checking requestedCompletionDate
if (request.requestedCompletionDate == null)
    return createError("requestedCompletionDate", null, "Value is missing or null");
else if (request.requestedCompletionDate < new Date())
    return createError("requestedCompletionDate", null, "requestedCompletionDate cannot be in the past");

// checking run
if (request.run == null)
    return createError("run", null, "Value is missing or null");
//}

if ((walletSharingUC) && !newActivation && !portInUC && !portInAssistedUC && !newActivationEsim && !portInUCEsim && !newActivationOffline && !isTransferOwnershipUC) {
    var response = jawwyOM.walletSharing.validationWalletSharing(walletSharingArr, mobileLineOrderItemArr);
    if (response instanceof eoc_commons.fault)
        return response;
}

if ((configureSubscription || renewalSubsription || walletSharingUC || deleteSubscription) && !newActivation && !newActivationOffline && !portInUC && !isTransferOwnershipUC && !portInAssistedUC && !newActivationEsim && !portInUCEsim) {
    var response = OMREST.configureUCMobileLineValidation(subscriberLevelPOArr, mobileLineOrderItemArr, null, configurePOArr, accountLevelPOArr);
    if (response instanceof eoc_commons.fault)
        return response;
}

/*  var response = OMREST.subscriptionCorrelationIdValidation(subscriberLevelPOArr);
  if (response instanceof eoc_commons.fault)
      return response;*/



// checking orderItems
var orderItems = request.orderItems;
var msisdnPoId = null;
var msisdnPoRefrence = [];
var msisdnPoRole = [];
var simPoId = null;
var simPoRefrence = [];
var simPoRole = [];
var initialPoId = null;
var initialPoRefrence = [];
var initialPoRole = [];
var shippingPoId = null;
var mobilePoId = null;
var simPlanPoId = null;
var rechargePoId = null;
var rechargePoRefrence = [];
var rechargePoRole = [];
var mobileLinePO = false;

if (orderItems.length <= 0)
    return createError("orderItems", null, "Order level container, orderItems is missing");
else {
    for (var i = 0; i < orderItems.length; i++) {
        if (orderItems[i].item == null) {
            return createError("orderItems.item", null, "object orderItems.item is missing or null value field");
        } else {

            var item = orderItems[i].item;

            if (item.id == null)
                return createError("id", null, "Attribute name" + " id " + " is missing or null value field in item object");

            if (item.orderType == null)
                return createError("orderType", null, "Attribute name" + " orderType " + " is missing or null value field in item object");

            if (item.action == null)
                return createError("action", null, "Attribute name" + " action" + " is missing or null value field item object");

            if (item.productOffering == null)
                return createError("productOffering", null, "Object name " + "productOffering" + " is missing or null value field");

            if (item.productOffering.id == null)
                return createError("productOffering.id", null, "Attribute name " + "productOffering.id" + " is missing or null value field");

            var productOfferingId = item.productOffering.id;
            var catItem = theCatalog.getItem(productOfferingId);
            var productCategory = null;
            if (catItem != null) {
                if (catItem.attributeExists('productCategory'))
                    productCategory = catItem.productCategory.getDefaultValue();

                if (newActivation || portInUC || portInAssistedUC || newActivationEsim || portInUCEsim || newActivationOffline) {

                    if (newActivationEsim || portInUCEsim) {
                        if (!esimIccid) {
                            return createError("ICCID", null, "ICCID missing for Esim PO");
                        }
                        if (!esimSubcriptionCorrelation) {
                            return createError("SubscriptionCorrelationId", null, "SubscriptionCorrelationId missing for Esim PO");
                        }
                        if (!esimActivationCode) {
                            return createError("activationCode", null, "activationCode missing for Esim PO");
                        }
                    }
                    if (productCategory == common.constants().CONSTANTS.PRODUCT_CATEGORY.MSISDN) {
                        msisdnPoId = item.id;
                        if (item.quantity == null)
                            return createError("item.quantity", null, "Object name item.quantity of productCategory MSISDN_NUMBER is missing or null value field");
                        if (item.quantity.amount == null)
                            return createError("item.quantity.amount", null, "Attribute name item.quantity.amount of productCategory MSISDN_NUMBER is missing or null value field");

                        if (item.relatedOrderItems != null) {
                            var relatedOrderItems = item.relatedOrderItems;

                            for (var q = 0; q < relatedOrderItems.length; q++) {
                                if (relatedOrderItems[q].role == null)
                                    return createError("relatedOrderItems.role", null, "Attribute name relatedOrderItems.role of productCategory MSISDN_NUMBER is missing or null value field");
                                else
                                    msisdnPoRole.push(relatedOrderItems[q].role);
                                if (relatedOrderItems[q].reference == null)
                                    return createError("relatedOrderItems.reference", null, "Attribute name relatedOrderItems.reference of productCategory MSISDN_NUMBER is missing or null value field");
                                else
                                    msisdnPoRefrence.push(relatedOrderItems[q].reference);
                            }

                        } else {
                            return createError("item.relatedOrderItems", null, "Object name item.relatedOrderItems of productCategory MSISDN_NUMBER is missing or null value field");
                        }
                        if (item.product == null)
                            return createError("item.product", null, "Object name item.product of productCategory MSISDN_NUMBER is missing or null value field");
                        if (item.product.productCharacteristics != null) {
                            var productCharacteristics = item.product.productCharacteristics;
                            var subscriptionCorrelationId = false;
                            var msisdnNumber = false;
                            var donorOperator = false;

                            for (var w = 0; w < productCharacteristics.length; w++) {
                                if (productCharacteristics[w].name == null)
                                    return createError("productCharacteristics.name", null, "Attribute name productCharacteristics.name of productCategory MSISDN_NUMBER is missing or null value field");
                                if (productCharacteristics[w].value == null)
                                    return createError("productCharacteristics.value", null, "Attribute name productCharacteristics.value of productCategory MSISDN_NUMBER is missing or null value field");
                                if (productCharacteristics[w].name == common.constants().CONSTANTS.PRODUCT_CHARACTERISTICS.msisdnNumber)
                                    msisdnNumber = true;
                                if (productCharacteristics[w].name == common.constants().CONSTANTS.PRODUCT_CHARACTERISTICS.SubscriptionCorrelationId)
                                    subscriptionCorrelationId = true;
                                if (productCharacteristics[w].name == common.constants().CONSTANTS.PRODUCT_CHARACTERISTICS.donorOperator)
                                    donorOperator = true;
                            }

                            if (subscriptionCorrelationId == false)
                                return createError("subscriptionCorrelationId", null, "Attribute name productCharacteristics.name of productCategory MSISDN_NUMBER is missing or null value field");
                            if (msisdnNumber == false)
                                return createError("msisdnNumber", null, "Attribute name productCharacteristics.name of productCategory MSISDN_NUMBER is missing or null value field");
                            if (donorOperator == false && (portInUC || portInUCEsim || portInAssistedUC) && donorOperatorValidation)
                                return createError("donorOperator", null, "Attribute name productCharacteristics.name of port In PO is missing or null value field");

                        } else {
                            return createError("item.product.productCharacteristics", null, "Object name item.product.productCharacteristics of productCategory MSISDN_NUMBER is missing or null value field");
                        }
                        /*
                        if (item.product.productPrice != null) {
                        var productPrice = item.product.productPrice;

                        for (var e = 0; e < productPrice.length; e++) {
                        if (!(productPrice[e].popId != null && productPrice[e].popId == common.constants().CONSTANTS.PRODUCT_PRICE.popId_common))
                        return createError("productPrice.popId", null, "Attribute name productPrice.popId of productCategory MSISDN_NUMBER is missing or null value field");
                        if (productPrice[e].overrideAmount == null)
                        return createError("productPrice.overrideAmount", null, "Attribute name productPrice.overrideAmount of productCategory MSISDN_NUMBER is missing or null value field");
                        }

                        }*/
                    } else if (productCategory == common.constants().CONSTANTS.PRODUCT_CATEGORY.Mobile_Device && item.action == common.constants().CONSTANTS.PRODUCT_ACTION.ADD) {
                        if (item.relatedOrderItems != null) {
                            var relatedOrderItems = item.relatedOrderItems;
                            for (var r = 0; r < relatedOrderItems.length; r++) {
                                if (relatedOrderItems[r].role == null)
                                    return createError("relatedOrderItems.role", null, "Attribute name relatedOrderItems.role of productCategory Mobile Device is missing or null value field");
                                else
                                    simPoRole.push(relatedOrderItems[r].role);
                                if (relatedOrderItems[r].reference == null)
                                    return createError("relatedOrderItems.reference", null, "Attribute name relatedOrderItems.reference of productCategory Mobile Device is missing or null value field");
                                else
                                    simPoRefrence.push(relatedOrderItems[r].reference);
                            }

                        } else {
                            return createError("item.relatedOrderItems", null, "Object name item.relatedOrderItems of productCategory Mobile Device is missing or null value field");
                        }
                        if (item.product == null)
                            return createError("item.product", null, "Object name item.product of productCategory Mobile Device is missing or null value field");
                        if (item.product.productCharacteristics != null) {
                            var productCharacteristics = item.product.productCharacteristics;
                            var imei = false;
                            var storeId = false;
                            var orderResvId = false;

                            for (var t = 0; t < productCharacteristics.length; t++) {
                                if (productCharacteristics[t].name == null)
                                    return createError("productCharacteristics.name", null, "Attribute name productCharacteristics.name of productCategory Mobile Device is missing or null value field");
                                if (productCharacteristics[t].value == null)
                                    return createError("productCharacteristics.value", null, "Attribute name productCharacteristics.value of productCategory Mobile Device is missing or null value field");
                                if (productCharacteristics[t].name == common.constants().CONSTANTS.PRODUCT_CHARACTERISTICS.imei)
                                    imei = true;
                                if (productCharacteristics[t].name == common.constants().CONSTANTS.PRODUCT_CHARACTERISTICS.storeId)
                                    storeId = true;
                                if (productCharacteristics[t].name == common.constants().CONSTANTS.PRODUCT_CHARACTERISTICS.orderResvId)
                                    orderResvId = true;
                            }
                            if (imei == false)
                                return createError("imei", null, "Attribute name productCharacteristics.name of productCategory Mobile Device is missing or null value field");
                            if (storeId == false)
                                return createError("storeId", null, "Attribute name productCharacteristics.name of productCategory Mobile Device is missing or null value field");
                            if (orderResvId == false)
                                return createError("orderResvId", null, "Attribute name productCharacteristics.name of productCategory Mobile Device is missing or null value field");

                            isMobileDevice = true;
                        } else {
                            return createError("item.product.productCharacteristics", null, "Object name item.product.productCharacteristics of productCategory Mobile Device is missing or null value field");
                        }
                    } else if (productCategory == common.constants().CONSTANTS.PRODUCT_CATEGORY.SIM || productCategory == common.constants().CONSTANTS.PRODUCT_CATEGORY.ESIM) {
                        simPoId = item.id;
                        if (item.quantity == null)
                            return createError("item.quantity", null, "Object name item.quantity of productCategory SIMCARD is missing or null value field");
                        if (item.quantity.amount == null)
                            return createError("item.quantity.amount", null, "Attribute name item.quantity.amount of productCategory SIMCARD is missing or null value field");

                        if (item.relatedOrderItems != null) {
                            var relatedOrderItems = item.relatedOrderItems;
                            for (var r = 0; r < relatedOrderItems.length; r++) {
                                if (relatedOrderItems[r].role == null)
                                    return createError("relatedOrderItems.role", null, "Attribute name relatedOrderItems.role of productCategory SIMCARD is missing or null value field");
                                else
                                    simPoRole.push(relatedOrderItems[r].role);
                                if (relatedOrderItems[r].reference == null)
                                    return createError("relatedOrderItems.reference", null, "Attribute name relatedOrderItems.reference of productCategory SIMCARD is missing or null value field");
                                else
                                    simPoRefrence.push(relatedOrderItems[r].reference);
                            }

                        } else {
                            return createError("item.relatedOrderItems", null, "Object name item.relatedOrderItems of productCategory SIMCARD is missing or null value field");
                        }
                        if (item.product == null)
                            return createError("item.product", null, "Object name item.product of productCategory SIMCARD is missing or null value field");
                        if (item.product.productCharacteristics != null) {
                            var productCharacteristics = item.product.productCharacteristics;
                            var subscriptionCorrelationId = false;
                            var iccid = false;

                            for (var t = 0; t < productCharacteristics.length; t++) {
                                if (productCharacteristics[t].name == null)
                                    return createError("productCharacteristics.name", null, "Attribute name productCharacteristics.name of productCategory SIMCARD is missing or null value field");
                                if (productCharacteristics[t].value == null)
                                    return createError("productCharacteristics.value", null, "Attribute name productCharacteristics.value of productCategory SIMCARD is missing or null value field");
                                if (productCharacteristics[t].name == common.constants().CONSTANTS.PRODUCT_CHARACTERISTICS.SubscriptionCorrelationId)
                                    subscriptionCorrelationId = true;
                                if (productCharacteristics[t].name == common.constants().CONSTANTS.PRODUCT_CHARACTERISTICS.iccid)
                                    iccid = true;
                            }
                            if (subscriptionCorrelationId == false)
                                return createError("subscriptionCorrelationId", null, "Attribute name productCharacteristics.name of productCategory SIMCARD is missing or null value field");
                            if (iccid == false && (portInAssistedUC || newActivationOffline))
                                return createError("iccid", null, "Attribute name productCharacteristics.name of productCategory SIMCARD is missing or null value field");
                        } else {
                            return createError("item.product.productCharacteristics", null, "Object name item.product.productCharacteristics of productCategory SIMCARD is missing or null value field");
                        }
                        /*
                        if (item.product.productPrice != null) {
                        var productPrice = item.product.productPrice;

                        for (var y = 0; y < productPrice.length; y++) {
                        if (!(productPrice[y].popId != null && productPrice[y].popId == common.constants().CONSTANTS.PRODUCT_PRICE.popId_common))
                        return createError("productPrice.popId", null, "Attribute name productPrice.popId of productCategory SIMCARD is missing or null value field");
                        if (productPrice[y].overrideAmount == null)
                        return createError("productPrice.overrideAmount", null, "Attribute name productPrice.overrideAmount of productCategory SIMCARD is missing or null value field");
                        }

                        }*/
                    } else if (productCategory == common.constants().CONSTANTS.PRODUCT_CATEGORY.Shipping) {
                        shippingPoId = item.id;
                        if (item.attrs != null) {
                            var attrs = item.attrs;
                            for (var u = 0; u < attrs.length; u++) {
                                if (!(attrs[u].name != null && attrs[u].name == common.constants().CONSTANTS.attrs_NAME.shipmentAddress))
                                    return createError("attrs.name", null, "Attribute name attrs.name of productCategory SHIPPING_METHOD is missing or null value field");
                                if (attrs[u].value == null)
                                    return createError("attrs.value", null, "Attribute value attrs.value of productCategory SHIPPING_METHOD is missing or null value field");
                                //                            if (!(attrs[u].name != null && attrs[u].name == common.constants().CONSTANTS.attrs_NAME.))
                            }
                        } else {
                            return createError("item.attrs", null, "Object name item.attrs of productCategory SHIPPING_METHOD is missing or null value field");
                        }
                        if (item.product == null)
                            return createError("item.product", null, "Object name item.product of productCategory SHIPPING_METHOD is missing or null value field");
                        if (item.product.productCharacteristics != null) {
                            var productCharacteristics = item.product.productCharacteristics;
                            for (var o = 0; o < productCharacteristics.length; o++) {
                                if (productCharacteristics[o].name == null)
                                    return createError("productCharacteristics.name", null, "Attribute name productCharacteristics.name of productCategory SHIPPING_METHOD is missing or null value field");
                                if (productCharacteristics[o].value == null)
                                    return createError("productCharacteristics.value", null, "Attribute name productCharacteristics.value of productCategory SHIPPING_METHOD is missing or null value field");
                            }
                        } else {
                            return createError("item.product.productCharacteristics", null, "object productCharacteristics is missing or null value of productCategory SHIPPING_METHOD");
                        }
                        if (item.product.productPrice != null) {
                            var productPrice = item.product.productPrice;

                            for (var p = 0; p < productPrice.length; p++) {
                                if (!(productPrice[p].popId != null && productPrice[p].popId == common.constants().CONSTANTS.PRODUCT_PRICE.popId_shipping))
                                    return createError("productPrice.popId", null, "Attribute name productPrice.popId of productCategory SHIPPING_METHOD is missing or null value field");
                                if (productPrice[p].overrideAmount == null)
                                    return createError("productPrice.overrideAmount", null, "Attribute name productPrice.overrideAmount of productCategory SHIPPING_METHOD is missing or null value field");
                            }

                        }
                    } else if (productCategory == common.constants().CONSTANTS.PRODUCT_CATEGORY.Sim_Bundle || productCategory == common.constants().CONSTANTS.PRODUCT_CATEGORY.BYOPSIMPLAN || productCategory == common.constants().CONSTANTS.PRODUCT_CATEGORY.DeviceSim_Bundle) {
                        simPlanPoId = item.id;
                        if (item.product != null) {
                            if (item.product.productPrice != null) {
                                var productPrice = item.product.productPrice;

                                for (var a = 0; a < productPrice.length; a++) {
                                    if (!(productPrice[a].popId != null /*&& productPrice[a].popId == common.constants().CONSTANTS.PRODUCT_PRICE.popId_common*/))
                                        return createError("productPrice.popId", null, "Attribute name productPrice.popId of productCategory " + productCategory + " is missing or null value field");
                                    if (productPrice[a].overrideAmount == null)
                                        return createError("productPrice.overrideAmount", null, "Attribute name productPrice.overrideAmount of productCategory " + productCategory + " is missing or null value field");
                                }

                            }
                        }
                    } else if (productCategory == common.constants().CONSTANTS.PRODUCT_CATEGORY.Combo_Plan_Offer) {
                        if (item.product == null)
                            return createError("item.product", null, "Object name item.product of productCategory PLAN is missing or null value field");
                        if (item.product.productCharacteristics != null) {
                            var productCharacteristics = item.product.productCharacteristics;
                            var subscriptionCorrelationId = false;

                            for (var s = 0; s < productCharacteristics.length; s++) {
                                if (productCharacteristics[s].name == null)
                                    return createError("productCharacteristics.name", null, "Attribute name productCharacteristics.name of productCategory PLAN is missing or null value field");
                                if (productCharacteristics[s].value == null)
                                    return createError("productCharacteristics.value", null, "Attribute name productCharacteristics.value of productCategory PLAN is missing or null value field");
                                if (productCharacteristics[s].name == common.constants().CONSTANTS.PRODUCT_CHARACTERISTICS.SubscriptionCorrelationId)
                                    subscriptionCorrelationId = true;
                            }

                            if (subscriptionCorrelationId == false)
                                return createError("subscriptionCorrelationId", null, "Attribute name productCharacteristics.name of productCategory PLAN is missing or null value field");
                        } else {
                            return createError("item.product.productCharacteristics", null, "Object name item.product.productCharacteristics of productCategory PLAN is missing or null value field");
                        }
                        if (item.product.productPrice != null) {
                            var productPrice = item.product.productPrice;

                            for (var d = 0; d < productPrice.length; d++) {
                                if (!(productPrice[d].popId != null))
                                    return createError(productPrice[d].popId, null, "Attribute name productPrice.popId of productCategory PLAN is missing or null value field");
                                if (productPrice[d].overrideAmount == null)
                                    return createError(productPrice[d].overrideAmount, null, "Attribute name productPrice.overrideAmount of productCategory PLAN is missing or null value field");
                            }

                        }
                    } else if (productCategory == common.constants().CONSTANTS.PRODUCT_CATEGORY.Initial_Data_Package) {
                        initialPoId = item.id;
                        if (item.relatedOrderItems != null) {
                            var relatedOrderItems = item.relatedOrderItems;

                            for (var h = 0; h < relatedOrderItems.length; h++) {
                                if (relatedOrderItems[h].role == null)
                                    return createError("relatedOrderItems.role", null, "Attribute name relatedOrderItems.role of productCategory INIT_ALLOWANCE is missing or null value field");
                                else
                                    initialPoRole.push(relatedOrderItems[h].role);
                                if (relatedOrderItems[h].reference == null)
                                    return createError("relatedOrderItems.reference", null, "Attribute name relatedOrderItems.reference of productCategory INIT_ALLOWANCE is missing or null value field");
                                else
                                    initialPoRefrence.push(relatedOrderItems[h].reference);
                            }

                        } else {
                            return createError("item.relatedOrderItems", null, "Object name item.relatedOrderItems of productCategory INIT_ALLOWANCE is missing or null value field");
                        }

                        if (item.product == null)
                            return createError("item.product", null, "Object name item.product of productCategory INIT_ALLOWANCE is missing or null value field");
                        if (item.product.productCharacteristics != null) {
                            var productCharacteristics = item.product.productCharacteristics;
                            var subscriptionCorrelationId = false;
                            for (var f = 0; f < productCharacteristics.length; f++) {
                                if (productCharacteristics[f].name == null)
                                    return createError("productCharacteristics.name", null, "Attribute name productCharacteristics.name of productCategory INIT_ALLOWANCE is missing or null value field");
                                if (productCharacteristics[f].value == null)
                                    return createError("productCharacteristics.value", null, "Attribute name productCharacteristics.value of productCategory INIT_ALLOWANCE is missing or null value field");
                                if (productCharacteristics[f].name == common.constants().CONSTANTS.PRODUCT_CHARACTERISTICS.SubscriptionCorrelationId)
                                    subscriptionCorrelationId = true;
                            }

                            if (subscriptionCorrelationId == false)
                                return createError(subscriptionCorrelationId, null, "Attribute name productCharacteristics[i].name of productCategory INIT_ALLOWANCE is missing or null value field");
                        } else {
                            return createError(item.product.productCharacteristics, null, "Attribute name item.product.productCharacteristics of productCategory INIT_ALLOWANCE is missing or null value field");
                        }
                    } else if (productCategory == common.constants().CONSTANTS.PRODUCT_CATEGORY.Mobile_Line_Offer) {
                        mobileLinePO = true;
                        mobilePoId = item.id;
                        if (item.product == null)
                            return createError(item.product, null, "Attribute name item.product of productCategory MOBILE_LINE is missing or null value field");
                        if (item.product.productCharacteristics != null) {
                            var productCharacteristics = item.product.productCharacteristics;
                            var subscriptionCorrelationId = false;

                            for (var g = 0; g < productCharacteristics.length; g++) {
                                if (productCharacteristics[g].name == null)
                                    return createError("productCharacteristics.name", null, "Attribute name productCharacteristics.name of productCategory MOBILE_LINE is missing or null value field");
                                if (productCharacteristics[g].value == null)
                                    return createError("productCharacteristics.value", null, "Attribute name productCharacteristics.value of productCategory MOBILE_LINE is missing or null value field");
                                if (productCharacteristics[g].name == common.constants().CONSTANTS.PRODUCT_CHARACTERISTICS.SubscriptionCorrelationId)
                                    subscriptionCorrelationId = true;
                            }
                            if (subscriptionCorrelationId == false)
                                return createError("subscriptionCorrelationId", null, "Attribute name productCharacteristics.name of productCategory MOBILE_LINE is missing or null value field");
                        } else {
                            return createError("item.product.productCharacteristics", null, "Object name item.product.productCharacteristics of productCategory MOBILE_LINE is missing or null value field");
                        }
                    }

                }
                ///////////// sim swap changes M Ali A start
                if (simSwap_UC_Flag || simSwapAssisted_UC_Flag) {
                    if (productCategory == common.constants().CONSTANTS.PRODUCT_CATEGORY.SIM) {
                        if (item.quantity == null)
                            return createError("item.quantity", null, "Object name item.quantity of productCategory SIMCARD is missing or null value field");
                        if (item.quantity.amount == null)
                            return createError("item.quantity.amount", null, "Attribute name item.quantity.amount of productCategory SIMCARD is missing or null value field");

                        if (item.relatedOrderItems != null) {
                            var relatedOrderItems = item.relatedOrderItems;
                            for (var r = 0; r < relatedOrderItems.length; r++) {
                                if (relatedOrderItems[r].role == null)
                                    return createError("relatedOrderItems.role", null, "Attribute name relatedOrderItems.role of productCategory SIMCARD is missing or null value field");
                                else
                                    simPoRole.push(relatedOrderItems[r].role);
                                if (relatedOrderItems[r].reference == null)
                                    return createError("relatedOrderItems.reference", null, "Attribute name relatedOrderItems.reference of productCategory SIMCARD is missing or null value field");
                                else
                                    simPoRefrence.push(relatedOrderItems[r].reference);
                            }

                        } else {
                            return createError("item.relatedOrderItems", null, "Object name item.relatedOrderItems of productCategory SIMCARD is missing or null value field");
                        }
                        if (item.product == null)
                            return createError("item.product", null, "Object name item.product of productCategory SIMCARD is missing or null value field");
                        if (item.product.productCharacteristics != null) {
                            var productCharacteristics = item.product.productCharacteristics;
                            var subscriptionCorrelationId = false;
                            var iccid = false;
                            for (var t = 0; t < productCharacteristics.length; t++) {
                                if (productCharacteristics[t].name == null)
                                    return createError("productCharacteristics.name", null, "Attribute name productCharacteristics.name of productCategory SIMCARD is missing or null value field");
                                if (productCharacteristics[t].value == null)
                                    return createError("productCharacteristics.value", null, "Attribute name productCharacteristics.value of productCategory SIMCARD is missing or null value field");
                                if (productCharacteristics[t].name == common.constants().CONSTANTS.PRODUCT_CHARACTERISTICS.SubscriptionCorrelationId)
                                    subscriptionCorrelationId = true;
                                if (productCharacteristics[t].name == common.constants().CONSTANTS.PRODUCT_CHARACTERISTICS.iccid)
                                    iccid = true;
                            }
                            if (subscriptionCorrelationId == false)
                                return createError("subscriptionCorrelationId", null, "Attribute name productCharacteristics.name of productCategory SIMCARD is missing or null value field");
                            if (iccid == false && simSwapAssisted_UC_Flag)
                                return createError("iccid", null, "Attribute name productCharacteristics.name of productCategory SIMCARD is missing or null value field");

                        } else {
                            return createError("item.product.productCharacteristics", null, "Object name item.product.productCharacteristics of productCategory SIMCARD is missing or null value field");
                        }

                    } else if (productCategory == common.constants().CONSTANTS.PRODUCT_CATEGORY.SIM_SWAP_Bundle) {
                        if (item.quantity == null)
                            return createError("item.quantity", null, "Object name item.quantity of productCategory SWAPSIMBNDL is missing or null value field");
                        if (item.quantity.amount == null)
                            return createError("item.quantity.amount", null, "Attribute name item.quantity.amount of productCategory SWAPSIMBNDL is missing or null value field");
                        if (item.product == null)
                            return createError("item.product", null, "Object name item.product of productCategory SWAPSIMBNDL is missing or null value field");
                        if (item.product.productCharacteristics != null) {
                            var productCharacteristics = item.product.productCharacteristics;
                            var subscriptionCorrelationId = false;

                            for (var t = 0; t < productCharacteristics.length; t++) {
                                if (productCharacteristics[t].name == null)
                                    return createError("productCharacteristics.name", null, "Attribute name productCharacteristics.name of productCategory SWAPSIMBNDL is missing or null value field");
                                if (productCharacteristics[t].value == null)
                                    return createError("productCharacteristics.value", null, "Attribute name productCharacteristics.value of productCategory SWAPSIMBNDL is missing or null value field");
                                if (productCharacteristics[t].name == common.constants().CONSTANTS.PRODUCT_CHARACTERISTICS.SubscriptionCorrelationId)
                                    subscriptionCorrelationId = true;
                            }
                        } else {
                            return createError("item.product.productCharacteristics", null, "Object name item.product.productCharacteristics of productCategory SWAPSIMBNDL is missing or null value field");
                        }
                    } else if (productCategory == common.constants().CONSTANTS.PRODUCT_CATEGORY.SIM_SWAP) {
                        if (item.quantity == null)
                            return createError("item.quantity", null, "Object name item.quantity of productCategory SWAPSIM is missing or null value field");
                        if (item.quantity.amount == null)
                            return createError("item.quantity.amount", null, "Attribute name item.quantity.amount of productCategory SWAPSIM is missing or null value field");

                        if (item.relatedOrderItems != null) {
                            var relatedOrderItems = item.relatedOrderItems;
                            for (var r = 0; r < relatedOrderItems.length; r++) {
                                if (relatedOrderItems[r].role == null)
                                    return createError("relatedOrderItems.role", null, "Attribute name relatedOrderItems.role of productCategory SWAPSIM is missing or null value field");
                                else
                                    simPoRole.push(relatedOrderItems[r].role);
                                if (relatedOrderItems[r].reference == null)
                                    return createError("relatedOrderItems.reference", null, "Attribute name relatedOrderItems.reference of productCategory SWAPSIM is missing or null value field");
                                else
                                    simPoRefrence.push(relatedOrderItems[r].reference);
                            }

                        } else {
                            return createError("item.relatedOrderItems", null, "Object name item.relatedOrderItems of productCategory SWAPSIM is missing or null value field");
                        }
                        if (item.product == null)
                            return createError("item.product", null, "Object name item.product of productCategory SWAPSIM is missing or null value field");
                        if (item.product.productCharacteristics != null) {
                            var productCharacteristics = item.product.productCharacteristics;
                            var subscriptionCorrelationId = false;

                            for (var t = 0; t < productCharacteristics.length; t++) {
                                if (productCharacteristics[t].name == null)
                                    return createError("productCharacteristics.name", null, "Attribute name productCharacteristics.name of productCategory SWAPSIM is missing or null value field");
                                if (productCharacteristics[t].value == null)
                                    return createError("productCharacteristics.value", null, "Attribute name productCharacteristics.value of productCategory SWAPSIM is missing or null value field");
                                if (productCharacteristics[t].name == common.constants().CONSTANTS.PRODUCT_CHARACTERISTICS.SubscriptionCorrelationId)
                                    subscriptionCorrelationId = true;
                            }
                            if (subscriptionCorrelationId == false)
                                return createError("subscriptionCorrelationId", null, "Attribute name productCharacteristics.name of productCategory SWAPSIM is missing or null value field");
                        } else {
                            return createError("item.product.productCharacteristics", null, "Object name item.product.productCharacteristics of productCategory SWAPSIM is missing or null value field");
                        }
                    } else if (productCategory == common.constants().CONSTANTS.PRODUCT_CATEGORY.Shipping) {
                        shippingPoId = item.id;
                        if (item.attrs != null) {
                            var attrs = item.attrs;
                            for (var u = 0; u < attrs.length; u++) {
                                if (!(attrs[u].name != null && attrs[u].name == common.constants().CONSTANTS.attrs_NAME.shipmentAddress))
                                    return createError("attrs.name", null, "Attribute name attrs.name of productCategory SHIPPING_METHOD is missing or null value field");
                                if (attrs[u].value == null)
                                    return createError("attrs.value", null, "Attribute value attrs.value of productCategory SHIPPING_METHOD is missing or null value field");
                            }
                        } else {
                            return createError("item.attrs", null, "Object name item.attrs of productCategory SHIPPING_METHOD is missing or null value field");
                        }
                        if (item.product == null)
                            return createError("item.product", null, "Object name item.product of productCategory SHIPPING_METHOD is missing or null value field");
                        if (item.product.productCharacteristics != null) {
                            var productCharacteristics = item.product.productCharacteristics;
                            for (var o = 0; o < productCharacteristics.length; o++) {
                                if (productCharacteristics[o].name == null)
                                    return createError("productCharacteristics.name", null, "Attribute name productCharacteristics.name of productCategory SHIPPING_METHOD is missing or null value field");
                                if (productCharacteristics[o].value == null)
                                    return createError("productCharacteristics.value", null, "Attribute name productCharacteristics.value of productCategory SHIPPING_METHOD is missing or null value field");
                            }
                        } else {
                            return createError("item.product.productCharacteristics", null, "object productCharacteristics is missing or null value of productCategory SHIPPING_METHOD");
                        }
                        if (item.product.productPrice != null) {
                            var productPrice = item.product.productPrice;

                            for (var p = 0; p < productPrice.length; p++) {
                                if (!(productPrice[p].popId != null && productPrice[p].popId == common.constants().CONSTANTS.PRODUCT_PRICE.popId_shipping))
                                    return createError("productPrice.popId", null, "Attribute name productPrice.popId of productCategory SHIPPING_METHOD is missing or null value field");
                                if (productPrice[p].overrideAmount == null)
                                    return createError("productPrice.overrideAmount", null, "Attribute name productPrice.overrideAmount of productCategory SHIPPING_METHOD is missing or null value field");
                            }

                        }
                    } else if (productCategory == common.constants().CONSTANTS.PRODUCT_CATEGORY.Mobile_Line_Offer) {
                        mobileLinePO = true;
                        var subscriptionCorrelationIdMatch = false;
                        mobilePoId = item.id;
                        for (var simSwapCount = 0; simSwapCount < item.product.productCharacteristics.length; simSwapCount++) {
                            if (item.product.productCharacteristics[simSwapCount].name != null
                                && item.product.productCharacteristics[simSwapCount].name == common.constants().CONSTANTS.PRODUCT_CHARACTERISTICS.SubscriptionCorrelationId) {
                                for (var simSwapCount2 = 0; simSwapCount2 < simSwapSubscriptionCorrelationId.length; simSwapCount2++) {
                                    if (simSwapSubscriptionCorrelationId[simSwapCount2] == item.product.productCharacteristics[simSwapCount].value)
                                        subscriptionCorrelationIdMatch = true;
                                }
                            }
                        }
                        if (item.product == null)
                            return createError(item.product, null, "Attribute name item.product of productCategory MOBILE_LINE is missing or null value field");
                        if (item.product.productCharacteristics != null) {
                            var productCharacteristics = item.product.productCharacteristics;
                            var subscriptionCorrelationId = false;
                            var imsi = false;
                            var iccid = false;
                            var msisdn = false;

                            for (var g = 0; g < productCharacteristics.length; g++) {
                                if (productCharacteristics[g].name == null)
                                    return createError("productCharacteristics.name", null, "Attribute name productCharacteristics.name of productCategory MOBILE_LINE is missing or null value field");
                                if (productCharacteristics[g].value == null)
                                    return createError("productCharacteristics.value", null, "Attribute name productCharacteristics.value of productCategory MOBILE_LINE is missing or null value field");
                                if (productCharacteristics[g].name == common.constants().CONSTANTS.PRODUCT_CHARACTERISTICS.SubscriptionCorrelationId)
                                    subscriptionCorrelationId = true;
                                else if (productCharacteristics[g].name == common.constants().CONSTANTS.PRODUCT_CHARACTERISTICS.imsi)
                                    imsi = true;
                                else if (productCharacteristics[g].name == common.constants().CONSTANTS.PRODUCT_CHARACTERISTICS.iccid)
                                    iccid = true;
                                else if (productCharacteristics[g].name == common.constants().CONSTANTS.PRODUCT_CHARACTERISTICS.msisdn)
                                    msisdn = true;
                            }
                            if (subscriptionCorrelationId == false)
                                return createError("subscriptionCorrelationId", null, "Attribute name productCharacteristics.name of productCategory MOBILE_LINE is missing or null value field");
                            if (subscriptionCorrelationIdMatch) {
                                if (imsi == false)
                                    return createError("imsi", null, "Attribute name productCharacteristics.name of productCategory MOBILE_LINE is missing or null value field");
                                if (iccid == false)
                                    return createError("iccid", null, "Attribute name productCharacteristics.name of productCategory MOBILE_LINE is missing or null value field");
                                if (msisdn == false)
                                    return createError("msisdn", null, "Attribute name productCharacteristics.name of productCategory MOBILE_LINE is missing or null value field");
                            }
                        } else {
                            return createError("item.product.productCharacteristics", null, "Object name item.product.productCharacteristics of productCategory MOBILE_LINE is missing or null value field");
                        }
                    }
                }
                ///////////// sim swap changes M Ali A end
                ///////////// resume subscription changes M Ali A Start
                if (resumeSubscription_UC_Flag) {
                    if (productCategory == common.constants().CONSTANTS.PRODUCT_CATEGORY.Mobile_Line_Offer) {
                        mobileLinePO = true;
                        mobilePoId = item.id;
                        if (item.product == null)
                            return createError(item.product, null, "Attribute name item.product of productCategory MOBILE_LINE is missing or null value field");
                        if (item.product.productCharacteristics != null) {
                            var productCharacteristics = item.product.productCharacteristics;
                            var subscriptionCorrelationId = false;
                            var subscriptionId = false;
                            var imsi = false;
                            var iccid = false;
                            var msisdn = false;

                            for (var g = 0; g < productCharacteristics.length; g++) {
                                if (productCharacteristics[g].name == null)
                                    return createError("productCharacteristics.name", null, "Attribute name productCharacteristics.name of productCategory MOBILE_LINE is missing or null value field");
                                else if (productCharacteristics[g].value == null)
                                    return createError("productCharacteristics.value", null, "Attribute name productCharacteristics.value of productCategory MOBILE_LINE is missing or null value field");
                                else if (productCharacteristics[g].name == common.constants().CONSTANTS.PRODUCT_CHARACTERISTICS.SubscriptionCorrelationId)
                                    subscriptionCorrelationId = true;
                                else if (productCharacteristics[g].name == common.constants().CONSTANTS.PRODUCT_CHARACTERISTICS.subscriptionId)
                                    subscriptionId = true;
                                else if (productCharacteristics[g].name == common.constants().CONSTANTS.PRODUCT_CHARACTERISTICS.imsi)
                                    imsi = true;
                                else if (productCharacteristics[g].name == common.constants().CONSTANTS.PRODUCT_CHARACTERISTICS.iccid)
                                    iccid = true;
                                else if (productCharacteristics[g].name == common.constants().CONSTANTS.PRODUCT_CHARACTERISTICS.msisdn)
                                    msisdn = true;
                            }
                            if (subscriptionCorrelationId == false)
                                return createError("subscriptionCorrelationId", null, "Attribute name productCharacteristics.name of productCategory MOBILE_LINE is missing or null value field");
                            if (subscriptionId == false)
                                return createError("subscriptionId", null, "Attribute name productCharacteristics.name of productCategory MOBILE_LINE is missing or null value field");
                            if (imsi == false)
                                return createError("imsi", null, "Attribute name productCharacteristics.name of productCategory MOBILE_LINE is missing or null value field");
                            if (iccid == false)
                                return createError("iccid", null, "Attribute name productCharacteristics.name of productCategory MOBILE_LINE is missing or null value field");
                            if (msisdn == false)
                                return createError("msisdn", null, "Attribute name productCharacteristics.name of productCategory MOBILE_LINE is missing or null value field");
                        } else {
                            return createError("item.product.productCharacteristics", null, "Object name item.product.productCharacteristics of productCategory MOBILE_LINE is missing or null value field");
                        }
                    }
                }
                ///////////// resume subscription changes M Ali A End
                if (resumeSubscription_UC_Flag) {
                    if (productCategory == common.constants().CONSTANTS.PRODUCT_CATEGORY.Mobile_Line_Offer) {
                        mobileLinePO = true;
                        mobilePoId = item.id;
                        if (item.product == null)
                            return createError(item.product, null, "Attribute name item.product of productCategory MOBILE_LINE is missing or null value field");
                        if (item.product.productCharacteristics != null) {
                            var productCharacteristics = item.product.productCharacteristics;
                            var subscriptionCorrelationId = false;
                            var subscriptionId = false;
                            var imsi = false;
                            var iccid = false;
                            var msisdn = false;

                            for (var g = 0; g < productCharacteristics.length; g++) {
                                if (productCharacteristics[g].name == null)
                                    return createError("productCharacteristics.name", null, "Attribute name productCharacteristics.name of productCategory MOBILE_LINE is missing or null value field");
                                else if (productCharacteristics[g].value == null)
                                    return createError("productCharacteristics.value", null, "Attribute name productCharacteristics.value of productCategory MOBILE_LINE is missing or null value field");
                                else if (productCharacteristics[g].name == common.constants().CONSTANTS.PRODUCT_CHARACTERISTICS.SubscriptionCorrelationId)
                                    subscriptionCorrelationId = true;
                                else if (productCharacteristics[g].name == common.constants().CONSTANTS.PRODUCT_CHARACTERISTICS.subscriptionId)
                                    subscriptionId = true;
                                else if (productCharacteristics[g].name == common.constants().CONSTANTS.PRODUCT_CHARACTERISTICS.imsi)
                                    imsi = true;
                                else if (productCharacteristics[g].name == common.constants().CONSTANTS.PRODUCT_CHARACTERISTICS.iccid)
                                    iccid = true;
                                else if (productCharacteristics[g].name == common.constants().CONSTANTS.PRODUCT_CHARACTERISTICS.msisdn)
                                    msisdn = true;
                            }
                            if (subscriptionCorrelationId == false)
                                return createError("subscriptionCorrelationId", null, "Attribute name productCharacteristics.name of productCategory MOBILE_LINE is missing or null value field");
                            if (subscriptionId == false)
                                return createError("subscriptionId", null, "Attribute name productCharacteristics.name of productCategory MOBILE_LINE is missing or null value field");
                            if (imsi == false)
                                return createError("imsi", null, "Attribute name productCharacteristics.name of productCategory MOBILE_LINE is missing or null value field");
                            if (iccid == false)
                                return createError("iccid", null, "Attribute name productCharacteristics.name of productCategory MOBILE_LINE is missing or null value field");
                            if (msisdn == false)
                                return createError("msisdn", null, "Attribute name productCharacteristics.name of productCategory MOBILE_LINE is missing or null value field");
                        } else {
                            return createError("item.product.productCharacteristics", null, "Object name item.product.productCharacteristics of productCategory MOBILE_LINE is missing or null value field");
                        }
                    }
                }


                // ADJUST_WALLET UC NEW CHANGES BY AMR GOMAA 23-03-2023

                if (Adjust_WalletPO && item.action == common.constants().CONSTANTS.PRODUCT_ACTION.ADD) {

                    var adjustWalletPOID = item.id;
                    var subscriptionCorrelationId_Adjust_WalletPO;
                    if (item.product == null)
                        return createError(item.product, null, "Attribute name item.product of productCategory Adjust_Wallet is missing or null value field");
                    if (item.product.productCharacteristics != null) {
                        var productCharacteristics = item.product.productCharacteristics;
                        var adjustmentCode = false;
                        var subscriptionCorrelationId = false;
                        var walletValue = false;


                        for (var k = 0; k < productCharacteristics.length; k++) {
                            if (productCharacteristics[k].name == null)
                                return createError("productCharacteristics.name", null, "Attribute name productCharacteristics.name of productCategory Adjust_Wallet is missing or null value field");
                            if (productCharacteristics[k].value == null)
                                return createError("productCharacteristics.value", null, "Attribute name productCharacteristics.value of productCategory Adjust_Wallet is missing or null value field");
                            if (productCharacteristics[k].name == common.constants().CONSTANTS.PRODUCT_CHARACTERISTICS.SubscriptionCorrelationId) {
                                subscriptionCorrelationId = true;
                                subscriptionCorrelationId_Adjust_WalletPO = productCharacteristics[k].value;
                            }

                            if (productCharacteristics[k].name == common.constants().CONSTANTS.PRODUCT_CHARACTERISTICS.walletValue && productCharacteristics[k].value != null) {
                                walletValue = true;
                                walletValue = productCharacteristics[k].value;
                            }

                            if (productCharacteristics[k].name == common.constants().CONSTANTS.PRODUCT_CHARACTERISTICS.adjustmentCode && productCharacteristics[k].value != null) {
                                adjustmentCode = true;
                                adjustmentCode = productCharacteristics[k].value;
                            }
                        }
                        if (subscriptionCorrelationId == false)
                            return createError("subscriptionCorrelationId", null, "Attribute name productCharacteristics.name of productCategory Adjust_Wallet is missing or null value field");
                        if (walletValue == false)
                            return createError("walletValue", null, "Attribute name productCharacteristics.name of productCategory Adjust_Wallet is missing or null value field");
                        if (adjustmentCode == false)
                            return createError("adjustmentCode", null, "Attribute name productCharacteristics.name of productCategory Adjust_Wallet is missing or null value field");
                    } else {
                        return createError("item.product.productCharacteristics", null, "Object name item.product.productCharacteristics of productCategory Adjust_Wallet is missing or null value field");
                    }
                }

                ////// Transfer Ownership UC  changes

                if (isTransferOwnershipUC) {
                    if (productCategory == common.constants().CONSTANTS.PRODUCT_CATEGORY.ACCOUNT_MANAGEMENT) {
                        if (item.product == null)
                            return createError(item.product, null, "Attribute name item.product of productCategory ACCOUNT_MANAGEMENT is missing or null value field");
                        if (item.product.productCharacteristics != null) {
                            var productCharacteristics = item.product.productCharacteristics;
                            var subscriptionCorrelationId = false;
                            var currentOwnerSsoId = false;
                            //var currentOwnerCustomerId = false;

                            for (var g = 0; g < productCharacteristics.length; g++) {
                                if (productCharacteristics[g].name == null)
                                    return createError("productCharacteristics.name", null, "Attribute name productCharacteristics.name of productCategory ACCOUNT_MANAGEMENT is missing or null value field");
                                else if (productCharacteristics[g].value == null)
                                    return createError("productCharacteristics.value", null, "Attribute name productCharacteristics.value of productCategory ACCOUNT_MANAGEMENT is missing or null value field");
                                else if (productCharacteristics[g].name == common.constants().CONSTANTS.PRODUCT_CHARACTERISTICS.SubscriptionCorrelationId)
                                    subscriptionCorrelationId = true;
                                else if (productCharacteristics[g].name == common.constants().CONSTANTS.PRODUCT_CHARACTERISTICS.currentOwnerSsoId)
                                    currentOwnerSsoId = true;
                                //else if (productCharacteristics[g].name == common.constants().CONSTANTS.PRODUCT_CHARACTERISTICS.currentOwnerCustomerId)
                                //currentOwnerCustomerId = true;
                            }
                            if (subscriptionCorrelationId == false)
                                return createError("subscriptionCorrelationId", null, "Attribute name productCharacteristics.name of productCategory ACCOUNT_MANAGEMENT is missing or null value field");
                            if (currentOwnerSsoId == false)
                                return createError("currentOwnerSsoId", null, "Attribute name productCharacteristics.name of productCategory ACCOUNT_MANAGEMENT is missing or null value field");
                            //if (currentOwnerCustomerId == false)
                            //return createError("currentOwnerCustomerId", null, "Attribute name productCharacteristics.name of productCategory ACCOUNT_MANAGEMENT is missing or null value field");
                        } else {
                            return createError("item.product.productCharacteristics", null, "Object name item.product.productCharacteristics of productCategory ACCOUNT_MANAGEMENT is missing or null value field");
                        }
                    }
                    if (productCategory == common.constants().CONSTANTS.PRODUCT_CATEGORY.Mobile_Line_Offer && item.product == common.constants().CONSTANTS.PRODUCT_ACTION.MODIFY) {
                        mobileLinePO = true;
                        mobilePoId = item.id;
                        if (item.product == null)
                            return createError(item.product, null, "Attribute name item.product of productCategory MOBILE_LINE is missing or null value field");
                        if (item.product.productCharacteristics != null) {
                            var productCharacteristics = item.product.productCharacteristics;
                            var subscriptionCorrelationId = false;
                            var subscriptionId = false;
                            var imsi = false;
                            var iccid = false;
                            var msisdn = false;

                            for (var g = 0; g < productCharacteristics.length; g++) {
                                if (productCharacteristics[g].name == null)
                                    return createError("productCharacteristics.name", null, "Attribute name productCharacteristics.name of productCategory MOBILE_LINE is missing or null value field");
                                else if (productCharacteristics[g].value == null)
                                    return createError("productCharacteristics.value", null, "Attribute name productCharacteristics.value of productCategory MOBILE_LINE is missing or null value field");
                                else if (productCharacteristics[g].name == common.constants().CONSTANTS.PRODUCT_CHARACTERISTICS.SubscriptionCorrelationId)
                                    subscriptionCorrelationId = true;
                                else if (productCharacteristics[g].name == common.constants().CONSTANTS.PRODUCT_CHARACTERISTICS.subscriptionId)
                                    subscriptionId = true;
                                else if (productCharacteristics[g].name == common.constants().CONSTANTS.PRODUCT_CHARACTERISTICS.imsi)
                                    imsi = true;
                                else if (productCharacteristics[g].name == common.constants().CONSTANTS.PRODUCT_CHARACTERISTICS.iccid)
                                    iccid = true;
                                else if (productCharacteristics[g].name == common.constants().CONSTANTS.PRODUCT_CHARACTERISTICS.msisdn)
                                    msisdn = true;
                            }
                            if (subscriptionCorrelationId == false)
                                return createError("subscriptionCorrelationId", null, "Attribute name productCharacteristics.name of productCategory MOBILE_LINE is missing or null value field");
                            if (subscriptionId == false)
                                return createError("subscriptionId", null, "Attribute name productCharacteristics.name of productCategory MOBILE_LINE is missing or null value field");
                            if (imsi == false)
                                return createError("imsi", null, "Attribute name productCharacteristics.name of productCategory MOBILE_LINE is missing or null value field");
                            if (iccid == false)
                                return createError("iccid", null, "Attribute name productCharacteristics.name of productCategory MOBILE_LINE is missing or null value field");
                            if (msisdn == false)
                                return createError("msisdn", null, "Attribute name productCharacteristics.name of productCategory MOBILE_LINE is missing or null value field");
                        } else {
                            return createError("item.product.productCharacteristics", null, "Object name item.product.productCharacteristics of productCategory MOBILE_LINE is missing or null value field");
                        }
                    }
                }


                ///////////// CardsNCodes changes M Ali A Start
                if (CardsNCodesUC) {
                    if (productCategory == common.constants().CONSTANTS.PRODUCT_CATEGORY.CardsNCodes) {
                        if (item.product == null)
                            return createError(item.product, null, "Attribute name item.product of productCategory MOBILE_LINE is missing or null value field");
                        if (item.product.productCharacteristics != null) {
                            var productCharacteristics = item.product.productCharacteristics;
                            var subscriptionCorrelationId = false;


                            for (var g = 0; g < productCharacteristics.length; g++) {
                                if (productCharacteristics[g].name == null)
                                    return createError("productCharacteristics.name", null, "Attribute name productCharacteristics.name of productCategory MOBILE_LINE is missing or null value field");
                                else if (productCharacteristics[g].value == null)
                                    return createError("productCharacteristics.value", null, "Attribute name productCharacteristics.value of productCategory MOBILE_LINE is missing or null value field");
                                else if (productCharacteristics[g].name == common.constants().CONSTANTS.PRODUCT_CHARACTERISTICS.SubscriptionCorrelationId)
                                    subscriptionCorrelationId = true;
                            }
                            if (subscriptionCorrelationId == false)
                                return createError("subscriptionCorrelationId", null, "Attribute name productCharacteristics.name of productCategory MOBILE_LINE is missing or null value field");
                        } else {
                            return createError("item.product.productCharacteristics", null, "Object name item.product.productCharacteristics of productCategory MOBILE_LINE is missing or null value field");
                        }
                    }
                }
                ///////////// CardsNCodes changes M Ali A End

                //var mobileLinePO = false;
                var subscriptionCorrelationId_rechargePO;
                var subscriptionCorrelationId_mobilePO;
                if (recharge) {

                    if (productCategory == common.constants().CONSTANTS.PRODUCT_CATEGORY.Recharge) {
                        rechargePoId = item.id;

                        if (item.product == null)
                            return createError(item.product, null, "Attribute name item.product of productCategory Recharge is missing or null value field");
                        if (item.product.productCharacteristics != null) {
                            var productCharacteristics = item.product.productCharacteristics;
                            var subscriptionCorrelationId = false;
                            var rechargeAmount = false;
                            var externalRecharge;
                            var currentBalanceAmount;

                            for (var k = 0; k < productCharacteristics.length; k++) {
                                if (productCharacteristics[k].name == null)
                                    return createError("productCharacteristics.name", null, "Attribute name productCharacteristics.name of productCategory Recharge is missing or null value field");
                                if (productCharacteristics[k].value == null)
                                    return createError("productCharacteristics.value", null, "Attribute name productCharacteristics.value of productCategory Recharge is missing or null value field");
                                if (productCharacteristics[k].name == common.constants().CONSTANTS.PRODUCT_CHARACTERISTICS.SubscriptionCorrelationId) {
                                    subscriptionCorrelationId = true;
                                    subscriptionCorrelationId_rechargePO = productCharacteristics[k].value;
                                }
                                if (productCharacteristics[k].name == common.constants().CONSTANTS.PRODUCT_CHARACTERISTICS.rechargeAmount && productCharacteristics[k].value != null)
                                    rechargeAmount = true;

                                if (productCharacteristics[k].name == common.constants().CONSTANTS.PRODUCT_CHARACTERISTICS.externalRecharge) {
                                    externalRecharge = productCharacteristics[k].value;
                                }
                                if (productCharacteristics[k].name == common.constants().CONSTANTS.PRODUCT_CHARACTERISTICS.currentBalanceAmount) {
                                    currentBalanceAmount = productCharacteristics[k].value;
                                }
                            }
                            if (subscriptionCorrelationId == false)
                                return createError("subscriptionCorrelationId", null, "Attribute name productCharacteristics.name of productCategory Recharge is missing or null value field");
                            if (rechargeAmount == false) {
                                var rechargePO = theCatalog.getItem(productOfferingId);
                                var rechargePS = rechargePO.getAssociations();
                                if (rechargePS[0].code != "PS_VOUCHERLESS_FIXED_RECHARGE") {
                                    return createError("rechargeAmount", null, "Attribute rechargeAmount productCharacteristics.name of productCategory Recharge is missing or null value field");
                                }
                            }
                            if (externalRecharge == true || externalRecharge == "true") {
                                var rechargePO = theCatalog.getItem(productOfferingId);
                                if (!currentBalanceAmount) {
                                    return createError("currentBalanceAmount", null, "Attribute name item.product.productCharacteristics of productCategory Recharge is missing");
                                }
                                if (!rechargePO.attributeExists('currentBalanceAmount')) {
                                    return createError("currentBalanceAmount", null, "Attribute name productCharacteristics.name of productCategory Recharge is missing or null value field");
                                }

                            }

                        } else {
                            return createError("item.product.productCharacteristics", null, "Object name item.product.productCharacteristics of productCategory Recharge is missing or null value field");
                        }
                    }
                    /*
                                            else if (productCategory == common.constants().CONSTANTS.PRODUCT_CATEGORY.Mobile_Line_Offer) {
                                        mobileLinePO = true;
                                        mobilePoId = item.id;
                                        if (item.product == null)
                                            return createError(item.product, null, "Attribute name item.product of productCategory MOBILE_LINE is missing or null value field");
                                        if (item.product.productCharacteristics != null) {
                                            var productCharacteristics = item.product.productCharacteristics;
                                            var subscriptionCorrelationId = false;
                                            var subscriptionId = false;

                                            for (var g = 0; g < productCharacteristics.length; g++) {
                                                if (productCharacteristics[g].name == null)
                                                    return createError("productCharacteristics.name", null, "Attribute name productCharacteristics.name of productCategory MOBILE_LINE is missing or null value field");
                                                if (productCharacteristics[g].value == null)
                                                    return createError("productCharacteristics.value", null, "Attribute name productCharacteristics.value of productCategory MOBILE_LINE is missing or null value field");
                                                if (productCharacteristics[g].name == common.constants().CONSTANTS.PRODUCT_CHARACTERISTICS.SubscriptionCorrelationId) {
                                                    subscriptionCorrelationId = true;
                                                    subscriptionCorrelationId_mobilePO = productCharacteristics[g].value;
                                                }
                                                if (productCharacteristics[g].name == "subscriptionId" && productCharacteristics[g].value)
                                                    subscriptionId = true;
                                            }
                                        }
                                        if (subscriptionCorrelationId == false)
                                            return createError("subscriptionCorrelationId", null, "Attribute subscriptionCorrelationId productCharacteristics.name of productCategory MOBILE_LINE is missing or null value field");
                                        if (subscriptionId == false)
                                            return createError("subscriptionId", null, "Attribute subscriptionId productCharacteristics.name of productCategory MOBILE_LINE is missing or null value field");
                                    }
                                            */
                    /*else {
                    return createError("item.product.productCharacteristics", null, "Object name item.product.productCharacteristics of productCategory MOBILE_LINE is missing or null value field");
                    }*/
                }
            }

        }
        if (suspendSubscription) {
            if (productCategory == common.constants().CONSTANTS.PRODUCT_CATEGORY.Mobile_Line_Offer) {

                if (item.product == null)
                    return createError(item.product, null, "Attribute name item.product of productCategory Mobile Line is missing or null value field");
                if (item.product.productCharacteristics != null) {
                    var productCharacteristics = item.product.productCharacteristics;
                    var subscriptionCorrelationId = false;
                    var actionReason = false;
                    var subscriptionId = false;
                    var imsi = false;
                    var msisdn = false;

                    for (var k = 0; k < productCharacteristics.length; k++) {
                        if (productCharacteristics[k].name == null)
                            return createError("productCharacteristics.name", null, "Attribute name productCharacteristics.name of productCategory Mobile Line is missing or null value field");
                        if (productCharacteristics[k].value == null)
                            return createError("productCharacteristics.value", null, "Attribute name productCharacteristics.value of productCategory Mobile Line is missing or null value field");
                        if (productCharacteristics[k].name == common.constants().CONSTANTS.PRODUCT_CHARACTERISTICS.SubscriptionCorrelationId)
                            subscriptionCorrelationId = true;
                        if (productCharacteristics[k].name == common.constants().CONSTANTS.PRODUCT_CHARACTERISTICS.actionReason)
                            actionReason = true;
                        if (productCharacteristics[k].name == common.constants().CONSTANTS.PRODUCT_CHARACTERISTICS.subscriptionId)
                            subscriptionId = true;
                        if (productCharacteristics[k].name == common.constants().CONSTANTS.PRODUCT_CHARACTERISTICS.imsi)
                            imsi = true;
                        if (productCharacteristics[k].name == common.constants().CONSTANTS.PRODUCT_CHARACTERISTICS.msisdn)
                            msisdn = true;
                    }
                    if (subscriptionCorrelationId == false)
                        return createError("subscriptionCorrelationId", null, "Attribute subscriptionCorrelationId productCharacteristics.name of productCategory Mobile Line is missing or null value field");
                    if (actionReason == false)
                        return createError("actionReason", null, "Attribute actionReason productCharacteristics.name of productCategory Mobile Line is missing or null value field");
                    if (subscriptionId == false)
                        return createError("subscriptionId", null, "Attribute subscriptionId productCharacteristics.name of productCategory Mobile Line is missing or null value field");
                    if (imsi == false)
                        return createError("imsi", null, "Attribute imsi productCharacteristics.name of productCategory Mobile Line is missing or null value field");
                    if (msisdn == false)
                        return createError("msisdn", null, "Attribute msisdn productCharacteristics.name of productCategory Mobile Line is missing or null value field");

                } else {
                    return createError("item.product.productCharacteristics", null, "Object name item.product.productCharacteristics of productCategory Mobile Line is missing or null value field");
                }
            }
        }

        //start set recureence validation
        var setRecurrenceSubscriptionId = false;

        if (setRecurrence_PO) {
            //   jawwyOM.testsanan();
            //function createErrorWithSpecificReason(reason, paramName, paramValue, desc) {
            if (item.product == null)
                return eoc_commons.createAPIFault("Validation Error Missing Mandatory Fields", 400, null, null, "Attribute name item.productis missing or null value field Validate Create Order Request");

            if (item.product.productCharacteristics != null) {

                var productCharacteristics = item.product.productCharacteristics;

                var subscriptionCorrelationId = false;
                var setRecurrence = false;

                for (var k = 0; k < productCharacteristics.length; k++) {

                    /* if (productCharacteristics[k].name == null)
                    return createErrorWithSpecificReason("productCharacteristics.name", null, "Attribute name productCharacteristics.name of  is missing or null value field");
                    if (productCharacteristics[k].value == null)
                    return createErrorWithSpecificReason("productCharacteristics.value", null, "Attribute name productCharacteristics.value of  is missing or null value field");*/
                    // issue
                    if (!(productCharacteristics[k].name != null && productCharacteristics[k].name == ("subscriptionId" || common.constants().CONSTANTS.PRODUCT_CHARACTERISTICS.SubscriptionCorrelationId ||
                        "setRecurrence") || productCharacteristics[k].value != null || productCharacteristics[k].value != ""))
                        return eoc_commons.createAPIFault("Validation Error Missing Mandatory Fields", 400, null, null, "Attribute name " + productCharacteristics[k].name + " is missing or null value field");

                }
            } else {
                return eoc_commons.createAPIFault("Validation Error Missing Mandatory Fields", 400, null, null, "Attribute name item.product.productCharacteristics missing or null value field Validate Create Order Request");
            }

            if (productCategory == common.constants().CONSTANTS.PRODUCT_CATEGORY.Mobile_Line_Offer) { // Mobile_Line productCharacteristics[k].name
                setRecurrencesmobileLinePO = true;
                if (item.product == null)
                    return createError(item.product, null, "Attribute name item.product of productCategory MOBILE_LINE is missing or null value field");
                if (item.product.productCharacteristics != null) {
                    var productCharacteristics = item.product.productCharacteristics;
                    var subscriptionCorrelationId = false;

                    for (var g = 0; g < productCharacteristics.length; g++) {
                        if (productCharacteristics[g].name == null)
                            return createError("productCharacteristics.name", null, "Attribute name productCharacteristics.name of productCategory MOBILE_LINE is missing or null value field");
                        if (productCharacteristics[g].value == null)
                            return createError("productCharacteristics.value", null, "Attribute name productCharacteristics.value of productCategory MOBILE_LINE is missing or null value field");
                        if (productCharacteristics[g].name == common.constants().CONSTANTS.PRODUCT_CHARACTERISTICS.SubscriptionCorrelationId)
                            subscriptionCorrelationId = true;
                        //  jawwyOM.testsanan();
                        if (productCharacteristics[g].name == "subscriptionId" && productCharacteristics[g].value != null)
                            setRecurrenceSubscriptionId = true;

                    }
                    if (subscriptionCorrelationId == false)
                        return createError("subscriptionCorrelationId", null, "Attribute subscriptionCorrelationId productCharacteristics.name of productCategory MOBILE_LINE is missing or null value field");
                    // remove action validation
                    //                        if (item.action != "No_Change")
                    //                          return createError("Mobile Line Set Recurrences", null, "Action Value should be Add");
                }
            } // end Mobile Line Check

        } //end set recurrence orderIems vallidation
        if ((configureSubscription || deleteSubscription) && (!newActivation && !isTransferOwnershipUC && !newActivationOffline && !recharge && !sharingLimitPO && !upgradeDowngrade_PO && !setRecurrence_PO && !planStartDatePO && !simSwap_UC_Flag && !simSwapAssisted_UC_Flag && !mnpPortOutPO && !portInUC && !portInAssistedUC && !portInUCEsim && !editSimAlisPO && !terminateSubscriptionPO && !newActivationEsim)) {
            var response = OMREST.configureUCAttributeValidation(item, productCategory);

            if (response instanceof eoc_commons.fault)
                return response;
        }

        if (!newActivation && !isTransferOwnershipUC && !recharge && !sharingLimitPO && !upgradeDowngrade_PO && !setRecurrence_PO && !planStartDatePO && !simSwap_UC_Flag && !simSwapAssisted_UC_Flag && !mnpPortOutPO && !portInUC && !portInAssistedUC && !portInUCEsim && !editSimAlisPO && !terminateSubscriptionPO && !newActivationEsim && !newActivationOffline) //Configure Subsribtion UseCase -- Ahsan
        {
            if (isMobileLine) {
                var isSubsribtionId = OMREST.isMobileLineHasSubscribtionDetails(mobileLineOrderItemArr);
                if (!isSubsribtionId) {
                    return createErrorWithSpecificReason("Attribute subscriptionId/SubscriptionCorrelationId productCharacteristics.name of productCategory MOBILE_LINE is missing or null value field", "Mobile Line Offer subscriptionId/SubscriptionCorrelationId is missing in the request");

                }

            }
        }
    }

    if (renewalSubsription) {
        var response = jawwyOM.renew.validationRenewalSubscribtion(renewalPOArr, mobileLineOrderItemArr);
        if (response instanceof eoc_commons.fault)
            return response;
    }

    if (setRecurrence_PO || planStartDatePO) {
        //if (recharge && mobileLinePO == false)
        //    return createErrorWithSpecificReason("Missing mandatory item Mobile Line Offer", "Mobile Line Offer", "Mobile Line Offer is missing in the request", "Mobile Line Offer is missing in the request");
        //if (subscriptionCorrelationId_rechargePO != subscriptionCorrelationId_mobilePO)
        //    return createErrorWithRefrence("Mobile Line Offer with subscriptionCorrelationId = " + subscriptionCorrelationId_rechargePO + " missing in request", null, null, "Mobile Line Offer with subscriptionCorrelationId = " + subscriptionCorrelationId_rechargePO + " missing in request", subscriptionCorrelationId_rechargePO);

        if (setRecurrence_PO && setRecurrencesmobileLinePO == false && setRecurrenseSubscriberLevel)
            return createErrorWithSpecificReason("Missing mandatory item Mobile Line Offer", "Mobile Line Offer", "Mobile Line Offer is missing in the request", "Mobile Line Offer is missing in the request");

        if (planStartDatePO && planStratDateMobileLinePO == false && planStratDateSubscriberLevelPO)
            return createErrorWithSpecificReason("Missing mandatory item Mobile Line Offer", "Mobile Line Offer", "Mobile Line Offer is missing in the request", "Mobile Line Offer is missing in the request");

    }

    // validate newActivation relations
    if (newActivation || portInUC || portInAssistedUC || newActivationEsim || portInUCEsim || newActivationOffline) {
        if (mobileLinePO == false)
            return createErrorWithSpecificReason("Missing mandatory item Mobile Line Offer", "Mobile Line Offer", "Mobile Line Offer is missing in the request", "Mobile Line Offer is missing in the request");
        // validate relations of MSISDN PO

        if (!newActivationEsim && !portInUCEsim) {
            var relationMsisdnSim = false;
            var relationMsisdnMobile = false;
            for (var h = 0; h < msisdnPoRefrence.length; h++) {
                if (msisdnPoRefrence[h] == simPoId && msisdnPoRole[h] == common.constants().CONSTANTS.relatedOrderItems_ROLES.Requires)
                    relationMsisdnSim = true;
            }
            if (relationMsisdnSim == false)
                return createError("SIM PO", null, "reference for SIM PO is missing in Msisdn PO");

            // validate relations of SIM PO
            var relationSimSimPlan = false;
            var relationSimShipping = false;
            var relationSimMobile = false;
            for (var j = 0; j < simPoRefrence.length; j++) {
                if (simPoRefrence[j] == simPlanPoId && simPoRole[j] == common.constants().CONSTANTS.relatedOrderItems_ROLES.ChildOf)
                    relationSimSimPlan = true;
                if (simPoRefrence[j] == shippingPoId && simPoRole[j] == common.constants().CONSTANTS.relatedOrderItems_ROLES.Requires)
                    relationSimShipping = true;
            }
            if (relationSimSimPlan == false)
                return createError("simPlan PO", null, "reference for simPlan PO is missing in SIM PO");
            if (relationSimShipping == false)
                return createError("SHIPPING_METHOD PO", null, "reference for SHIPPING_METHOD PO is missing in SIM PO");
        }


        // validate relations of InitialSimPlan PO
        var reilationInitialSimPlan = false;
        for (var k = 0; k < initialPoRefrence.length; k++) {
            if (initialPoRefrence[k] == simPlanPoId && initialPoRole[k] == common.constants().CONSTANTS.relatedOrderItems_ROLES.ChildOf)
                reilationInitialSimPlan = true;
        }
        if (reilationInitialSimPlan == false)
            return createError("simPlan PO", null, "reference for simPlan PO is missing in INIT_ALLOWANCE PO");

    }

    // validate recharge relations
    /*
    else if (recharge) {
    var relationRechargeMobile = false;
    for (var k = 0; k < rechargePoRefrence.length; k++) {
    if (rechargePoRefrence[k] == mobilePoId && rechargePoRole[k] == common.constants().CONSTANTS.relatedOrderItems_ROLES.Requires)
    relationRechargeMobile = true;
    }
    }
     */

}

//cheking attrs
// changes added by ibrahim
var attrs = request.attrs;
/*
if (newActivation) {
var sourceOrganizationId = false;
if (attrs != null && attrs.length > 0) {
var attrsValue = attrs;
for (var attrInd = 0; attrInd < attrsValue.length; attrInd++) {
if (attrsValue[attrInd].name != null && attrsValue[attrInd].name == common.constants().CONSTANTS.attrs_NAME.sourceOrganizationId && attrsValue[attrInd].value != null) {
sourceOrganizationId = attrsValue[attrInd].value;
sourceOrganizationId = true;

}
}
}
if(sourceOrganizationId == false)
return createError("ssourceOrganizationId", null, "sourceOrganizationId is missing in attrs.sourceOrganizationId");
}*/
var triggeringSystem = false;
var notificationCodeFlag = false;
var triggeringSystemValue = false;
var externalTransactionId = false;
var externalMessageId = false;
var iamToken = false;
var serviceOTP = false;
var sourceType = false;
var externalTimestamp = false; //Atef
if (terminateSubscriptionPO || resumeSubscription_UC_Flag || isTransferOwnershipUC || transfer2AcctUC) {
    var attrs = request.attrs;
    if (attrs != null && attrs.length > 0) {
        var attrsValue = attrs;
        for (var attrInd = 0; attrInd < attrsValue.length; attrInd++) {
            if (attrsValue[attrInd].name != null && attrsValue[attrInd].name == "triggeringSystem" && attrsValue[attrInd].value != null) {
                triggeringSystem = true;
                if (attrsValue[attrInd].value == "CRM") {
                    triggeringSystemValue = true;
                }
            }
            if (attrsValue[attrInd].name != null && attrsValue[attrInd].name == "notificationCode" && attrsValue[attrInd].value != null) {
                notificationCodeFlag = true;
            }
        }
    }
}
// changes related to EVO-782 done by Amr Gomaa 18-01-2022.
//uncommented this 03-02-2023.
if (transfer2AcctUC) {
    if (isAdminTrans == null)
        return createError("isAdmin", null, "Mobile Line PO productCharacteristics.type{isAdmin} not found");

}




if (simSwapAssisted_UC_Flag || newActivationOffline || portInAssistedUC || isTransferOwnershipUC) {
    var attrs = request.attrs;
    if (attrs != null && attrs.length > 0) {
        var attrsValue = attrs;
        for (var attrInd = 0; attrInd < attrsValue.length; attrInd++) {
            if (attrsValue[attrInd].name != null && attrsValue[attrInd].name == "externalTransactionId" && attrsValue[attrInd].value != null) {
                externalTransactionId = true;
            }
            else if (attrsValue[attrInd].name != null && attrsValue[attrInd].name == "iamToken" && attrsValue[attrInd].value != null) {
                iamToken = true;
            }
            else if (attrsValue[attrInd].name != null && attrsValue[attrInd].name == "serviceOTP" && attrsValue[attrInd].value != null) {
                serviceOTP = true;
            }
            else if (attrsValue[attrInd].name != null && attrsValue[attrInd].name == "sourceType" && attrsValue[attrInd].value != null) {
                sourceType = true;
            }
            //Atef
            else if (attrsValue[attrInd].name != null && attrsValue[attrInd].name == "externalTimestamp" && attrsValue[attrInd].value != null) {
                externalTimestamp = true;
            }

        }
    }
}
if (newActivation || portInUC || newActivationEsim || portInUCEsim || newActivationOffline || portInAssistedUC || isTransferOwnershipUC) {
    var attrs = request.attrs;
    if (attrs != null && attrs.length > 0) {
        var attrsValue = attrs;
        for (var attrInd = 0; attrInd < attrsValue.length; attrInd++) {
            if (attrsValue[attrInd].name != null && attrsValue[attrInd].name == "externalMessageId" && attrsValue[attrInd].value != null) {
                externalMessageId = true;
            }
        }
    }
}

//checking relatedEntities
var relatedEntities = request.relatedEntities;
if (relatedEntities.length <= 0)
    return createError("relatedEntities", null, "Order level container, relatedEntities is missing");
else {

    var customer = false;
    var user = false;
    var account = false;
    var store = false;
    var channel = false;
    var agent = false;
    var payerAccount = false;
    var place = false;
    var placeNationalAddress = false;
    var subscriber = false;

    //      entityDetails
    var languagePreference = false;
    var languagePreference_user = false;
    var isNewUser = false;
    //var contactEmail = false;
    var orderSource = false;
    var type = false;
    var uniqueTransactionId = false;
    var method = false;
    var amount = false;
    var discountAmount = false;
    //EVO-2679 validation
    var totalVat = false;
    var totalPaidAmount = false;
    //EVO-2679 validation
    var currency = false;
    var terminalId = false;
    var approvalCode = false;
    var address = false;
    var contactNumber = false;
    var contactNumber_User = false;
    var city = false;
    var cityCode = false;
    var coordinates = false;
    var subscriptionId = false;
    var isLoggedIn = false;
    var isLoggedInValue = false;
    var firstName = false;
    var familyName = false;
    var firstNameEN = false;
    var familyNameEN = false;
    var grandfatherName = false;
    var gender = false;
    var nationality = false;
    var customerIdType = false;
    var customerIdNumber = false;
    var cityCodeNationalAddress = false;
    var buildingNumber = false;
    var streetName = false;
    var zipCode = false;
    var region = false;
    var cityNationalAddress = false;
    var locationCoordinates = false;
    var district = false;
    var additionalNumber = false;
    var relatedEntityCustomer = false;
    var relatedEntityPlace = false;

    for (var i = 0; i < relatedEntities.length; i++) {
        if (relatedEntities[i].type == null)
            return createError("relatedEntities.type", null, "Attribute name relatedEntities.type is missing or null value field");

        if (relatedEntities[i].type == common.constants().CONSTANTS.ENTITY_TYPE.Customer && relatedEntities[i].reference != null) {
            if (relatedEntities[i].entity != null) {
                lobDS = Global.getItemsFromJson(relatedEntities[i].entity, "OMREST.userDetails");
                for (var j = 0; j < lobDS[0].entityDetails.length; j++) {
                    if (lobDS[0].entityDetails[j].name == common.constants().CONSTANTS.ENTITY_DETAILS.firstName && lobDS[0].entityDetails[j].value != null)
                        firstName = true;
                    if (lobDS[0].entityDetails[j].name == common.constants().CONSTANTS.ENTITY_DETAILS.familyName && lobDS[0].entityDetails[j].value != null)
                        familyName = true;
                    if (lobDS[0].entityDetails[j].name == common.constants().CONSTANTS.ENTITY_DETAILS.firstNameEN && lobDS[0].entityDetails[j].value != null)
                        firstNameEN = true;
                    if (lobDS[0].entityDetails[j].name == common.constants().CONSTANTS.ENTITY_DETAILS.familyNameEN && lobDS[0].entityDetails[j].value != null)
                        familyNameEN = true;
                    if (lobDS[0].entityDetails[j].name == common.constants().CONSTANTS.ENTITY_DETAILS.grandfatherName && lobDS[0].entityDetails[j].value != null)
                        grandfatherName = true;
                    if (lobDS[0].entityDetails[j].name == common.constants().CONSTANTS.ENTITY_DETAILS.gender && lobDS[0].entityDetails[j].value != null) {
                        if (lobDS[0].entityDetails[j].value != 'F' && lobDS[0].entityDetails[j].value != 'M')
                            return createError("relatedEntities.type.gender", null, "Attribute value relatedEntities.type.gender should be M for male, F for female");
                        else
                            gender = true;
                    }
                    if (lobDS[0].entityDetails[j].name == common.constants().CONSTANTS.ENTITY_DETAILS.nationality && lobDS[0].entityDetails[j].value != null)
                        nationality = true;
                    if (lobDS[0].entityDetails[j].name == common.constants().CONSTANTS.ENTITY_DETAILS.customerIdType && lobDS[0].entityDetails[j].value != null)
                        customerIdType = true;
                    if (lobDS[0].entityDetails[j].name == common.constants().CONSTANTS.ENTITY_DETAILS.customerIdNumber && lobDS[0].entityDetails[j].value != null)
                        customerIdNumber = true;
                }
            }
            customer = true;
        }
        else if (relatedEntities[i].type == common.constants().CONSTANTS.ENTITY_TYPE.User && relatedEntities[i].reference != null) {
            if (relatedEntities[i].entity != null) {
                lobDS = Global.getItemsFromJson(relatedEntities[i].entity, "OMREST.userDetails");
                for (var j = 0; j < lobDS[0].entityDetails.length; j++) {
                    if (lobDS[0].entityDetails[j].name == common.constants().CONSTANTS.ENTITY_DETAILS.languagePreference && lobDS[0].entityDetails[j].value != null) {
                        languagePreference_user = true;
                    }
                    if (lobDS[0].entityDetails[j].name == common.constants().CONSTANTS.ENTITY_DETAILS.contactNumber && lobDS[0].entityDetails[j].value != null) {
                        contactNumber_User = true;
                    }
                    // EVO-782 Changes Done by Amr Gomaa 18-01-2023
                    if (lobDS[0].entityDetails[j].name == common.constants().CONSTANTS.ENTITY_DETAILS.isNewUser)
                        isNewUser = true;
                    if (lobDS[0].entityDetails[j].name == 'isSourceAccountAdmin')
                        isSourceAccountAdmin = true;

                }
            }
            user = true;
        } else if (relatedEntities[i].type == common.constants().CONSTANTS.ENTITY_TYPE.Account && relatedEntities[i].reference != null && relatedEntities[i].reference != '') {
            if (relatedEntities[i].entity != null) {
                lobDS = Global.getItemsFromJson(relatedEntities[i].entity, "OMREST.userDetails");
                for (var j = 0; j < lobDS[0].entityDetails.length; j++) {
                    if (lobDS[0].entityDetails[j].name == 'isNewAccount' && lobDS[0].entityDetails[j].value != null) {
                        isNewAccount = true;
                    }
                }
            }
            account = true;
        } else if (relatedEntities[i].type == common.constants().CONSTANTS.ENTITY_TYPE.Store && relatedEntities[i].reference != null) {
            store = true;
        } else if (relatedEntities[i].type == common.constants().CONSTANTS.ENTITY_TYPE.Channel && relatedEntities[i].name != null) {
            /*
            if (relatedEntities[i].entity == null)
            return createError("entity", null, "object name entity of relatedEntities[Channel] is missing or null value field");
            lobDS = Global.getItemsFromJson(relatedEntities[i].entity, "OMREST.channelDetails");

            for (var j = 0; j < lobDS[0].entityDetails.length; j++) {
            if (lobDS[0].entityDetails[j].name == common.constants().CONSTANTS.ENTITY_DETAILS.orderSource)
            orderSource = true;
            }
            if (orderSource == false)
            return createError("orderSource", null, "relatedEntities.type{Channel}.entity.entityDetails.name Attribute not found");
             */
            channel = true;
        }
        /*
        else if (relatedEntities[i].type == common.constants().CONSTANTS.ENTITY_TYPE.Agent && relatedEntities[i].name != null) {
        agent = true;
        }*/
        else if (relatedEntities[i].type == common.constants().CONSTANTS.ENTITY_TYPE.Merchant) {
            if (relatedEntities[i].name == null)
                return createError("name", null, "relatedEntities.type{Merchant} name Attribute not found");
            if (relatedEntities[i].reference == null)
                return createError("reference", null, "relatedEntities.type{Merchant} reference Attribute not found");
        }
        //        else if (relatedEntities[i].type == common.constants().CONSTANTS.ENTITY_TYPE.Subscriber) {
        //            if (relatedEntities[i].name == null)
        //                return createError("name", null, "relatedEntities.type{Subscriber} name Attribute not found");
        //            if (relatedEntities[i].reference == null)
        //                return createError("reference", null, "relatedEntities.type{Subscriber} reference Attribute not found");
        //            subscriber = true;
        //        }
        else if (relatedEntities[i].type == common.constants().CONSTANTS.ENTITY_TYPE.PayerAccount) {

            if (relatedEntities[i].entity == null)
                return createError("entity", null, "object name entity of relatedEntities[PayerAccount] is missing or null value field");
            lobDS = Global.getItemsFromJson(relatedEntities[i].entity, "OMREST.payerAccountDetails");
            for (var j = 0; j < lobDS[0].entityDetails.length; j++) {
                if (lobDS[0].entityDetails[j].name == common.constants().CONSTANTS.ENTITY_DETAILS.type)
                    type = true;
                if (lobDS[0].entityDetails[j].name == common.constants().CONSTANTS.ENTITY_DETAILS.uniqueTransactionId)
                    uniqueTransactionId = true;
                if (lobDS[0].entityDetails[j].name == common.constants().CONSTANTS.ENTITY_DETAILS.method)
                    method = true;
                if (lobDS[0].entityDetails[j].name == common.constants().CONSTANTS.ENTITY_DETAILS.amount)
                    amount = true;
                if (lobDS[0].entityDetails[j].name == common.constants().CONSTANTS.ENTITY_DETAILS.discountAmount)
                    discountAmount = true;
                //EVO-2679 validation
                if (lobDS[0].entityDetails[j].name == common.constants().CONSTANTS.ENTITY_DETAILS.totalVat) {
                    totalVat = true;
                }
                if (lobDS[0].entityDetails[j].name == common.constants().CONSTANTS.ENTITY_DETAILS.totalPaidAmount) {
                    totalPaidAmount = true;
                }
                //EVO-2679 validation
                if (lobDS[0].entityDetails[j].name == common.constants().CONSTANTS.ENTITY_DETAILS.currency)
                    currency = true;
                if (lobDS[0].entityDetails[j].name == common.constants().CONSTANTS.ENTITY_DETAILS.terminalId)
                    terminalId = true;
                if (lobDS[0].entityDetails[j].name == common.constants().CONSTANTS.ENTITY_DETAILS.approvalCode)
                    approvalCode = true;
            }
            if (type == false)
                return createError("type", null, "relatedEntities.type{PayerAccount}.entity.entityDetails.name Attribute not found");
            if (uniqueTransactionId == false)
                return createError("uniqueTransactionId", null, "relatedEntities.type{PayerAccount}.entity.entityDetails.name Attribute not found");
            if (method == false)
                return createError("method", null, "relatedEntities.type{PayerAccount}.entity.entityDetails.name Attribute not found");
            if (amount == false)
                return createError("amount", null, "relatedEntities.type{PayerAccount}.entity.entityDetails.name Attribute not found");
            if (discountAmount == false)
                return createError("discountAmount", null, "relatedEntities.type{PayerAccount}.entity.entityDetails.name Attribute not found");
            if (currency == false)
                return createError("currency", null, "relatedEntities.type{PayerAccount}.entity.entityDetails.name Attribute not found");
            payerAccount = true;
        } else if (relatedEntities[i].type == common.constants().CONSTANTS.ENTITY_TYPE.Place && relatedEntities[i].name == common.constants().CONSTANTS.RELATED_ENTITIES_NAME.shippingAddress && relatedEntities[i].reference != null && !newActivationOffline && !transfer2AcctUC) {
            if (relatedEntities[i].entity == null)
                return createError("entity", null, "object name entity of relatedEntities[Place] is missing or null value field");
            lobDS = Global.getItemsFromJson(relatedEntities[i].entity, "OMREST.placeDetails");
            for (var j = 0; j < lobDS[0].entityDetails.length; j++) {
                if (lobDS[0].entityDetails[j].name == common.constants().CONSTANTS.ENTITY_DETAILS.address)
                    address = true;
                if (lobDS[0].entityDetails[j].name == common.constants().CONSTANTS.ENTITY_DETAILS.contactNumber)
                    contactNumber = true;
                if (lobDS[0].entityDetails[j].name == common.constants().CONSTANTS.ENTITY_DETAILS.cityCode)
                    cityCode = true;
                if (lobDS[0].entityDetails[j].name == common.constants().CONSTANTS.ENTITY_DETAILS.city)
                    city = true;
                if (lobDS[0].entityDetails[j].name == common.constants().CONSTANTS.ENTITY_DETAILS.coordinates)
                    coordinates = true;
                if (lobDS[0].entityDetails[j].name == common.constants().CONSTANTS.ENTITY_DETAILS.languagePreference)
                    languagePreference = true;
            }
            if (tempFlagIsPickup || tempFlagIsStadard) {
                if (address == false)
                    return createError("address", null, "relatedEntities.type{Place}.entity.entityDetails.name Attribute not found");
                if (cityCode == false && tempFlagIsStadard == true)
                    return createError("cityCode", null, "relatedEntities.type{Place}.entity.entityDetails.name Attribute not found");
                if (contactNumber == false)
                    return createError("contactNumber", null, "relatedEntities.type{Place}.entity.entityDetails.name Attribute not found");
                if (city == false)
                    return createError("city", null, "relatedEntities.type{Place}.entity.entityDetails.name Attribute not found");
                if (coordinates == false)
                    return createError("coordinates", null, "relatedEntities.type{Place}.entity.entityDetails.name Attribute not found");
                if (languagePreference == false)
                    return createError("languagePreference", null, "relatedEntities.type{Place}.entity.entityDetails.name Attribute not found");
            }
            place = true;
        } else if ((newActivationOffline || portInAssistedUC || isTransferOwnershipUC) && relatedEntities[i].type == common.constants().CONSTANTS.ENTITY_TYPE.Place && relatedEntities[i].name == common.constants().CONSTANTS.RELATED_ENTITIES_NAME.nationalAddress && relatedEntities[i].reference != null) {
            if (relatedEntities[i].entity == null)
                return createError("entity", null, "object name entity of relatedEntities[Place] is missing or null value field");
            lobDS = Global.getItemsFromJson(relatedEntities[i].entity, "OMREST.placeDetails");
            for (var j = 0; j < lobDS[0].entityDetails.length; j++) {
                if (lobDS[0].entityDetails[j].name == common.constants().CONSTANTS.ENTITY_DETAILS.cityCode && lobDS[0].entityDetails[j].value != null)
                    cityCodeNationalAddress = true;
                if (lobDS[0].entityDetails[j].name == common.constants().CONSTANTS.ENTITY_DETAILS.buildingNumber && lobDS[0].entityDetails[j].value != null)
                    buildingNumber = true;
                if (lobDS[0].entityDetails[j].name == common.constants().CONSTANTS.ENTITY_DETAILS.streetName && lobDS[0].entityDetails[j].value != null)
                    streetName = true;
                if (lobDS[0].entityDetails[j].name == common.constants().CONSTANTS.ENTITY_DETAILS.zipCode && lobDS[0].entityDetails[j].value != null)
                    zipCode = true;
                if (lobDS[0].entityDetails[j].name == common.constants().CONSTANTS.ENTITY_DETAILS.region && lobDS[0].entityDetails[j].value != null)
                    region = true;
                if (lobDS[0].entityDetails[j].name == common.constants().CONSTANTS.ENTITY_DETAILS.city && lobDS[0].entityDetails[j].value != null)
                    cityNationalAddress = true;
                if (lobDS[0].entityDetails[j].name == common.constants().CONSTANTS.ENTITY_DETAILS.locationCoordinates && lobDS[0].entityDetails[j].value != null)
                    locationCoordinates = true;
                if (lobDS[0].entityDetails[j].name == common.constants().CONSTANTS.ENTITY_DETAILS.district && lobDS[0].entityDetails[j].value != null)
                    district = true;
                if (lobDS[0].entityDetails[j].name == common.constants().CONSTANTS.ENTITY_DETAILS.additionalNumber && lobDS[0].entityDetails[j].value != null)
                    additionalNumber = true;
            }
            if ((newActivationOffline || portInAssistedUC || isTransferOwnershipUC)) {
                if (cityCodeNationalAddress == false)
                    return createError("cityCode", null, "relatedEntities.type{Place}.entity.entityDetails.name Attribute not found");
                if (buildingNumber == false)
                    return createError("buildingNumber", null, "relatedEntities.type{Place}.entity.entityDetails.name Attribute not found");
                if (streetName == false)
                    return createError("streetName", null, "relatedEntities.type{Place}.entity.entityDetails.name Attribute not found");
                if (zipCode == false)
                    return createError("zipCode", null, "relatedEntities.type{Place}.entity.entityDetails.name Attribute not found");
                if (region == false)
                    return createError("region", null, "relatedEntities.type{Place}.entity.entityDetails.name Attribute not found");
                if (locationCoordinates == false)
                    return createError("locationCoordinates", null, "relatedEntities.type{Place}.entity.entityDetails.name Attribute not found");
                if (cityNationalAddress == false)
                    return createError("city", null, "relatedEntities.type{Place}.entity.entityDetails.name Attribute not found");
                if (district == false)
                    return createError("district", null, "relatedEntities.type{Place}.entity.entityDetails.name Attribute not found");
                if (additionalNumber == false)
                    return createError("additionalNumber", null, "relatedEntities.type{Place}.entity.entityDetails.name Attribute not found");
                placeNationalAddress = true;
            }
        } else if (relatedEntities[i].type == common.constants().CONSTANTS.ENTITY_TYPE.Subscriber) {
            if (relatedEntities[i].reference == null)
                return createError("reference", null, "relatedEntities.type{Subscriber} reference Attribute not found");
            if (relatedEntities[i].entity != null) {
                lobDS = Global.getItemsFromJson(relatedEntities[i].entity, "OMREST.subscriberDetails");
                for (var j = 0; j < lobDS[0].entityDetails.length; j++) {
                    if (lobDS[0].entityDetails[j].name == common.constants().CONSTANTS.ENTITY_DETAILS.isLoggedIn && lobDS[0].entityDetails[j].value != null) {
                        isLoggedIn = true;
                        if (!(isLoggedInValue == true || isLoggedInValue == "true"))
                            isLoggedInValue = lobDS[0].entityDetails[j].value;
                    }
                }
            }
            subscriber = true;
        }

        // EVO-2849 Validation
        if ((newActivation && !isWalkinPO) || portInUC || newActivationEsim || portInUCEsim || simSwap_UC_Flag || esimSwapBundlPO_Flag) {
            // Checks for EVO-2849 Phase 1 By Ahmed AlMoselhy
            if (relatedEntities[i].type == common.constants().CONSTANTS.ENTITY_TYPE.Customer) {
                /**
                relatedEntities[type="Customer"].entity.entityDetails[name=”customerIdType”].value
                relatedEntities[type="Customer"].entity.entityDetails[name=”customerIdNumber”].value
                check for the needed scenarios
                1. New Activation Online
                2. ESIM Activation
                3. Portin
                4. ESIM Portin
                5. SIM Swap
                6. ESIM Swap
                */
                relatedEntityCustomer = true;
                var isCustomerIdType = false;
                var isCustomerIdNumber = false;
                var isCustomerIdTypeValue = false;
                var isCustomerIdNumberValue = false;

                var customerEntityDetails = Global.getItemsFromJson(relatedEntities[i].entity, "OMREST.userDetails");
                for (var n = 0; n < customerEntityDetails[0].entityDetails.length; n++) {
                    var entityDetail = customerEntityDetails[0].entityDetails[n];
                    if (entityDetail.name == "customerIdType") {
                        isCustomerIdType = true;
                        if (entityDetail.value !== null && entityDetail.value !== "" && entityDetail.value !== true && entityDetail.value !== false) isCustomerIdTypeValue = true;
                    }
                    if (entityDetail.name == "customerIdNumber") {
                        isCustomerIdNumber = true;
                        if (entityDetail.value !== null && entityDetail.value !== "" && entityDetail.value !== true && entityDetail.value !== false) isCustomerIdNumberValue = true;
                    }
                }
                if (!isCustomerIdType || !isCustomerIdTypeValue) return createError("customerIdType", null, "attrs.type{customerIdType} not found");
                if (!isCustomerIdNumber || !isCustomerIdNumberValue) return createError("customerIdNumber", null, "attrs.type{customerIdNumber} not found");
            }

            // Checks for EVO-2849 Phase 2 By Ahmed AlMoselhy
            if (relatedEntities[i].type == common.constants().CONSTANTS.ENTITY_TYPE.Place && relatedEntities[i].name == common.constants().CONSTANTS.RELATED_ENTITIES_NAME.shippingAddress) {
                relatedEntityPlace = true;
                var placeContactNumberValue = false;
                var placeContactNumber = false;
                var placeEntityDetails = Global.getItemsFromJson(relatedEntities[i].entity, "OMREST.placeDetails")[0];
                for (index = 0; index < placeEntityDetails.entityDetails.length; index++) {
                    var entityDetail = placeEntityDetails.entityDetails[index];
                    if (entityDetail.name == common.constants().CONSTANTS.ENTITY_DETAILS.contactNumber) {
                        placeContactNumber = true;
                        if (entityDetail.value !== null && entityDetail.value !== '' && entityDetail.value !== true && entityDetail.value !== false) placeContactNumberValue = true;
                    }
                }
                if (!placeContactNumber) return createError("contactNumber", null, "relatedEntities.type{Place}.entity.entityDetails.name Attribute not found");
                if (!placeContactNumberValue) return createError("contactNumber", null, "relatedEntities.type{Place}.entity.entityDetails.name value not found");
            }
        }
    }
    // 2738 Customer should be available in all the cases along with its reference.
    if (customer == false)
        return eoc_commons.createAPIFault("customer", null, "relatedEntities.type{customer} not found or has null reference");

    //EVO-2849 Validation requires shipping and customer to be in createOrder
    if ((newActivation && !isWalkinPO) || portInUC || newActivationEsim || portInUCEsim || simSwap_UC_Flag || esimSwapBundlPO_Flag) {
        if (!relatedEntityCustomer) return eoc_commons.createAPIFault("customer", null, "relatedEntities.type{customer} not found or has null reference");
        if (!relatedEntityPlace) return eoc_commons.createAPIFault("place", null, "relatedEntities.type{place}.name{shippingAddress} not found or has null reference");
    }

    if (setRecurrence_PO) { // why type subscriber type isn't beside type account and customer and are theses all types sent togther ???!
        if (relatedEntities[i].type == common.constants().CONSTANTS.ENTITY_TYPE.Subscriber && relatedEntities[i].reference != null) { // will be changed in shaa Allah
            subscriber = true;

            if (relatedEntities[i].type == null)
                return eoc_commons.createAPIFault("Validation Error Missing Mandatory Fields",
                    400, null, null, "Attribute name " + relatedEntities[i].type + " is missing or null value field");

            if (account == false && subscriber == false)
                return eoc_commons.createAPIFault("account and subscriber", null, "relatedEntities.type{account} and subscriber not found");

            if (customer == false)
                return eoc_commons.createAPIFault("customer", null, "relatedEntities.type{customer} not found");

            // if (subscriber == false)
            //     return eoc_commons.createAPIFault("subscriber", null, "relatedEntities.type{subscriber} not found");

            // need to be check

        }
    }


    if (recharge || suspendSubscription || configureSubscription) {
        if (configureSubscription) {
            if (!isLoggedIn)
                return eoc_commons.createAPIFault("isLoggedIn", null, "relatedEntities.type{Subscriber}.entityDetails isLoggedIn not found");
        }
        if (account == false) {
            return createError("account", null, "relatedEntities.type{account} not found");
        }
        if (subscriber == false) {
            return eoc_commons.createAPIFault("subscriber", null, "relatedEntities.type{Subscriber} not found");
        }
        if (recharge) {
            // if(!isLoggedIn)
            //    return eoc_commons.createAPIFault("isLoggedIn", null, "relatedEntities.type{Subscriber}.entityDetails isLoggedIn not found");
            //if(!(isLoggedInValue == true || isLoggedInValue == "true"))
            //  return eoc_commons.createAPIFault("isLoggedIn", null, "relatedEntities.type{Subscriber}.entityDetails isLoggedIn Value should be true for Recharge");
        }
    }

    //if (newActivation ||  portInUC || newActivationEsim || portInUCEsim || newActivationOffline || portInAssistedUC || isTransferOwnershipUC ) {
    if (newActivation || portInUC || newActivationEsim || portInUCEsim) {
        if (customerIdType == false) {
            //return createError("customerIdType", null, "attrs.type{customerIdType} not found");
        }
        if (customerIdNumber == false) {
            //return createError("customerIdNumber", null, "attrs.type{customerIdNumber} not found");
        }
    }

    //}
    //(JCR-5467/JCR-5554/JCR-5553) CITC NEW OTP REQUIREMENT (WEB/APP/OFFLINE))
    var mobileLionePostPaid = false;
    for (var ki = 0; ki < orderItems.length; ki++) {
        var itemPO = orderItems[ki].item;
        var productOfferingIds = itemPO.productOffering.id;
        var catItemPO = theCatalog.getItem(productOfferingId);
        if (catItemPO != null) {
            if (catItemPO.attributeExists('productCategory')) {
                productCategory = catItemPO.productCategory.getDefaultValue();
            }
            if (catItemPO.attributeExists('productLine') && catItemPO.productLine.getDefaultValue().toUpperCase() == 'POSTPAID' && productCategory == common.constants().CONSTANTS.PRODUCT_CATEGORY.Mobile_Line_Offer && (itemPO.action == common.constants().CONSTANTS.PRODUCT_ACTION.ADD || itemPO.action == common.constants().CONSTANTS.PRODUCT_ACTION.MODIFY)) {
                mobileLionePostPaid = true;
                break;
            }
        }

    }
    if (mobileLionePostPaid) {
        if (newActivation || newActivationOffline || portInUC || portInAssistedUC || isTransferOwnershipUC) {
            if (externalMessageId == false) {
                return createError("externalMessageId", null, "attrs.type{externalMessageId} not found");
            }
        }
    }
    //EVO-2679 validation
    if (newActivation || simSwap_UC_Flag || portInUC || newActivationEsim || portInUCEsim) {

        if (totalVat == false)
            return createError("totalVat", null, "relatedEntities.type{PayerAccount}.entity.entityDetails.totalVat Attribute not found");
        if (totalPaidAmount == false)
            return createError("totalPaidAmount", null, "relatedEntities.type{PayerAccount}.entity.entityDetails.totalPaidAmount Attribute not found");

    }
    //EVO-2679 validation

    if (newActivation || simSwap_UC_Flag || portInUC || newActivationEsim || portInUCEsim || newActivationOffline) {

        if (newActivationOffline) {
            if (externalTransactionId == false)
                return createError("externalTransactionId", null, "attrs.type{externalTransactionId} not found");
            if (payerAccount == false)
                return createError("payerAccount", null, "relatedEntities.type{PayerAccount} not found");
            if (channel == false)
                return createError("channel", null, "relatedEntities.type{channel} not found");
            if (store == false)
                return createError("store", null, "relatedEntities.type{store} not found");
            if (account == false)
                return createError("account", null, "relatedEntities.type{account} not found");
            if (user == false)
                return createError("User", null, "relatedEntities.type{account} not found");
            if (isNewUser == false)
                return createError("isNewUser", null, "relatedEntities.type{User}.entity.entityDetails Attribute not found");
            if (contactNumber_User == false)
                return createError("contactNumber", null, "relatedEntities.type{User}.entity.entityDetails Attribute not found");
            if (languagePreference_user == false) // entityDetails is mandatory for 3 UCs only
                return createError("languagePreference", null, "relatedEntities.type{User}.entity.entityDetails Attribute not found");
            if (firstName == false)
                return createError("firstName", null, "relatedEntities.type{Customer}.entity.entityDetails Attribute not found");
            if (familyName == false)
                return createError("familyName", null, "relatedEntities.type{Customer}.entity.entityDetails Attribute not found");
            if (firstNameEN == false)
                return createError("firstNameEN", null, "relatedEntities.type{Customer}.entity.entityDetails Attribute not found");
            if (familyNameEN == false)
                return createError("familyNameEN", null, "relatedEntities.type{Customer}.entity.entityDetails Attribute not found");
            // if (grandfatherName == false)
            // return createError("grandfatherName", null, "relatedEntities.type{Customer}.entity.entityDetails Attribute not found");
            // if (gender == false)
            // return createError("gender", null, "relatedEntities.type{Customer}.entity.entityDetails Attribute not found");
            if (nationality == false)
                return createError("nationality", null, "relatedEntities.type{Customer}.entity.entityDetails Attribute not found");
            if (customerIdType == false)
                return createError("customerIdType", null, "relatedEntities.type{Customer}.entity.entityDetails Attribute not found");
            if (customerIdNumber == false)
                return createError("customerIdNumber", null, "relatedEntities.type{Customer}.entity.entityDetails Attribute not found");
            if (subscriber == false)
                return createError("subscriber", null, "relatedEntities{subscriber}.entity.entityDetails Attribute not found");
            /*  if (isLoggedIn == false)
                  return createError("isLoggedIn", null, "relatedEntities.type{subscriber}.entity.entityDetails Attribute not found");*/
            if (placeNationalAddress == false)
                return createError("Place", null, "relatedEntities.type{Place.nationalAddress} not found");
            if (sourceType == false)
                return createError("sourceType", null, "attrs.type{sourceType} not found");

        }
        if (!newActivationEsim && !portInUCEsim && !newActivationOffline) {
            if (place == false) {
                return createError("Place", null, "relatedEntities.type{Place} not found");
            }
        }
        if (payerAccount == false)
            return createError("payerAccount", null, "relatedEntities.type{PayerAccount} not found");

        if (channel == false)
            return createError("channel", null, "relatedEntities.type{channel} not found");

        if (!newActivationEsim && !portInUCEsim) {
            if (store == false)
                return createError("store", null, "relatedEntities.type{store} not found");
        }

        if (account == false)
            return createError("account", null, "relatedEntities.type{account} not found");

        if (user == false)
            return createError("User", null, "relatedEntities.type{account} not found");

        if (isNewUser == false) // entityDetails is mandatory for 3 UCs only
            return createError("isNewUser", null, "relatedEntities.type{User}.entity.entityDetails Attribute not found");

        if (languagePreference_user == false) // entityDetails is mandatory for 3 UCs only
            return createError("languagePreference", null, "relatedEntities.type{User}.entity.entityDetails Attribute not found");
        if (!simSwap_UC_Flag) {
            if (subscriber == false)
                return createError("subscriber", null, "relatedEntities{subscriber}.entity.entityDetails Attribute not found");
            // if(!(isLoggedInValue == true || isLoggedInValue == "true")) // for all activation cases
            //   return createError("isLoggedIn", null, "relatedEntities.type{Subscriber}.entityDetails isLoggedIn Value should be true For atleast one Subscriber.");
        }
    }
    if (simSwapAssisted_UC_Flag || portInAssistedUC) {
        if (customer == false)
            return createError("customer", null, "relatedEntities.type{customer} not found");
        if (externalTransactionId == false)
            return createError("externalTransactionId", null, "attrs.type{externalTransactionId} not found");
        if (payerAccount == false)
            return createError("payerAccount", null, "relatedEntities.type{PayerAccount} not found");
        if (channel == false)
            return createError("channel", null, "relatedEntities.type{channel} not found");
        if (store == false)
            return createError("store", null, "relatedEntities.type{store} not found");
        if (account == false)
            return createError("account", null, "relatedEntities.type{account} not found");
        if (user == false)
            return createError("User", null, "relatedEntities.type{account} not found");
        if (isNewUser == false)
            return createError("isNewUser", null, "relatedEntities.type{User}.entity.entityDetails Attribute not found");
        if (contactNumber_User == false)
            return createError("contactNumber", null, "relatedEntities.type{User}.entity.entityDetails Attribute not found");
        if (languagePreference_user == false) // entityDetails is mandatory for 3 UCs only
            return createError("languagePreference", null, "relatedEntities.type{User}.entity.entityDetails Attribute not found");
        if (firstName == false)
            return createError("firstName", null, "relatedEntities.type{Customer}.entity.entityDetails Attribute not found");
        if (familyName == false)
            return createError("familyName", null, "relatedEntities.type{Customer}.entity.entityDetails Attribute not found");
        if (firstNameEN == false)
            return createError("firstNameEN", null, "relatedEntities.type{Customer}.entity.entityDetails Attribute not found");
        if (familyNameEN == false)
            return createError("familyNameEN", null, "relatedEntities.type{Customer}.entity.entityDetails Attribute not found");
        // if (grandfatherName == false)
        // return createError("grandfatherName", null, "relatedEntities.type{Customer}.entity.entityDetails Attribute not found");
        // if (gender == false)
        // return createError("gender", null, "relatedEntities.type{Customer}.entity.entityDetails Attribute not found");
        if (nationality == false)
            return createError("nationality", null, "relatedEntities.type{Customer}.entity.entityDetails Attribute not found");
        if (customerIdType == false)
            return createError("customerIdType", null, "relatedEntities.type{Customer}.entity.entityDetails Attribute not found");
        if (customerIdNumber == false)
            return createError("customerIdNumber", null, "relatedEntities.type{Customer}.entity.entityDetails Attribute not found");
        if (subscriber == false)
            return createError("subscriber", null, "relatedEntities{subscriber}.entity.entityDetails Attribute not found");
        // if (isLoggedIn == false)
        //   return createError("isLoggedIn", null, "relatedEntities.type{subscriber}.entity.entityDetails Attribute not found");
        if ((placeNationalAddress == false) && portInAssistedUC)
            return createError("Place", null, "relatedEntities.type{Place.nationalAddress} not found");
        //Fix JO-39 EVO-1071 amr gomaa
        if (sourceType == false)
            return createError("sourceType", null, "attrs.type{sourceType} not found");
        // EVO-1931 Qwik+: SIM SWAP orders are returning error while placing a new order. Done by Amr Gomaa 02-03-2023
        /*else{
            if (terminalId == false)
                return createError("terminalId", null, "relatedEntities.type{PayerAccount}.entity.entityDetails.name Attribute not found");
            if (approvalCode == false)
                return createError("approvalCode", null, "relatedEntities.type{PayerAccount}.entity.entityDetails.name Attribute not found");
        }*/
    }
    if (portInAssistedUC || newActivationOffline) {
        if (serviceOTP == false)
            return createError("serviceOTP", null, "attrs.type{serviceOTP} not found");
        if (iamToken == false)
            return createError("iamToken", null, "attrs.type{iamToken} not found");
        if (subscriber == false)
            return createError("subscriber", null, "relatedEntities{subscriber}.entity.entityDetails Attribute not found");
        //Atef
        if (externalTimestamp == false)
            return createError("externalTimestamp", null, "attrs.type{externalTimestamp} not found");
        //   if(!(isLoggedInValue == true || isLoggedInValue == "true")) // for all activation cases
        //     return createError("isLoggedIn", null, "relatedEntities.type{Subscriber}.entityDetails isLoggedIn Value should be true For atleast one Subscriber.");
    }
    if (resumeSubscription_UC_Flag) {
        if (subscriber == false)
            return createError("subscriber", null, "relatedEntities.type{subscriber} not found");

        if (user == false)
            return createError("user", null, "relatedEntities.type{user} not found");

        if (customer == false)
            return createError("customer", null, "relatedEntities.type{customer} not found");

        if (account == false)
            return createError("account", null, "relatedEntities.type{account} not found");

        if (triggeringSystem == false)
            return createError("triggeringSystem", null, "Resume Subscription attrs.name{triggeringSystem} or its value not found");
    }
    if (recharge || suspendSubscription || renewalSubsription || walletSharingUC || CardsNCodesUC) {
        if (account == false)
            return createError("account", null, "relatedEntities.type{account} not found");

        if (customer == false)
            return createError("customer", null, "relatedEntities.type{customer} not found");

        if (subscriber == false)
            return createError("subscriber", null, "relatedEntities.type{subscriber} not found");
    } else if (upgradeDowngrade_PO) {
        if (account == false)
            return createError("account", null, "Upgrade Downgrade relatedEntities.type{account} not found");
        if (customer == false)
            return createError("customer", null, "Upprade Downgrade relatedEntities.type{customer} not found");
        if (subscriber == false)
            return createError("subscriber", null, "relatedEntities.type{subscriber} not found");
        // if (payerAccount == false)
        //   return createError("payerAccount", null, "relatedEntities.type{PayerAccount} not found");
        if (updowngradeBYOPLANAddSubscriptionSubCorrelationId == false) return createError("subscriptionCorrelationId", null, "Subscription CorrelationId missing in BYOP_PACKAGE PO");
        if (updowngradeBYOPLANDelSubscriptionSubCorrelationId == false) return createError("subscriptionCorrelationId", null, "Subscription CorrelationId missing in BYOP_PACKAGE PO");
        if (updownBYOPSubscriptionCorrelation == false) return createError("subscriptionCorrelationId", null, "Subscription CorrelationId missing in BYOP PO");
        if (updownBYOPApplyChangeNextCycle == false) return createError("ApplyChangeNextCycle", null, "ApplyNextCycle Attribute missing in BYOP PO");
        if (updownBYOPInstanceId == false) return createError("offerInstanceId", null, "offerInstanceId Attribute missing in BYOP PO");
        if (updownRole == true || updownRef == true) return createError("Role/Reference", null, "Related Order Item Role and Reference are Mandatory Fields for Updowngrade");
        if (updownRoleDEL == true || updownRefDEL == true) return createError("Role/Reference", null, "Related Order Item Role and Reference are Mandatory Fields for Updowngrade");


    } else if (isTransferOwnershipUC) {
        /// attrs
        if (serviceOTP == false)
            return createError("serviceOTP", null, "attrs.type{serviceOTP} not found");
        if (externalTransactionId == false)
            return createError("externalTransactionId", null, "attrs.type{externalTransactionId} not found");
        if (triggeringSystem == false)
            return createError("triggeringSystem", null, "attrs.name{triggeringSystem} or its value not found");
        if (iamToken == false)
            return createError("iamToken", null, "attrs.type{iamToken} not found");
        //if (notificationCodeFlag == false)
        //    return createError("notificationCode", null, "attrs.type{notificationCode} not found");
        ////relatedEntities
        if (customer == false)
            return eoc_commons.createAPIFault("customer", null, "relatedEntities.type{customer} not found");
        if (payerAccount == false)
            return createError("payerAccount", null, "relatedEntities.type{PayerAccount} not found");
        if (channel == false)
            return createError("channel", null, "relatedEntities.type{channel} not found");
        if (store == false)
            return createError("store", null, "relatedEntities.type{store} not found");
        if (account == false)
            return createError("account", null, "relatedEntities.type{account} not found");
        /*if (user == false)
        return createError("User", null, "relatedEntities.type{account} not found");
        if (isNewUser == false)
        return createError("isNewUser", null, "relatedEntities.type{User}.entity.entityDetails Attribute not found");
        */if (firstName == false)
            return createError("firstName", null, "relatedEntities.type{Customer}.entity.entityDetails Attribute not found");
        if (familyName == false)
            return createError("familyName", null, "relatedEntities.type{Customer}.entity.entityDetails Attribute not found");
        if (firstNameEN == false)
            return createError("firstNameEN", null, "relatedEntities.type{Customer}.entity.entityDetails Attribute not found");
        if (familyNameEN == false)
            return createError("familyNameEN", null, "relatedEntities.type{Customer}.entity.entityDetails Attribute not found");
        // if (grandfatherName == false)
        // return createError("grandfatherName", null, "relatedEntities.type{Customer}.entity.entityDetails Attribute not found");
        // if (gender == false)
        // return createError("gender", null, "relatedEntities.type{Customer}.entity.entityDetails Attribute not found");
        if (nationality == false)
            return createError("nationality", null, "relatedEntities.type{Customer}.entity.entityDetails Attribute not found");
        if (customerIdType == false)
            return createError("customerIdType", null, "relatedEntities.type{Customer}.entity.entityDetails Attribute not found");
        if (customerIdNumber == false)
            return createError("customerIdNumber", null, "relatedEntities.type{Customer}.entity.entityDetails Attribute not found");
        if (subscriber == false)
            return createError("subscriber", null, "relatedEntities{subscriber}.entity.entityDetails Attribute not found");
        // if (isLoggedIn == false)
        //   return createError("isLoggedIn", null, "relatedEntities.type{subscriber}.entity.entityDetails Attribute not found");
        if (placeNationalAddress == false)
            return createError("Place", null, "relatedEntities.type{Place.nationalAddress} not found");


    }
    else if (sharingLimitPO) {
        if (account == false)
            return createError("account", null, "Sharring Limit relatedEntities.type{account} not found");
        if (customer == false)
            return createError("customer", null, "Sharring Limit relatedEntities.type{customer} not found");
        if (sharingLimitProductUsageSpecId == false)
            return createError("sharingLimitProductUsageSpecId", null, "Sharring Limit productCharacteristics.name{sharingLimitProductUsageSpecId} or its value not found");
        if (sharingLimitValueType == false)
            return createError("sharingLimitValueType", null, "Sharring Limit productCharacteristics.name{sharingLimitValueType} or its value not found");

        //if (allowSettingSharingLimits == false)
        //  return createError("allowSettingSharingLimits", null, "Sharring Limit productCharacteristics.name{allowSettingSharingLimits} or its value not found");

        if (sharingLimitFlags.length == 0 && sharingLimitRecipientFlags.length == 0)
            return createError("sharingLimitRecipientAndFlags", null, "Set Sharring Limit it must be at least one recipient and it's limit value");

        if (sharingLimitFlags.length != sharingLimitRecipientFlags.length)
            return createError("sharingLimitRecipientAndFlags", null, "Set Sharring Limit one recipient or it's limit value not found");

        if (sharingLimitOfferInstanceId == false)
            return createError("offerInstanceId", null, "Sharring Limit productCharacteristics.name{offerInstanceId} or its value not found");

        if (sharingLimitSubscriptionCorrelationId == false)
            return createError("SubscriptionCorrelationId", null, "Sharring Limit productCharacteristics.name{SubscriptionCorrelationId} or its value not found");

    } else if (planStartDatePO) {
        var planRelatedEntities = request.relatedEntities;
        for (var ind = 0; ind < planRelatedEntities.length; ind++) {
            if (planRelatedEntities[ind].type == common.constants().CONSTANTS.ENTITY_TYPE.Account) {
                if (planRelatedEntities[ind].reference == null) {
                    return createError("account", null, "Plan Start Date relatedEntities.type{Account}.reference not found");
                }
            }
            if (planRelatedEntities[ind].type == common.constants().CONSTANTS.ENTITY_TYPE.Subscriber) {
                if (planRelatedEntities[ind].reference == null) {
                    return createError("subscriber", null, "Plan Start Date relatedEntities.type{Subscriber}.reference not found");
                }
            }
        }

        if (planStartDateSubscriptionCorrelationId == false)
            return createError("planStartDateSubscriptionCorrelationId", null, "Plan Start Date productCharacteristics.type{SubscriptionCorrelationId} not found");
        if (planStartDateOfferInstanceId == false)
            return createError("planStartDateOfferInstanceId", null, "Plan Start Date productCharacteristics.type{offerInstanceId} not found");
        if (planStratDateSubscriptionCorrelationIdML == false)
            return createError("planStratDateSubscriptionCorrelationIdML", null, "Plan Start Date Mobile Line PO productCharacteristics.type{SubscriptionCorrelationId} not found");
        if (planStratDateSubscriptionIdML == false)
            return createError("planStratDateSubscriptionIdML", null, "Plan Start Date Mobile Line PO productCharacteristics.type{subscriptionId} not found");

    } /*else if (mnpPortOutPO) {
    }*/
    else if (editSimAlisPO) {

        if (simAliasSubscriptionCorrelationId == false)
            return createError("SubscriptionCorrelationId", null, "Edit Sim Alias productCharacteristics.name{SubscriptionCorrelationId} or its value not found");

        if (simAliasSubscriptionId == false)
            return createError("subscriptionId", null, "Edit Sim Alias productCharacteristics.name{subscriptionId} or its value not found");

        if (simAliasMsisdn == false)
            return createError("msisdn", null, "Edit Sim Alias productCharacteristics.name{msisdn} or its value not found");

        if (simAliasAttribute == false)
            return createError("simAlias", null, "Edit Sim Alias productCharacteristics.name{simAlias} or its value not found");

        if (simAliasAction == false)
            return createError("acction", null, "Edit Sim Alias action is not Modify");

        var simAliasRelatedEntities = request.relatedEntities;
        for (var simIndex = 0; simIndex < simAliasRelatedEntities.length; simIndex++) {
            if (simAliasRelatedEntities[simIndex].type == common.constants().CONSTANTS.ENTITY_TYPE.Account) {
                if (simAliasRelatedEntities[simIndex].reference == null || simAliasRelatedEntities[simIndex].reference == "") {
                    return createError("account", null, "Edit SimAlias relatedEntities.type{Account}.reference not found");
                }
            }
            if (simAliasRelatedEntities[simIndex].type == common.constants().CONSTANTS.ENTITY_TYPE.Subscriber) {
                if (simAliasRelatedEntities[simIndex].reference == null || simAliasRelatedEntities[simIndex].reference == "") {
                    return createError("subscriber", null, "Edit SimAlias relatedEntities.type{Subscriber}.reference not found");
                }
            }
        }
        //&& !mnpPortOutPO
        //Since portout and terminate subscription had same mandatory feilds
        // To optimize & Avoid mutliple similar checks related to HP ALM 2224
    } else if (terminateSubscriptionPO) {
        var errorTxt = "Terminate Subscription";
        if (mnpPortOutPO) {
            var isLoggedInFlag = false;
            var userFlag = false;
            errorTxt = "Mobile Line PO";

            if (MNPPortoutportReqFormID == false) {
                return createError("portID", null, "MNP-Portout portID not found");

            }

            if (MNPPortoutportReqFormID == true) {

                var omOrderMappaingFinder = new Finder("common.external_OM_order_mappingFinder");
                omOrderMappaingFinder.searchDocument.uniqueOrderId = MNPPortoutportReqFormValue;
                var external_OM_order_mappingFinder = omOrderMappaingFinder.search();

                if (external_OM_order_mappingFinder.length > 0) {
                    return createError("portID", null, "MNP-Portout portID must be unique value");
                }
            }
            if (MNPPortoutSubscriptionCorrelationId == false)
                return createError("SubscriptionCorrelationId", null, "MNP-Portout SubscriptionCorrelationId not found");
            var MNPPortOutRelatedEntities = request.relatedEntities;
            for (var portOutIndex = 0; portOutIndex < MNPPortOutRelatedEntities.length; portOutIndex++) {
                if (MNPPortOutRelatedEntities[portOutIndex].type == common.constants().CONSTANTS.ENTITY_TYPE.Account) {
                    if (MNPPortOutRelatedEntities[portOutIndex].reference == null || MNPPortOutRelatedEntities[portOutIndex].reference == "") {
                        return createError("account", null, "MNP PortOut relatedEntities.type{Account}.reference not found");
                    }
                }
                if (MNPPortOutRelatedEntities[portOutIndex].type == common.constants().CONSTANTS.ENTITY_TYPE.Subscriber) {
                    if (MNPPortOutRelatedEntities[portOutIndex].reference == null || MNPPortOutRelatedEntities[portOutIndex].reference == "") {
                        return createError("subscriber", null, "MNP PortOut relatedEntities.type{Subscriber}.reference not found");
                    }
                    if (MNPPortOutRelatedEntities[portOutIndex].entity != null) {
                        var entity = MNPPortOutRelatedEntities[portOutIndex].entity.toString();
                        var entityDetailsArr = entity.substr(5);
                        var entityDetails = JSON.parse(entityDetailsArr);
                        var entityDetailsObj = entityDetails.entityDetails;
                        var attrsValue = entityDetailsObj;
                        for (var attrInd = 0; attrInd < attrsValue.length; attrInd++) {
                            if (attrsValue[attrInd].name != null && attrsValue[attrInd].name == "isLoggedIn") {
                                isLoggedInFlag = true;
                            }
                        }
                    }
                }
                if (MNPPortOutRelatedEntities[portOutIndex].type == common.constants().CONSTANTS.ENTITY_TYPE.User) {
                    if (MNPPortOutRelatedEntities[portOutIndex].reference != null && MNPPortOutRelatedEntities[portOutIndex].reference != "") {
                        userFlag = true;
                    }
                }
            }
            /* if (isLoggedInFlag == false)
                return createError("subscriber", null, "MNP PortOut relatedEntities.type{Subscriber}.entity.entityDetails isLoggedIn not found");*/
            if (userFlag == false)
                return createError("User", null, "MNP PortOut relatedEntities.type{User}.reference (User SSO ID) not found");
        }
        var isLoggedInFlag = false;
        var userFlag = false;
        if (terminateSubscriptionAction == false)
            return createError("action", null, errorTxt + " action is not Delete");
        if (terminateSubscriptionSubCorrelationId == false)
            return createError("SubscriptionCorrelationId", null, errorTxt + " productCharacteristics.name{SubscriptionCorrelationId } or its value not found");
        if (terminateSubscriptionSubscriptionId == false)
            return createError("subscriptionId", null, errorTxt + " productCharacteristics.name{subscriptionId} or its value not found");
        if (terminateSubscriptionImsi == false)
            return createError("imsi", null, errorTxt + " productCharacteristics.name{imsi} or its value not found");
        if (terminateSubscriptionIccid == false)
            return createError("iccid", null, errorTxt + " productCharacteristics.name{iccid} or its value not found");
        if (terminateSubscriptionMsisdn == false)
            return createError("msisdn", null, errorTxt + " productCharacteristics.name{msisdn} or its value not found");
        //Avoiding validations to run in portout according to createOrder 4.0.3
        if (!mnpPortOutPO) {
            if (triggeringSystem == false)
                return createError("triggeringSystem", null, "Terminate Subscription attrs.name{triggeringSystem} or its value not found");
            //if (triggeringSystem == true && triggeringSystemValue == true && notificationCodeFlag == false)
            //    return createError("notificationCode", null, "Terminate Subscription attrs.name{notificationCode} is mandatory with triggeringSystem CRM");
        }
        var termniateSubRelatedEntities = request.relatedEntities;
        for (var termIndex = 0; termIndex < termniateSubRelatedEntities.length; termIndex++) {
            if (termniateSubRelatedEntities[termIndex].type == common.constants().CONSTANTS.ENTITY_TYPE.Account) {
                if (termniateSubRelatedEntities[termIndex].reference == null || termniateSubRelatedEntities[termIndex].reference == "") {
                    return createError("account", null, "Terminate Subscription relatedEntities.type{Account}.reference not found");
                }
            }
            if (termniateSubRelatedEntities[termIndex].type == common.constants().CONSTANTS.ENTITY_TYPE.Subscriber) {
                if (termniateSubRelatedEntities[termIndex].reference == null || termniateSubRelatedEntities[termIndex].reference == "") {
                    return createError("subscriber", null, "Terminate Subscription relatedEntities.type{Subscriber}.reference not found");
                }
                if (termniateSubRelatedEntities[termIndex].entity != null) {
                    var entity = termniateSubRelatedEntities[termIndex].entity.toString();
                    var entityDetailsArr = entity.substr(5);
                    var entityDetails = JSON.parse(entityDetailsArr);
                    var entityDetailsObj = entityDetails.entityDetails;
                    var attrsValue = entityDetailsObj;
                    for (var attrInd = 0; attrInd < attrsValue.length; attrInd++) {
                        if (attrsValue[attrInd].name != null && attrsValue[attrInd].name == "isLoggedIn") {
                            isLoggedInFlag = true;
                        }
                    }
                }
            }

            if (termniateSubRelatedEntities[termIndex].type == common.constants().CONSTANTS.ENTITY_TYPE.User) {
                if (termniateSubRelatedEntities[termIndex].reference != null && termniateSubRelatedEntities[termIndex].reference != "") {
                    userFlag = true;
                }
            }
        }
        // if (isLoggedInFlag == false)
        //   return createError("subscriber", null, "Terminate Subscription relatedEntities.type{Subscriber}.entity.entityDetails isLoggedIn not found");

        if (userFlag == false)
            return createError("User", null, "Terminate Subscription relatedEntities.type{User}.reference (User SSO ID) not found");
    } else if (deleteSubscription) {
        /*  if (isLoggedIn == false) {
              return createError("subscriber", null, "Delete Subscription relatedEntities.type{Subscriber}.entity.entityDetails isLoggedIn not found");
          }
          if (!(isLoggedInValue == "true") && !(isLoggedInValue == "false") ) {
              return eoc_commons.createAPIFault("isLoggedIn", "400", "relatedEntities.type{Subscriber}.entityDetails isLoggedIn Value should be true for Recharge");
          }*/
    }

}
OMREST.addCTAttribute(request);

if (portInAssistedUC || newActivationEsim || portInUCEsim || newActivationOffline || newActivation || portInUC || simSwapAssisted_UC_Flag || simSwap_UC_Flag) {
    var runODS = 'runODS';
    return runODS;
}

//Function to createAPIFault
function createErrorWithSpecificReason(reason, paramName, paramValue, desc) {
    return eoc_commons.createAPIFault(reason, "400", "EOC_ERROR_1002", [paramName, paramValue], desc);
}

function createError(paramName, paramValue, desc) {
    return eoc_commons.createAPIFault(null, "400", "EOC_ERROR_1002", [paramName, paramValue], desc);
}

function createErrorWithRefrence(reason, paramName, paramValue, desc, refrence) {
    return eoc_commons.createAPIFault(reason, "400", "EOC_ERROR_1002", [paramName, paramValue], desc, refrence);
}

function decideErrorValidationType(type) {
    return eoc_commons.createAPIFault(type, null, type + " Attribute not found");
}