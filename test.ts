/*
    npm test
    OUTPUT:
This might take a while...
Total number of sources cruised without any options 5155
Number of test.ts dependencies 1
Total number of sources cruised when not following node_modules 5155
Number of test.ts dependencies 1
Total number of sources cruised when excluding node_modules 1
Number of test.ts dependencies 0
*/

import {cruise} from 'dependency-cruiser';

console.log('This might take a while...');
// 1 dependency for `test.ts`, unexpectedly cruises all node_modules
const outputWithDoNotFollow = cruise(['./'], {doNotFollow: 'node_modules'}).output;
// 1 dependency for `test.ts`, cruises all node_modules as expected
const outputPlain = cruise(['./']).output;
// no dependencies for `test.ts`
const outputExcludingNodeModules = cruise(['./'], {exclude: 'node_modules'}).output;

if (typeof outputPlain !== 'string') {
    console.log('Total number of sources cruised without any options', outputPlain.modules.length);
    const testModule = outputPlain.modules.find(module => module.source === 'test.ts');
    if (!testModule) {
        throw new Error(`test.ts module not found.`);
    }
    console.log('Number of test.ts dependencies', testModule.dependencies.length);
}
if (typeof outputWithDoNotFollow !== 'string') {
    console.log(
        'Total number of sources cruised when not following node_modules',
        outputWithDoNotFollow.modules.length,
    );
    const testModule = outputWithDoNotFollow.modules.find(module => module.source === 'test.ts');
    if (!testModule) {
        throw new Error(`test.ts module not found.`);
    }
    console.log('Number of test.ts dependencies', testModule.dependencies.length);
}
if (typeof outputExcludingNodeModules !== 'string') {
    console.log(
        'Total number of sources cruised when excluding node_modules',
        outputExcludingNodeModules.modules.length,
    );
    const testModule = outputExcludingNodeModules.modules.find(module => module.source === 'test.ts');
    if (!testModule) {
        throw new Error(`test.ts module not found.`);
    }
    console.log('Number of test.ts dependencies', testModule.dependencies.length);
}
