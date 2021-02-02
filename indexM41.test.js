const path = require('path');
const fs = require('fs');
const os = require('os');
const pfh = require("./positionalFileHelper");
const { getFileMapping: getFileMappingM41 } = require("./mappers/m41FileMapping");

// Unit tests for M41 (This test is based on file 358M4120122900148843.txt on ./files folder )

test("getObjectsFromFile :: Test of M41 ", () => {
    let rawData;
    fs.readFile(path.join('.','files', '358M4120122900148843.txt'), 'utf8', (err, data) => {
      rawData = data;
      const result = pfh.getObjectsFromFile(
        rawData,
        getFileMappingM41());

        //00
        expect( result[0].regexc ).toEqual("00.00");
        expect( result[0].codexc ).toEqual(0);
        expect( result[0].sepexc ).toEqual('.');
        expect( result[0].scoexc ).toEqual(0);
        expect( result[0].trtexc ).toEqual(null);
        expect( result[0].emtexc ).toEqual("FGE50LMALV");
        expect( result[0].rctexc ).toEqual("EXTRACT_41");
        expect( result[0].datexc ).toEqual(new Date(2020, 11, 29, 8, 51, 17)); 
        expect( result[0].heuexc ).toEqual("085117");
        expect( result[0].numexc ).toEqual(2382919);
        expect( result[0].acqexc ).toEqual("0");
        expect( result[0].verexc ).toEqual("5.00");
        expect( result[0].nomsys ).toEqual("LMPT0000");
        expect( result[0].nomdtq ).toEqual("M41");
        expect( result[0].bibdtq ).toEqual("FGX10");
        expect( result[0].libexc ).toEqual("Recepcao N: 00012649-000");
        expect( result[0].bibdst ).toEqual(null);
        expect( result[0].pgmdst ).toEqual(null);
        expect( result[0].pardst ).toEqual(null);
        expect( result[0].codact ).toEqual("358");
        expect( result[0].iglsit ).toEqual(10);
        expect( result[0].edisit ).toEqual(3);
        expect( result[0].imaexc ).toEqual(0);
        expect( result[0].idemsg ).toEqual(null);
        expect( result[0].disexc ).toEqual(undefined);

        //41.00

        expect( result[1].regexc ).toEqual("41.00");
        expect( result[1].codexc ).toEqual(41);
        expect( result[1].sepexc ).toEqual('.');
        expect( result[1].scoexc ).toEqual(0);
        expect( result[1].trtexc ).toEqual(null);
        expect( result[1].numrec ).toEqual(12649);
        expect( result[1].snurec ).toEqual(0);
        expect( result[1].refrec ).toEqual('330959'); 
        expect( result[1].refexp ).toEqual(null);
        expect( result[1].codapp ).toEqual(null);
        expect( result[1].codldr ).toEqual("ADA");
        expect( result[1].codtre ).toEqual("STD");
        expect( result[1].oricde ).toEqual("1");
        expect( result[1].codact ).toEqual(358);
        expect( result[1].codfou ).toEqual(204286);
        expect( result[1].codtra ).toEqual("200");
        expect( result[1].dtirec ).toEqual(new Date(2020, 11, 22, 0, 0, 0));
        expect( result[1].heirec ).toEqual(0);
        expect( result[1].dtmrec ).toEqual(new Date(2020, 11, 22, 7, 0, 0));
        expect( result[1].hemrec ).toEqual(700);
        expect( result[1].dtrrec ).toEqual(new Date(2020, 11, 22, 8, 2, 0));
        expect( result[1].herrec ).toEqual(802);
        expect( result[1].kairec ).toEqual(293);
        expect( result[1].ctrrec ).toEqual(null);
        expect( result[1].refcnt ).toEqual(null);
        expect( result[1].cmtrec1a ).toEqual('10');
        expect( result[1].cmtrec1b ).toEqual(null);
        expect( result[1].cmtrec1c ).toEqual(null);
        expect( result[1].cmtrec1d ).toEqual(null);
        expect( result[1].cmtrec1e ).toEqual('03');
        expect( result[1].cmtrec1 ).toEqual(null);
        expect( result[1].cmtrec2 ).toEqual(null);
        expect( result[1].datrlq ).toEqual(null);
        expect( result[1].codacr ).toEqual(null);
        expect( result[1].natrec ).toEqual('1');
        expect( result[1].edifou ).toEqual('8425432000008');
        expect( result[1].codcnt ).toEqual('43ZH51');
        expect( result[1].typrmt ).toEqual(null);
        expect( result[1].disexc ).toEqual(null);

        //41.20

        expect( result[2].regexc ).toEqual("41.20");
        expect( result[2].codexc ).toEqual(41);
        expect( result[2].sepexc ).toEqual('.');
        expect( result[2].scoexc ).toEqual(20);
        expect( result[2].trtexc ).toEqual(null);
        expect( result[2].numrec ).toEqual(12649);
        expect( result[2].snurec ).toEqual(0);
        expect( result[2].refrec ).toEqual('330959'); 
        expect( result[2].nlirec ).toEqual(2);
        expect( result[2].codact ).toEqual("358");
        expect( result[2].codcli ).toEqual(null);
        expect( result[2].codpro ).toEqual("19474490");
        expect( result[2].valpro ).toEqual(0);
        expect( result[2].uvcrea ).toEqual(6);
        expect( result[2].unicde ).toEqual('UNI');
        expect( result[2].codprn ).toEqual(null);
        expect( result[2].typope ).toEqual("0");
        expect( result[2].numope ).toEqual(0);
        expect( result[2].codacr ).toEqual(null);
        expect( result[2].uvcrec ).toEqual(6);
        expect( result[2].uvcgra ).toEqual(0);
        expect( result[2].uvcimm ).toEqual(0);
        expect( result[2].motimm ).toEqual(null);
        expect( result[2].uvcrfu ).toEqual(0);
        expect( result[2].motrfu ).toEqual(null);
        expect( result[2].uvcrlq ).toEqual(0);
        expect( result[2].datfvi ).toEqual(null);
        expect( result[2].mespro ).toEqual('1');
        expect( result[2].pdnrec ).toEqual(19200);
        expect( result[2].datfab ).toEqual(new Date(2020, 11, 22, 0, 0, 0));
        expect( result[2].codlot ).toEqual(null);
        expect( result[2].numlot ).toEqual(0);
        expect( result[2].recsol ).toEqual('0');
        expect( result[2].codmtr ).toEqual(null);
        expect( result[2].indpro ).toEqual(null);
        expect( result[2].indproa ).toEqual(null);
        expect( result[2].disexc ).toEqual('00001');

        //41.99

        expect( result[12].regexc ).toEqual("41.99");
        expect( result[12].codexc ).toEqual(41);
        expect( result[12].sepexc ).toEqual(".");
        expect( result[12].scoexc ).toEqual(99);
        expect( result[12].trtexc ).toEqual(null);
        expect( result[12].numrec ).toEqual(12649);
        expect( result[12].snurec ).toEqual(0);
        expect( result[12].refrec ).toEqual("330959");
        expect( result[12].cumlig ).toEqual(5);
        expect( result[12].cumpal ).toEqual(5);
        expect( result[12].coltot ).toEqual(2500);
        expect( result[12].totpro ).toEqual(5);
        expect( result[12].disexc ).toEqual(null);
        
        //99.00

        expect( result[13].regexc ).toEqual("99.00");
        expect( result[13].codexc ).toEqual(99);
        expect( result[13].sepexc ).toEqual(".");
        expect( result[13].scoexc ).toEqual(0);
        expect( result[13].trtexc ).toEqual(null);
        expect( result[13].emtexc ).toEqual("FGE50LMALV");
        expect( result[13].rctexc ).toEqual("M41");
        expect( result[13].datexc ).toEqual(new Date(2020, 11, 29, 8, 51, 17));
        expect( result[13].heuexc ).toEqual("085117");
        expect( result[13].numexc ).toEqual(2382919);
        expect( result[13].cptexc ).toEqual("00000012");
        expect( result[13].nomsys ).toEqual(null);
        expect( result[13].nomdtq ).toEqual(null);
        expect( result[13].bibdtq ).toEqual(null);
        expect( result[13].idemsg ).toEqual(null);
        expect( result[13].dsiexc ).toEqual(null);

      });
    });