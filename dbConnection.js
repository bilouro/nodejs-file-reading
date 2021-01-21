const { Sequelize, DataTypes } = require('sequelize');


const DB = new Sequelize('nunolopes', 'nunolopes', null, {
  host: 'localhost',
  dialect: 'postgres',
});

const testConnection = async () => {
  try {
    await DB.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

const dataTransfers = DB.define('data_transfers', {
  id: {
    field: 'id',
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    unique: true
  },
  h_codexc: { field: 'h_codexc', type: DataTypes.INTEGER, allowNull: true },
  h_sepexc: { field: 'h_sepexc', type: DataTypes.STRING(1), allowNull: true },
  h_scoexc: { field: 'h_scoexc', type: DataTypes.INTEGER, allowNull: true },
  h_trtexc: { field: 'h_trtexc', type: DataTypes.STRING(1), allowNull: true },
  h_emtexc: { field: 'h_emtexc', type: DataTypes.STRING(14), allowNull: true },
  h_rctexc: { field: 'h_rctexc', type: DataTypes.STRING(14), allowNull: true },
  h_datexc: { field: 'h_datexc', type: DataTypes.DATE, allowNull: true },
  h_heuexc: { field: 'h_heuexc', type: DataTypes.STRING(6), allowNull: true },
  h_numexc: { field: 'h_numexc', type: DataTypes.INTEGER, allowNull: true },
  h_acqexc: { field: 'h_acqexc', type: DataTypes.STRING(1), allowNull: true },
  h_verexc: { field: 'h_verexc', type: DataTypes.STRING(4), allowNull: true },
  h_nomsys: { field: 'h_nomsys', type: DataTypes.STRING(8), allowNull: true },
  h_nomdtq: { field: 'h_nomdtq', type: DataTypes.STRING(10), allowNull: true },
  h_bibdtq: { field: 'h_bibdtq', type: DataTypes.STRING(10), allowNull: true },
  h_libexc: { field: 'h_libexc', type: DataTypes.STRING(30), allowNull: true },
  h_bibdst: { field: 'h_bibdst', type: DataTypes.STRING(10), allowNull: true },
  h_pgmdst: { field: 'h_pgmdst', type: DataTypes.STRING(10), allowNull: true },
  h_pardst: { field: 'h_pardst', type: DataTypes.STRING(30), allowNull: true },
  h_codact: { field: 'h_codact', type: DataTypes.STRING(3), allowNull: true },
  h_iglsit: { field: 'h_iglsit', type: DataTypes.INTEGER, allowNull: true },
  h_edisit: { field: 'h_edisit', type: DataTypes.INTEGER, allowNull: true },
  h_imaexc: { field: 'h_imaexc', type: DataTypes.INTEGER, allowNull: true },
  h_idemsg: { field: 'h_idemsg', type: DataTypes.STRING(30), allowNull: true },
  h_dsiexc: { field: 'h_dsiexc', type: DataTypes.STRING(30), allowNull: true },
  h_regexc: { field: 'h_regexc', type: DataTypes.STRING(5), allowNull: true },
  h_disexc: { field: 'h_disexc', type: DataTypes.STRING(60), allowNull: true },
  f_codexc: { field: 'f_codexc', type: DataTypes.INTEGER, allowNull: true },
  f_sepexc: { field: 'f_sepexc', type: DataTypes.STRING(1), allowNull: true },
  f_scoexc: { field: 'f_scoexc', type: DataTypes.INTEGER, allowNull: true },
  f_trtexc: { field: 'f_trtexc', type: DataTypes.STRING(1), allowNull: true },
  f_emtexc: { field: 'f_emtexc', type: DataTypes.STRING(14), allowNull: true },
  f_rctexc: { field: 'f_rctexc', type: DataTypes.STRING(14), allowNull: true },
  f_datexc: { field: 'f_datexc', type: DataTypes.DATE, allowNull: true },
  f_heuexc: { field: 'f_heuexc', type: DataTypes.STRING(6), allowNull: true },
  f_numexc: { field: 'f_numexc', type: DataTypes.INTEGER, allowNull: true },
  f_cptexc: { field: 'f_cptexc', type: DataTypes.STRING(8), allowNull: true },
  f_nomsys: { field: 'f_nomsys', type: DataTypes.STRING(8), allowNull: true },
  f_nomdtq: { field: 'f_nomdtq', type: DataTypes.STRING(10), allowNull: true },
  f_bibdtq: { field: 'f_bibdtq', type: DataTypes.STRING(10), allowNull: true },
  f_idemsg: { field: 'f_idemsg', type: DataTypes.STRING(30), allowNull: true },
  f_dsiexc: { field: 'f_dsiexc', type: DataTypes.STRING(173), allowNull: true },
  f_regexc: { field: 'f_regexc', type: DataTypes.STRING(5), allowNull: true },
});

const dataTransferLines = DB.define('data_transfer_lines', {
  id: {
    field: 'id',
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    unique: true
  },
  transfer_id: {
    field: 'transfer_id',
    type: DataTypes.BIGINT,
    references: {
      model: 'data_transfers',
      key: 'id'
    }
  },
  codexc: { field: 'codexc', type: DataTypes.INTEGER, allowNull: true },
  sepexc: { field: 'sepexc', type: DataTypes.STRING(1), allowNull: true },
  scoexc: { field: 'scoexc', type: DataTypes.INTEGER, allowNull: true },
  trtexc: { field: 'trtexc', type: DataTypes.STRING(1), allowNull: true },
  datmvt: { field: 'datmvt', type: DataTypes.DATE, allowNull: true },
  heumvt: { field: 'heumvt', type: DataTypes.STRING(6), allowNull: true },
  datrgl: { field: 'datrgl', type: DataTypes.DATE, allowNull: true },
  codmdu: { field: 'codmdu', type: DataTypes.STRING(2), allowNull: true },
  codfon: { field: 'codfon', type: DataTypes.INTEGER, allowNull: true },
  codmvt: { field: 'codmvt', type: DataTypes.STRING(2), allowNull: true },
  senmvt: { field: 'senmvt', type: DataTypes.STRING(1), allowNull: true },
  motmvt: { field: 'motmvt', type: DataTypes.STRING(3), allowNull: true },
  edimvt: { field: 'edimvt', type: DataTypes.STRING(3), allowNull: true },
  refmvt: { field: 'refmvt', type: DataTypes.STRING(30), allowNull: true },
  uvcmvt: { field: 'uvcmvt', type: DataTypes.INTEGER, allowNull: true },
  codact: { field: 'codact', type: DataTypes.STRING(3), allowNull: true },
  codcli: { field: 'codcli', type: DataTypes.STRING(14), allowNull: true },
  codpro: { field: 'codpro', type: DataTypes.STRING(17), allowNull: true },
  valpro: { field: 'valpro', type: DataTypes.INTEGER, allowNull: true },
  codprn: { field: 'codprn', type: DataTypes.STRING(17), allowNull: true },
  spcpro: { field: 'spcpro', type: DataTypes.INTEGER, allowNull: true },
  pcbpro: { field: 'pcbpro', type: DataTypes.INTEGER, allowNull: true },
  codsit: { field: 'codsit', type: DataTypes.STRING(3), allowNull: true },
  zonsts: { field: 'zonsts', type: DataTypes.STRING(1), allowNull: true },
  allsts: { field: 'allsts', type: DataTypes.INTEGER, allowNull: true },
  dplsts: { field: 'dplsts', type: DataTypes.INTEGER, allowNull: true },
  nivsts: { field: 'nivsts', type: DataTypes.INTEGER, allowNull: true },
  codlot: { field: 'codlot', type: DataTypes.STRING(20), allowNull: true },
  numlot: { field: 'numlot', type: DataTypes.INTEGER, allowNull: true },
  codpal: { field: 'codpal', type: DataTypes.STRING(18), allowNull: true },
  datfvi: { field: 'datfvi', type: DataTypes.INTEGER, allowNull: true },
  numdim: { field: 'numdim', type: DataTypes.INTEGER, allowNull: true },
  codtie: { field: 'codtie', type: DataTypes.STRING(14), allowNull: true },
  typtie: { field: 'typtie', type: DataTypes.STRING(1), allowNull: true },
  numcde: { field: 'numcde', type: DataTypes.INTEGER, allowNull: true },
  snucde: { field: 'snucde', type: DataTypes.INTEGER, allowNull: true },
  coduti: { field: 'coduti', type: DataTypes.STRING(10), allowNull: true },
  unipro: { field: 'unipro', type: DataTypes.STRING(3), allowNull: true },
  codprocom: { field: 'codprocom', type: DataTypes.INTEGER, allowNull: true },
  numligcde: { field: 'numligcde', type: DataTypes.INTEGER, allowNull: true },
  numbu: { field: 'numbu', type: DataTypes.INTEGER, allowNull: true },
  numcen: { field: 'numcen', type: DataTypes.INTEGER, allowNull: true },
  coefcnv: { field: 'coefcnv', type: DataTypes.INTEGER, allowNull: true },
  idmvt: { field: 'idmvt', type: DataTypes.INTEGER, allowNull: true },
  regexc: { field: 'regexc', type: DataTypes.STRING(5), allowNull: true },
  motimm: { field: 'motimm', type: DataTypes.STRING(3), allowNull: true },
  datimm1: { field: 'datimm1', type: DataTypes.DATE, allowNull: true },
  datimm2: { field: 'datimm2', type: DataTypes.DATE, allowNull: true },
  nbruvc01: { field: 'nbruvc01', type: DataTypes.INTEGER, allowNull: true },
  nbruvc02: { field: 'nbruvc02', type: DataTypes.INTEGER, allowNull: true },
  nbruvc03: { field: 'nbruvc03', type: DataTypes.INTEGER, allowNull: true },
  nbruvc04: { field: 'nbruvc04', type: DataTypes.INTEGER, allowNull: true },
  nbruvc05: { field: 'nbruvc05', type: DataTypes.INTEGER, allowNull: true },
  nbruvc06: { field: 'nbruvc06', type: DataTypes.INTEGER, allowNull: true },
  nbruvc07: { field: 'nbruvc07', type: DataTypes.INTEGER, allowNull: true },
  nbruvc08: { field: 'nbruvc08', type: DataTypes.INTEGER, allowNull: true },
  nbruvc09: { field: 'nbruvc09', type: DataTypes.INTEGER, allowNull: true },
  nbruvc10: { field: 'nbruvc10', type: DataTypes.INTEGER, allowNull: true },
  nbruvc11: { field: 'nbruvc11', type: DataTypes.INTEGER, allowNull: true },
  nbruvc12: { field: 'nbruvc12', type: DataTypes.INTEGER, allowNull: true },
  nbruvc13: { field: 'nbruvc13', type: DataTypes.INTEGER, allowNull: true },
  nbruvc14: { field: 'nbruvc14', type: DataTypes.INTEGER, allowNull: true },
  nbruvc15: { field: 'nbruvc15', type: DataTypes.INTEGER, allowNull: true },
  nbruvc16: { field: 'nbruvc16', type: DataTypes.INTEGER, allowNull: true },
  nbruvc17: { field: 'nbruvc17', type: DataTypes.INTEGER, allowNull: true },
  nbruvc18: { field: 'nbruvc18', type: DataTypes.INTEGER, allowNull: true },
  nbruvc19: { field: 'nbruvc19', type: DataTypes.INTEGER, allowNull: true },
  nbruvc20: { field: 'nbruvc20', type: DataTypes.INTEGER, allowNull: true },
  topedi: { field: 'topedi', type: DataTypes.STRING(1), allowNull: true },
  senstk01: { field: 'senstk01', type: DataTypes.STRING(1), allowNull: true },
  senstk13: { field: 'senstk13', type: DataTypes.STRING(1), allowNull: true },
  disexc: { field: 'disexc', type: DataTypes.STRING(186), allowNull: true },
  id9000: { field: 'id9000', type: DataTypes.STRING(36), allowNull: true },
  numrec: { field: 'numrec', type: DataTypes.INTEGER, allowNull: true },
  snurec: { field: 'snurec', type: DataTypes.INTEGER, allowNull: true },
  refrec: { field: 'refrec', type: DataTypes.STRING(30), allowNull: true },
  refexp: { field: 'refexp', type: DataTypes.STRING(24), allowNull: true },
  codapp: { field: 'codapp', type: DataTypes.STRING(10), allowNull: true },
  codldr: { field: 'codldr', type: DataTypes.STRING(3), allowNull: true },
  codtre: { field: 'codtre', type: DataTypes.STRING(3), allowNull: true },
  oricde: { field: 'oricde', type: DataTypes.STRING(1), allowNull: true },
  codfou: { field: 'codfou', type: DataTypes.STRING(14), allowNull: true },
  codtra: { field: 'codtra', type: DataTypes.STRING(14), allowNull: true },
  dtirec: { field: 'dtirec', type: DataTypes.DATE, allowNull: true },
  heirec: { field: 'heirec', type: DataTypes.INTEGER, allowNull: true },
  dtmrec: { field: 'dtmrec', type: DataTypes.DATE, allowNull: true },
  hemrec: { field: 'hemrec', type: DataTypes.INTEGER, allowNull: true },
  dtrrec: { field: 'dtrrec', type: DataTypes.DATE, allowNull: true },
  herrec: { field: 'herrec', type: DataTypes.INTEGER, allowNull: true },
  kairec: { field: 'kairec', type: DataTypes.INTEGER, allowNull: true },
  ctrrec: { field: 'ctrrec', type: DataTypes.STRING(10), allowNull: true },
  refcnt: { field: 'refcnt', type: DataTypes.STRING(10), allowNull: true },
  cmtrec1a: { field: 'cmtrec1a', type: DataTypes.STRING(2), allowNull: true },
  cmtrec1b: { field: 'cmtrec1b', type: DataTypes.STRING(8), allowNull: true },
  cmtrec1c: { field: 'cmtrec1c', type: DataTypes.STRING(8), allowNull: true },
  cmtrec1d: { field: 'cmtrec1d', type: DataTypes.STRING(1), allowNull: true },
  cmtrec1e: { field: 'cmtrec1e', type: DataTypes.STRING(2), allowNull: true },
  cmtrec1: { field: 'cmtrec1', type: DataTypes.STRING(9), allowNull: true },
  cmtrec2: { field: 'cmtrec2', type: DataTypes.STRING(30), allowNull: true },
  datrlq: { field: 'datrlq', type: DataTypes.DATE, allowNull: true },
  codacr: { field: 'codacr', type: DataTypes.STRING(3), allowNull: true },
  natrec: { field: 'natrec', type: DataTypes.STRING(1), allowNull: true },
  edifou: { field: 'edifou', type: DataTypes.STRING(14), allowNull: true },
  codcnt: { field: 'codcnt', type: DataTypes.STRING(14), allowNull: true },
  typrmt: { field: 'typrmt', type: DataTypes.STRING(1), allowNull: true },
  diprec: { field: 'diprec', type: DataTypes.STRING(50), allowNull: true },
  toprec: { field: 'toprec', type: DataTypes.STRING(5), allowNull: true },
  datbdr: { field: 'datbdr', type: DataTypes.DATE, allowNull: true },
  ediact: { field: 'ediact', type: DataTypes.STRING(14), allowNull: true },
  editra: { field: 'editra', type: DataTypes.STRING(14), allowNull: true },
  datbdl: { field: 'datbdl', type: DataTypes.INTEGER, allowNull: true },
  codtdd: { field: 'codtdd', type: DataTypes.STRING(3), allowNull: true },
  nummtr: { field: 'nummtr', type: DataTypes.STRING(20), allowNull: true },
  id4100: { field: 'id4100', type: DataTypes.STRING(36), allowNull: true },
  nlirec: { field: 'nlirec', type: DataTypes.INTEGER, allowNull: true },
  uvcrea: { field: 'uvcrea', type: DataTypes.INTEGER, allowNull: true },
  unicde: { field: 'unicde', type: DataTypes.STRING(3), allowNull: true },
  typope: { field: 'typope', type: DataTypes.STRING(1), allowNull: true },
  numope: { field: 'numope', type: DataTypes.INTEGER, allowNull: true },
  uvcrec: { field: 'uvcrec', type: DataTypes.INTEGER, allowNull: true },
  uvcgra: { field: 'uvcgra', type: DataTypes.INTEGER, allowNull: true },
  uvcimm: { field: 'uvcimm', type: DataTypes.INTEGER, allowNull: true },
  uvcrfu: { field: 'uvcrfu', type: DataTypes.INTEGER, allowNull: true },
  motrfu: { field: 'motrfu', type: DataTypes.STRING(3), allowNull: true },
  uvcrlq: { field: 'uvcrlq', type: DataTypes.INTEGER, allowNull: true },
  mespro: { field: 'mespro', type: DataTypes.STRING(1), allowNull: true },
  pdnrec: { field: 'pdnrec', type: DataTypes.INTEGER, allowNull: true },
  datfab: { field: 'datfab', type: DataTypes.DATE, allowNull: true },
  recsol: { field: 'recsol', type: DataTypes.STRING(1), allowNull: true },
  codmtr: { field: 'codmtr', type: DataTypes.INTEGER, allowNull: true },
  indpro: { field: 'indpro', type: DataTypes.STRING(2), allowNull: true },
  indproa: { field: 'indproa', type: DataTypes.INTEGER, allowNull: true },
  codnds: { field: 'codnds', type: DataTypes.STRING(20), allowNull: true },
  datiimm: { field: 'datiimm', type: DataTypes.STRING(16), allowNull: true },
  heuimm: { field: 'heuimm', type: DataTypes.INTEGER, allowNull: true },
  prxpro: { field: 'prxpro', type: DataTypes.INTEGER, allowNull: true },
  pdbpal: { field: 'pdbpal', type: DataTypes.INTEGER, allowNull: true },
  id4120: { field: 'id4120', type: DataTypes.STRING(36), allowNull: true },
  codemb: { field: 'codemb', type: DataTypes.STRING(3), allowNull: true },
  qtbsor: { field: 'qtbsor', type: DataTypes.INTEGER, allowNull: true },
  qtbent: { field: 'qtbent', type: DataTypes.INTEGER, allowNull: true },
  prxemb: { field: 'prxemb', type: DataTypes.INTEGER, allowNull: true },
  proemb: { field: 'proemb', type: DataTypes.STRING(17), allowNull: true },
  datemb: { field: 'datemb', type: DataTypes.DATE, allowNull: true },
  cumlig: { field: 'cumlig', type: DataTypes.INTEGER, allowNull: true },
  cumpal: { field: 'cumpal', type: DataTypes.INTEGER, allowNull: true },
  coltot: { field: 'coltot', type: DataTypes.INTEGER, allowNull: true },
  totpro: { field: 'totpro', type: DataTypes.INTEGER, allowNull: true },
  uuid: { field: 'uuid', type: DataTypes.STRING(36), allowNull: true },
});

const dataTransferEvents = DB.define('events_transfers', {
  id: {
    field: 'id',
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    unique: true
  },
  key: {
    field: 'key',
    type: DataTypes.TEXT,
    allowNull: false
  },
  json: {
    field: 'json',
    type: DataTypes.TEXT,
    allowNull: false
  }
});

// sequelize.sync({ force: true })
//   .then(() => {
//     console.log(`Database & tables created!`);
//   });

module.exports = {
  DB,
  dataTransfers,
  dataTransferLines,
  dataTransferEvents,
};