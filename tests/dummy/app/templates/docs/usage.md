# Usage

Usage content

The barcode parser will take a GS1 barcode and parse it into the individual components.

```js
import * as gs1BarcodeParser from 'ember-gs1-barcode-parser/utils/gs1-barcode-parser';

export default class barcodeExample {
  parse(barcode) {
    let data = gs1BarcodeParser.parseBarcode(barcode);
    
    // data will equal a js object whose properties represent
    // each element in the GS1 barcode
  }
}
  
```

Given the following barcode. Note the @ denotes the group separator in this barcode 
for example purposes. Normally it would be a non-printable ASCII 29 character.

01003617550050242116708357803969@17190831108148200167

After parsing the barcode, data would look like the following

```js
data = {
  "GTIN": "00361755005024",
  "SERIAL": "16708357803969",
  "EXP_DATE": "190831",
  "BATCH": "8148200167"
}
```

Property Names and descriptions are defined in the Application Identifier section

