
const devicelist = ['Android','iPad'];
var str = 'Mozilla/5.0%20(Android;%20CPU%20Android%20OS%2015_4_1%20like%20Mac%20OS%20X)%20AppleWebKit/605.1.15%20(KHTML,%20like%20Gecko)%20Version/15.4%20Mobile/15E148%20Safari/604.1';
var flag = 0;
devicelist.forEach((item,index) =>{
    var regex= new RegExp(item);
    var regexno = /Android.*Mobile/
    var result = regex.exec(str);
    if (result !== null){
        flag = 1;
        console.log('machea device');
        var result2 = regexno.exec(str);
        if (result2 == null){
            console.log('device no es Android Mobile: devolviendo respuesta 302 al usuario');
            console.log(result2);
        }
    }
    else{
        console.log('no machea device');
    }
    console.log(result)
});