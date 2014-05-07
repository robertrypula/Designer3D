function PglWindowController()
{
    this.updateWindowDim = function()
    {
        var vWindow = pgl.getPglViews().getPglWindowView();
        var mWindow = pgl.getPglModels().getPglWindowModel();
        var currFS = mWindow.getFullScreen();
        
        vWindow.updateWindowDim({_currFS: currFS});
    }
    
    this.toogleFullScreenClick = function()
    {
        var vWindow = pgl.getPglViews().getPglWindowView();
        var mWindow = pgl.getPglModels().getPglWindowModel();
        var currFS = mWindow.getFullScreen();
        
        currFS = !currFS;
        mWindow.setFullScreen(currFS);
        
        vWindow.updateWindowDim({_currFS: currFS});
    }
    
    this.initModelTemplatesNode = function()
    {
        var vWindow = pgl.getPglViews().getPglWindowView();
        
        vWindow.initModelTemplatesNode();
    }
    
    this.initMaterialList = function()
    {
        var vWindow = pgl.getPglViews().getPglWindowView();
        var par = { _materialsArr: pgl.getPglModels().getPglJ3DModel().getScene().getMaterialGenerator().getMaterialModel() };
        
        vWindow.initMaterialList(par);
    }
}