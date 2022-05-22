
var str = 'Mozilla/5.0%20(Android;%20CPU%20iPa%20OS%2015_4_1%20like%20Mac%20OS%20X)%20AppleWebKit/605.1.15%20(KHTML,%20like%20Gecko)%20Version/15.4%20/15E148%20Safari/604.1';
var regex1 = /Android/; 
var regex2 = /iPad/; 
var regexno = /Android.*Mobile/;
var result1 = str.match(regex1);
var result2 = str.match(regex2);
var resultno = str.match(regexno);

if (result1 !== null){
    console.log('machea device Android');
    if (resultno == null){
        console.log('device no es Android Mobile: devolviendo respuesta 302 al usuario');
        console.log(result1);
    }
    else{
        console.log('device es Android Mobile');
    }
}

if (result2 !== null){
    console.log('machea device iPad');
    console.log(result2);
}

