function handler(event) {
    // NOTE: This example function is for a viewer request event trigger. 
    // Choose viewer request for event trigger when you associate this function with a distribution. 
    var request = event.request;
    var headers = request.headers;
    var agent = headers['user-agent'];
    var devicelist = ['Android','iPad'];
    var flag = 0;
    
    devicelist.forEach((item,index) =>{
        var regex= new RegExp(item);
        var regexno = /Android.*Mobile/
        var result = regex.exec(agent.value);
        if (result !== null){
            console.log('machea device');
            var result2 = regexno.exec(agent.value);
            flag = 1;
            if (result2 == null){
                console.log('device no es Android Mobile: devolviendo respuesta 302 al usuario');
                flag = 2;
            }
        }
    });
    var response = {
        statusCode: 200,
        statusDescription: 'OK',
        headers: {
            'cloudfront-functions': { value: 'generated-by-CloudFront-Functions' }
        }
    };
    return response;
}