function PglJSEvents()
{
    var _this;
    var cWindow;
    var cJ3D;
    var cSceneTab;
    var cModel;
    
    this.init = function()
    {
        _this = this;
        
        // dissable context menu (on right click)
        //$('#_?_').bind("contextmenu", function(e) { return false; });
        
        this.initShortcuts();
        this.listenToWindowResizeEvent();
        this.listenToMouseEvents();
        this.listenToKeyboardEvents();
        this.listerToEvents();
    }
    
    this.initShortcuts = function()
    {
        // classes shortcuts
        
        // controllers shortcuts
        cWindow = pgl.getPglControllers().getPglWindowController();
        cJ3D = pgl.getPglControllers().getPglJ3DController();
        cSceneTab = pgl.getPglControllers().getPglSceneTabController();
        cModel = pgl.getPglControllers().getPglModelController();
    }
    
    this.eventFilter = function(o)
    {
        if (o.hasClass('inactive') || o.hasClass('invisible'))
            return false; else
            return true;
    }
    
    this.listerToEvents = function()
    {
        // window events
        $('#pgl-button-fullscreen-toggle').click(function() { if (_this.eventFilter($(this))) cWindow.toogleFullScreenClick(); })
        
        // scene
        $('#pgl-button-refresh').click(function() { if (_this.eventFilter($(this))) cSceneTab.refresh() });
        $('#pgl-button-add-new-node').click(function() { if (_this.eventFilter($(this))) cSceneTab.addNewNode() });
        $('#pgl-button-delete-selected-node').click(function() { if (_this.eventFilter($(this))) cSceneTab.deleteSelectedNode() });
        $('#pgl-button-change-selected-node-name').click(function () { if (_this.eventFilter($(this))) cSceneTab.changeSelectedNodeName() });
        $('#pgl-input-change-selected-node-name').keyup(function (e) { if (e.which == 13) cSceneTab.changeSelectedNodeName() });
        $(document).on("click", '#pgl-scene-list a.t-name', function() { if (_this.eventFilter($(this))) cSceneTab.listNodeNameClick($(this).attr('id')); });
        $(document).on("click", '#pgl-scene-list a.t-openclose', function() { if (_this.eventFilter($(this))) cSceneTab.listNodeOpenCloseClick($(this).parent().find('> a.t-name').attr('id')); });
        $(document).on("click", '#pgl-scene-list a.t-visible', function() { if (_this.eventFilter($(this))) cSceneTab.listNodeVisibleClick($(this).closest('li').find('> a.t-name').attr('id')); });
        $(document).on("click", '#pgl-scene-list a.ta-name', function() { if (_this.eventFilter($(this))) cSceneTab.listNodeAttributeNameClick($(this).closest('li').find('> a.t-name').attr('id'), $(this).attr('type')); });
        $(document).on("click", '#pgl-scene-list a.ta-openclose', function() { if (_this.eventFilter($(this))) cSceneTab.listNodeAttributeOpenCloseClick($(this).closest('li').find('> a.t-name').attr('id'), $(this).parent().find('> a.ta-name').attr('type')); });
        $(document).on("change", '#pgl-scene-list input', function() { 
            if (_this.eventFilter($(this))) {
                var idsThatChanged = new Array();
                
                idsThatChanged.push( parseInt($(this).closest('li').find('> a.t-name').attr('uniqueId')) );
                cSceneTab.parseSceneList( idsThatChanged ); 
            }
        });
        $('#pgl-button-deselect').click(function() { if (_this.eventFilter($(this))) cSceneTab.deselectClick(); });
        $('#pgl-button-save-project').click(function() { if (_this.eventFilter($(this))) cSceneTab.saveProjectClick(); });
        $('#pgl-button-load-project').click(function() { if (_this.eventFilter($(this))) cSceneTab.loadProjectClick(); });
        $('#pgl-button-copy-active').click(function() { if (_this.eventFilter($(this))) cSceneTab.copyActiveClick(); });
        $('#pgl-scene-list > ul').nestedSortable({
            handle           : 'a.t-name',
            items            : 'li',
            listType         :  'ul',
            toleranceElement : '> a.t-name',
            stop             : function() {
                                   cSceneTab.parseSceneList(PGL_PARSE_ENTIRE_SCENE);
                               }
        });
        
        // model
        $('#pgl-button-add-current-builder-model-alias').click(function() { if (_this.eventFilter($(this))) cModel.addCurrentBuilderModelAliasClick(); });
        $('#pgl-button-add-current-builder-model-full').click(function() { if (_this.eventFilter($(this))) cModel.addCurrentBuilderModelFullClick(); });
        $(document).on("click", '#pgl-scene-list a.t-builder', function() { if (_this.eventFilter($(this))) cModel.listNodeBuilderClick($(this).closest('li').find('> a.t-name').attr('id')); });
        $('#pgl-button-add-primitive-box').click(function() { if (_this.eventFilter($(this))) cModel.addPrimitiveBoxClick(); });
        $('#pgl-button-add-primitive-sphere').click(function() { if (_this.eventFilter($(this))) cModel.addPrimitiveSphereClick(); });
        $('#pgl-button-add-primitive-plane').click(function() { if (_this.eventFilter($(this))) cModel.addPrimitivePlaneClick(); });
    }
    
    this.windowResize = function()
    {
        cWindow.updateWindowDim();
    }

    this.listenToWindowResizeEvent = function()
    {
        $(window).resize(function () {
            clearTimeout(PGL_WINDOW_RESIZE_TIMER);
            PGL_WINDOW_RESIZE_TIMER = setTimeout('pgl.getPglClasses().getPglJSEvents().windowResize();', PGL_WINDOW_RESIZE_DELAY);
        });
        this.windowResize();
    }

    this.listenToMouseEvents = function()
    {
        var dragStartX = 0;
        var dragStartY = 0;
        var dragLeftStartX = 0;
        var dragLeftStartY = 0;
        var dragRightStartX = 0;
        var dragRightStartY = 0;
        var dragLeft = false;
        var dragRight = false;
        
        $('#pgl-canvas').mouseleave(function() {
            cJ3D.mouseLeave();
        });

        $('#pgl-canvas').mouseover(function() {
            cJ3D.mouseOver();
        });
        
        $('#pgl-canvas').mousemove(function(e) {
            var x = e.pageX - $(this).offset().left;
            var y = e.pageY - $(this).offset().top;
            var deltaX;
            var deltaY;

            cJ3D.mouseMove({_x: x, _y: y});

            if (dragLeft) {
                deltaX = x - dragLeftStartX;
                deltaY = y - dragLeftStartY;

                if (deltaX!=0 || deltaY!=0) {
                    dragLeftStartX = x;
                    dragLeftStartY = y;
                    cJ3D.mouseLeftDrag({_deltaX: deltaX, _deltaY: deltaY});
                }
            }
            if (dragRight) {
                deltaX = x - dragRightStartX;
                deltaY = y - dragRightStartY;

                if (deltaX!=0 || deltaY!=0) {
                    dragRightStartX = x;
                    dragRightStartY = y;
                    cJ3D.mouseRightDrag({_deltaX: deltaX, _deltaY: deltaY});
                }
            }

            e.preventDefault();
        });

        $('#pgl-canvas').mousedown(function(e) {
            var x = e.pageX - $(this).offset().left;
            var y = e.pageY - $(this).offset().top;

            dragStartX = x;
            dragStartY = y;
            switch (e.which) {
                case 1: dragLeft = true;
                        dragLeftStartX = x;
                        dragLeftStartY = y;
                        break;
                case 3: dragRight = true;
                        dragRightStartX = x;
                        dragRightStartY = y;
                        break;
            }

            e.preventDefault();
        });

        $('#pgl-canvas').mouseup(function(e) {
            var x = e.pageX - $(this).offset().left;
            var y = e.pageY - $(this).offset().top;
            var deltaX = x - dragStartX;
            var deltaY = y - dragStartY;

            switch (e.which) {
                case 1: dragLeft = false;
                        if (Math.abs(deltaX)<2 && Math.abs(deltaY)<2) {
                            cJ3D.mouseLeftClick({_x: x, _y: y});
                        }
                        if (Math.abs(deltaX)!=0 || Math.abs(deltaY)!=0) {
                            cJ3D.mouseLeftDragStop({_x: x, _y: y});
                        }
                        break;
                case 3: dragRight = false;
                        if (Math.abs(deltaX)<2 && Math.abs(deltaY)<2) {
                            cJ3D.mouseRightClick({_x: x, _y: y});
                        }
                        if (Math.abs(deltaX)!=0 || Math.abs(deltaY)!=0) {
                            cJ3D.mouseRightDragStop({_x: x, _y: y});
                        }
                        break;
            }

            e.preventDefault();
        });
        
                
        $('#pgl-canvas').mousewheel(function(event, delta, deltaX, deltaY) {
            cJ3D.mousewheel({_deltaX: deltaX, _deltaY: deltaY});
        });
    }

    this.listenToKeyboardEvents = function()
    {
        $(document).keyup(function (e) {
            var code = (e.keyCode ? e.keyCode : e.which);
            
            cJ3D.keyup(code);
        });
        
        $(document).keydown(function (e) {
            var code = (e.keyCode ? e.keyCode : e.which);
            
            cJ3D.keydown(code);
        });
    }
}