function PglCustomModelGenerator()
{

    this.getAxis = function()
    {
        var axisX, axisY, axisZ;
        var axis = new J3D.Transform('axis', 'axis');
        var len = 100.0;
        var siz = 1.0;
        
        axisX = new J3D.Transform('axisX', 'axisX');
        axisX.geometry = J3D.Primitive.Cube(len, siz, siz);
        axisX.position.x = len*0.5;
        axisX.renderer = J3D.BuiltinShaders.fetch("Normal2Color");

        axisY = new J3D.Transform('axisY', 'axisY');
        axisY.geometry = J3D.Primitive.Cube(siz, len, siz);
        axisY.position.y = len*0.5;
        axisY.renderer = J3D.BuiltinShaders.fetch("Normal2Color");

        axisZ = new J3D.Transform('axisZ', 'axisZ');
        axisZ.geometry = J3D.Primitive.Cube(siz, siz, len);
        axisZ.position.z = len*0.5;
        axisZ.renderer = J3D.BuiltinShaders.fetch("Normal2Color");
        
        axis.add(axisX, axisY, axisZ);
        
        return axis;
    }

    this.buildFaktumCupboard = function(params)
    {
        if (!params) params = {};

        var thickness = params.thickness ? params.thickness : 1.8;
        var width = params.width ? params.width : 80.0;
        var height = params.height ? params.height : 70.0;
        var depth = params.depth ? (params.depth - thickness) : (60.0 - thickness);

        renderer = J3D.BuiltinShaders.fetch("Phong");
        renderer.color = J3D.Color.white;
        renderer.specularIntensity = 0.1;
        renderer.shininess = 0.1;

        base = new J3D.Transform();
        base.position = new v3(0, 0, 0);

        bottom = new J3D.Transform();
        bottom.geometry = J3D.Primitive.Cube(width-2.0*thickness, thickness, depth-0.2);
        bottom.position = new v3( 0.5*(width-2.0*thickness) + thickness, 0.5*thickness, 0.5*(depth-0.2) );

        left = new J3D.Transform();
        left.geometry = J3D.Primitive.Cube(thickness, height, depth);
        left.position = new v3( 0.5*thickness, 0.5*height, 0.5*depth );

        right = new J3D.Transform();
        right.geometry = J3D.Primitive.Cube(thickness, height, depth);
        right.position = new v3( width - 0.5*thickness, 0.5*height, 0.5*depth );

        topBack = new J3D.Transform();
        topBack.geometry = J3D.Primitive.Cube(width-2.0*thickness, thickness, 10.0);
        topBack.position = new v3( 0.5*(width-2.0*thickness) + thickness, height - 0.5*thickness - 0.05, 0.5*10.0 );

        topFront = new J3D.Transform();
        topFront.geometry = J3D.Primitive.Cube(width-2.0*thickness, thickness, 10.0);
        topFront.position = new v3( 0.5*(width-2.0*thickness) + thickness, height - 0.5*thickness - 0.05, depth - 0.5*10.0 - 0.1 );

        base.add(bottom, left, right, topBack, topFront);
        base.recurse(function(t) {
            t.renderer = renderer;
        });

        return base;
    }

}