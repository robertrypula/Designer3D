function PglMaterialGeneratorModel()
{
    var materialModel = new Array();
    var _this = this;
    
    
    this.materials = function(nr, mode, assetsLoader, assets)
    {
        var tool = pgl.getPglClasses().getPglTool();
        var tmpMat;
        var tmpShader;
        
        switch (nr*100 + mode) {
            // ----------------------------------
            //          PlytaIndukcyjna
            case 0:     assetsLoader.addShader("PlytaIndukcyjna", "_shaders/PlytaIndukcyjna.glsl");
                        assetsLoader.addTexture("PlytaIndukcyjna_tex", "_textures/plytaIndukcyjna.jpg");
                        break;
            case 1:     tmpMat = new PglMaterialModel();
                        tmpShader = assets.PlytaIndukcyjna;

                        tmpShader.color = new J3D.Color(1.0, 1.0, 1.0, 1.0);
                        tmpShader.colorTexture = assets.PlytaIndukcyjna_tex;
                        tmpShader.hasColorTexture = true;
                        tmpShader.specularIntensity = 1.0;
                        tmpShader.shininess = 50.0;

                        tmpMat.setShader(tmpShader);
                        tmpMat.setName("PlytaIndukcyjna");
                        _this.addMaterialModel( tmpMat );
                        break;
            // ----------------------------------
            case 100:   // Blat
                        assetsLoader.addShader("Blat", "_shaders/Blat.glsl");
                        assetsLoader.addTexture("Blat_tex", "_textures/blat-kuchenny_stonowany.jpg");
                        break;
            case 101:   tmpMat = new PglMaterialModel();
                        tmpShader = assets.Blat;

                        tmpShader.color = new J3D.Color(1.0, 1.0, 1.0, 1.0);
                        tmpShader.colorTexture = assets.Blat_tex;
                        tmpShader.hasColorTexture = true;
                        tmpShader.specularIntensity = 1.1;
                        tmpShader.shininess = 1.1;

                        tmpMat.setShader(tmpShader);
                        tmpMat.setName("Blat");
                        _this.addMaterialModel( tmpMat );
                        break;
            // ----------------------------------
            case 200:   // ScianaKuchnia
                        assetsLoader.addShader("ScianaKuchnia", "_shaders/ScianaKuchnia.glsl");
                        //assetsLoader.addTexture("ScianaKuchnia_tex", "_textures/blat.jpg");
                        break;
            case 201:   tmpMat = new PglMaterialModel();
                        tmpShader = assets.ScianaKuchnia;

                        tmpShader.color = new J3D.Color(255.0/255.0, 230.0/255.0, 183.0/255.0, 1.0); 
                        //tmpShader.colorTexture = assets.ScianaKuchnia_tex;
                        tmpShader.hasColorTexture = false;
                        //tmpShader.specularIntensity = 1.1;
                        //tmpShader.shininess = 1.1;

                        tmpMat.setShader(tmpShader);
                        tmpMat.setName("ScianaKuchnia");
                        _this.addMaterialModel( tmpMat );
                        break;
            // ----------------------------------
            case 300:   // Front
                        assetsLoader.addShader("Front", "_shaders/Front.glsl");
                        //assetsLoader.addTexture("Front_tex", "_textures/blat.jpg");
                        assetsLoader.addCubemap("Front_cubemap", {
                            left  : "_textures/FrontCubeMap.jpg",
                            right : "_textures/FrontCubeMap.jpg",
                            up    : "_textures/FrontCubeMap.jpg",
                            down  : "_textures/FrontCubeMap.jpg",
                            back  : "_textures/FrontCubeMap.jpg",
                            front : "_textures/FrontCubeMap.jpg"
                        });
                        break;
            case 301:   tmpMat = new PglMaterialModel();
                        tmpShader = assets.Front;

                        tmpShader.color = new J3D.Color(1.0, 1.0, 1.0, 1.0);
                        //tmpShader.colorTexture = assets.Blat_tex;
                        tmpShader.uCubemap = assets.Front_cubemap;
                        tmpShader.hasColorTexture = false;
                        tmpShader.specularIntensity = 1.1;
                        tmpShader.shininess = 1.1;

                        tmpMat.setShader(tmpShader);
                        tmpMat.setName("Front");
                        _this.addMaterialModel( tmpMat );
                        break;
            // ----------------------------------
            case 400:   // Front Zielony
                        assetsLoader.addShader("FrontZielony", "_shaders/FrontZielony.glsl");
                        //assetsLoader.addTexture("Front_tex", "_textures/blat.jpg");
                        assetsLoader.addCubemap("FrontZielony_cubemap", {
                            left  : "_textures/FrontCubeMap.jpg",
                            right : "_textures/FrontCubeMap.jpg",
                            up    : "_textures/FrontCubeMap.jpg",
                            down  : "_textures/FrontCubeMap.jpg",
                            back  : "_textures/FrontCubeMap.jpg",
                            front : "_textures/FrontCubeMap.jpg"
                        });
                        break;
            case 401:   tmpMat = new PglMaterialModel();
                        tmpShader = assets.FrontZielony;

                        tmpShader.color = tool.getJ3DColorFromHex('#626928');   //new J3D.Color(87.0/255.0, 93.0/255.0, 38.0/255.0, 1.0);  
                        //tmpShader.colorTexture = assets.Blat_tex;
                        tmpShader.uCubemap = assets.FrontZielony_cubemap;
                        tmpShader.hasColorTexture = false;
                        tmpShader.specularIntensity = 1.1;
                        tmpShader.shininess = 1.1;

                        tmpMat.setShader(tmpShader);
                        tmpMat.setName("FrontZielony");
                        _this.addMaterialModel( tmpMat );
                        break;
            // ----------------------------------
            case 500:   // Szafka
                        assetsLoader.addShader("Szafka", "_shaders/Szafka.glsl");
                        //assetsLoader.addTexture("Szafka_tex", "_textures/blat.jpg");
//                        assetsLoader.addCubemap("Szafka_cubemap", {
//                            left  : "_textures/cubeMap.jpg",
//                            right : "_textures/cubeMap.jpg",
//                            up    : "_textures/cubeMap.jpg",
//                            down  : "_textures/cubeMap.jpg",
//                            back  : "_textures/cubeMap.jpg",
//                            front : "_textures/cubeMap.jpg"
//                        });
                        break;
            case 501:   tmpMat = new PglMaterialModel();
                        tmpShader = assets.Szafka;

                        tmpShader.color = new J3D.Color(1.0, 1.0, 1.0, 1.0);
                        //tmpShader.colorTexture = assets.Blat_tex;
                        //tmpShader.uCubemap = assets.Szafka_cubemap;
                        tmpShader.hasColorTexture = false;
                        tmpShader.specularIntensity = 1.1;
                        tmpShader.shininess = 1.1;

                        tmpMat.setShader(tmpShader);
                        tmpMat.setName("Szafka");
                        _this.addMaterialModel( tmpMat );
                        break;
            // ----------------------------------
            case 600:   // Piekarnik
                        assetsLoader.addShader("Piekarnik", "_shaders/Piekarnik.glsl");
                        assetsLoader.addTexture("Piekarnik_tex", "_textures/piekarnik.jpg");
                        break;
            case 601:   tmpMat = new PglMaterialModel();
                        tmpShader = assets.Piekarnik;

                        tmpShader.color = new J3D.Color(1.0, 1.0, 1.0, 1.0);
                        tmpShader.colorTexture = assets.Piekarnik_tex;
                        tmpShader.hasColorTexture = true;
                        tmpShader.specularIntensity = 1.1;
                        tmpShader.shininess = 1.1;

                        tmpMat.setShader(tmpShader);
                        tmpMat.setName("Piekarnik");
                        _this.addMaterialModel( tmpMat );
                        break;
            // ----------------------------------
            case 700:   // Okap
                        assetsLoader.addShader("Okap", "_shaders/Okap.glsl");
                        assetsLoader.addCubemap("Okap_cubemap", {
                            left  : "_textures/ChromCubeMap.jpg",
                            right : "_textures/ChromCubeMap.jpg",
                            up    : "_textures/ChromCubeMap.jpg",
                            down  : "_textures/ChromCubeMap.jpg",
                            back  : "_textures/ChromCubeMap.jpg",
                            front : "_textures/ChromCubeMap.jpg"
                        });
                        break;
            case 701:   tmpMat = new PglMaterialModel();
                        tmpShader = assets.Okap;

                        tmpShader.color = new J3D.Color(0.6, 0.6, 0.6, 1.0);
                        tmpShader.uCubemap = assets.Okap_cubemap;
                        tmpShader.hasColorTexture = false;
                        tmpShader.specularIntensity = 1.1;
                        tmpShader.shininess = 1.1;

                        tmpMat.setShader(tmpShader);
                        tmpMat.setName("Okap");
                        _this.addMaterialModel( tmpMat );
                        break;
            // ----------------------------------
            case 800:   // Chrom
                        assetsLoader.addShader("Chrom", "_shaders/Chrom.glsl");
                        //assetsLoader.addTexture("Okap_tex", "_textures/okap.jpg");
                        assetsLoader.addCubemap("Chrom_cubemap", {
                            left  : "_textures/ChromCubeMap.jpg",
                            right : "_textures/ChromCubeMap.jpg",
                            up    : "_textures/ChromCubeMap.jpg",
                            down  : "_textures/ChromCubeMap.jpg",
                            back  : "_textures/ChromCubeMap.jpg",
                            front : "_textures/ChromCubeMap.jpg"
                        });
                        break;
            case 801:   tmpMat = new PglMaterialModel();
                        tmpShader = assets.Chrom;

                        tmpShader.color = new J3D.Color(0.4, 0.4, 0.4, 1.0);
                        //tmpShader.colorTexture = assets.Chrom_tex;
                        tmpShader.uCubemap = assets.Chrom_cubemap;
                        tmpShader.hasColorTexture = false;
                        tmpShader.specularIntensity = 1.1;
                        tmpShader.shininess = 1.1;

                        tmpMat.setShader(tmpShader);
                        tmpMat.setName("Chrom");
                        _this.addMaterialModel( tmpMat );
                        break;
            // ----------------------------------
            case 900:   // ChropowatyMetal
                        assetsLoader.addShader("ChropowatyMetal", "_shaders/Okap.glsl");
                        assetsLoader.addCubemap("ChropowatyMetal_cubemap", {
                            left  : "_textures/ChromCubeMap.jpg",
                            right : "_textures/ChromCubeMap.jpg",
                            up    : "_textures/ChromCubeMap.jpg",
                            down  : "_textures/ChromCubeMap.jpg",
                            back  : "_textures/ChromCubeMap.jpg",
                            front : "_textures/ChromCubeMap.jpg"
                        });
                        break;
            case 901:   tmpMat = new PglMaterialModel();
                        tmpShader = assets.ChropowatyMetal;

                        tmpShader.color = new J3D.Color(0.6, 0.6, 0.6, 1.0);
                        tmpShader.uCubemap = assets.ChropowatyMetal_cubemap;
                        tmpShader.hasColorTexture = false;
                        tmpShader.specularIntensity = 1.1;
                        tmpShader.shininess = 1.1;

                        tmpMat.setShader(tmpShader);
                        tmpMat.setName("ChropowatyMetal");
                        _this.addMaterialModel( tmpMat );
                        break;
            // ----------------------------------
            case 1000:  // Cokolek
                        assetsLoader.addShader("Cokolek", "_shaders/Cokolek.glsl");
                        //assetsLoader.addTexture("Front_tex", "_textures/blat.jpg");
                        assetsLoader.addCubemap("Cokolek_cubemap", {
                            left  : "_textures/FrontCubeMap.jpg",
                            right : "_textures/FrontCubeMap.jpg",
                            up    : "_textures/FrontCubeMap.jpg",
                            down  : "_textures/FrontCubeMap.jpg",
                            back  : "_textures/FrontCubeMap.jpg",
                            front : "_textures/FrontCubeMap.jpg"
                        });
                        break;
            case 1001:  tmpMat = new PglMaterialModel();
                        tmpShader = assets.Cokolek;

                        tmpShader.color = tool.getJ3DColorFromHex('#ececec');
                        //tmpShader.colorTexture = assets.Blat_tex;
                        tmpShader.uCubemap = assets.Cokolek_cubemap;
                        tmpShader.hasColorTexture = false;
                        tmpShader.specularIntensity = 1.1;
                        tmpShader.shininess = 1.1;

                        tmpMat.setShader(tmpShader);
                        tmpMat.setName("Cokolek");
                        _this.addMaterialModel( tmpMat );
                        break;
            // ----------------------------------
            case 1100:  // PaneleScienne
                        assetsLoader.addShader("PaneleScienne", "_shaders/PaneleScienne.glsl");
                        assetsLoader.addTexture("PaneleScienne_tex", "_textures/paneleScienne2.jpg");
                        //assetsLoader.addTexture("PaneleScienne_NM", "_textures/paneleScienne_NM.jpg");
                        break;
            case 1101:  tmpMat = new PglMaterialModel();
                        tmpShader = assets.PaneleScienne;

                        tmpShader.color = new J3D.Color(1.0, 1.0, 1.0, 1.0);
                        tmpShader.colorTexture = assets.PaneleScienne_tex;
                        //tmpShader.normalTexture = assets.PaneleScienne_NM;
                        tmpShader.hasColorTexture = true;
                        tmpShader.specularIntensity = 1.1;
                        tmpShader.shininess = 1.1;

                        tmpMat.setShader(tmpShader);
                        tmpMat.setName("PaneleScienne");
                        _this.addMaterialModel( tmpMat );
                       
                        break;
            // ----------------------------------
            case 1200:  // KafelkiPodlogoweKuchnia
                        assetsLoader.addShader("KafelkiPodlogoweKuchnia", "_shaders/KafelkiPodlogoweKuchnia.glsl");
                        assetsLoader.addTexture("KafelkiPodlogoweKuchnia_tex", "_textures/KafelkiPodlogoweKuchnia.png");
                        assetsLoader.addTexture("KafelkiPodlogoweKuchnia_NM", "_textures/KafelkiPodlogoweKuchnia_NM.png");
                        break;
            case 1201:  tmpMat = new PglMaterialModel();
                        tmpShader = assets.KafelkiPodlogoweKuchnia;

                        tmpShader.color = new J3D.Color(1.0, 1.0, 1.0, 1.0);
                        tmpShader.colorTexture = assets.KafelkiPodlogoweKuchnia_tex;
                        tmpShader.normalTexture = assets.KafelkiPodlogoweKuchnia_NM;
                        tmpShader.hasColorTexture = true;
                        tmpShader.specularIntensity = 1.7;
                        tmpShader.shininess = 0.4;

                        tmpMat.setShader(tmpShader);
                        tmpMat.setName("KafelkiPodlogoweKuchnia");
                        _this.addMaterialModel( tmpMat );
                       
                        break;
            // ----------------------------------
            case 1300:  // PanelePodlogowe
                        assetsLoader.addShader("PanelePodlogowe", "_shaders/PanelePodlogowe.glsl");
                        assetsLoader.addTexture("PanelePodlogowe_tex", "_textures/PanelePodlogowe.png");
                        //assetsLoader.addTexture("PanelePodlogowe_NM", "_textures/PanelePodlogowe_NM.png");
                        break;
            case 1301:  tmpMat = new PglMaterialModel();
                        tmpShader = assets.PanelePodlogowe;

                        tmpShader.color = new J3D.Color(1.0, 1.0, 1.0, 1.0);
                        tmpShader.colorTexture = assets.PanelePodlogowe_tex;
                        //tmpShader.normalTexture = assets.PanelePodlogowe_NM;
                        tmpShader.hasColorTexture = true;
                        tmpShader.specularIntensity = 0.5;
                        tmpShader.shininess = 0.4;

                        tmpMat.setShader(tmpShader);
                        tmpMat.setName("PanelePodlogowe");
                        _this.addMaterialModel( tmpMat );
                       
                        break;
            // ----------------------------------
            case 1400:  // Kanapa
                        assetsLoader.addShader("Kanapa", "_shaders/Kanapa.glsl");
                        assetsLoader.addTexture("Kanapa_tex", "_textures/Kanapa.png");
                        //assetsLoader.addTexture("PanelePodlogowe_NM", "_textures/PanelePodlogowe_NM.png");
                        break;
            case 1401:  tmpMat = new PglMaterialModel();
                        tmpShader = assets.Kanapa;

                        tmpShader.color = new J3D.Color(1.0, 1.0, 1.0, 1.0);
                        tmpShader.colorTexture = assets.Kanapa_tex;
                        //tmpShader.normalTexture = assets.PanelePodlogowe_NM;
                        tmpShader.hasColorTexture = true;
                        tmpShader.specularIntensity = 0.5;
                        tmpShader.shininess = 0.4;

                        tmpMat.setShader(tmpShader);
                        tmpMat.setName("Kanapa");
                        _this.addMaterialModel( tmpMat );
                       
                        break;
            // ----------------------------------
            case 1500:  // FrontRama
                        assetsLoader.addShader("FrontRama", "_shaders/FrontRama.glsl");
                        //assetsLoader.addTexture("FrontRama_tex", "_textures/FrontRama.png");
                        //assetsLoader.addTexture("PanelePodlogowe_NM", "_textures/PanelePodlogowe_NM.png");
                        break;
            case 1501:  tmpMat = new PglMaterialModel();
                        tmpShader = assets.FrontRama;

                        tmpShader.color = new J3D.Color(1.0, 1.0, 1.0, 1.0);
                        //tmpShader.colorTexture = assets.FrontRama_tex;
                        //tmpShader.normalTexture = assets.PanelePodlogowe_NM;
                        tmpShader.hasColorTexture = false;
                        tmpShader.specularIntensity = 0.5;
                        tmpShader.shininess = 0.4;

                        tmpMat.setShader(tmpShader);
                        tmpMat.setName("FrontRama");
                        _this.addMaterialModel( tmpMat );
                       
                        break;
            // ----------------------------------
            case 1600:  // FrontSzyba
                        assetsLoader.addShader("FrontSzyba", "_shaders/FrontSzyba.glsl");
                        //assetsLoader.addTexture("FrontSzyba_tex", "_textures/FrontSzyba.png");
                        //assetsLoader.addTexture("PanelePodlogowe_NM", "_textures/PanelePodlogowe_NM.png");
                        break;
            case 1601:  tmpMat = new PglMaterialModel();
                        tmpShader = assets.FrontSzyba;

                        tmpShader.color = new J3D.Color(0.86, 0.86, 0.86, 1.0);
                        //tmpShader.colorTexture = assets.FrontRama_tex;
                        //tmpShader.normalTexture = assets.PanelePodlogowe_NM;
                        tmpShader.hasColorTexture = false;
                        tmpShader.specularIntensity = 0.5;
                        tmpShader.shininess = 0.4;

                        tmpMat.setShader(tmpShader);
                        tmpMat.setName("FrontSzyba");
                        _this.addMaterialModel( tmpMat );
                       
                        break;
            // ----------------------------------
            case 1700:  // KafelkiPodlogoweKuchniaFugi
                        assetsLoader.addShader("KafelkiPodlogoweKuchniaFugi", "_shaders/KafelkiPodlogoweKuchniaFugi.glsl");
                        //assetsLoader.addTexture("FrontSzyba_tex", "_textures/FrontSzyba.png");
                        //assetsLoader.addTexture("PanelePodlogowe_NM", "_textures/PanelePodlogowe_NM.png");
                        break;
            case 1701:  tmpMat = new PglMaterialModel();
                        tmpShader = assets.KafelkiPodlogoweKuchniaFugi;

                        tmpShader.color = new J3D.Color(0.26, 0.26, 0.26, 1.0);
                        //tmpShader.colorTexture = assets.FrontRama_tex;
                        //tmpShader.normalTexture = assets.PanelePodlogowe_NM;
                        tmpShader.hasColorTexture = false;
                        tmpShader.specularIntensity = 0.5;
                        tmpShader.shininess = 0.4;

                        tmpMat.setShader(tmpShader);
                        tmpMat.setName("KafelkiPodlogoweKuchniaFugi");
                        _this.addMaterialModel( tmpMat );
                       
                        break;
            // ----------------------------------
            case 1800:  // ScianaSalon
                        assetsLoader.addShader("ScianaSalon", "_shaders/ScianaSalon.glsl");
                        //assetsLoader.addTexture("ScianaKuchnia_tex", "_textures/blat.jpg");
                        break;
            case 1801:  tmpMat = new PglMaterialModel();
                        tmpShader = assets.ScianaSalon;

                        tmpShader.color = tool.getJ3DColorFromHex('#fff1da');
                        //tmpShader.colorTexture = assets.ScianaKuchnia_tex;
                        tmpShader.hasColorTexture = false;
                        tmpShader.specularIntensity = 0.0;
                        tmpShader.shininess = 0.0;

                        tmpMat.setShader(tmpShader);
                        tmpMat.setName("ScianaSalon");
                        _this.addMaterialModel( tmpMat );
                        break;
            // ----------------------------------
            case 1900:  // ScianaPrzedpokoj
                        assetsLoader.addShader("ScianaPrzedpokoj", "_shaders/ScianaPrzedpokoj.glsl");
                        //assetsLoader.addTexture("ScianaKuchnia_tex", "_textures/blat.jpg");
                        break;
            case 1901:  tmpMat = new PglMaterialModel();
                        tmpShader = assets.ScianaPrzedpokoj;

                        tmpShader.color = tool.getJ3DColorFromHex('#d2ffa2');
                        //tmpShader.colorTexture = assets.ScianaKuchnia_tex;
                        tmpShader.hasColorTexture = false;
                        tmpShader.specularIntensity = 0.0;
                        tmpShader.shininess = 0.0;

                        tmpMat.setShader(tmpShader);
                        tmpMat.setName("ScianaPrzedpokoj");
                        _this.addMaterialModel( tmpMat );
                        break;
            // ----------------------------------
            case 2000:  // ParadyzBrown
                        assetsLoader.addShader("ParadyzBrown", "_shaders/ParadyzBrown.glsl");
                        assetsLoader.addTexture("ParadyzBrown_tex", "_textures/ParadyzBrown.jpg");
                        assetsLoader.addCubemap("ParadyzBrown_cubemap", {
                            left  : "_textures/FrontCubeMap.jpg",
                            right : "_textures/FrontCubeMap.jpg",
                            up    : "_textures/FrontCubeMap.jpg",
                            down  : "_textures/FrontCubeMap.jpg",
                            back  : "_textures/FrontCubeMap.jpg",
                            front : "_textures/FrontCubeMap.jpg"
                        });
                        break;
            case 2001:  tmpMat = new PglMaterialModel();
                        tmpShader = assets.ParadyzBrown;

                        tmpShader.color = tool.getJ3DColorFromHex('#ffffff');   //new J3D.Color(87.0/255.0, 93.0/255.0, 38.0/255.0, 1.0);  
                        tmpShader.colorTexture = assets.ParadyzBrown_tex;
                        tmpShader.uCubemap = assets.ParadyzBrown_cubemap;
                        tmpShader.hasColorTexture = true;
                        tmpShader.specularIntensity = 1.1;
                        tmpShader.shininess = 1.1;

                        tmpMat.setShader(tmpShader);
                        tmpMat.setName("ParadyzBrown");
                        _this.addMaterialModel( tmpMat );
                        break;
            // ----------------------------------
            case 2100:  // ParadyzDekorA
                        assetsLoader.addShader("ParadyzDekorA", "_shaders/ParadyzDekorA.glsl");
                        assetsLoader.addTexture("ParadyzDekorA_tex", "_textures/ParadyzDekorA.jpg");
                        assetsLoader.addCubemap("ParadyzDekorA_cubemap", {
                            left  : "_textures/FrontCubeMap.jpg",
                            right : "_textures/FrontCubeMap.jpg",
                            up    : "_textures/FrontCubeMap.jpg",
                            down  : "_textures/FrontCubeMap.jpg",
                            back  : "_textures/FrontCubeMap.jpg",
                            front : "_textures/FrontCubeMap.jpg"
                        });
                        break;
            case 2101:  tmpMat = new PglMaterialModel();
                        tmpShader = assets.ParadyzDekorA;

                        tmpShader.color = tool.getJ3DColorFromHex('#ffffff');   //new J3D.Color(87.0/255.0, 93.0/255.0, 38.0/255.0, 1.0);  
                        tmpShader.colorTexture = assets.ParadyzDekorA_tex;
                        tmpShader.uCubemap = assets.ParadyzDekorA_cubemap;
                        tmpShader.hasColorTexture = true;
                        tmpShader.specularIntensity = 1.1;
                        tmpShader.shininess = 1.1;

                        tmpMat.setShader(tmpShader);
                        tmpMat.setName("ParadyzDekorA");
                        _this.addMaterialModel( tmpMat );
                        break;
            // ----------------------------------
            case 2200:  // ParadyzDekorB
                        assetsLoader.addShader("ParadyzDekorB", "_shaders/ParadyzDekorB.glsl");
                        assetsLoader.addTexture("ParadyzDekorB_tex", "_textures/ParadyzDekorB.jpg");
                        assetsLoader.addCubemap("ParadyzDekorB_cubemap", {
                            left  : "_textures/FrontCubeMap.jpg",
                            right : "_textures/FrontCubeMap.jpg",
                            up    : "_textures/FrontCubeMap.jpg",
                            down  : "_textures/FrontCubeMap.jpg",
                            back  : "_textures/FrontCubeMap.jpg",
                            front : "_textures/FrontCubeMap.jpg"
                        });
                        break;
            case 2201:  tmpMat = new PglMaterialModel();
                        tmpShader = assets.ParadyzDekorB;

                        tmpShader.color = tool.getJ3DColorFromHex('#ffffff');   //new J3D.Color(87.0/255.0, 93.0/255.0, 38.0/255.0, 1.0);  
                        tmpShader.colorTexture = assets.ParadyzDekorB_tex;
                        tmpShader.uCubemap = assets.ParadyzDekorB_cubemap;
                        tmpShader.hasColorTexture = true;
                        tmpShader.specularIntensity = 1.1;
                        tmpShader.shininess = 1.1;

                        tmpMat.setShader(tmpShader);
                        tmpMat.setName("ParadyzDekorB");
                        _this.addMaterialModel( tmpMat );
                        break;
            // ----------------------------------
        }
    }
    
    this.init = function()
    {
        var i;
        var materialsCount = 29;
        var assetsLoader = pgl.getPglModels().getPglJ3DModel().getAssetsLoader();
        
        for (i=0; i<materialsCount; i++)
            _this.materials(i, 0, assetsLoader, null);

        assetsLoader.load(function(assets) {
            for (i=0; i<materialsCount; i++)
                _this.materials(i, 1, assetsLoader, assets);
        });
    }
    
    this.getMaterialModel = function() { return materialModel; }
    
    this.addMaterialModel = function(v)
    {
        materialModel.push(v);
    }
    
    this.findMaterialModelByName = function(name)
    {
        var i;
        
        for (i=0; i<materialModel.length; i++) {
            if (materialModel[i].getName()==name) {
                return materialModel[i];
            }
        }
        
        return null;
    }
}