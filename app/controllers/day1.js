var args = arguments[0] || {};
var dayTag = 'day1';
require('schedulemod').loadSchedule(dayTag);
require('schedulemod').loadTable($.day1table,dayTag);
