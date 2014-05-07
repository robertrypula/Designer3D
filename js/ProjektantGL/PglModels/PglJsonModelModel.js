function PglJsonModelModel()
{
    var name = "";
    var mesh = null;
    var meshLoaded = false;
    var json = null;
    var lastDimX = null;
    var lastDimY = null;
    var lastDimZ = null;
    
    // private
    var jsonNormalized = null;
    var jsonDimensioned = null;
    
    
    this.getName = function() { return name; }
    this.getMeshLoaded = function() { return meshLoaded; }
    this.getJson = function() { return json; }
    this.setName = function(v) { name = v; }
    this.setMeshLoaded = function(v) { meshLoaded = v; }
    
    this.generateNormalizedVertices = function() 
    {
        var key, i;
        var jsonModelDimX, jsonModelDimY, jsonModelDimZ;
        var minX = 111000.0, maxX = -111000.0;
        var minY = 111000.0, maxY = -111000.0;
        var minZ = 111000.0, maxZ = -111000.0;
        
        for (key in json)
            for (i=0; i<json[key].length; i++)
                if (key=="vertices") {
                    switch (i%3) {
                        case 0: minX = (json[key][i] < minX) ? json[key][i] : minX;
                                maxX = (json[key][i] > maxX) ? json[key][i] : maxX;
                                break;
                        case 1: minY = (json[key][i] < minY) ? json[key][i] : minY;
                                maxY = (json[key][i] > maxY) ? json[key][i] : maxY;
                                break;
                        case 2: minZ = (json[key][i] < minZ) ? json[key][i] : minZ;
                                maxZ = (json[key][i] > maxZ) ? json[key][i] : maxZ;
                                break;
                    }
                }
        jsonModelDimX = maxX - minX;
        jsonModelDimY = maxY - minY;
        jsonModelDimZ = maxZ - minZ;
        
        jsonNormalized = { colors: new Array(),
                           normals: new Array(),
                           tris: new Array(),
                           uv1: new Array(),
                           uv2: new Array(),
                           vertices: new Array()
                         };
        for (key in json) {
            for (i=0; i<json[key].length; i++)
                if (key=="vertices") {
                    switch (i%3) {
                        case 0: jsonNormalized[key].push( (json[key][i] - minX)/jsonModelDimX );
                                break;
                        case 1: jsonNormalized[key].push( (json[key][i] - minY)/jsonModelDimY );
                                break;
                        case 2: jsonNormalized[key].push( (json[key][i] - minZ)/jsonModelDimZ );
                                break;
                    }
                } else {
                    jsonNormalized[key].push(json[key][i]);
                }
        }
    }
    
    this.setJson = function(v) 
    { 
        json = v; 
        jsonNormalized = null;
        jsonDimensioned = null;
        this.generateNormalizedVertices();
        this.applyDimension(1.0, 1.0, 1.0);   
    }
    
    this.applyDimension = function(dimX, dimY, dimZ)
    {
        var key, i;
        var dimensionChanged = false;
        
        if (jsonDimensioned===null) {
            jsonDimensioned = { colors: new Array(),
                                normals: new Array(),
                                tris: new Array(),
                                uv1: new Array(),
                                uv2: new Array(),
                                vertices: new Array()
                              };
            for (key in jsonNormalized)
                for (i=0; i<jsonNormalized[key].length; i++)
                    jsonDimensioned[key].push(jsonNormalized[key][i]);
        }
        
        if (dimX!=lastDimX || dimY!=lastDimY || dimZ!=lastDimZ) {
            dimensionChanged = true;
        }

        if (dimensionChanged) {
            for (i=0; i<jsonNormalized.vertices.length; i++)
                switch (i%3) {
                    case 0: jsonDimensioned.vertices[i] = jsonNormalized.vertices[i] * dimX;
                            break;
                    case 1: jsonDimensioned.vertices[i] = jsonNormalized.vertices[i] * dimY;
                            break;
                    case 2: jsonDimensioned.vertices[i] = jsonNormalized.vertices[i] * dimZ;
                            break;
                }
            mesh = new J3D.Mesh(jsonDimensioned);
        }
    }
    
    this.getMesh = function()
    {
        if (!mesh)
            mesh = new J3D.Mesh(jsonDimensioned);

        return mesh;
    }
}