var item = null; 
if(theItem != null){
    item=theItem;
    while(item=!null){
        if (item.type== 'productOffering') {
            return (item.quantity!=null)?JSON.parse(item.quantity).amount:0;
        }
        if (item.type != 'productOffering') {
            item= item.parent;
        }
    }
}

return 0;