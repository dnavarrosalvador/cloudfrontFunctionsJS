// cloudfrontfunction-rtvepoc.js
// 20-may-2022
// david.navarro@evolutio.com
// implementación con cloudFunctions de las reglas que pide crtve para la POC de CDN -caso 3

function handler(event) {
    // NOTE: This example function is for a viewer request event trigger. 
    // Choose viewer request for event trigger when you associate this function with a distribution. 
    //var request = event.request;

    var headers = request.headers;
    var agent = headers['user-agent'];
    var devicelist = ['Android','iPad'];
    var devicelist2 = ['BlackBerry', 'Opera Mini', 'Skyfire', 'Maemo', 'Windows Phone', 'Palm', 'IEMobile', 'Symbian', 'Fennec', 'J2ME', 'iPhone', 'iPod'];
    var regexAM = /Android.*Mobile/;
    var url = request.uri;
    var regexhost = /http[s]?:\/\/([a-zA-Z0-9\-\.]+)(:[0-9]+)?/; // regex para extraer el host de la url
    var host = regexhost.exec(url);
    var path = url.replace(regexhost,'');   // el path es la parte de la url reemplazando el host por ''
    var flag = 0;
    
    // voy a hacer 2 bucles uno por cada regla en vez de fusionarlas, porque si me piden
    // modificar una de las reglas entonces no afecto a la otra
    
    // implementación de regla 1
    // mira en la lista devicelist si el user-agent coincide con algun elemento
    devicelist.forEach((item,index) =>{
        var regex= new RegExp(item);
        var result = regex.exec(agent);
        if (result !== null){   // user-agent coincide con device en lista 1
            flag = 1;
            console.log('machea device');
            var result2 = regexAM.exec(agent);  // buscamos si el device es algo como Android*Mobile
            if (result2 == null){   // no es Android*Mobile entonces devolvemos 302 y nueva location
                flag = 2;
                console.log('device no es Android Mobile: devolviendo respuesta 302 al usuario');
            }
        }
    }); // end forech
    
    // solo si flag == 2 devuelvo la respuesta
    if (flag == 2) {
        // reemplazo la ubicación para la regla 1 construyendo nueva uri
        var newhost = 'https://css2.irtve.es';  // string de reemplazo del host
        var replacestr = '/css/$1tablet$2';     // string de reeemplazo del path
        var pathregex = /\/css\/.*desktp.*/;    // patron de reemplazo del path
        var newpath = url.replace(pathregex,replacestr);
        var newUri = newhost + newpath;
        // devuelvo nueva location
        var response = {
            statusCode: 302,
            statusDescription: 'Found',
            headers: {
                "location" : {"value" : newUri }
            }
        };
        return response;
    }
    else{
        console.log('user-agent no encontrado al procesar la regla 1');
    }
    // end regla 1
 
 
    // implementación de regla 2
    var flag = 0;   // reset del flag
    var resultAM = regexAM.exec(agent); // busca si el user-agent coincide con Android*Mobile
    if (resultAM != null){   // es Android*Mobile entonces devolvemos 302 y nueva location
        flag = 2;
        console.log('device es Android Mobile: devolviendo respuesta 302 al usuario');
    }
    else{
        // mira en la lista devicelist2 si el user-agent coincide con algun elemento
        devicelist2.forEach((item,index) =>{
            var regex= new RegExp(item); // creo un regex para que busque el patron
            var result = regex.exec(agent);
            if (result !== null){   // user-agent coincide con device en lista 2
                flag = 2;
                console.log('machea device');
            }
        }); // end foreach
    }
    

    // solo si flag == 2 devuelvo la respuesta
    if (flag == 2) {
        // reemplazo la ubicación para la regla 2 construyendo nueva uri
        var newhost = 'https://css2.irtve.es';  // string de reemplazo del host
        var replacestr = '/css/$1mobile2';     // string de reeemplazo del path
        var pathregex = /\/css\/.*desktp.*/;    // patron de reemplazo del path
        var newpath = path.replace(pathregex,replacestr);
        var newUri = newhost + newpath;
        console.log(newpath);
        console.log(url);
        console.log(newUri);
        // devuelvo nueva location
        var response = {
            statusCode: 302,
            statusDescription: 'Found',
            headers: {
                "location" : {"value" : newUri }
            }
        };
        return response;
    }
    else{
        console.log('user-agent no encontrado al procesar la regla 2');
    }
    // end regla 2

} // end handler
    
    