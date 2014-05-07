function PglWindowView()
{
    
    this.updateWindowDim = function(par)
    {
        var cJ3D = pgl.getPglControllers().getPglJ3DController();
        var w = $(window).width();
        var h = $(window).height();
        var fullScreen = par._currFS;
        var w30p;
        
        w = (w<640) ? 640 : w;
        h = (h<480) ? 480 : h;
        
        w30p = Math.round( w * 0.3 );
        
        if (w30p>350)
            w30p = 350;
        
        if (fullScreen) {
            w30p = 0;
            $('#pgl-tools').hide();
        } else {
            $('#pgl-tools').show();
        }
        
        $('#pgl-container').width( w );
        $('#pgl-container').height( h );
        
        $('#pgl-tools').width( w30p );
        $('#pgl-tools').height( h );
        
        $('#pgl-canvas-cont').width( w - w30p );
        $('#pgl-canvas-cont').height( h );
        $('#pgl-canvas-cont').css('left', w30p+'px');
        
        $('#pgl-canvas').width( w - w30p );
        $('#pgl-canvas').height( h );
        
        $('#pgl-canvas').attr('width', w - w30p );
        $('#pgl-canvas').attr('height', h );
        
        $('#pgl-canvas-top-overlay-cont').width(500+'px').height(16+'px').css('left', (w30p+5)+'px').css('top', '5px');
        
        $('#pgl-obiect-info-box').width('auto').height('auto').css('left', (w30p+5)+'px').css('top', '26px');
        
        cJ3D.updateCanvasDimensions({_w: (w-w30p), _h: h});
    }
    
    this.initModelTemplatesNode = function()
    {
        var t;
        var rootUl = $('#pgl-scene-list > ul');
        var maxId;
        
        maxId = 1;
        
        t = $('#pgl-scene-list-element-template > ul > li').clone();
        t.find('a.t-name').attr('id', 't-name-'+maxId);
        t.find('a.t-name').attr('uniqueId', maxId);
        t.find('a.t-name span').html('Szablony modeli');
        
        t.addClass('modelTemplatesNode');
        
        rootUl.append(t);
    }
    
    this.initMaterialList = function(par)
    {
        var mat = par._materialsArr;
        var i;
        
        for (i=0; i<mat.length; i++) {
            console.log( mat[i].getName() );
        }
    }
}