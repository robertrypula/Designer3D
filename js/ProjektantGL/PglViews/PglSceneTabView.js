function PglSceneTabView()
{


    this.loadSceneRecurse = function(ul, sceneNode, tool, depth)
    {
        var i;
        var n;
        var t;
        
        for (i in sceneNode) {
            n = sceneNode[i];
            t = $('#pgl-scene-list-element-template > ul > li').clone();
            
            t.find('a.t-name').attr('id', 't-name-'+n.id);
            t.find('a.t-name').attr('uniqueId', n.id);
            t.find('a.t-name > span').html(n.name);
            
            if (n.id==1)
                t.addClass('modelTemplatesNode');
            
            if (n.active)
                t.find('a.t-name').addClass('active');
            if (!n.visible)
                t.find('a.t-visible').removeClass('active');
            if (n.builder)
                t.find('a.t-builder').addClass('active');
            
            var d = t.find('.dimension');
            var p = t.find('.position');
            var r = t.find('.rotation');
            var s = t.find('.scale');
            var mod = t.find('.model');
            var mat = t.find('.material');
            var modif = t.find('.modifier');
            
            d.find('input[name=x]').val( n.dimX );
            d.find('input[name=y]').val( n.dimY );
            d.find('input[name=z]').val( n.dimZ );
            p.find('input[name=x]').val( n.posX );
            p.find('input[name=y]').val( n.posY );
            p.find('input[name=z]').val( n.posZ );
            r.find('input[name=x]').val( n.rotX );
            r.find('input[name=y]').val( n.rotY );
            r.find('input[name=z]').val( n.rotZ );
            s.find('input[name=x]').val( n.scaleX );
            s.find('input[name=y]').val( n.scaleY );
            s.find('input[name=z]').val( n.scaleZ );
            mod.find('input[name=value]').val( n.geometry );
            mat.find('input[name=value]').val( n.renderer );
            modif.find('textarea[name=value]').val( n.modifier );
            
            ul.append(t);
            if (n.children.length>0) {
                this.loadSceneRecurse(t.find('> ul'), n.children, tool, depth+1);
            }
        }
    }
    
    this.updateNodeBuilderInfo = function()
    {
        var currentBuilder = $('#pgl-scene-list').find('a.t-builder.active');
        var currentBulderName;
        
        if (currentBuilder.size()==1) {
            
            currentBulderName = currentBuilder.parent().find('> a.t-name').attr('uniqueId') + '|' + currentBuilder.parent().find('> a.t-name > span').html()
            
            $('#pgl-label-current-builder').find('b').html(currentBulderName);
            $('#pgl-label-current-builder').removeClass('inactive');
        } else {
            $('#pgl-label-current-builder').find('b').html('');
            $('#pgl-label-current-builder').addClass('inactive');
        }
    }
    
    this.deepCopyOfNode = function(node)
    {
        var vViewHelpers = pgl.getPglViews().getPglViewHelpers();
        var nodeCopy = node.clone();
        var maxId = vViewHelpers.findLastNodeId();
        
        maxId++;
        
        nodeCopy.find('a.t-builder').removeClass('active');
        nodeCopy.find('a.t-name').each(function() {
            $(this).attr('id', 't-name-'+maxId);
            $(this).attr('uniqueId', maxId);
            
            maxId++;
        });
        
        nodeCopy.find('> a.t-name > span').html( nodeCopy.find('> a.t-name > span').html() + " kopia" );
        
        return nodeCopy;
    }
    
    // -------------------------------------------------------------------------
    
    this.refresh = function()
    {
        var cSceneTab = pgl.getPglControllers().getPglSceneTabController();
        
        cSceneTab.parseSceneList(PGL_PARSE_ENTIRE_SCENE);
    }
    
    this.addCurrentBuilderModelAliasClick = function()
    {
        var tool = pgl.getPglClasses().getPglTool();
        var cSceneTab = pgl.getPglControllers().getPglSceneTabController();
        var selectedParentLi = $('#pgl-scene-list').find('a.t-name.active').parent();
        var somethingChanged = false;
        var currentBuilderIdName = $('#pgl-label-current-builder > b').html();
        var currentBuilderIdNameArr = tool.explode('|', currentBuilderIdName);
        var currentBuilderId = parseInt(currentBuilderIdNameArr[0]);
        var idsThatChanged = new Array();
        
        if (currentBuilderIdName=='')
            return;
        
        selectedParentLi.each(function() {
            var id = parseInt($(this).find('> a.t-name').attr('uniqueId'));
            var mod = $(this).find('> span.ta-ul:first .model');
            
            if (id!=currentBuilderId) {
                mod.find('input[name=value]').val( currentBuilderIdName );
                
                idsThatChanged.push(id);
                
                somethingChanged = true;
            } else {
                alert('Obiekt źródłowy jest taki sam jak docelowy!');
            }
        });
        
        if (somethingChanged) {
            cSceneTab.parseSceneList(idsThatChanged);
        }
    }
    
    this.addCurrentBuilderModelFullClick = function()
    {
        var cSceneTab = pgl.getPglControllers().getPglSceneTabController();
        var tool = pgl.getPglClasses().getPglTool();
        var selectedParentLi = $('#pgl-scene-list').find('a.t-name.active').parent();
        var somethingChanged = false;
        var currentBuilderIdName = $('#pgl-label-current-builder > b').html();
        var currentBuilderIdNameArr = tool.explode('|', currentBuilderIdName);
        var currentBuilderId = parseInt(currentBuilderIdNameArr[0]);
        var sourceObj;
        var _this = this;
        var idsThatChanged = new Array();
       
        if (currentBuilderIdName=='')
            return;
        
        sourceObj = $('#pgl-scene-list #t-name-'+currentBuilderId).parent();
        
        if (sourceObj.size()!=1) {
            alert('Obiekt źródłowy nie istnieje lub nie został wybrany!');
            return;
        }
        
        selectedParentLi.each(function() {
            var id = parseInt($(this).find('> a.t-name').attr('uniqueId'));
            var ul = $(this).find('> ul');
            
            if (id!=currentBuilderId) {
                var copyNode = _this.deepCopyOfNode(sourceObj);
                
                ul.append(copyNode);
                somethingChanged = true;
                
                idsThatChanged.push(id);
            } else {
                alert('Obiekt źródłowy jest taki sam jak docelowy!');
            }
        });
        
        if (somethingChanged) {
            cSceneTab.parseSceneList(idsThatChanged);
        }
    }
    
    this.copyActiveClick = function()
    {
        var cSceneTab = pgl.getPglControllers().getPglSceneTabController();
        var selectedParentLi = $('#pgl-scene-list').find('a.t-name.active').parent();
        var somethingChanged = false;
        var sourceObj;
        var _this = this;
        var idsThatChanged = new Array();
        
        selectedParentLi.each(function() {
            var id = parseInt($(this).find('> a.t-name').attr('uniqueId'));
            var ul = $(this).parent();
            
            sourceObj = $(this);
            
            if (id!=1) {
                var copyNode = _this.deepCopyOfNode(sourceObj);
                
                ul.append(copyNode);
                somethingChanged = true;
                
                idsThatChanged.push(id);
            } else {
                alert('Nie można kopiować obiektu "Szablony modeli"!');
            }
        });
        
        if (somethingChanged) {
            cSceneTab.parseSceneList(idsThatChanged);
        }
    }
    
    this.saveProject = function()
    {
        var vViewHelper = pgl.getPglViews().getPglViewHelpers();
        var tool = pgl.getPglClasses().getPglTool();
        var parsedScene = new Array();
        var cSceneTab = pgl.getPglControllers().getPglSceneTabController();
        
        vViewHelper.parseSceneRecurse($('#pgl-scene-list > ul'), 0, parsedScene, tool);
        
        cSceneTab.saveProjectParsed({_parsedScene: parsedScene});
    }
    
    this.loadProjectAjaxFinished = function(scene)
    {
        var tool = pgl.getPglClasses().getPglTool();
        var cSceneTab = pgl.getPglControllers().getPglSceneTabController();
        
        $('#pgl-scene-list > ul').html('');

        this.loadSceneRecurse($('#pgl-scene-list > ul'), scene, tool, 0);
        cSceneTab.parseSceneList(PGL_PARSE_ENTIRE_SCENE);
        this.updateNodeBuilderInfo();
    }
    
    this.changeSelectedNodeName = function()
    {
        var newName = $('#pgl-input-change-selected-node-name').val();
        var obj = $('#pgl-scene-list').find('a.t-name.active');

        if (newName!='' && obj.size()>0) {
            obj.find('> span').html(newName);
        }
    }
    
    this.deselect = function()
    {
        var cSceneTab = pgl.getPglControllers().getPglSceneTabController();
        
        $('#pgl-scene-list').find('a.t-name.active').removeClass('active');
        cSceneTab.parseSceneList(PGL_PARSE_ENTIRE_SCENE);
    }
    
    this.deleteSelectedNode = function()
    {
        var cSceneTab = pgl.getPglControllers().getPglSceneTabController();
        var selected = $('#pgl-scene-list').find('a.t-name.active');
        
        if (selected.size()==0)
            return;
        
        selected.parent().remove();
       
        cSceneTab.parseSceneList(PGL_PARSE_ENTIRE_SCENE);
        this.updateNodeBuilderInfo();
    }
    
    this.addNewNode = function()
    {
        var vViewHelpers = pgl.getPglViews().getPglViewHelpers();
        var cSceneTab = pgl.getPglControllers().getPglSceneTabController();
        var t;
        var selectedParentUl = $('#pgl-scene-list').find('a.t-name.active').parent().find('> ul');
        var rootUl = $('#pgl-scene-list > ul');
        var maxId = vViewHelpers.findLastNodeId();
        var idsThatChanged = new Array();
        
        maxId = (maxId==-1) ? 1 : (maxId+1);
        
        if (selectedParentUl.size()==0) {
            t = $('#pgl-scene-list-element-template > ul > li').clone();
            t.find('a.t-name').attr('id', 't-name-'+maxId);
            t.find('a.t-name').attr('uniqueId', maxId);
            rootUl.append(t);
        } else {
            selectedParentUl.each(function() {
                t = $('#pgl-scene-list-element-template > ul > li').clone();
                t.find('a.t-name').attr('id', 't-name-'+maxId);
                t.find('a.t-name').attr('uniqueId', maxId);
                $(this).append(t);
                
                idsThatChanged.push( parseInt($(this).parent().find('> a.t-name').attr('uniqueId')) );
                
                maxId++;
            });
        }
       
        cSceneTab.parseSceneList( (selectedParentUl.size()==0) ? PGL_PARSE_ENTIRE_SCENE : idsThatChanged);
    }
    
    this.listNodeNameClick = function(par)
    {
        var cSceneTab = pgl.getPglControllers().getPglSceneTabController();
        var id = par._id;
        var isShiftPressed = par._isShiftPressed;
        var idsThatChanged = new Array();
        
        $('#pgl-scene-list').find('a.t-name.active').each(function () {
            idsThatChanged.push( parseInt($(this).attr('uniqueId')) );
        });
        
        if (!isShiftPressed)
            $('#pgl-scene-list').find('a.t-name.active').removeClass('active');
        
        $('#'+id).addClass('active');
        $('#pgl-input-change-selected-node-name').val($('#'+id).find('> span').html());
        
        idsThatChanged.push( parseInt($('#'+id).parent().find('> a.t-name').attr('uniqueId')) );
        
        cSceneTab.parseSceneList(idsThatChanged); //cSceneTab.parseSceneList(PGL_PARSE_ENTIRE_SCENE);
    }
    
    this.listNodeVisibleClick = function(par)
    {
        var cSceneTab = pgl.getPglControllers().getPglSceneTabController();
        var id = par._id;
        var idsThatChanged = new Array();
        
        $('#'+id).parent().find('> a.t-visible').toggleClass('active');
        idsThatChanged.push( parseInt($('#'+id).parent().find('> a.t-name').attr('uniqueId')) );
        
        cSceneTab.parseSceneList(idsThatChanged);
    }
        
    this.listNodeBuilderClick = function(par)
    {
        var id = par._id;
        
        $('#pgl-scene-list').find('a.t-builder.active').removeClass('active');
        $('#'+id).parent().find('> a.t-builder').addClass('active');
        
        this.updateNodeBuilderInfo();
    }
    
    this.listNodeOpenCloseClick = function(id)
    {
        if ($('#'+id).parent().hasClass('opened')) {
            $('#'+id).parent().removeClass('opened');
            $('#'+id).parent().find('> ul').slideUp(100);
            $('#'+id).parent().find('> span.ta-ul').slideUp(100);
        } else {
            $('#'+id).parent().addClass('opened');
            $('#'+id).parent().find('> ul').slideDown(100, function () { $(this).css('display', 'block'); });
            $('#'+id).parent().find('> span.ta-ul').slideDown(100, function () { $(this).css('display', 'block'); });
        }
    }
    
    this.listNodeAttributeNameClick = function(id, type)
    {
    }
    
    this.listNodeAttributeOpenCloseClick = function(id, type)
    {
        var nodeAttrObj = $('#'+id).closest('li').find('a.ta-name[type='+type+']');
            
        if (nodeAttrObj.parent().hasClass('opened')) {
            nodeAttrObj.parent().removeClass('opened');
            nodeAttrObj.parent().find('> span.ta-ul').slideUp(100);
        } else {
            nodeAttrObj.parent().addClass('opened');
            nodeAttrObj.parent().find('> span.ta-ul').slideDown(100, function () { $(this).css('display', 'block'); });
        }
    }
    
    this.mousewheel = function(par)
    {
        var mouseHorizontal = Math.floor( par._mouseNormX * 4.0 ) - 2;
        var cSceneTab = pgl.getPglControllers().getPglSceneTabController();
        var selected = $('#pgl-scene-list').find('a.t-name.active');
        var tool = pgl.getPglClasses().getPglTool();
        var divContObj;
        var textarea;
        var idsThatChanged = new Array();
        var somethingChanged = false;
        var modifierJson = '';
        var newVal;
        
        if (selected.size()==0)
            return;
        
        selected.each(function () {

            divContObj = $(this).parent().find('.modifier:first');
            textarea = divContObj.find('textarea[name=value]');

            try {
                modifierJson = JSON.parse(textarea.val());
            } catch(err) {
                modifierJson = null;
            }
            
            
            if (modifierJson && modifierJson.stateVal) {

                newVal = parseFloat( modifierJson.stateVal.val ) + par._deltaY*0.02;
                newVal = newVal<0.0 ? 0.0 : newVal;
                newVal = newVal>1.0 ? 1.0 : newVal;
                modifierJson.stateVal.val = tool.numberFormat(newVal, 2, '.', '');
                
                textarea.val( JSON.stringify(modifierJson) );
                
                somethingChanged = true;
                idsThatChanged.push( parseInt($(this).attr('uniqueId')) );                            
            }
        });

        if (somethingChanged)
            cSceneTab.parseSceneList(idsThatChanged);
    }
    
    this.mouseLeftDrag = function(par)
    {
        var mouseHorizontal = Math.floor( par._mouseNormX * 4.0 ) - 2;
        var delta = par._dragY * Math.pow(10, mouseHorizontal);
        var cSceneTab = pgl.getPglControllers().getPglSceneTabController();
        var selected = $('#pgl-scene-list').find('a.t-name.active');
        var divContObj;
        var inputObj;
        var tool = pgl.getPglClasses().getPglTool();
        var currentVal;
        var idsThatChanged = new Array();
        
        if (selected.size()==0)
            return;
        
        selected.each(function () {

            switch (par._mouseMode) {
                case PGL_MOUSE_MOVE_POSITION  : divContObj = $(this).parent().find('.position:first'); break;
                case PGL_MOUSE_MOVE_ROTATION  : divContObj = $(this).parent().find('.rotation:first'); break;
                case PGL_MOUSE_MOVE_SCALE     : divContObj = $(this).parent().find('.scale:first'); break;
                case PGL_MOUSE_MOVE_DIMENSION : divContObj = $(this).parent().find('.dimension:first'); break;
            }

            switch (par._mouseModeAxis) {
                case PGL_MOUSE_MOVE_AXIS_X: inputObj = divContObj.find('input[name=x]'); break;
                case PGL_MOUSE_MOVE_AXIS_Y: inputObj = divContObj.find('input[name=y]'); break;
                case PGL_MOUSE_MOVE_AXIS_Z: inputObj = divContObj.find('input[name=z]'); break;
            }


            currentVal = tool.customParseFloat(inputObj.val(), 1.0),
            currentVal += delta;

            currentVal = tool.numberFormat(currentVal, 2, '.', '');
            inputObj.val(currentVal);
        
            idsThatChanged.push( parseInt($(this).attr('uniqueId')) );
        
        });

        cSceneTab.parseSceneList(idsThatChanged);
    }
    
    this.addPrimitiveBoxClick = function()
    {
        var cSceneTab = pgl.getPglControllers().getPglSceneTabController();
        var selectedParentLi = $('#pgl-scene-list').find('a.t-name.active').parent();
        var somethingChanged = false;
        var idsThatChanged = new Array();

        selectedParentLi.each(function() {
            var mod = $(this).find('> span.ta-ul:first .model');
            
            mod.find('input[name=value]').val( "Cube" );
            somethingChanged = true;
            
            idsThatChanged.push( parseInt($(this).find('> a.t-name').attr('uniqueId')) );
        });
        
        if (somethingChanged) {
            cSceneTab.parseSceneList(idsThatChanged);
        }
    }
    
    this.addPrimitiveSphereClick = function()
    {
        var cSceneTab = pgl.getPglControllers().getPglSceneTabController();
        var selectedParentLi = $('#pgl-scene-list').find('a.t-name.active').parent();
        var somethingChanged = false;
        var idsThatChanged = new Array();

        selectedParentLi.each(function() {
            var mod = $(this).find('> span.ta-ul:first .model');
            
            mod.find('input[name=value]').val( "Sphere" );
            somethingChanged = true;
            
            idsThatChanged.push( parseInt($(this).find('> a.t-name').attr('uniqueId')) );
        });
        
        if (somethingChanged) {
            cSceneTab.parseSceneList(idsThatChanged);
        }
    }
    
    this.addPrimitivePlaneClick = function()
    {
        var cSceneTab = pgl.getPglControllers().getPglSceneTabController();
        var selectedParentLi = $('#pgl-scene-list').find('a.t-name.active').parent();
        var somethingChanged = false;
        var idsThatChanged = new Array();

        selectedParentLi.each(function() {
            var mod = $(this).find('> span.ta-ul:first .model');
            
            mod.find('input[name=value]').val( "Plane" );
            somethingChanged = true;
            
            idsThatChanged.push( parseInt($(this).find('> a.t-name').attr('uniqueId')) );
        });
        
        if (somethingChanged) {
            cSceneTab.parseSceneList(idsThatChanged);
        }
    }
    
}