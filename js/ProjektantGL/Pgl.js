var PGL_MOUSE_MOVE_LOOKING = 0;
var PGL_MOUSE_MOVE_POSITION = 1;
var PGL_MOUSE_MOVE_ROTATION = 2;
var PGL_MOUSE_MOVE_SCALE = 3;
var PGL_MOUSE_MOVE_DIMENSION = 4;
var PGL_MOUSE_MOVE_AXIS_X = 0;
var PGL_MOUSE_MOVE_AXIS_Y = 1;
var PGL_MOUSE_MOVE_AXIS_Z = 2;
var PGL_WINDOW_RESIZE_TIMER;
var PGL_WINDOW_RESIZE_DELAY = 50;
var PGL_ERROR_MESSAGES = {  
                             };

var PGL_AJAX_URL_SAVE_PROJECT_ACTION = '/saveProjectAction.php';
var PGL_AJAX_URL_LOAD_PROJECT_ACTION = '/loadProjectAction.php';

var PGL_JSON_MODELS_PATH = '_models/';

var PGL_BUILDER_MODELS_STARTING_ID = 10000; // normal model ids starts from 1 but cloned models must have big offset to have unique ID
var PGL_ARRAY_MODIFIER_OBJ_STARTING_ID = 10000000;  // array modifier obj must have even more offset to have unique ID :)

var PGL_PARSE_ENTIRE_SCENE = -1;


/**
 * Main PayBack class
 */
function Pgl()
{
    var pglModels = new PglModels();             // M-odel
    var pglViews = new PglViews();               // V-iew
    var pglControllers = new PglControllers();   // C-ontroller
    var pglClasses = new PglClasses();
    

    this.getPglModels = function() { return pglModels; }
    this.getPglViews = function() { return pglViews; }
    this.getPglControllers = function() { return pglControllers; }
    this.getPglClasses = function() { return pglClasses; }
    

    this.init = function()
    {
        pglClasses.init();
        pglControllers.getPglJ3DController().initWebGLCanvas();
        pglControllers.getPglJ3DController().draw();

        pglControllers.getPglWindowController().initMaterialList();
        pglControllers.getPglWindowController().initModelTemplatesNode();
        pglControllers.getPglSceneTabController().loadProjectClick();
    }
}