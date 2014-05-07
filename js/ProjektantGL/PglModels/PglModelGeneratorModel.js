function PglModelGeneratorModel()
{
    var jsonModel = new Array();
    var builderModel = new Array();
    
    this.getJsonModel = function() { return jsonModel; }
    this.getBuilderModel = function() { return builderModel; }
    
    this.addJsonModel = function(v)
    {
        jsonModel.push(v);
    }
    
    this.findJsonModelByName = function(name)
    {
        var i;
        
        for (i=0; i<jsonModel.length; i++) {
            if (jsonModel[i].getName()==name) {
                return jsonModel[i];
            }
        }
        
        return null;
    }
    
    this.addBuilderModel = function(v)
    {
        builderModel.push(v);
    }
    
    this.findBuilderModelById = function(id)
    {
        var i;
        
        for (i=0; i<builderModel.length; i++) {
            if (builderModel[i].getId()==id) {
                return builderModel[i];
            }
        }
        
        return null;
    }
}