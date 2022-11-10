const fs = require('fs');
const fsPromises = require('fs/promises');
const { get } = require('https');
const { dirname } = require('path');
const path = require('path');
const { Stream } = require('stream');
const { threadId } = require('worker_threads');

const pathProjectDist = path.join(__dirname, 'project-dist')
const pathStyleBundle = path.join(pathProjectDist, 'style.css')
const pathHtml = path.join(__dirname, 'template.html')
const pathHtmlDist = path.join(pathProjectDist, 'template.html')

function getDirectory() {
	fs.mkdir(pathProjectDist, () => { });
	fs.mkdir(path.join(pathProjectDist, 'assets'), () => { })
}


function getStyle() {
	const pathStyles = path.join(__dirname, 'styles')
	const writeStyleBundle = fs.createWriteStream(pathStyleBundle);

	fs.readdir(pathStyles, { withFileTypes: true }, (err, files) => {
		if (err) throw err;
		files.forEach(file => {
			const sourceFilePath = path.join(pathStyles, file.name);
			if (file.isFile() && path.extname(sourceFilePath) === '.css') {
				const styleReadStream = fs.createReadStream(sourceFilePath);
				styleReadStream.pipe(writeStyleBundle);
			}
		});
	});
}

function getAssets() {
	const pathAssets = path.join(__dirname, 'assets');
	fs.readdir(pathAssets, { withFileTypes: true }, (err, dirs) => {
		dirs.forEach(dir => {
			if (dir.isDirectory()) {
				const pathAssetsDirsDist = path.join(pathProjectDist, 'assets', dir.name);
				const pathAssetsDirs = path.join(pathAssets, dir.name);
				fs.mkdir(pathAssetsDirsDist, { recursive: true }, () => { });
				fs.readdir(pathAssetsDirs, { withFileTypes: false }, (err, files) => {
					files.forEach(file => {
						const pathSource = path.join(pathAssetsDirs, file);
						const pathDestination = path.join(pathAssetsDirsDist, file);
						fs.copyFile(pathSource, pathDestination, (err) => {
							if (err) throw err
						})
					});
				});
			}
		});
	});
}
function transferHtml() {
	const targetPath = path.join(pathProjectDist, 'template.html');
	fs.copyFile(pathHtml, targetPath, () => { });
}

function getHtml() {
	const pathComponents = path.join(__dirname, 'components')
	fs.readFile(pathHtml, 'utf-8', (err, data) => {
		let htmlText = data;
		fs.readdir(pathComponents, { withFileTypes: true }, (err, files) => {
			files.forEach(file => {
				const sourceComponentPath = path.join(pathComponents, file.name)
				fs.readFile(sourceComponentPath, 'utf-8', (err, dataFile) => {
					htmlText = htmlText.replace(`{{${file.name.slice(0, -5)}}}`, dataFile);
					fs.writeFile(pathHtml, htmlText, (err) => { transferHtml()});
				})
			})
		});
	});
}

(async () => {
	getDirectory();
	getStyle();
	getAssets();
	getHtml();
})();
