function PglJ3DModel()
{
    var canvas = null;
    var canvasWidth = null;
    var canvasHeight = null;
    var mouseOverCanvas = false;
    var engine = null;
    var pointerLock = null;
    var moveLeft = 0, moveForward = 0;
    var moveSpeed = 200.0;
    var lightPoint, lightPoint2;
    var fps = null;
    var eye = null;
    var floor = null;
    var floorRenderer = null;
    var mouseMode = PGL_MOUSE_MOVE_LOOKING;
    var mouseModeAxis = PGL_MOUSE_MOVE_AXIS_X;
    var mousePosNormalizedX = 0.0;
    var mousePosNormalizedY = 0.0;
    var isShiftPressed = false;
    var scene;
    var assetsLoader;
    var matReflective;
    
    
    this.getEngine = function() { return engine; }
    this.getPointerLock = function() { return pointerLock; }
    this.getMouseMode = function() { return mouseMode; }
    this.getMouseModeAxis = function() { return mouseModeAxis; }
    this.getMousePosNormalizedX = function() { return mousePosNormalizedX; }
    this.getMousePosNormalizedY = function() { return mousePosNormalizedY; }
    this.getIsShiftPressed = function() { return isShiftPressed; }
    this.getScene = function() { return scene; }
    this.getAssetsLoader = function() { return assetsLoader; }
    this.getMatReflective = function() { return matReflective; }
    
    
    /**
     * Init WebGL context
     */
    this.init = function(_canvas)
    {
        canvas = _canvas;
        engine = new J3D.Engine(_canvas);
        pointerLock = new J3D.PointerLock();
        assetsLoader = new J3D.AssetLoader();
       
        
        lightPoint = new J3D.Transform('lightPoint', 'lightPoint');
        lightPoint.light = new J3D.Light(J3D.POINT);
        lightPoint.position = new v3(-960.0, 350.0, -450.0);
        lightPoint.geometry = J3D.Primitive.Cube(10.0, 10.0, 10.0);
        lightPoint.renderer = J3D.BuiltinShaders.fetch("Normal2Color");
        
        lightPoint2 = new J3D.Transform('lightPoint2', 'lightPoint2');
        lightPoint2.light = new J3D.Light(J3D.POINT);
        lightPoint2.position = new v3(-211, 273.0, 39.0);
        lightPoint2.geometry = J3D.Primitive.Cube(10.0, 10.0, 10.0);
        lightPoint2.renderer = J3D.BuiltinShaders.fetch("Normal2Color");

        eye = new J3D.Transform('eye', 'eye');
        
        
        eye.camera = new J3D.Camera({near: 1.0, far: 10000.0, fov: 60.0});
        
        
        //eye.camera = new J3D.Camera({type: J3D.ORTHO, left: -100.0, right: 100.0, bottom: -70.0, top: 70.0, far: 10000.0, fov: 60.0});
        
//        arams.left == null) params.left = 0;
//        if (params.right == null) params.right = 1;
//        if (params.top == null) params.top = 0;
//        if (params.bottom == null) params.bottom = 1;
        
        eye.rotation.x = -Math.PI*0.25;

        fps = new J3D.Transform('fps', 'fps');
        fps.position = new v3(0.0, 175.0, 180.0);
        fps.add(eye);

        floorRenderer = J3D.BuiltinShaders.fetch("Selflit");
        floorRenderer.colorTexture = new J3D.Texture("images/mieszanko-plan.png");     // http://projektantgl.localhost/
        floorRenderer.hasColorTexture = true;
        floor = new J3D.Transform('floor', 'floor');
        floor.geometry = J3D.Primitive.Plane(1617.0, 1617.0);
        floor.renderer = floorRenderer;
        floor.rotation.x = -0.5*Math.PI;
        
        // sky color
        engine.setClearColor(new J3D.Color(0.43359375, 0.7890625, 0.96484375, 1.0));
       
        engine.scene.setCamera(eye);
        engine.scene.ambient = new J3D.Color(0.45, 0.45, 0.45, 1.0);
        engine.scene.add(lightPoint, lightPoint2);

        engine.scene.add(eye, fps, floor);
        
        
        // init root object for scene list
        scene = new PglSceneModel(this);
        scene.init();
    }
        
    /**
     * Updates scene using current velocity vectors and deltaTime
     */
    this.move = function()
    {
        var fv = new v3(), lv = new v3();
                    
        fv.fromArray(eye.worldForward);
        lv.fromArray(eye.worldLeft);
        fv.mult(moveForward).add(lv.mult(moveLeft));
        fv.norm();
        fv.mult(moveSpeed*J3D.Time.deltaTime*0.001);
        
        fps.position.add(fv);
    }
    
    this.mouseMove = function(par)
    {
        mousePosNormalizedX = par._x/canvasWidth;
        mousePosNormalizedY = par._y/canvasHeight;
    }
    
    this.updateCanvasDimensions = function(par)
    {
        if (engine!==null) {
            engine.resize(par._w, par._h);
            canvasWidth = par._w;
            canvasHeight = par._h;
        }
    }

    this.keydown = function(keycode)
    {
        if (!mouseOverCanvas && keycode!=16)
            return;
        var go = 1.0;
        switch (keycode) {
            case 65:moveLeft = go;
                    break;
            case 68:moveLeft = -go;
                    break;
            case 87:moveForward = go;
                    break;
            case 83:moveForward = -go;
                    break;
            case 16:isShiftPressed = true;
                    break;
            //case 32:pointerLock.requestLock(engine.outCanvas);   // TODO
                    break;
        }
    }
    
    this.keyup = function(keycode)
    {
        if (!mouseOverCanvas && keycode!=16)
            return;
        switch (keycode) {
            case 87:
            case 83:moveForward = 0;
                    break;
            case 65:
            case 68:moveLeft = 0;
                    break;
            case 49:mouseMode = PGL_MOUSE_MOVE_LOOKING; break;
            case 50:mouseMode = PGL_MOUSE_MOVE_DIMENSION; break;
            case 51:mouseMode = PGL_MOUSE_MOVE_POSITION; break;
            case 52:mouseMode = PGL_MOUSE_MOVE_ROTATION; break;
            case 53:mouseMode = PGL_MOUSE_MOVE_SCALE; break;
            case 90:mouseModeAxis = PGL_MOUSE_MOVE_AXIS_X; break;
            case 88:mouseModeAxis = PGL_MOUSE_MOVE_AXIS_Y; break;
            case 67:mouseModeAxis = PGL_MOUSE_MOVE_AXIS_Z; break;
            case 16:isShiftPressed = false;
                    break;
        }
    }
    
    this.mouseLeftDrag = function(par)
    {   
        switch (mouseMode) {
            case PGL_MOUSE_MOVE_LOOKING:  fps.rotation.y -= (par._deltaX / canvasWidth) * Math.PI * 2.0;
                                          eye.rotation.x -= (par._deltaY / canvasWidth) * Math.PI * 2.0;
                                          break;
        }                                            
    }
    
    this.mouseOver = function()
    {
        mouseOverCanvas = true;
    }
    
    this.mouseLeave = function()
    {
        mouseOverCanvas = false;
    }
}