import * as child_process from 'child_process';
import * as path from 'path';
import * as clipboardy from 'clipboardy';
import * as lib from './lib';

const  scriptPath =  `../build/indenter.js`;
const  testFolderPath = `test_data` + path.sep;

async function  main() {
	await TestOfSimpleRun();
	console.log('Pass');
}

// TestOfSimpleRun
async function  TestOfSimpleRun() {
	let  returns: ProcessReturns;

    console.log(`TestCase: TestOfSimpleRun`);
	console.log(clipboardy.readSync());

    // Test Main
    returns = await callChildProccess(`node ${scriptPath}`, {});

	// Check
	console.log(clipboardy.readSync());
}

// callChildProccess
async function  callChildProccess(commandLine: string,  option?: ProcessOption): Promise<ProcessReturns> {
	return   new Promise( async (resolveFunction, rejectFunction) => {
		const  returnValue = new ProcessReturns();
		try {
			const  childProcess = child_process.exec( commandLine,

				// on close the "childProcess" (2)
				(error: child_process.ExecException | null, stdout: string, stderr: string) => {
					returnValue.stdout = stdout;
					returnValue.stderr = stderr;
					resolveFunction(returnValue);
				}
			);
			if (option && childProcess.stdin) {

				if (option.inputLines) {
					await new Promise(resolve => setTimeout(resolve, 300));
					for (const inputLine of option.inputLines) {
						console.log(inputLine);
						childProcess.stdin.write(inputLine + "\n");
						await new Promise(resolve => setTimeout(resolve, 200));
					}
				}
				childProcess.stdin.end();
			}

			// on close the "childProcess" (1)
			childProcess.on('close', (exitCode: number) => {
				returnValue.exitCode = exitCode;
			});
			childProcess.on('exit', (exitCode: number) => {
				returnValue.exitCode = exitCode;
			});
		} catch (e) {
			throw Error(`Error in the command line ${commandLine}`);
		}
	});
}

// ProcessOption
class ProcessOption {
	inputLines?: string[];
}

// ProcessReturns
class ProcessReturns {
	exitCode: number = 0;
	stdout: string = '';
	stderr: string = '';
}

const  testFolderFullPath = lib.getFullPath( `../src/${testFolderPath}`, process.cwd());
const  cutBOM = 1;
const  notFound = -1;
main();
