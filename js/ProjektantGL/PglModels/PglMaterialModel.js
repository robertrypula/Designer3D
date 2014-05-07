function PglMaterialModel()
{
    var name = "";
    var shader = null;

    
    this.getName = function() { return name; }
    this.getShader = function() { return shader; }
    this.setName = function(v) { name = v; }
    this.setShader = function(v) { shader = v; }
}