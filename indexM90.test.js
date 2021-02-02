const path = require('path');
const fs = require('fs');
const os = require('os');
const pfh = require("./positionalFileHelper");
const { getFileMapping: getFileMappingM90 } = require("./mappers/m90FileMapping");

// Unit tests for M90 (This test is based on file 358M9020122900148760.txt on ./files folder )

test("getObjectsFromFile :: Test of M90 ", () => {
    fs.readFile(path.join('.','files', '358M9020122900148760.txt'), 'utf8', (err, data) => {
    const result = pfh.getObjectsFromFile(
      data,
        getFileMappingM90());
        //00
        expect( result[0].codexc ).toEqual(0);
        expect( result[0].sepexc ).toEqual('.');
        expect( result[0].scoexc ).toEqual(0);
        expect( result[0].trtexc ).toEqual(null);
        expect( result[0].emtexc ).toEqual("FGE50LMALV");
        expect( result[0].rctexc ).toEqual("EXTRACT_90");
        expect( result[0].datexc ).toEqual(new Date(2020, 11, 29, 0, 1, 2)); 
        expect( result[0].heuexc ).toEqual("000102");
        expect( result[0].numexc ).toEqual(2382493);
        expect( result[0].acqexc ).toEqual("0");
        expect( result[0].verexc ).toEqual("5.00");
        expect( result[0].nomsys ).toEqual("LMPT0000");
        expect( result[0].nomdtq ).toEqual("M90");
        expect( result[0].bibdtq ).toEqual("FGX10");
        expect( result[0].libexc ).toEqual("Subida do stock actividade");
        expect( result[0].bibdst ).toEqual(null);
        expect( result[0].pgmdst ).toEqual(null);
        expect( result[0].pardst ).toEqual(null);
        expect( result[0].codact ).toEqual("358");
        expect( result[0].iglsit ).toEqual(0);
        expect( result[0].edisit ).toEqual(3);
        expect( result[0].imaexc ).toEqual(0);
        expect( result[0].disexc ).toEqual(null);
        //90.00
        expect( result[1].sepexc ).toEqual('.');
        expect( result[1].scoexc ).toEqual(0);
        expect( result[1].trtexc ).toEqual(null);
        expect( result[1].codact ).toEqual(358);
        expect( result[1].codexc ).toEqual(90);
        expect( result[1].codcli ).toEqual(null);
        expect( result[1].codpro ).toEqual(11463);
        expect( result[1].valpro ).toEqual(0);
        expect( result[1].motimm ).toEqual(null);
        expect( result[1].datimm1 ).toEqual(null);
        expect( result[1].datimm2 ).toEqual(null);
        expect( result[1].datfvi ).toEqual(null);
        expect( result[1].nbruvc01 ).toEqual(0);
        expect( result[1].nbruvc02 ).toEqual(0);
        expect( result[1].nbruvc03 ).toEqual(0);
        expect( result[1].nbruvc04 ).toEqual(0);
        expect( result[1].nbruvc05 ).toEqual(0);
        expect( result[1].nbruvc06 ).toEqual(0);
        expect( result[1].nbruvc07 ).toEqual(0);
        expect( result[1].nbruvc08 ).toEqual(0);
        expect( result[1].nbruvc09 ).toEqual(0);
        expect( result[1].nbruvc10 ).toEqual(0);
        expect( result[1].nbruvc11 ).toEqual(0);
        expect( result[1].nbruvc12 ).toEqual(0);
        expect( result[1].nbruvc13 ).toEqual(0);
        expect( result[1].nbruvc14 ).toEqual(0);
        expect( result[1].nbruvc15 ).toEqual(0);
        expect( result[1].nbruvc16 ).toEqual(0);
        expect( result[1].nbruvc17 ).toEqual(0);
        expect( result[1].nbruvc18 ).toEqual(0);
        expect( result[1].nbruvc19 ).toEqual(0);
        expect( result[1].nbruvc20 ).toEqual(0);
        expect( result[1].topedi ).toEqual(null);
        expect( result[1].senstk01 ).toEqual(null);
        expect( result[1].senstk13 ).toEqual(null);
        expect( result[1].disexc ).toEqual(null);
        //90.60
        expect( result[1].sepexc ).toEqual('.');
        expect( result[1].scoexc ).toEqual(0);
        expect( result[1].trtexc ).toEqual(null);
        expect( result[1].codact ).toEqual(358);
      });
    });