function PglModelController()
{
    this.addCurrentBuilderModelAliasClick = function()
    {
        var vSceneTab = pgl.getPglViews().getPglSceneTabView();
        
        vSceneTab.addCurrentBuilderModelAliasClick();
    }
    
    this.addCurrentBuilderModelFullClick = function()
    {
        var vSceneTab = pgl.getPglViews().getPglSceneTabView();
        
        vSceneTab.addCurrentBuilderModelFullClick();
    }
    
    this.listNodeBuilderClick = function(id)
    {
        var vSceneTab = pgl.getPglViews().getPglSceneTabView();
        var par = { _id: id };
        
        vSceneTab.listNodeBuilderClick(par);
    }
    
    this.addPrimitiveBoxClick = function()
    {
        var vSceneTab = pgl.getPglViews().getPglSceneTabView();
        
        vSceneTab.addPrimitiveBoxClick();
    }
    
    this.addPrimitiveSphereClick = function()
    {
        var vSceneTab = pgl.getPglViews().getPglSceneTabView();
        
        vSceneTab.addPrimitiveSphereClick();
    }
    
    this.addPrimitivePlaneClick = function()
    {
        var vSceneTab = pgl.getPglViews().getPglSceneTabView();
        
        vSceneTab.addPrimitivePlaneClick();
    }
}