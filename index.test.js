
const path = require('path');
const fs = require('fs');
const os = require('os');
const pfh = require("./positionalFileHelper");
const { getFileMapping: getFileMappingM80 } = require("./mappers/m80FileMapping");


// Unit tests for M80 (This test is based on file 358M8020123000149864.txt on ./files folder )

test("getObjectsFromFile :: testing header of M80 ", () => {
  fs.readFile(path.join('.','files', '358M8020123000149864.txt'), 'utf8', (err, data) => {
    const result = pfh.getObjectsFromFile(
      data,
      getFileMappingM80());
  
      expect( result[0].codexc ).toEqual(0);
      expect( result[0].sepexc ).toEqual('.');
      expect( result[0].scoexc ).toEqual(0);
      expect( result[0].trtexc ).toEqual(null);
      expect( result[0].emtexc ).toEqual("FGE50LMALV");
      expect( result[0].rctexc ).toEqual("EXTRACT_80");
      expect( result[0].datexc ).toEqual(new Date(2020, 11, 30, 16, 52, 54)); 
      expect( result[0].heuexc ).toEqual("165254");
      expect( result[0].numexc ).toEqual(2385798);
      expect( result[0].acqexc ).toEqual("0");
      expect( result[0].verexc ).toEqual("5.00");
      expect( result[0].nomsys ).toEqual("LMPT0000");
      expect( result[0].nomdtq ).toEqual("M80");
      expect( result[0].bibdtq ).toEqual("FGX10");
      expect( result[0].libexc ).toEqual("Movimentos diversos actividade");
      expect( result[0].bibdst ).toEqual(null);
      expect( result[0].pgmdst ).toEqual(null);
      expect( result[0].pardst ).toEqual(null);
      expect( result[0].codact ).toEqual(358);
      expect( result[0].iglsit ).toEqual(10);
      expect( result[0].edisit ).toEqual(3);
      expect( result[0].imaexc ).toEqual(0);
      expect( result[0].disexc ).toEqual(undefined);
      
      //80.00

      expect( result[1].codexc ).toEqual(80);
      expect( result[1].sepexc ).toEqual('.');
      expect( result[1].scoexc ).toEqual(0);
      expect( result[1].trtexc ).toEqual(null);
      expect( result[1].datmvt ).toEqual(new Date(2020, 11, 30, 16, 50, 53));
      expect( result[1].heumvt ).toEqual("165053");
      expect( result[1].datrgl ).toEqual(new Date(2020, 11, 30, 0, 0, 0));
      expect( result[1].codmdu ).toEqual('EM');
      expect( result[1].codfon ).toEqual(6);
      expect( result[1].codmvt ).toEqual('10');
      expect( result[1].senmvt ).toEqual('-');
      expect( result[1].motmvt ).toEqual('I');
      expect( result[1].edimvt ).toEqual('I');
      expect( result[1].refmvt ).toEqual("850122");
      expect( result[1].uvcmvt ).toEqual(24);
      expect( result[1].codact ).toEqual(358);
      expect( result[1].codcli ).toEqual(null);
      expect( result[1].codpro ).toEqual("18817334");
      expect( result[1].valpro ).toEqual(0);
      expect( result[1].codprn ).toEqual(null);
      expect( result[1].spcpro ).toEqual(0);
      expect( result[1].codsit ).toEqual("ARR");
      expect( result[1].zonsts ).toEqual('B');
      expect( result[1].allsts ).toEqual(180);
      expect( result[1].dplsts ).toEqual(25);
      expect( result[1].nivsts ).toEqual(0);
      expect( result[1].codlot ).toEqual(null);
      expect( result[1].numlot ).toEqual(0);
      expect( result[1].codpal ).toEqual('560000358110567777');
      expect( result[1].datfvi ).toEqual(0);
      expect( result[1].numdim ).toEqual(0);
      expect( result[1].codtie ).toEqual('205109');
      expect( result[1].typtie ).toEqual("1");
      expect( result[1].numcde ).toEqual(12297);
      expect( result[1].snucde ).toEqual(0);
      expect( result[1].coduti ).toEqual('ULMALVVRAB');
      expect( result[1].unipro ).toEqual('UVC');
      expect( result[1].codprocom ).toEqual(null);
      expect( result[1].numligcde ).toEqual(null);
      expect( result[1].numbu ).toEqual(null);
      expect( result[1].numcen ).toEqual(null);
      expect( result[1].coefcnv ).toEqual(null);
      expect( result[1].idmvt ).toEqual(null);
      
      //99.00

      expect( result[2].codexc ).toEqual(99);
      expect( result[2].sepexc ).toEqual('.');
      expect( result[2].scoexc ).toEqual(0);
      expect( result[2].trtexc ).toEqual(null);
      expect( result[2].emtexc ).toEqual("FGE50LMALV");
      expect( result[2].rctexc ).toEqual("M80");
      expect( result[2].datexc ).toEqual(new Date(2020, 11, 30, 16, 52, 54));
      expect( result[2].heuexc ).toEqual("165254");
      expect( result[2].numexc ).toEqual(2385798);
      expect( result[2].cptexc ).toEqual("00000001");
      expect( result[2].nomsys ).toEqual(null);
      expect( result[2].nomdtq ).toEqual(null);
      expect( result[2].bibdtq ).toEqual(null);
      expect( result[2].idemsg ).toEqual(null);
      expect( result[2].dsiexc ).toEqual(null);
  });
});