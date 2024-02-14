var spawn = require('child_process').exec;
hexo.on('new', function(data){
  spawn('start  "D:\Typora\Typora.exe" ' + data.path);
});