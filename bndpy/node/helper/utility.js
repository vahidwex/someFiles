

const uniqueCode = function(){

    return Math.abs((new Date()).
    valueOf()
        .toString()
            .split("")
                .reduce(function(a,b){a=((a<<10)-a)+b.charCodeAt(0);return a&a},0));
}

 
module.exports ={
    uniqueCode 
};