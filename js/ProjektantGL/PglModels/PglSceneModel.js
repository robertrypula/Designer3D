function PglSceneModel(p)
{
    var parent = p;
    var sceneRoot = null;
    var tool = pgl.getPglClasses().getPglTool();
    var modelGenerator = new PglModelGeneratorModel();
    var materialGenerator = new PglMaterialGeneratorModel();
    var currentBuilderId = PGL_BUILDER_MODELS_STARTING_ID;
    var currentArrayModifierObjId = PGL_ARRAY_MODIFIER_OBJ_STARTING_ID;
    var isInBuilderMode = false;
    var inBuilderModeDepth = 0;
    
    
    this.getParent = function() { return parent; }
    this.getMaterialGenerator = function() { return materialGenerator; }
    
    this.init = function()
    {
        materialGenerator.init();
    }
    
    this.getProperGeometryAndPositionForNode = function(n, newNode, inheritedStateModifiers)
    {
        var tool = pgl.getPglClasses().getPglTool();
        var isPrimitiveModel = false;
        var isBuilderModel = false;
        var isJsonModel = false;
        var jsonModelArr;
        var jsonModelName;
        var jsonModel;
        var builderModel;
        var builderNode, builderNodeArr;
        var builderModelArr, builderModelId;
        

        // primitive models
        switch (n.geometry) {
            case 'Cube':   newNode.geometry = J3D.Primitive.Cube(n.dimX, n.dimY, n.dimZ);
                           newNode.position = new v3(0.5*n.dimX + n.posX, 0.5*n.dimY + n.posY, 0.5*n.dimZ + n.posZ);  // dimX is width, dimY is height, dimZ is depth
                           isPrimitiveModel = true;
                           break;
            case 'Plane':  newNode.geometry = J3D.Primitive.Plane(n.dimX, n.dimY); 
                           newNode.position = new v3(0.5*n.dimX + n.posX, 0.5*n.dimY + n.posY, n.posZ);               // dimX is width, dimY is height
                           isPrimitiveModel = true;
                           break;
            case 'Sphere': newNode.geometry = J3D.Primitive.Sphere(n.dimX, n.dimY, n.dimZ);
                           newNode.position = new v3(n.dimX + n.posX, n.dimX + n.posY, n.dimX + n.posZ);              // dimX is radius, dimY is lon segments, dimZ is lat segments
                           isPrimitiveModel = true;
                           break;
        }
        
        // json models
        if (!isPrimitiveModel) {
            if (tool.strpos(n.geometry, 'JSON:')!==false) {
                jsonModelArr = tool.explode(':', n.geometry);
                
                if (jsonModelArr.length==2) {
                    newNode.position = new v3(n.posX, n.posY, n.posZ);
                    jsonModelName = jsonModelArr[1];
                    
                    jsonModel = modelGenerator.findJsonModelByName(jsonModelName);
                    
                    if (jsonModel) {
                        if (jsonModel.getMeshLoaded()) {
                            jsonModel.applyDimension(n.dimX, n.dimY, n.dimZ);
                            newNode.geometry = jsonModel.getMesh();
                        }
                    } else {
                        jsonModel = new PglJsonModelModel();
                        jsonModel.setName(jsonModelName);
                        modelGenerator.addJsonModel(jsonModel);
                        
                        J3D.Loader.loadJSON(PGL_JSON_MODELS_PATH+jsonModelName+'.json', function(j) {
                            jsonModel.setMeshLoaded(true);
                            jsonModel.setJson(j);
                            jsonModel.applyDimension(n.dimX, n.dimY, n.dimZ);
                            newNode.geometry = jsonModel.getMesh();
                        });
                    }
                    
                    isJsonModel = true;
                }
            }
        }
        
        // builder models
        if (!isPrimitiveModel && !isJsonModel) {
            
            builderModelArr = tool.explode('|', n.geometry);
            
            if (builderModelArr.length==2) {
                
                newNode.position = new v3(n.posX, n.posY, n.posZ);
                builderModelId = parseInt(builderModelArr[0]);
            
                builderModel = modelGenerator.findBuilderModelById(builderModelId);
                if (builderModel) {
                    builderNode = builderModel.getNode();
                    builderNodeArr = new Array();
                    builderNodeArr.push(builderNode);
                    
                    if (inBuilderModeDepth==0)
                        isInBuilderMode = true;
                    inBuilderModeDepth++;
                    this.updateSceneRecurse(builderNodeArr, newNode, false, inheritedStateModifiers);
                    inBuilderModeDepth--;
                    if (inBuilderModeDepth==0)
                        isInBuilderMode = false;
                    
                    
                    isBuilderModel = true;
                }
            }
        }
        
        // default
        if (!isPrimitiveModel && !isJsonModel && !isBuilderModel) {
            newNode.geometry = null; 
            newNode.position = new v3(n.posX, n.posY, n.posZ);
        }
    }
    
    this.parseStateModifiers = function(n, inheritedStateModifiers)
    {
        var j, k;
        var modifierJson;
        var stateModifierFound;
        
        try {
            modifierJson = JSON.parse(n.modifier);
        } catch(err) {
            modifierJson = null;
        }

        if (modifierJson && modifierJson.stateVal) {   
            for (j=0; j<modifierJson.stateVal.name.length; j++) {
                stateModifierFound = false;
                for (k=0; k<inheritedStateModifiers.length; k++)
                    if (inheritedStateModifiers[k].name==modifierJson.stateVal.name[j]) {
                        inheritedStateModifiers[k].val = parseFloat( modifierJson.stateVal.val );
                        stateModifierFound = true;
                    }

                if (!stateModifierFound) {
                    inheritedStateModifiers.push({ name : modifierJson.stateVal.name[j],
                                                   val  : parseFloat( modifierJson.stateVal.val )
                                                 }
                                                );
                }
            }
        }
    }
    
    this.applyStateModifiers = function(n, newNode, inheritedStateModifiers)
    {
        var tool = pgl.getPglClasses().getPglTool();
        var modifierConfigJson;
        var i;
        var val;
        var name;
        var applyTo;
        var min;
        var max;
        var axis;
        var modifierValue;
        
        try {
            modifierConfigJson = JSON.parse(n.modifier);
        } catch(err) {
            modifierConfigJson = null;
        }
            
        if (modifierConfigJson && modifierConfigJson.stateConfig)
            for (i=0; i<inheritedStateModifiers.length; i++)
                if (inheritedStateModifiers[i].name==modifierConfigJson.stateConfig[0].name) {
                    
                    val = inheritedStateModifiers[i].val;
                    
                    name = modifierConfigJson.stateConfig[0].name;
                    applyTo = modifierConfigJson.stateConfig[0].applyTo;
                    axis = modifierConfigJson.stateConfig[0].axis;
                    min = modifierConfigJson.stateConfig[0].min;
                    max = modifierConfigJson.stateConfig[0].max;

                    modifierValue = min + (max-min)*val;
                    
                    switch (applyTo) {
                        case "dim": switch(axis) {
                                        case 'x':
                                                  break;
                                        case 'y':
                                                  break;
                                        case 'z':
                                                  break;
                                    }
                                    break;
                        case "pos": switch(axis) {
                                        case 'x': newNode.position.x = newNode.position.x + modifierValue; break;
                                        case 'y': newNode.position.y = newNode.position.y + modifierValue; break;
                                        case 'z': newNode.position.z = newNode.position.z + modifierValue; break;
                                    }
                                    break;
                        case "rot": switch(axis) {
                                        case 'x': newNode.rotation.x = newNode.rotation.x + tool.degrees2Radians( modifierValue ); break;
                                        case 'y': newNode.rotation.y = newNode.rotation.y + tool.degrees2Radians( modifierValue ); break;
                                        case 'z': newNode.rotation.z = newNode.rotation.z + tool.degrees2Radians( modifierValue ); break;
                                    }
                                    break;
                        case "sca": switch(axis) {
                                        case 'x': newNode.scale.x = newNode.scale.x + modifierValue; break;
                                        case 'y': newNode.scale.y = newNode.scale.y + modifierValue; break;
                                        case 'z': newNode.scale.z = newNode.scale.z + modifierValue; break;
                                    }
                                    break;
                    }
                }
    }
    
    this.parseArrayModifier = function(n, isInBuilderMode)
    {
        var tool = pgl.getPglClasses().getPglTool();
        var ret = {arrayCount: 1, arrayPos: null};
        var modifierJson;
        var x, z;
        var xCount, zCount;
        var xOffset, zOffset;
        var xOffset2, zOffset2;
        var mask;
        var maskLength;
        var i;
        var modifierClean;
        
        ret.arrayPos = new Array();
        ret.arrayPos.push({x: 0.0, y: 0.0, z: 0.0});
        
        if (isInBuilderMode)
            return ret;
        
        // here add extra objects position if something was configured in object array modifier
        
        modifierClean = n.modifier.replace(/(\r\n|\n|\r)/gm,"");
                
        try {
            modifierJson = JSON.parse(modifierClean);
        } catch(err) {
            modifierJson = null;
        }
        
        if (modifierJson && modifierJson.array) {
            
            xOffset = modifierJson.array.xOff ? modifierJson.array.xOff : n.dimX;
            zOffset = modifierJson.array.zOff ? modifierJson.array.zOff : n.dimZ;
            xOffset2 = modifierJson.array.xOff2 ? modifierJson.array.xOff2 : 0.0;
            zOffset2 = modifierJson.array.zOff2 ? modifierJson.array.zOff2 : 0.0;
           
            if (modifierJson.array.mask && modifierJson.array.mask!="") {
                mask = tool.explode(",", modifierJson.array.mask);
                maskLength = new Array();
                xCount = 0;
                zCount = mask.length;
                for (i=0; i<zCount; i++) {
                    mask[i] = mask[i]+"";
                    xCount = mask[i].length>xCount ? mask[i].length : xCount;
                    maskLength.push(mask[i].length);
                }
            } else {
                maskLength = null;
                xCount = modifierJson.array.x ? modifierJson.array.x : 0;
                zCount = modifierJson.array.z ? modifierJson.array.z : 0;
            }
            
            for (z=0; z<zCount; z++)
                for (x=0; x<xCount; x++) {
                    
                    if (z==0 && x==0)
                        continue;
                    
                    if (maskLength!==null && (x<maskLength[z] && mask[z].charAt(x)=='0'))
                        continue;
                        
                    ret.arrayPos.push({ x: x*xOffset + ( ((z%2)==1) ? xOffset2 : 0.0 ), 
                                        y: 0.0, 
                                        z: z*zOffset + ( ((x%2)==1) ? zOffset2 : 0.0 )
                                      }
                                     ); 
                    ret.arrayCount++;
                }
        }
        
        return ret;
    }
    
    this.updateSceneRecurse = function(sc, sceneNodeParent, builderChildren, inheritedStateModifiers)
    {
        var i, j;
        var builderModel;
        var materialModel;
        var parsedArrayModifier;
        var customModelGenerator = pgl.getPglClasses().getPglCustomModelGenerator();
        
        for (i=0; i<sc.length; i++) {
            var n = sc[i];
            var newNode;
            var realNode;
            var uniqueId;
            
            if (!n.visible)
                continue;
            
            if (isInBuilderMode) {
                uniqueId = currentBuilderId++;
            } else {
                uniqueId = n.id;
            }
            
            // parse state modifiers
            this.parseStateModifiers(n, inheritedStateModifiers);
            
            // parse array modifier
            parsedArrayModifier = this.parseArrayModifier(n, isInBuilderMode);
            for (j=0; j<parsedArrayModifier.arrayCount; j++) {
            
                if (j!=0) {
                    uniqueId = currentArrayModifierObjId++;
                }

                newNode = new J3D.Transform(uniqueId, uniqueId);

                this.getProperGeometryAndPositionForNode(n, newNode, inheritedStateModifiers);
                newNode.scale = new v3(n.scaleX, n.scaleY, n.scaleZ);
                newNode.rotation = new v3(tool.degrees2Radians(n.rotX), tool.degrees2Radians(n.rotY), tool.degrees2Radians(n.rotZ));

                // apply material
                materialModel = materialGenerator.findMaterialModelByName(n.renderer);
                if (materialModel) {
                    newNode.renderer = materialModel.getShader();
                } else {
                    newNode.renderer = J3D.BuiltinShaders.fetch((n.renderer=="Phong") ? "Phong" : "Normal2Color");
                }

                // apply state modifiers
                this.applyStateModifiers(n, newNode, inheritedStateModifiers);


                if (n.active) {
                    sceneNodeParent.add(customModelGenerator.getAxis());
                    newNode.add(customModelGenerator.getAxis());
                }
                
                if (j!=0) {
                    uniqueId = currentArrayModifierObjId++;
                    var newArrayNode = new J3D.Transform(uniqueId, uniqueId);
                    
                    newArrayNode.position.x = parsedArrayModifier.arrayPos[j].x - ( (n.geometry=="Place" || n.geometry=="Cube") ? n.dimX/2.0 : 0.0 );
                    newArrayNode.position.y = parsedArrayModifier.arrayPos[j].y - ( (n.geometry=="Place" || n.geometry=="Cube") ? n.dimY/2.0 : 0.0 );
                    newArrayNode.position.z = parsedArrayModifier.arrayPos[j].z - ( (n.geometry=="Place" || n.geometry=="Cube") ? n.dimZ/2.0 : 0.0 );
                    
                    //console.log('Obiekt Array ['+j+'], '+uniqueId+', posX='+parsedArrayModifier.arrayPos[j].x+', posY='+parsedArrayModifier.arrayPos[j].y+', posZ='+parsedArrayModifier.arrayPos[j].z);
                    
                    newArrayNode.add(newNode);
                    realNode.add(newArrayNode);
                } else {
                    realNode = newNode;
                }

            }
            sceneNodeParent.add(realNode);
            
            
            if (n.children.length>0) {
                // builder nodes are in parent that has ID = 1
                if (isInBuilderMode)
                    inBuilderModeDepth++;
                this.updateSceneRecurse(sc[i].children, newNode, ((n.id==1) ? true : false), inheritedStateModifiers);
                if (isInBuilderMode)
                    inBuilderModeDepth--;
            }
            
            if (builderChildren) {
                // add to generator
                builderModel = modelGenerator.findBuilderModelById(n.id);
                if (builderModel) {
                    builderModel.setNode(n);
                } else {
                    builderModel = new PglBuilderModelModel();
                    builderModel.setId(n.id);
                    builderModel.setNode(n);
                    modelGenerator.addBuilderModel(builderModel);                    
                }
            }
        }
    }
    
    this.updateEntireScene = function(sc)
    {   
        var engine = this.getParent().getEngine();
        var inheritedStateModifiers = new Array();

        if (sceneRoot)
            engine.scene.remove(sceneRoot, true);
        
        sceneRoot = new J3D.Transform('root', 'root');
        
        this.updateSceneRecurse(sc, sceneRoot, false, inheritedStateModifiers);
        engine.scene.add(sceneRoot);
        

    }
    
    
    this.updateSceneOnlyInChangedNodes = function(changedNodesArr)
    {
        var engine = this.getParent().getEngine();
        var inheritedStateModifiers = new Array();
        var i;
        var path;
        var foundSceneObj;
        var foundSceneObjParent;
        
        /*
        console.log(changedNodesArr);       TODO fix update after visibility click
        */
        
        for (i=0; i<changedNodesArr.length; i++) {
            
            path = 'root/'+changedNodesArr[i].nodeIdPathArr.join('/');
            
            foundSceneObj = engine.scene.find(path);
            
            if (foundSceneObj) {
                
                /*
                console.log('path: '+path);
                console.log('obj: ');
                console.log(foundSceneObj);
                */

                foundSceneObjParent = foundSceneObj.parent;
                
                /*
                console.log('parent:');
                console.log(foundSceneObjParent);
                
                console.log(foundSceneObjParent.children);
                
                console.log('wywalono?');
                */
               
                foundSceneObjParent.remove(foundSceneObj)
               
                /*
                console.log('after remove');
                */

                this.updateSceneRecurse(changedNodesArr[i].nodeParsed, foundSceneObjParent, false, inheritedStateModifiers);
            }
            

        }
    }
}