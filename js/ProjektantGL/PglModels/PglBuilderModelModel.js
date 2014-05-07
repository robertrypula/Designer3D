function PglBuilderModelModel()
{
    var id;
    var node;
    
    this.getId = function() { return id; }
    this.getNode = function() { return node; }
    this.setId = function(v) { id = v; }
    this.setNode = function(v) { node = v; }
}