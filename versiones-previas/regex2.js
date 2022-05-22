var regex = /iPhone/;
var str1 = 'asdfadfa faf iPad sadfafd';
var str2 = 'atasgas kkjdnd Pad fas';
var result = regex.exec(str1);
console.log(result);
var result2 = regex.exec(str2);
console.log(result2);
var str3 = 'Mozilla/5.0%20(iPhone;%20CPU%20iPhone%20OS%2015_4_1%20like%20Mac%20OS%20X)%20AppleWebKit/605.1.15%20(KHTML,%20like%20Gecko)%20Version/15.4%20Mobile/15E148%20Safari/604.1';
var result3 = regex.exec(str3);
console.log(result3)