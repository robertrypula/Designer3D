function PglViews()
{
    var pglViewHelpers = new PglViewHelpers();
    var pglJ3DView = new PglJ3DView();
    var pglModelView = new PglModelView();
    var pglSceneTabView = new PglSceneTabView();
    var pglWindowView = new PglWindowView();
    
    
    this.getPglViewHelpers = function() { return pglViewHelpers; }
    this.getPglJ3DView = function() { return pglJ3DView; }
    this.getPglModelView = function() { return pglModelView; }
    this.getPglSceneTabView = function() { return pglSceneTabView; }
    this.getPglWindowView = function() { return pglWindowView; }
    
}