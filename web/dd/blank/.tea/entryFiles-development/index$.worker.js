if(!self.__appxInited) {
self.__appxInited = 1;


require('./config$');


var AFAppX = self.AFAppX.getAppContext
  ? self.AFAppX.getAppContext().AFAppX
  : self.AFAppX;
self.getCurrentPages = AFAppX.getCurrentPages;
self.getApp = AFAppX.getApp;
self.Page = AFAppX.Page;
self.App = AFAppX.App;
self.my = AFAppX.bridge || AFAppX.abridge;
self.abridge = self.my;
self.Component = AFAppX.WorkerComponent || function(){};
self.$global = AFAppX.$global;
self.requirePlugin = AFAppX.requirePlugin;
        


function success() {
require('../../app');
require('../../pages/index/index');
require('../../pages/examine/examine');
require('../../pages/examine/view/view');
require('../../pages/examine/edit/edit1/edit1');
require('../../pages/examine/edit/edit2/edit2');
require('../../pages/examine/edit/edit3/edit3');
require('../../pages/examine/edit/edit4/edit4');
require('../../pages/examine/edit/edit5/edit5');
require('../../pages/examine/edit/edit6/edit6');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
}