var fs = require('fs');
var timestamp=new Date().getTime()
function changeJson(timestamp){
    fs.readFile('package.json',function(err,data){
        if(err){
            console.error(err);
        }
        var person = data.toString();
        person = JSON.parse(person);
        person.version = "1.0." + timestamp
        var str = JSON.stringify(person);
        fs.writeFile('package.json',str,function(err){
            if(err){
                console.error(err);
            }
            console.log('修改成功');
            console.log(person.version);
        })
    })
}
function changeconfig(timestamp) {
    fs.readFile('config.yaml','utf8',function(err,files){
        var result = files.replace(/1.0.000919/g,"1.0." + timestamp);
        console.log("ok")
        fs.writeFile('config.yaml', result, 'utf8', function (err) {
             if (err) return console.log(err);
        });

    })
};
changeJson(timestamp)
changeconfig(timestamp)
