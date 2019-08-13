export function getQueryVariable(url, variable) {
    var vars = '';
    try {
        var query = url;//window.location.search.substring(1);
        vars = query.split("?")[1].split("=")[1];
    } catch (error) {
        vars = false;
    }
    return vars;
    //    for (var i=0;i<vars.length;i++) {
    //            var pair = vars[i].split("=");
    //            if(pair[0] == variable){return pair[1];}
    //    }
    //    return(false);
}