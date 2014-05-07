function PglTool()
{
    
    this.getJ3DColorFromHex = function(hex)
    {
        var red, green, blue;
        
        hex = (hex+"").replace('#', '');
        if (hex.length!=6)
            return J3D.Color.white;
        
        red = parseInt(hex.substr(0, 2), 16) / 255.0;
        green = parseInt(hex.substr(2, 2), 16) / 255.0;
        blue = parseInt(hex.substr(4, 2), 16) / 255.0;
        
        return new J3D.Color(red, green, blue, 1.0); 
    }
    
    this.getRandomInt = function(min, max)
    {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    this.getRandomFloat = function(min, max)
    {
        return min + (max-min)*Math.random();
    }
    
    this.generateChars = function(len, what)
    {
        var ret = "";
        for (var i=0; i<len; i++)
            ret = ret + what;
        return ret;
    }
    
    this.degrees2Radians = function(deg)
    {
        return (Math.PI / 180.0) * deg;
    }
    
    this.customParseFloat = function(v, def)
    {
        return isNaN(parseFloat(v)) ? def : parseFloat(v);
    }
    
    this.array_unique = function(inputArr) 
    {
        var key = '',
        tmp_arr2 = {},
        val = '';

        var __array_search = function (needle, haystack) {
            var fkey = '';
            for (fkey in haystack) {
                if (haystack.hasOwnProperty(fkey)) {
                    if ((haystack[fkey] + '') === (needle + '')) {
                        return fkey;
                    }
                }
            }
            return false;
        };

        for (key in inputArr) {
            if (inputArr.hasOwnProperty(key)) {
                val = inputArr[key];
                if (false === __array_search(val, tmp_arr2)) {
                    tmp_arr2[key] = val;
                }
            }
        }

        return tmp_arr2;
    }
    
    this.explode = function(delimiter, string, limit) 
    {
        if ( arguments.length < 2 || typeof delimiter == 'undefined' || typeof string == 'undefined' ) return null;
        if ( delimiter === '' || delimiter === false || delimiter === null) return false;
        if ( typeof delimiter == 'function' || typeof delimiter == 'object' || typeof string == 'function' || typeof string == 'object'){
            return {
                0: ''
            };
        }
        if ( delimiter === true ) delimiter = '1';
  
        // Here we go...
        delimiter += '';
        string += '';
  
        var s = string.split( delimiter );
  
        if ( typeof limit === 'undefined' ) return s;
  
        // Support for limit
        if ( limit === 0 ) limit = 1;
  
        // Positive limit
        if ( limit > 0 ){
            if ( limit >= s.length ) return s;
            return s.slice( 0, limit - 1 ).concat( [ s.slice( limit - 1 ).join( delimiter ) ] );
        }

        // Negative limit
        if ( -limit >= s.length ) return [];
  
        s.splice( s.length + limit );
        return s;
    }
    
    this.numberFormat = function(number, decimals, dec_point, thousands_sep) 
    {
        number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
        var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function (n, prec) {
            var k = Math.pow(10, prec);
            return '' + Math.round(n * k) / k;
        };
        // Fix for IE parseFloat(0.55).toFixed(0) = 0;
        s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
        if (s[0].length > 3) {
            s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
        }
        if ((s[1] || '').length < prec) {
            s[1] = s[1] || '';
            s[1] += new Array(prec - s[1].length + 1).join('0');
        }
        return s.join(dec);
    }
    
    this.strpos = function(haystack, needle, offset) 
    {
        var i = (haystack + '').indexOf(needle, (offset || 0));
        return i === -1 ? false : i;
    }
}