function loadSchedule(day) {
  if (!Ti.App.Properties.getBool(day+'-loaded', false)){
    var filename = '/data/' + day + '.json';
    var f = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, filename);
    var contents = JSON.parse(f.read());
    contents.forEach(function(thisDay,index) {
       var model = Alloy.createModel(day, {
           "time"         :   thisDay.time,
           "room"         :   thisDay.room,
           "title"        :   thisDay.title,
           "speaker"      :   thisDay.speaker,
           "description"  :   thisDay.description,
           "speakerbio"   :   thisDay.speakerbio,
           "myindex"      : index
       });

      model.save();
    });
    contents = null;
    f = null;
    Ti.App.Properties.setBool(day+'-loaded', true);
  }
}

function loadTable(tableObject,dayTag){
  var tableData=[];
  var day = Alloy.Collections.instance(dayTag);
  day.fetch();
  var dayJSON=day.toJSON();
  dayJSON.forEach(function(item, index){
    item.index=index;
    var row=Alloy.createController('dayrow',item).getView();
    tableData.push(row);
  });
  tableObject.setData(tableData);
}
exports.loadSchedule = loadSchedule;
exports.loadTable = loadTable;