import fs               from 'fs-extra';
import { assert }       from 'chai';

import ModuleReport     from 'typhonjs-escomplex-commons/src/module/report/ModuleReport';
import ProjectResult    from 'typhonjs-escomplex-commons/src/project/result/ProjectResult';
import TransformFormat  from 'typhonjs-escomplex-commons/src/transform/TransformFormat';

import FormatXML        from '../../src/FormatXML';

import                  '../../src';

// Uncomment to generate matching format test data.
// generateFormatData();

//suite('transform:', () =>
//{
//   const xmlFormat = new FormatXML('xml', 'json');
//
//   const largeModuleJSON = require('typhonjs-escomplex-test-data/files/large-module/report/report');
//
//   const moduleReport = ModuleReport.parse(largeModuleJSON).finalize();
//
//   const output = xmlFormat.formatReport(moduleReport);
//
//   console.log('!! output: \n' + output);
//});

suite('transform:', () =>
{
   const largeModuleJSON = require('typhonjs-escomplex-test-data/files/large-module/report/report');

   const moduleReport = ModuleReport.parse(largeModuleJSON).finalize();

   const output = TransformFormat.format(moduleReport, 'xml');

   console.log('!! output: \n' + output);
});

//suite('transform:', () =>
//{
//   suite('TransformFormat:', () =>
//   {
//      suite('forEach / formatReport (large-module/report):', () =>
//      {
//         const largeModuleJSON = require('typhonjs-escomplex-test-data/files/large-module/report/report');
//
//         const moduleReport = ModuleReport.parse(largeModuleJSON).finalize();
//
//         TransformFormat.forEach((format, formatType) =>
//         {
//            test(`formatType: ${formatType}`, () =>
//            {
//               const output = format.formatReport(moduleReport);
//
//               const original = fs.readFileSync(
//                `./test/fixture/files/large-module/report-${formatType}.${format.extension}`, 'utf8');
//
//               assert.strictEqual(output, original);
//            });
//         });
//      });
//
//      suite('forEach / formatResult (large-module/report):', () =>
//      {
//         const largeProjectJSON = require('typhonjs-escomplex-test-data/files/large-project/results/results-no-reports');
//
//         const projectResult = ProjectResult.parse(largeProjectJSON).finalize();
//
//         TransformFormat.forEach((format, formatType) =>
//         {
//            test(`formatType: ${formatType}`, () =>
//            {
//               const output = format.formatResult(projectResult);
//
//               const original = fs.readFileSync(
//                `./test/fixture/files/large-project/results-no-reports-${formatType}.${format.extension}`, 'utf8');
//
//               assert.strictEqual(output, original);
//            });
//         });
//      });
//   });
//
//   suite('ModuleReport:', () =>
//   {
//      suite('toFormat (large-module/report):', () =>
//      {
//         const largeModuleJSON = require('typhonjs-escomplex-test-data/files/large-module/report/report');
//
//         const moduleReport = ModuleReport.parse(largeModuleJSON).finalize();
//
//         const extensions = ModuleReport.getFormatFileExtensions();
//
//         ModuleReport.getFormatTypes().forEach((formatType, index) =>
//         {
//            test(`formatType: ${formatType}`, () =>
//            {
//               const output = moduleReport.toFormat(formatType);
//
//               const original = fs.readFileSync(
//                `./test/fixture/files/large-module/report-${formatType}.${extensions[index]}`, 'utf8');
//
//               assert.strictEqual(output, original);
//            });
//         });
//      });
//   });
//
//   suite('ProjectResult:', () =>
//   {
//      suite('toFormat (large-project/results):', () =>
//      {
//         const largeProjectJSON = require('typhonjs-escomplex-test-data/files/large-project/results/results');
//
//         const projectResult = ProjectResult.parse(largeProjectJSON).finalize();
//
//         const extensions = ProjectResult.getFormatFileExtensions();
//
//         ProjectResult.getFormatTypes().forEach((formatType, index) =>
//         {
//            test(`formatType: ${formatType}`, () =>
//            {
//               const output = projectResult.toFormat(formatType);
//
//               const original = fs.readFileSync(
//                `./test/fixture/files/large-project/result-${formatType}.${extensions[index]}`, 'utf8');
//
//               assert.strictEqual(output, original);
//            });
//         });
//      });
//
//      suite('toFormat (large-project/results-no-reports):', () =>
//      {
//         const largeProjectJSON = require('typhonjs-escomplex-test-data/files/large-project/results/results-no-reports');
//
//         const projectResult = ProjectResult.parse(largeProjectJSON).finalize();
//
//         const extensions = ProjectResult.getFormatFileExtensions();
//
//         ProjectResult.getFormatTypes().forEach((formatType, index) =>
//         {
//            test(`formatType: ${formatType}`, () =>
//            {
//               const output = projectResult.toFormat(formatType);
//
//               const original = fs.readFileSync(
//                `./test/fixture/files/large-project/results-no-reports-${formatType}.${extensions[index]}`, 'utf8');
//
//               assert.strictEqual(output, original);
//            });
//         });
//      });
//   });
//});
/**
 * Generates the original module report / project result test data.
 */
/*
function generateFormatData()
{
   // Empty formatted result / report matching test data.
   fs.emptyDirSync('./test/fixture/files/large-module');
   fs.emptyDirSync('./test/fixture/files/large-project');

   // Generate project result formatted test data.

   const largeModuleJSON = require('typhonjs-escomplex-test-data/files/large-module/report/report');

   const moduleReport = ModuleReport.parse(largeModuleJSON).finalize();

   TransformFormat.forEach((format, formatType) =>
   {
      test(`formatType: ${formatType}`, () =>
      {
         const output = format.formatReport(moduleReport);

         fs.writeFileSync(
          `./test/fixture/files/large-module/report-${formatType}.${format.extension}`, output, 'utf8');
      });
   });

   // Generate module report formatted test data.

   let largeProjectJSON = require('typhonjs-escomplex-test-data/files/large-project/results/results');

   let projectResult = ProjectResult.parse(largeProjectJSON).finalize();

   TransformFormat.forEach((format, formatType) =>
   {
      test(`formatType: ${formatType}`, () =>
      {
         const output = format.formatResult(projectResult);

         fs.writeFileSync(
          `./test/fixture/files/large-project/result-${formatType}.${format.extension}`, output, 'utf8');
      });
   });


   largeProjectJSON = require('typhonjs-escomplex-test-data/files/large-project/results/results-no-reports');

   projectResult = ProjectResult.parse(largeProjectJSON).finalize();

   TransformFormat.forEach((format, formatType) =>
   {
      test(`formatType: ${formatType}`, () =>
      {
         const output = format.formatResult(projectResult);

         fs.writeFileSync(
          `./test/fixture/files/large-project/results-no-reports-${formatType}.${format.extension}`, output, 'utf8');
      });
   });
}
*/