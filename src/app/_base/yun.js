/**
 * Created by chans on 2016/7/23.
 */
define(function (require,exports,module) {
    var archive = require('_service/archive');
    exports.yun = function () {
        window.onload = function () {
            var example5 = $('#example5').glDatePicker({
                    showAlways: true
            }).glDatePicker(true);
            $('#example5-cssName').change(function() {
                example5.options.cssName = $(this).val();
                example5.render();
            });

            var selected=document.getElementsByClassName("selected");
            var dateEvent = document.getElementById("date-event");
            // console.log(1);
            $('#example5').hover(function () {
                var example = document.getElementById("example5");
                var date = example.value;
                var text = "";
                dateEvent.style.display = "block";
                //  console.log(date);
                archive.getDetails( function (details) {
                    // console.log(details);
                    var time = require("time");
                    details.forEach(function (item) {
                        item.create_time = time.format('yyyy/m/d', parseInt(item.create_time * 1000));
                        /*console.log(item.create_time);
                         console.log(date);*/
                        if(date == "摸我有惊喜哦0.o~"){
                            text = "亲，去下面日历选中日期才可查看博主更新情况哦0.0";
                            return $('.date-event').html(text);
                        }
                        if(date == item.create_time){
                            text = date + ":" + item.title;
                            // console.log(text);
                            return $('.date-event').html(text);
                        }
                    });
                    // console.log(text);
                    if(text == ""){
                        text = "今天博主无更新╮(╯▽╰)╭";
                        return $('.date-event').html(text);
                    };

                });
            }, function () {
                dateEvent.style.display = "none";
            });
        }
    }
})