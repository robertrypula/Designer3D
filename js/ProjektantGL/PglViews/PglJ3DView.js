function PglJ3DView()
{

    this.findWebGLCanvas = function()
    {
        var cJ3D = pgl.getPglControllers().getPglJ3DController();
        
        cJ3D.foundWebGLCanvas({_canvas: document.getElementById('pgl-canvas') });
    }


    this.render = function(par)
    {
        var mJ3D = par._mJ3D;
        
        mJ3D.getEngine().render();
    }
    
    this.focusOut = function()
    {
        $("input").blur();
    }
    
    this.keyup = function(par)
    {
        var mouseModeTxt;
        var mouseModeAxisTxt;
        
        mouseModeTxt = '['+par._mouseMode+'] ';
        switch (par._mouseMode) {
            case PGL_MOUSE_MOVE_LOOKING   : mouseModeTxt += 'rozglądanie'; break;
            case PGL_MOUSE_MOVE_POSITION  : mouseModeTxt += 'pozycja'; break;
            case PGL_MOUSE_MOVE_ROTATION  : mouseModeTxt += 'obrót'; break;
            case PGL_MOUSE_MOVE_SCALE     : mouseModeTxt += 'skala'; break;
            case PGL_MOUSE_MOVE_DIMENSION : mouseModeTxt += 'rozmiar'; break;
        }
        
        mouseModeAxisTxt = '['+par._mouseModeAxis+'] ';
        switch (par._mouseModeAxis) {
            case PGL_MOUSE_MOVE_AXIS_X: mouseModeAxisTxt += 'oś X'; break;
            case PGL_MOUSE_MOVE_AXIS_Y: mouseModeAxisTxt += 'oś Y'; break;
            case PGL_MOUSE_MOVE_AXIS_Z: mouseModeAxisTxt += 'oś Z'; break;
        }
        
        $('#pgl-label-mouse-mode').html(mouseModeTxt);
        $('#pgl-label-mouse-mode-axis').html(mouseModeAxisTxt);
    }
}