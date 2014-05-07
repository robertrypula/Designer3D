function PglJ3DController()
{

    this.initWebGLCanvas = function()
    {
        var vJ3D = pgl.getPglViews().getPglJ3DView();
        
        vJ3D.findWebGLCanvas();
    }
    
    this.foundWebGLCanvas = function(par)
    {
        var cWindow = pgl.getPglControllers().getPglWindowController();
        var mJ3D = pgl.getPglModels().getPglJ3DModel();
        
        mJ3D.init(par._canvas);
        cWindow.updateWindowDim();
    }
    
    this.draw = function()
    {
        var mJ3D = pgl.getPglModels().getPglJ3DModel();
        var vJ3D = pgl.getPglViews().getPglJ3DView();
        requestAnimationFrame(pgl.getPglControllers().getPglJ3DController().draw);

        mJ3D.move();
        vJ3D.render({ _mJ3D: mJ3D });
    }
    
    this.updateCanvasDimensions = function(par)
    {
        var mJ3D = pgl.getPglModels().getPglJ3DModel();
        mJ3D.updateCanvasDimensions(par);
    }
    
    this.keydown = function(keycode)
    {
        var mJ3D = pgl.getPglModels().getPglJ3DModel();
        
        mJ3D.keydown(keycode);
    }
    
    this.keyup = function(keycode)
    {
        var mJ3D = pgl.getPglModels().getPglJ3DModel();
        var vJ3D = pgl.getPglViews().getPglJ3DView();
        var vPar;
        
        mJ3D.keyup(keycode);
        
        vPar = { _keycode       : keycode,
                 _mouseMode     : mJ3D.getMouseMode(),
                 _mouseModeAxis : mJ3D.getMouseModeAxis()
               };
               
        vJ3D.keyup(vPar);
    }

    this.mouseLeftClick = function(par)
    {
        
    }
    
    this.mouseRightClick = function(par)
    {
        
    }
    
    this.mouseLeftDrag = function(par)
    {
        var mJ3D = pgl.getPglModels().getPglJ3DModel();
        var vSceneTab = pgl.getPglViews().getPglSceneTabView();
        var vPar;
        
        mJ3D.mouseLeftDrag(par);
        
        vPar = { _mouseNormX    : mJ3D.getMousePosNormalizedX(),
                 _dragX         : par._deltaX,
                 _dragY         : par._deltaY,
                 _mouseMode     : mJ3D.getMouseMode(),
                 _mouseModeAxis : mJ3D.getMouseModeAxis()
               };
        
        if (mJ3D.getMouseMode()!=PGL_MOUSE_MOVE_LOOKING)
            vSceneTab.mouseLeftDrag(vPar);
    }
    
    this.mouseRightDrag = function(par)
    {
        
    }
    
    this.mouseLeftDragStop = function(par)
    {
        
    }
    
    this.mouseRightDragStop = function(par)
    {
        
    }
    
    this.mouseMove = function(par)
    {
        var mJ3D = pgl.getPglModels().getPglJ3DModel();
        
        mJ3D.mouseMove(par);
    }
    
    this.mouseOver = function()
    {
        var mJ3D = pgl.getPglModels().getPglJ3DModel();
        var vJ3D = pgl.getPglViews().getPglJ3DView();
        
        mJ3D.mouseOver();
        
        vJ3D.focusOut();
    }
    
    this.mouseLeave = function()
    {
        var mJ3D = pgl.getPglModels().getPglJ3DModel();
        mJ3D.mouseLeave();
    }
    
    this.mousewheel = function(par)
    {
        var vSceneTab = pgl.getPglViews().getPglSceneTabView();
        
        vSceneTab.mousewheel(par);
    }
}