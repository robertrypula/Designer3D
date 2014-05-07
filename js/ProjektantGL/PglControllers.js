function PglControllers()
{
    var pglJ3DController = new PglJ3DController();
    var pglModelController = new PglModelController();
    var pglSceneTabController = new PglSceneTabController();
    var pglWindowController = new PglWindowController();


    this.getPglJ3DController = function() { return pglJ3DController; }
    this.getPglModelController = function() { return pglModelController; }
    this.getPglSceneTabController = function() { return pglSceneTabController; }
    this.getPglWindowController = function() { return pglWindowController; }
}