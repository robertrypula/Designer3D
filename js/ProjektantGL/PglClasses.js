function PglClasses()
{
    var pglJSEvents = new PglJSEvents();
    var pglAjax = new PglAjax();
    var pglCustomModelGenerator = new PglCustomModelGenerator();
    var pglPerformance = new PglPerformance();
    var pglTool = new PglTool();
    
    
    this.getPglJSEvents = function() { return pglJSEvents; }
    this.getPglAjax = function() { return pglAjax; }
    this.getPglCustomModelGenerator = function() { return pglCustomModelGenerator; }
    this.getPglPerformance = function() { return pglPerformance; }
    this.getPglTool = function() { return pglTool; }
    
    this.init = function()
    {
        pglJSEvents.init();
    }
}