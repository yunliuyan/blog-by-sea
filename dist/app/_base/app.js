define(function(require,exports,module){
   exports.init = function(){
       var css = require('./css_app');
       var tpl = require('./tpl_app');
       var config = require('_config/app');
       var service = require('_service/archive');
       var base = require('_base/base');
       var yun = require('_base/yun')
       service.getTopicList(function(topicList){
           base.nav(topicList, function (topicList) {
              // console.log(topicList);
               var nav = tpl.mynav({title:config.title,topicList:topicList});
               service.getDetails(function (details) {
                   var bodyData = {};
                   base.articleSort(details,'create_time','desc',function(detailsTimeDesc){
                       base.articleCut(detailsTimeDesc,config.newArticleNum, function (detailsTimeDescCut) {
                           base.isStrCut(detailsTimeDescCut,'title',config.newArticleTitleNum, function (detailsTimeDescCut) {
                               base.timeToStr(detailsTimeDescCut, function (detailsTimeDescCut) {
                                   bodyData.detailsTimeDesc = detailsTimeDescCut;
                               });
                           });
                       });
                   });
                   base.articleSort(details,'hits','desc', function (detailsHitsDesc) {
                       base.articleCut(detailsHitsDesc,config.hitArticleNum,function(detailsHitsDescCut){
                          base.isStrCut(detailsHitsDescCut,'title',config.hitArticleTitleNum, function (detailsHitsDescCut) {
                              bodyData.detailsHitsDesc = detailsHitsDescCut;
                          });
                       });
                   });
                   var header = tpl.header();
                   var content = tpl.content(bodyData);
                   var footer = tpl.footer();
                   $(HY.rootDom).html(css+nav+header+content+footer);
                   yun.yun();
               })
           })
       })
   };
});