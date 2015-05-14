
function loadSchedule(day) {
  if (!Ti.App.Properties.getBool(day+'-loaded', false)){
    var filename = '/data/' + day + '.json';
    var f = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, filename);
    var contents = f.read();
    Ti.App.Properties.setObject(day, JSON.parse(contents));
    Ti.App.Properties.setBool(day+'-loaded', true);
  }
}

function loadTable(tableObject,dayTag){
  var tableData=[];
  Ti.App.Properties.getObject(dayTag).forEach(function(item, index){
    item.index=index; // add the index to the object
    var row=Alloy.createController('dayrow',item).getView();
    tableData.push(row);
  });
  tableObject.setData(tableData);
}

exports.loadSchedule = loadSchedule;
exports.loadTable = loadTable;