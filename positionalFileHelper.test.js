const pfh = require("./positionalFileHelper");
const { getFileMapping: getFileMappingM80 } = require("./mappers/m80FileMapping");
const { getFileMapping: getFileMappingM90 } = require("./mappers/m90FileMapping");
const { getFileMapping: getFileMappingM41 } = require("./mappers/m41FileMapping");

//isLineHasData
  test("isLineHasData :: passing '' expect false ", () => {
    expect(pfh.isLineHasData('')).toBe(false);
  });

  test("isLineHasData :: passing '      ' expect false ", () => {
    expect(pfh.isLineHasData('       ')).toBe(false);
  });

  test("isLineHasData :: passing '02345' expect true ", () => {
    expect(pfh.isLineHasData('02345')).toBe(true);
  });

  test("isLineHasData :: passing 'null' expect false ", () => {
    expect(pfh.isLineHasData(null)).toBe(false);
  });

  test("isLineHasData :: passing 'undefined' expect false ", () => {
    expect(pfh.isLineHasData(undefined)).toBe(false);
  });


//parseString
test("parseString :: passing 'sdf  ' expect 'sdf' ", () => {
    expect(pfh.parseString(  'sdf  ', null, null)).toBe('sdf');
});
test("parseString :: passing '   sdf' expect 'sdf' ", () => {
    expect(pfh.parseString(  '   sdf', null, null)).toBe('sdf');
});
test("parseString :: passing '   sdf   ' expect 'sdf' ", () => {
    expect(pfh.parseString(  '   sdf   ', null, null)).toBe('sdf');
});
test("parseString :: passing '' expect null ", () => {
    expect(pfh.parseString(  '', null, null)).toBe(null);
});
test("parseString :: passing '    ' expect null ", () => {
    expect(pfh.parseString(  '    ', null, null)).toBe(null);
});


//parseInteger
test("parseInteger :: passing '123' expect 123 ", () => {
    expect(pfh.parseInteger(  '123', null, null)).toBe(123);
});
test("parseInteger :: passing null expect to return null", () => {
    expect(pfh.parseInteger(null, null, null)).toBe(null);
});
test("parseInteger :: passing '0' expect to return 0", () => {
    expect(pfh.parseInteger('0', null, null)).toBe(0);
});
test("parseInteger :: passing 'abc' expect to throw exception ", () => {
    expect(() => {pfh.parseInteger('abc', {name:'test'}, 1)}).toThrow('Value "abc", is not a valid Number for the attribute test. line number 1');
});


//parseDate
test("parseDate :: passing '19801016' expect new date(1980, 9, 16) ", () => {
    const result = pfh.parseDate('19801016', { name: 'dattest', type: 'date', required: true, dateFormat: 'YYYYMMDD', nullIf: ['00000000'] }, 1);
    expect( result ).toEqual(new Date(1980, 9, 16)); //0-january, 1-february, 9-octuber
});

test("parseDate :: passing '00000000' in a optional atribute, expect null ", () => {
    const result = pfh.parseDate('00000000', { name: 'dattest', type: 'date', required: false, dateFormat: 'YYYYMMDD', nullIf: ['99999999', '00000000'] }, 1);
    expect( result ).toEqual(null); //0-january, 1-february, 9-octuber
});

test("parseDate :: passing '99999999' in a optional atribute, expect null ", () => {
    const result = pfh.parseDate('99999999', { name: 'dattest', type: 'date', required: false, dateFormat: 'YYYYMMDD', nullIf: ['99999999', '00000000'] }, 1);
    expect( result ).toEqual(null); //0-january, 1-february, 9-octuber
});

test("parseDate :: passing '99999999' in a optional atribute, expect null ", () => {
    const result = pfh.parseDate('99999999', { name: 'dattest', type: 'date', required: false, dateFormat: 'YYYYMMDD', nullIf: ['99999999', '00000000'] }, 1);
    expect( result ).toEqual(null); //0-january, 1-february, 9-octuber
});

test("parseDate :: passing mal formed atribute object, expect exception ", () => {
    expect(() => {pfh.parseDate('99999999', { name: 'dattest', type: 'date' }, 1)}).toThrow('The attribute dattest has no dateFormat declared in lineMapping');
});

test("parseDate :: passing '19801610' with mask 'YYYYMMDD' expect exception ", () => {
    expect(() => {pfh.parseDate('19801610', { name: 'dattest', type: 'date', required: true, dateFormat: 'YYYYMMDD', nullIf: ['00000000'] }, 1)}).toThrow('Value "19801610", is not a valid Date for the attribute dattest (YYYYMMDD). line number 1.');
});

// Unit tests for M90
test("getObjectsFromFile :: testing header of m90 ", () => {
    const result = pfh.getObjectsFromFile(
        '00.00 FGE50LMALV    EXTRACT_90    20201229000102238249305.00LMPT0000M90       FGX10     Subida do stock actividade                                                      358000003           00000000',
        getFileMappingM90());

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
      });

test("getObjectsFromFile :: testing content of m90 ", () => {
  const result = pfh.getObjectsFromFile(
      '90.60 358              00042627         00   0000000000000000000000000000004760000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004760000000000000000000000000000000000000000000000000000000000000001',
      getFileMappingM90());

      expect( result[0].codexc ).toEqual(90);
      expect( result[0].sepexc ).toEqual('.');
      expect( result[0].scoexc ).toEqual(60);
      expect( result[0].trtexc ).toEqual(null);
      expect( result[0].codact ).toEqual("358");
      expect( result[0].codcli ).toEqual(null);
      expect( result[0].codpro ).toEqual("00042627");
      expect( result[0].valpro ).toEqual(0);
      expect( result[0].motimm ).toEqual(null);
      expect( result[0].datimm1 ).toEqual(null);
      expect( result[0].datimm2 ).toEqual(null);
      expect( result[0].datfvi ).toEqual(null);
      expect( result[0].nbruvc01 ).toEqual(476);
      expect( result[0].nbruvc02 ).toEqual(0);
      expect( result[0].nbruvc03 ).toEqual(0);
      expect( result[0].nbruvc04 ).toEqual(0);
      expect( result[0].nbruvc05 ).toEqual(0);
      expect( result[0].nbruvc06 ).toEqual(0);
      expect( result[0].nbruvc07 ).toEqual(0);
      expect( result[0].nbruvc08 ).toEqual(0);
      expect( result[0].nbruvc09 ).toEqual(0);
      expect( result[0].nbruvc10 ).toEqual(0);
      expect( result[0].nbruvc11 ).toEqual(0);
      expect( result[0].nbruvc12 ).toEqual(0);
      expect( result[0].nbruvc13 ).toEqual(476);
      expect( result[0].nbruvc14 ).toEqual(0);
      expect( result[0].nbruvc15 ).toEqual(0);
      expect( result[0].nbruvc16 ).toEqual(0);
      expect( result[0].nbruvc17 ).toEqual(0);
      expect( result[0].nbruvc18 ).toEqual(0);
      expect( result[0].nbruvc19 ).toEqual(0);
      expect( result[0].nbruvc20 ).toEqual(0);
      expect( result[0].topedi ).toEqual("1");
      expect( result[0].senstk01 ).toEqual(null);
      expect( result[0].senstk13 ).toEqual(null);
      expect( result[0].disexc ).toEqual(null);

    });

test("getObjectsFromFile :: testing footer of m90 ", () => {
    const result = pfh.getObjectsFromFile(
        '99.00 FGE50LMALV    M90           20201229000137238249300002465',
        getFileMappingM90());

        expect( result[0].codexc ).toEqual(99);
        expect( result[0].sepexc ).toEqual('.');
        expect( result[0].scoexc ).toEqual(0);
        expect( result[0].trtexc ).toEqual(null);
        expect( result[0].emtexc ).toEqual("FGE50LMALV");
        expect( result[0].rctexc ).toEqual("M90");
        expect( result[0].datexc ).toEqual(new Date(2020, 11, 29, 0, 1, 37));
        expect( result[0].heuexc ).toEqual("000137");
        expect( result[0].numexc ).toEqual(2382493);
        expect( result[0].cptexc ).toEqual("00002465");
        expect( result[0].nomsys ).toEqual(null);
        expect( result[0].nomdtq ).toEqual(null);
        expect( result[0].bibdtq ).toEqual(null);
        expect( result[0].idemsg ).toEqual(null);
        expect( result[0].dsiexc ).toEqual(null);
      });


// Unit tests for M80

test("getObjectsFromFile :: testing header of M80 ", () => {
  const result = pfh.getObjectsFromFile(
      '00.00 FGE50LMALV    EXTRACT_80    20201230165254238579805.00LMPT0000M80       FGX10     Movimentos diversos actividade                                                  358010003           00000000',
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
    });

test("getObjectsFromFile :: testing content of M80 ", () => {
const result = pfh.getObjectsFromFile(
    '80.00 2020123016505320201230EM610-I  I  850122                        000000024358              18817334         00                 000000004ARRB180002500                    0000000005600003581105677770000000000000000205109        100012297000ULMALVVRABUVC',
    getFileMappingM80());

    expect( result[0].codexc ).toEqual(80);
    expect( result[0].sepexc ).toEqual('.');
    expect( result[0].scoexc ).toEqual(0);
    expect( result[0].trtexc ).toEqual(null);
    expect( result[0].datmvt ).toEqual(new Date(2020, 11, 30, 16, 50, 53));
    expect( result[0].heumvt ).toEqual("165053");
    expect( result[0].datrgl ).toEqual(new Date(2020, 11, 30, 0, 0, 0));
    expect( result[0].codmdu ).toEqual('EM');
    expect( result[0].codfon ).toEqual(6);
    expect( result[0].codmvt ).toEqual('10');
    expect( result[0].senmvt ).toEqual('-');
    expect( result[0].motmvt ).toEqual('I');
    expect( result[0].edimvt ).toEqual('I');
    expect( result[0].refmvt ).toEqual("850122");
    expect( result[0].uvcmvt ).toEqual(24);
    expect( result[0].codact ).toEqual(358);
    expect( result[0].codcli ).toEqual(null);
    expect( result[0].codpro ).toEqual("18817334");
    expect( result[0].valpro ).toEqual(0);
    expect( result[0].codprn ).toEqual(null);
    expect( result[0].spcpro ).toEqual(0);
    expect( result[0].codsit ).toEqual("ARR");
    expect( result[0].zonsts ).toEqual('B');
    expect( result[0].allsts ).toEqual(180);
    expect( result[0].dplsts ).toEqual(25);
    expect( result[0].nivsts ).toEqual(0);
    expect( result[0].codlot ).toEqual(null);
    expect( result[0].numlot ).toEqual(0);
    expect( result[0].codpal ).toEqual('560000358110567777');
    expect( result[0].datfvi ).toEqual(0);
    expect( result[0].numdim ).toEqual(0);
    expect( result[0].codtie ).toEqual('205109');
    expect( result[0].typtie ).toEqual("1");
    expect( result[0].numcde ).toEqual(12297);
    expect( result[0].snucde ).toEqual(0);
    expect( result[0].coduti ).toEqual('ULMALVVRAB');
    expect( result[0].unipro ).toEqual('UVC');
    expect( result[0].codprocom ).toEqual(null);
    expect( result[0].numligcde ).toEqual(null);
    expect( result[0].numbu ).toEqual(null);
    expect( result[0].numcen ).toEqual(null);
    expect( result[0].coefcnv ).toEqual(null);
    expect( result[0].idmvt ).toEqual(null);

  });

test("getObjectsFromFile :: testing footer of M80 ", () => {
  const result = pfh.getObjectsFromFile(
      '99.00 FGE50LMALV    M80           20201230165254238579800000001',
      getFileMappingM80());

      expect( result[0].codexc ).toEqual(99);
      expect( result[0].sepexc ).toEqual('.');
      expect( result[0].scoexc ).toEqual(0);
      expect( result[0].trtexc ).toEqual(null);
      expect( result[0].emtexc ).toEqual("FGE50LMALV");
      expect( result[0].rctexc ).toEqual("M80");
      expect( result[0].datexc ).toEqual(new Date(2020, 11, 30, 16, 52, 54));
      expect( result[0].heuexc ).toEqual("165254");
      expect( result[0].numexc ).toEqual(2385798);
      expect( result[0].cptexc ).toEqual("00000001");
      expect( result[0].nomsys ).toEqual(null);
      expect( result[0].nomdtq ).toEqual(null);
      expect( result[0].bibdtq ).toEqual(null);
      expect( result[0].idemsg ).toEqual(null);
      expect( result[0].dsiexc ).toEqual(null);
    });

// Unit tests for M41
test("getObjectsFromFile :: testing header of M41 ", () => {
  const result = pfh.getObjectsFromFile(
      '00.00 FGE50LMALV    EXTRACT_41    20201229085117238291905.00LMPT0000M41       FGX10     Recepcao N: 00012649-000                                                        358010003           00000000',
      getFileMappingM41());

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
      expect( result[0].disexc ).toEqual(undefined);
    });
test("getObjectsFromFile :: testing content of M41.00 ", () => {
  const result = pfh.getObjectsFromFile(
      '41.00 00012649000330959                                  ADASTD1358204286        200           202012220000202012220700202012220802293                    10                 03                                       00000000   18425432000008 43ZH51',
      getFileMappingM41());

      expect( result[0].codexc ).toEqual(41);
      expect( result[0].sepexc ).toEqual('.');
      expect( result[0].scoexc ).toEqual(0);
      expect( result[0].trtexc ).toEqual(null);
      expect( result[0].numrec ).toEqual(12649);
      expect( result[0].snurec ).toEqual(0);
      expect( result[0].refrec ).toEqual('330959'); 
      expect( result[0].refexp ).toEqual(null);
      expect( result[0].codapp ).toEqual(null);
      expect( result[0].codldr ).toEqual("ADA");
      expect( result[0].codtre ).toEqual("STD");
      expect( result[0].oricde ).toEqual("1");
      expect( result[0].codact ).toEqual(358);
      expect( result[0].codfou ).toEqual(204286);
      expect( result[0].codtra ).toEqual("200");
      expect( result[0].dtirec ).toEqual(new Date(2020, 11, 22, 0, 0, 0));
      expect( result[0].heirec ).toEqual(0);
      expect( result[0].dtmrec ).toEqual(new Date(2020, 11, 22, 7, 0, 0));
      expect( result[0].hemrec ).toEqual(700);
      expect( result[0].dtrrec ).toEqual(new Date(2020, 11, 22, 8, 2, 0));
      expect( result[0].herrec ).toEqual(802);
      expect( result[0].kairec ).toEqual(293);
      expect( result[0].ctrrec ).toEqual(null);
      expect( result[0].refcnt ).toEqual(null);
      expect( result[0].cmtrec1a ).toEqual('10');
      expect( result[0].cmtrec1b ).toEqual(null);
      expect( result[0].cmtrec1c ).toEqual(null);
      expect( result[0].cmtrec1d ).toEqual(null);
      expect( result[0].cmtrec1e ).toEqual('03');
      expect( result[0].cmtrec1 ).toEqual(null);
      expect( result[0].cmtrec2 ).toEqual(null);
      expect( result[0].datrlq ).toEqual(null);
      expect( result[0].codacr ).toEqual(null);
      expect( result[0].natrec ).toEqual('1');
      expect( result[0].edifou ).toEqual('8425432000008');
      expect( result[0].codcnt ).toEqual('43ZH51');
      expect( result[0].typrmt ).toEqual(null);
      expect( result[0].disexc ).toEqual(null);
    });

test("getObjectsFromFile :: testing content of M41.20 ", () => {
  const result = pfh.getObjectsFromFile(
      '41.20 00012649000330959                        00002358              19474490         00000000006UNI                 0000000   000000006000000000000000000   000000000   0000000000000000010000001920020201222                    0000000000               00001',
      getFileMappingM41());

      expect( result[0].codexc ).toEqual(41);
      expect( result[0].sepexc ).toEqual('.');
      expect( result[0].scoexc ).toEqual(20);
      expect( result[0].trtexc ).toEqual(null);
      expect( result[0].numrec ).toEqual(12649);
      expect( result[0].snurec ).toEqual(0);
      expect( result[0].refrec ).toEqual('330959'); 
      expect( result[0].nlirec ).toEqual(2);
      expect( result[0].codact ).toEqual("358");
      expect( result[0].codcli ).toEqual(null);
      expect( result[0].codpro ).toEqual("19474490");
      expect( result[0].valpro ).toEqual(0);
      expect( result[0].uvcrea ).toEqual(6);
      expect( result[0].unicde ).toEqual('UNI');
      expect( result[0].codprn ).toEqual(null);
      expect( result[0].typope ).toEqual("0");
      expect( result[0].numope ).toEqual(0);
      expect( result[0].codacr ).toEqual(null);
      expect( result[0].uvcrec ).toEqual(6);
      expect( result[0].uvcgra ).toEqual(0);
      expect( result[0].uvcimm ).toEqual(0);
      expect( result[0].motimm ).toEqual(null);
      expect( result[0].uvcrfu ).toEqual(0);
      expect( result[0].motrfu ).toEqual(null);
      expect( result[0].uvcrlq ).toEqual(0);
      expect( result[0].datfvi ).toEqual(null);
      expect( result[0].mespro ).toEqual('1');
      expect( result[0].pdnrec ).toEqual(19200);
      expect( result[0].datfab ).toEqual(new Date(2020, 11, 22, 0, 0, 0));
      expect( result[0].codlot ).toEqual(null);
      expect( result[0].numlot ).toEqual(0);
      expect( result[0].recsol ).toEqual('0');
      expect( result[0].codmtr ).toEqual(null);
      expect( result[0].indpro ).toEqual(null);
      expect( result[0].indproa ).toEqual(null);
      expect( result[0].disexc ).toEqual('00001');
    });