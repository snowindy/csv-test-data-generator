var fs = require('fs');
var chanceModule = require('./lib/chance');
eval(fs.readFileSync('lib/csvsup.js')+'');
eval(fs.readFileSync('lib/strsup.js')+'');

var chance = new chanceModule.Chance();
var CSV = {delimiter: ","};
var sequenceNumber = 0;

// Taken from http://www.convertcsv.com/generate-test-data.htm
function genData(columns, rows)
{
    var j;
    var cols = columns.length;
    var s = "";
    var fld ="";
    var n=0;
    var t = "";
    
    hdr = [];

    rows = rows*1 || 100;
    for(k=0;k<cols;k++) { // for each field, determine heading and options
       fld = columns[k].split(/[()]/);
       if(fld.length>1)n=fld[1];
       hdr.push({seqObj: null,keyword: columns[k].split('(')[0].toLowerCase().trim(),arg: (fld.length>1) ? fld[1] : "" });
       if(hdr[hdr.length-1].keyword=="seq") {
           if(fld.length>1 && !isNaN(hdr[hdr.length-1].arg)) {
               //alert('seq set at '+(hdr.length-1)+", and starting n at "+ hdr[hdr.length-1].arg);
               hdr[hdr.length-1].seqObj = new SeqObj(hdr[hdr.length-1].arg);
           } else {
               hdr[hdr.length-1].seqObj = new SeqObj(); 
               //alert('seq set at '+hdr.length-1);
           }
           //seqobj.n=hdr[k].arg-1;
       }
    }
    for (j=1;j<=rows;j++) {  // for each row
        for(k=0;k<cols;k++) { // for each field, generate data cell
            switch(hdr[k].keyword) {
                case 'age' : 
                   s += chance.age();
                   break;
                case 'alpha' :   //alpha or alpha(n)
                   n=hdr[k].arg;
                   if(n!="") {
                      s += chance.string({pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', length: n}); 
                   }
                   else {
                      s += chance.string({pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'}); 
                   }
                   break;
                case 'birthday' :
                   n=hdr[k].arg;
                   switch(n) {
                      case '2' : s += chance.birthday({string: true, american: false}).toCsv(CSV.delimiter);break;
                      default: s += chance.birthday({string: true}).toCsv(CSV.delimiter);break;
                   }
                   break;
                case 'bool' :   
                   s += chance.bool();
                   break;
                case 'city' : 
                   s += chance.city().toCsv(CSV.delimiter);
                   break;
                case 'ccnumber' : 
                   s += chance.cc().toCsv(CSV.delimiter);
                   break;
                case 'char' : // one character
                   s += chance.character();
                   break;
                case 'date' :
                   n=hdr[k].arg;
				   
				   function getRandomInt(min, max) {
				      return Math.floor(Math.random() * (max - min + 1)) + min;
				   }
				   
				   // MySQL Timestamp-compatible year value
				   var year = getRandomInt(1971, 2037);
				   
                   switch(n) {
                      case '2' : s += chance.date({string: true, american: false, year: year}).toCsv(CSV.delimiter);break;
                      case '3' : t = chance.date({year: year});
                               t = t.getFullYear() + '/' + ("0" + (t.getMonth() + 1)).slice(-2) + '/' + ("0" + t.getDate()).slice(-2);
                               s += t;
                               break;
                      case '4' : t = chance.date({year: year});
                               t = t.getFullYear() + ("0" + (t.getMonth() + 1)).slice(-2) + ("0" + t.getDate()).slice(-2);
                               s += t;
                               break;
                      default: s += chance.date({string: true, year: year}).toCsv(CSV.delimiter);break;
                   }
                   break;
                   
                case 'digit' :
                   n=hdr[k].arg;
                   if(n!="" && n>0) {
                      s += chance.string({pool: '0123456789', length: n}); 
                   }
                   else {
                      s += chance.string({pool: '0123456789'}); 
                   }
                   break;
                case 'dollar' :
                   s += chance.dollar().toCsv(CSV.delimiter);
                   break;
                case 'domain' :
                   s += chance.domain().toCsv(CSV.delimiter);
                   break;
                case 'email' :
                   s += chance.email().toCsv(CSV.delimiter);
                   break;
                case 'first' : 
                   s += chance.first().toCsv(CSV.delimiter);
                   break;
                case 'float' : 
                   s += chance.floating();
                   break;
                case 'gender' :
                   s += chance.gender();
                   break;
                case 'integer' : 
                   s += chance.integer({min: -999999, max: 999999});
                   break;
                case 'last' : 
                   s += chance.last().toCsv(CSV.delimiter);
                   break;

                case 'latitude' : 
                   s += chance.latitude();
                   break;
                case 'longitude' : 
                   s += chance.longitude();
                   break;

                case 'mi' : // middle initial
                   s += chance.character({alpha: true, casing : 'upper'});
                   break;
                case 'name' : 
                   s += chance.name().toCsv(CSV.delimiter);
                   break;
                case 'natural' : 
                   n=hdr[k].arg;
                   if(n!="" && (n*1)>=0) {
                      s += chance.natural({max: n});
                   }else{
                      s += chance.natural();
                   }
                   break;
                case 'paragraph' : // argument is max length in characters
                   n=hdr[k].arg;
                   if(n!="" && (n*1)>0) {
                      s += chance.paragraph().left(n).toCsv(CSV.delimiter);
                   }else{
                      s += chance.paragraph().toCsv(CSV.delimiter);
                   }
                   break;
                case 'phone' : 
                   s += chance.phone().toCsv(CSV.delimiter);
                   break;
                case 'pick' : 
                   fld=hdr[k].arg;
                   s += chance.pick(fld.split('|')).toCsv(CSV.delimiter);
                   break;
                case 'postal' : 
                   s += chance.postal().toCsv(CSV.delimiter);
                   break;
                case 'province' : 
                   s += chance.province().toCsv(CSV.delimiter);
                   break;
                case 'sentence' : // argument is max length in characters
                   n=hdr[k].arg;
                   if(n!="" && (n*1)>0) {
                      s += chance.sentence().left(n).toCsv(CSV.delimiter);
                   }else{
                      s += chance.sentence().toCsv(CSV.delimiter);
                   }
                   break;
                case 'seq' :
                   sequenceNumber += 1;
	           s += sequenceNumber.toString();
                   //s += hdr[k].seqObj.next();
                   //s += seqobj.next();
                   break;
                case 'state' :
                   s += chance.state().toCsv(CSV.delimiter);
                   break;
                case 'street' :
                   s += chance.street().toCsv(CSV.delimiter);
                   break;
                case 'string' : 
                   n=hdr[k].arg;
                   if(n!="" && (n*1)>0) {
                      s += chance.string({length: n}).toCsv(CSV.delimiter);
                   }else{
                      s += chance.string().toCsv(CSV.delimiter);
                   }
                   break;
                case 'word' :
                   s += chance.word().toCsv(CSV.delimiter);
                   break;
                case 'yn' : 
                   s += chance.character({pool: 'YN'});
                   break;
                case 'zip' : 
                   s += chance.zip(); 
                   break;
                case 'zip9' : 
                   s += chance.zip({plusfour: true});
                   break;
                case 'yn' : 
                   s += chance.character({pool: 'YN'});
                   break;
                default:
                   fld=columns[k];
                   if(fld=="FIELD"+(k+1))fld="";
                   s += fld.toCsv(CSV.delimiter);
                   break;

            }
            if(k<cols-1) {
                s+=CSV.delimiter;
            }
        }
        s+="\n";
    }
    return s;
}

var dataRowsRequired = process.argv[3];
var chunkSize = 1000;
var columns = process.argv[2].split(',');

console.log('dataRowsRequired', dataRowsRequired);
console.log('columns', columns);

var outputFileName = process.argv.length > 4? process.argv[4]: 'out.csv';
if (fs.existsSync(outputFileName)){
	fs.unlinkSync(outputFileName);
}

// create a loop so that calls to fs.appendFile can be done in a sequential fashion.
var loop = function (index) {
	if(index >= dataRowsRequired) {
		console.log('file generated');
	} else {
		let remainder = dataRowsRequired - index;
		let size = chunkSize>remainder ? remainder: chunkSize;
		let csvStringPart = genData(columns, size);
		console.log("Appending csv part ", index ," of size ", size);
		fs.appendFile(outputFileName, csvStringPart, function (err) {
			if(err) {
				return console.log(err);
			}
			loop(index + chunkSize);
		});
	}
}

loop(0);  // start asynch loop
