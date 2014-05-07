function PglAjax()
{
    var AJAX_IN_PROGRESS = null;
    
    this.request = function(url, par, callbackFunc)
    {
        if (AJAX_IN_PROGRESS!==null) {
            AJAX_IN_PROGRESS.abort();
        }
        
        var paramsArr = new Array();
        var paramsStr = "";
        var k;
        
        for (var k in par) {
            paramsArr.push(k+"="+par[k]);
        }
        paramsStr = paramsArr.join('&');
        
        $('#pgl-ajax-in-progress').addClass('active');
        AJAX_IN_PROGRESS = $.ajax({
            url:    url,
            data:   paramsStr,
            type:   'POST',
            success:function(data) {
                        callbackFunc(jQuery.parseJSON(data));
                        AJAX_IN_PROGRESS = null;
                        $('#pgl-ajax-in-progress').removeClass('active');
                    },
            error:  function() {
                        AJAX_IN_PROGRESS = null;
                        $('#pgl-ajax-in-progress').removeClass('active');
                    }
        });
    }
}