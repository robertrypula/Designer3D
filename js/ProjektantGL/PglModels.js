function PglModels()
{
    var pglJ3DModel = new PglJ3DModel();
    var pglWindowModel = new PglWindowModel();
    
    
    this.getPglJ3DModel = function() { return pglJ3DModel; }
    this.getPglWindowModel = function() { return pglWindowModel; }

    this.init = function()
    {
        
    }
}