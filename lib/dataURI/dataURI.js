var createDataURIScss = function(dir){

  var getFileList = function(dir){
    var fs = require('fs'),
        path = require('path'),
        list = [];

    var search = function(dir){
      fs.readdirSync(dir).forEach(function (item) {
        var stat = fs.statSync(path.join(dir, item));
        if(stat.isFile()){
          list.push(path.join(dir, item));
        }else if(stat.isDirectory()){
          search(path.join(dir, item));
        }
      });
    };
    search(dir);
    return list;
  };

  var getDataURI = function(files){
    var uri = require('datauri'),
        json = [];
    files.forEach(function (item) {
      json.push({
        'image': item,
        'uri': uri(item)
      });
    });
    return json;
  }
  var fs = require('fs'),
      json2css = require('json2css'),
      json = getDataURI(getFileList(dir));
  
  var scssTmpl = fs.readFileSync('lib/dataURI/dataURI.template.mustache', 'utf8');
  json2css.addMustacheTemplate('dataURI', scssTmpl);
  fs.writeFile('sass/parts/npm/_img-dataURI.scss',json2css(json, {'format': 'dataURI'}));
  console.log('Files "sass/parts/npm/_img-dataURI.scss" created.');
}

createDataURIScss('./src/dataURI');