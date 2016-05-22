
var fs = require('fs');
module.exports = {
  changeFileName: function(name) {
    var isProduction = global.isProduction;
    if (isProduction) {
      var assetsStr = fs.readFileSync('assets.json','utf8');
      var assetsJson = JSON.parse(assetsStr);
      var jsName = assetsJson[name].js;
      if (jsName.lastIndexOf('/') != -1) {
        jsName = jsName.substring(jsName.lastIndexOf('/') + 1);
      }
      var cssName = assetsJson[name].css;
      if (cssName.lastIndexOf('/') != -1) {
        cssName = cssName.substring(cssName.lastIndexOf('/') + 1);
      }
      return {
        "js": jsName,
        "css": cssName
      };
    } else {
      return {
        "js": name + ".js",
        "css": name + ".css"
      };
    }
  },
  getStaticPath: function(name) {
    var fileNameArr = this.changeFileName(name);
    return {
      cdn: global.domain.cdn,
      fileNames: fileNameArr
    }
  }
}
