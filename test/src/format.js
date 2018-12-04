import fs               from 'fs-extra';
import { assert }       from 'chai';

import ModuleReport     from 'typhonjs-escomplex-commons/src/module/report/ModuleReport';
import ProjectReport    from 'typhonjs-escomplex-commons/src/project/report/ProjectReport';
import TransformFormat  from 'typhonjs-escomplex-commons/src/transform/TransformFormat';

import FormatXML        from '../../src/FormatXML';

import                  '../../src';

// Uncomment to generate matching format test data.
// generateFormatData();
runTests();

/**
 * Runs the tests
 */
function runTests()
{
   suite('transform:', () =>
   {
      suite('TransformFormat:', () =>
      {
         suite('forEachExt / formatReport (large-module/report):', () =>
         {
            const largeModuleJSON = require('typhonjs-escomplex-test-data/files/large-module/json/module');

            const moduleReport = ModuleReport.parse(largeModuleJSON).finalize();

            TransformFormat.forEachExt('xml', (format, formatName) =>
            {
               test(`formatName: ${formatName}`, () =>
               {
                  const output = format.formatReport(moduleReport);

                  const original = fs.readFileSync(
                   `./test/fixture/files/large-module/report-${formatName}.${format.extension}`, 'utf8');

                  assert.strictEqual(output, original);
               });
            });
         });

         suite('forEachExt / formatResult (large-project/results):', () =>
         {
            const largeProjectJSON = require('typhonjs-escomplex-test-data/files/large-project/json/project');

            const projectResult = ProjectReport.parse(largeProjectJSON).finalize();

            TransformFormat.forEachExt('xml', (format, formatName) =>
            {
               test(`formatName: ${formatName}`, () =>
               {
                  const output = format.formatResult(projectResult);

                  const original = fs.readFileSync(
                   `./test/fixture/files/large-project/result-${formatName}.${format.extension}`, 'utf8');

                  assert.strictEqual(output, original);
               });
            });
         });

         suite('forEachExt / formatResult (large-project/results-no-reports):', () =>
         {
            const largeProjectJSON = require(
             'typhonjs-escomplex-test-data/files/large-project/json/project-no-modules');

            const projectResult = ProjectReport.parse(largeProjectJSON).finalize();

            TransformFormat.forEachExt('xml', (format, formatName) =>
            {
               test(`formatName: ${formatName}`, () =>
               {
                  const output = format.formatResult(projectResult);

                  const original = fs.readFileSync(
                   `./test/fixture/files/large-project/results-no-reports-${formatName}.${format.extension}`, 'utf8');

                  assert.strictEqual(output, original);
               });
            });
         });
      });
   });
}

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

   TransformFormat.forEachExt('xml', (format, formatName) =>
   {
      test(`formatName: ${formatName}`, () =>
      {
         const output = format.formatReport(moduleReport);

         fs.writeFileSync(
          `./test/fixture/files/large-module/report-${formatName}.${format.extension}`, output, 'utf8');
      });
   });

   // Generate module report formatted test data.

   const largeProjectJSON = require('typhonjs-escomplex-test-data/files/large-project/results/results');

   const projectResult = ProjectReport.parse(largeProjectJSON).finalize();

   TransformFormat.forEachExt('xml', (format, formatName) =>
   {
      test(`formatName: ${formatName}`, () =>
      {
         const output = format.formatResult(projectResult);

         fs.writeFileSync(
          `./test/fixture/files/large-project/result-${formatName}.${format.extension}`, output, 'utf8');
      });
   });


   const largeProjectJSON2 = require('typhonjs-escomplex-test-data/files/large-project/results/results-no-reports');

   const projectResult2 = ProjectReport.parse(largeProjectJSON2).finalize();

   TransformFormat.forEachExt('xml', (format, formatName) =>
   {
      test(`formatName: ${formatName}`, () =>
      {
         const output = format.formatResult(projectResult2);

         fs.writeFileSync(
          `./test/fixture/files/large-project/results-no-reports-${formatName}.${format.extension}`, output, 'utf8');
      });
   });
}
*/