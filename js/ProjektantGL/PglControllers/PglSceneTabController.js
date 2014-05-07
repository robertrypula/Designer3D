function PglSceneTabController()
{
    
    this.refresh = function()
    {
        var vSceneTab = pgl.getPglViews().getPglSceneTabView();
        
        vSceneTab.refresh();
    }
    
    this.copyActiveClick = function()
    {
        var vSceneTab = pgl.getPglViews().getPglSceneTabView();
        
        vSceneTab.copyActiveClick();
    }
    
    this.addNewNode = function()
    {
        var vSceneTab = pgl.getPglViews().getPglSceneTabView();
        
        vSceneTab.addNewNode();
    }
    
    this.deleteSelectedNode = function()
    {
        var vSceneTab = pgl.getPglViews().getPglSceneTabView();
        
        vSceneTab.deleteSelectedNode();        
    }
    
    this.changeSelectedNodeName = function()
    {
        var vSceneTab = pgl.getPglViews().getPglSceneTabView();
        
        vSceneTab.changeSelectedNodeName();    
    }
    
    this.parseSceneList = function(id)
    {
        var vViewHelpers = pgl.getPglViews().getPglViewHelpers();
        
        vViewHelpers.parseSceneList(id);
    }
    
    this.listNodeNameClick = function(id)
    {
        var vSceneTab = pgl.getPglViews().getPglSceneTabView();
        var mJ3D = pgl.getPglModels().getPglJ3DModel();
        var isShiftPressed = mJ3D.getIsShiftPressed();
        var par = { _id: id,
                    _isShiftPressed: isShiftPressed
                  };
        
        vSceneTab.listNodeNameClick(par);
    }
    
    this.listNodeVisibleClick = function(id)
    {
        var vSceneTab = pgl.getPglViews().getPglSceneTabView();
        var par = { _id: id };
        
        vSceneTab.listNodeVisibleClick(par);
    }
    
    this.listNodeOpenCloseClick = function(id)
    {
        var vSceneTab = pgl.getPglViews().getPglSceneTabView();
        
        vSceneTab.listNodeOpenCloseClick(id);
    }
    
    this.saveProjectClick = function()
    {
        var vSceneTab = pgl.getPglViews().getPglSceneTabView();
        
        vSceneTab.saveProject();
    }
    
    this.loadProjectClick = function()
    {
        var ajax = pgl.getPglClasses().getPglAjax();
        
        ajax.request(PGL_AJAX_URL_LOAD_PROJECT_ACTION, {}, function(data) {
            pgl.getPglControllers().getPglSceneTabController().loadProjectAjaxFinished(data);
        });
    }
    
    this.loadProjectAjaxFinished = function(data)
    {
        var vSceneTab = pgl.getPglViews().getPglSceneTabView();
        
        vSceneTab.loadProjectAjaxFinished(data);
    }
    
    this.saveProjectParsed = function(par)
    {
        var ajax = pgl.getPglClasses().getPglAjax();
        var parsedScene = JSON.stringify(par._parsedScene);
        var _par;
        
        _par = { sceneJson: parsedScene };
        ajax.request(PGL_AJAX_URL_SAVE_PROJECT_ACTION, _par, function() {
            //alert('zapisano!');
        });
    }
    
    this.listNodeAttributeNameClick = function(id, type)
    {
        var vSceneTab = pgl.getPglViews().getPglSceneTabView();
        
        vSceneTab.listNodeAttributeNameClick(id, type);
    }
    
    this.listNodeAttributeOpenCloseClick = function(id, type)
    {
        var vSceneTab = pgl.getPglViews().getPglSceneTabView();
        
        vSceneTab.listNodeAttributeOpenCloseClick(id, type);
    }
    
    this.deselectClick = function()
    {
        var vSceneTab = pgl.getPglViews().getPglSceneTabView();
        
        vSceneTab.deselect();
    }
    
    this.updateEntireScene = function(par)
    {
        var mJ3D = pgl.getPglModels().getPglJ3DModel();
        
        mJ3D.getScene().updateEntireScene(par._parsedScene);
    }
    
    this.updateSceneOnlyInChangedNodes = function(par)
    {
        var mJ3D = pgl.getPglModels().getPglJ3DModel();
        
        mJ3D.getScene().updateSceneOnlyInChangedNodes(par._changedNodesArr);
    }
    
}