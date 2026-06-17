const fs = require('fs');
const path = require('path');
const minify = require("babel-minify");

// check source-directory argument
if (process.argv[2] == undefined)
{
	console.error('\x1b[31mError: no config file.\nUsage: node.build.js [config-file(.json)]');
	process.exit(1)
}

// environment variables
const _buildDir = __dirname + "/build";

function directoryExist(path)
{
	console.log("\n\x1b[36mSource directory path:\x1b[0m " + path);

	if (!fs.existsSync(path))
	{
		console.error('\x1b[31mError: source-directory path \"' + path + '\" not found.');
		process.exit(1)
	}
}

function filesExist(fileList, path)
{
	process.stdout.write("\n\x1b[33m> Validating source-files...");

	for (var i = 0; i < fileList.length; i++)
	{
		if (!fs.existsSync(path + "/" + fileList[i]))
		{
			console.error('\x1b[31mError: file \"' + fileList[i] + '\" not found in source-directory path.');
			process.exit(1)
		}
	}

	process.stdout.write("ok\x1b[0m\n")
}

function createBuildFolder(path)
{
	if (!fs.existsSync(path))
	{
		console.log("\n\x1b[33m> Creating directory:\x1b[0m " + path);
	    fs.mkdirSync(path, { recursive: true });
	}
}

function concatFiles(fileList, path)
{
	var fileBuffer = "";
	for (var i = 0; i < fileList.length; i++)
	{
		var file = fs.readFileSync(path + "/" + fileList[i], 'utf8');
		fileBuffer += file + "\n\n";
		console.log("   + \"" + fileList[i] + "\"");
	}

	return fileBuffer;
}

function buildProductionFile(fileList, outputFileName, path)
{
	console.log("\n\x1b[33m> Building production file:\x1b[0m " + outputFileName);
	console.log("\n\x1b[36m> Concatinating:\x1b[0m");

	var fileBuffer = concatFiles(fileList, path);
	fs.writeFileSync(outputFileName, fileBuffer);
}

function compressProductionFile(inputFileName, outputFileName)
{
	console.log("\n\x1b[33m> Compressing production file:\x1b[0m " + outputFileName);

	const minifyInputFile = fs.readFileSync(inputFileName, 'utf8');
	const minifyOutputObj = minify(
		minifyInputFile,
		{
			mangle: {
				keepClassName: true,
			}
		}
	);

	fs.writeFileSync(outputFileName, minifyOutputObj.code);
}

function buildProject(project)
{
	console.log("\n------------------------------------------------\n\n\x1b[34mBuilding project:\x1b[0m " + project.name); 

	filesExist(project.fileList, project.sourcePath);
	createBuildFolder(_buildDir);
	buildProductionFile(project.fileList, project.productionFilePath, project.sourcePath);

	if (project.compressedFilePath)
	{
		compressProductionFile(project.productionFilePath, project.compressedFilePath);
	}
	
	console.log("\n\x1b[32m> All files compiled successfully:\x1b[0m " + project.name + "\n")
}

function readConfig(configFile)
{
	console.log("\x1b[36mLoaded config file:\x1b[0m " + path.resolve(configFile));

	var buildConfig = require(configFile);
	buildConfig.productionFilePath = _buildDir + "/" + buildConfig.productionFile;
	buildConfig.compressedFilePath = buildConfig.compressedFile != undefined ? _buildDir + "/" + buildConfig.compressedFile : undefined;
	buildConfig.sourcePath = path.resolve(buildConfig.sourcePath);

	return buildConfig;
}

try
{
	for (var i = 2; i < process.argv.length; i++)
	{
		const configFile = path.resolve(process.argv[i])
		const buildConfig = readConfig(configFile);
		directoryExist(buildConfig.sourcePath);
		buildProject(buildConfig);
	}
	
	process.exit(0)
}
catch (error)
{
	console.error('\x1b[31mError: ' + error.message + '\x1b[0m');
	process.exit(1)
}