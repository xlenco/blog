var fs = require('fs');
function changeJson(){
    fs.readFile('package.json',function(err,data){
        if(err){
            console.error(err);
        }
        var person = data.toString();
        person = JSON.parse(person);
        var timestamp=new Date().getTime()
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
changeJson()
