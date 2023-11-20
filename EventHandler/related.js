var relatedEntities = request.relatedEntities;
if (relatedEntities.length > 0) {
  return createError(
    "relatedEntities",
    null,
    "order level container,related entities is missing"
  );
} else {
  var account = false;
  for (var i = 0; i < relatedEntities.length; i++) {
    if (relatedEntities[i].type == null) {
      return createError(
        "relatedEntities.type",
        null,
        "order level container,related entities is missing"
      );
    }
    if (relatedEntities[i].type == common.constants()) {
    }
  }
}
//how to trigger a process

var dataOrder = Process.processOrder;
var processId = Process.startProcess("Taks01.prcessname",dataOrder.id);
