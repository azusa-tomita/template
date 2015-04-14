var createImageSizeScss = function(dir){

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

  var getImgSzJson = function(files){
    var sizeOf = require('image-size'),
        json = [];
    files.forEach(function (item) {
      json.push({
        'image': item,
        'width': sizeOf(item).width,
        'height': sizeOf(item).height,
      });
    });
    return json;
  }

  var fs = require('fs'),
      json2css = require('json2css'),
      json = getImgSzJson(getFileList(dir));
  
  var scssTmpl = fs.readFileSync('lib/imgaeSize/imgSz.template.mustache', 'utf8');
  json2css.addMustacheTemplate('imgSz', scssTmpl);
  fs.writeFile('sass/parts/npm/_img-size.scss',json2css(json, {'format': 'imgSz'}));
  console.log('Files "sass/parts/npm/_img-size.scss" created.');
}

createImageSizeScss('./img');