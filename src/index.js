import TransformFormat  from 'typhonjs-escomplex-commons/src/transform/TransformFormat';

import FormatXML        from './FormatXML';

/**
 * Iterates through all `json` formats creating a FormatXML instance for each one.
 */
TransformFormat.forEachExt('json', (jsonFormat, jsonFormatName) =>
{
   if (jsonFormat.type !== 'checkstyle')
   {
      let formatType = jsonFormatName.replace(/^json/, 'xml');

      if (!formatType.startsWith('xml')) { formatType = `xml-${formatType}`; }

      TransformFormat.addFormat(new FormatXML(formatType, jsonFormat.type, jsonFormatName));
   }
});