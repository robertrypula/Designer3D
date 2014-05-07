function PglWindowModel()
{
    var fullScreen = false;
    
    this.getFullScreen = function() { return fullScreen; }
    this.setFullScreen = function(v) { fullScreen = v; }
}