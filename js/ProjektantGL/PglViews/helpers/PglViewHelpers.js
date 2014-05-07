function PglViewHelpers()
{
    
    this.findLastNodeId = function()
    {
        var maxId = -1;
        var id;
        
        $('#pgl-scene-list a.t-name').each(function() {
            id = parseInt( $(this).attr('id').toString().replace('t-name-', '') );
            
            if (id>maxId)
                maxId = id;
        });
        return maxId;
    }
    
    this.updateObjectBoxInfo = function()
    {
        var tool = pgl.getPglClasses().getPglTool();
        var divName = $('#pgl-obiect-info-box > div.name > span.v');
        var divDimX = $('#pgl-obiect-info-box > div.dimension > span.x');
        var divDimY = $('#pgl-obiect-info-box > div.dimension > span.y');
        var divDimZ = $('#pgl-obiect-info-box > div.dimension > span.z');
        var divPosX = $('#pgl-obiect-info-box > div.position > span.x');
        var divPosY = $('#pgl-obiect-info-box > div.position > span.y');
        var divPosZ = $('#pgl-obiect-info-box > div.position > span.z');
        var divRotX = $('#pgl-obiect-info-box > div.rotation > span.x');
        var divRotY = $('#pgl-obiect-info-box > div.rotation > span.y');
        var divRotZ = $('#pgl-obiect-info-box > div.rotation > span.z');
        var divScaleX = $('#pgl-obiect-info-box > div.scale > span.x');
        var divScaleY = $('#pgl-obiect-info-box > div.scale > span.y');
        var divScaleZ = $('#pgl-obiect-info-box > div.scale > span.z');
        var divModel = $('#pgl-obiect-info-box > div.model > span.v');
        var divMaterial = $('#pgl-obiect-info-box > div.material > span.v');
        
        var selectedSceneNodes = $('#pgl-scene-list').find('a.t-name.active').parent();
        
               
        if (selectedSceneNodes.size()==1) {
            var parsedNode = this.parseSceneNode(selectedSceneNodes, tool);
     
            divName.html( parsedNode.name );
            divDimX.html( parsedNode.dimX );
            divDimY.html( parsedNode.dimY );
            divDimZ.html( parsedNode.dimZ );
            divPosX.html( parsedNode.posX );
            divPosY.html( parsedNode.posY );
            divPosZ.html( parsedNode.posZ );
            divRotX.html( parsedNode.rotX );
            divRotY.html( parsedNode.rotY );
            divRotZ.html( parsedNode.rotZ );
            divScaleX.html( parsedNode.scaleX );
            divScaleY.html( parsedNode.scaleY );
            divScaleZ.html( parsedNode.scaleZ );
            divModel.html( parsedNode.geometry );
            divMaterial.html( parsedNode.renderer );
            
            $('#pgl-obiect-info-box').removeClass('inactive');
        } else {
            $('#pgl-obiect-info-box').addClass('inactive');
        }
    }
    
    this.parseSceneNode = function(jQueryObj, tool)
    {
        var node;
        var d = jQueryObj.find('.dimension');
        var p = jQueryObj.find('.position');
        var r = jQueryObj.find('.rotation');
        var s = jQueryObj.find('.scale');
        var mod = jQueryObj.find('.model');
        var mat = jQueryObj.find('.material');
        var modif = jQueryObj.find('.modifier');

        node = { id        : parseInt( jQueryObj.find('> a.t-name').attr('uniqueId') ),
                 name      : jQueryObj.find('> a.t-name > span').html(),
                 active    : jQueryObj.find('> a.t-name').hasClass('active'),
                 visible   : jQueryObj.find('> a.t-visible').hasClass('active'),
                 builder   : jQueryObj.find('> a.t-builder').hasClass('active'),
                 dimX      : tool.customParseFloat(d.find('input[name=x]').val(), 1.0),
                 dimY      : tool.customParseFloat(d.find('input[name=y]').val(), 1.0),
                 dimZ      : tool.customParseFloat(d.find('input[name=z]').val(), 1.0),
                 posX      : tool.customParseFloat(p.find('input[name=x]').val(), 0.0),
                 posY      : tool.customParseFloat(p.find('input[name=y]').val(), 0.0),
                 posZ      : tool.customParseFloat(p.find('input[name=z]').val(), 0.0),
                 rotX      : tool.customParseFloat(r.find('input[name=x]').val(), 0.0),
                 rotY      : tool.customParseFloat(r.find('input[name=y]').val(), 0.0),
                 rotZ      : tool.customParseFloat(r.find('input[name=z]').val(), 0.0),
                 scaleX    : tool.customParseFloat(s.find('input[name=x]').val(), 1.0),
                 scaleY    : tool.customParseFloat(s.find('input[name=y]').val(), 1.0),
                 scaleZ    : tool.customParseFloat(s.find('input[name=z]').val(), 1.0),
                 geometry  : mod.find('input[name=value]').val(),
                 renderer  : mat.find('input[name=value]').val(),
                 modifier  : modif.find('textarea[name=value]').val(),
                 children  : new Array()
               };
               
        return node;
    }

    this.parseSceneRecurse = function(jQueryUlObj, depth, parsedSceneParent, tool)
    {
        var _this = this;
        
        jQueryUlObj.find('> li').each(function () {
            var node;

            node = _this.parseSceneNode($(this), tool);
            parsedSceneParent.push(node);

            if ($(this).find('> ul').size()>0) {
                _this.parseSceneRecurse($(this).find('> ul'), depth+1, node.children, tool);
            }
        });
    }
    
    this.parseSceneRecurseLiStartingPoint = function(jQueryLiObj, depth, parsedSceneParent, tool)
    {
        var _this = this;        
        var node;

        node = _this.parseSceneNode(jQueryLiObj, tool);
        parsedSceneParent.push(node);

        if (jQueryLiObj.find('> ul').size()>0) {
            _this.parseSceneRecurse(jQueryLiObj.find('> ul'), depth+1, node.children, tool);
        }
    }
    
    this.recurseGetIdsToRoot = function(jQueryNode, nodeIdPathArr)
    {
        if (jQueryNode.parent().parent().parent().attr('id')!="pgl-scene-list") {
            this.recurseGetIdsToRoot(jQueryNode.parent().parent().parent().find('> a.t-name'), nodeIdPathArr);
        }
        nodeIdPathArr.push( parseInt(jQueryNode.attr('uniqueId')) );
    }

    this.parseSceneList = function(ids)
    {
        var tool = pgl.getPglClasses().getPglTool();
        var cSceneTab = pgl.getPglControllers().getPglSceneTabController();
        var i;
        

        if (ids===PGL_PARSE_ENTIRE_SCENE) {
            var parsedScene = new Array();
            
            this.parseSceneRecurse($('#pgl-scene-list > ul'), 0, parsedScene, tool);
            this.updateObjectBoxInfo();
            cSceneTab.updateEntireScene({_parsedScene: parsedScene});            
            
        } else {
            var changedNodesArr = new Array();
            var jQueryNode;
            
            ids = tool.array_unique(ids);
            for (i in ids) {
//                console.log($('#t-name-'+ids[i])[0]);
                
                jQueryNode = $('#t-name-'+ids[i]);
                if (jQueryNode.size()==1) {
                    var nodeParsed = new Array();
                    var nodeIdPathArr = new Array();
                    
                    this.parseSceneRecurseLiStartingPoint(jQueryNode.parent(), 0, nodeParsed, tool);
                    this.recurseGetIdsToRoot(jQueryNode, nodeIdPathArr);
                    
//                    console.log(nodeIdPathArr);
//                    console.log(nodeParsed);

                    changedNodesArr.push({nodeIdPathArr: nodeIdPathArr, nodeParsed: nodeParsed});
                }
            }
            
            
            this.updateObjectBoxInfo();
            cSceneTab.updateSceneOnlyInChangedNodes({_changedNodesArr: changedNodesArr});
        }
    }

}