//#name Szafka
//#description Classic phong shader
//#author bartekd

//#include CommonInclude
varying vec3 refVec;



//#vertex
//#include VertexInclude
varying vec4 vPosition;
varying vec2 vTextureCoord;
varying vec3 vNormal;

void main(void) 
{
    vTextureCoord = getTextureCoord(aTextureCoord);
    vNormal = nMatrix * aVertexNormal;
    vPosition = mMatrix * vec4(aVertexPosition, 1.0);
    gl_Position = pMatrix * vMatrix * vPosition;
    gl_PointSize = 5.0;

    vec3 normal = normalize(nMatrix * aVertexNormal);
    vec3 incident = normalize( (mMatrix * vec4(aVertexPosition, 1.0)).xyz - uEyePosition);
    refVec = reflect(incident, normal);
}



//#fragment
//#include Lights
uniform vec4 color;
uniform sampler2D colorTexture;
//uniform samplerCube uCubemap;
uniform bool hasColorTexture;
uniform float specularIntensity;
uniform float shininess;

varying vec4 vPosition;
varying vec3 vLight;
varying vec2 vTextureCoord;
varying vec3 vNormal;

void main(void) 
{
    //vec4 reflectionColor = textureCube(uCubemap, refVec);

    vec4 tc = color;
    if(hasColorTexture) tc *= texture2D(colorTexture, vTextureCoord);	
    vec3 l = (computeLights(vPosition, vNormal, specularIntensity, shininess) + 0.999) / 1.999;
    gl_FragColor = vec4(tc.rgb * l, tc.a);//*0.95 + reflectionColor*0.05;
}