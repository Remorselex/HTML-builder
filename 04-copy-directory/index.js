// Да-да, можно было бы попробовать написать с помощью async/await, но какое задание - такое рещение. Собсна YOLO... То есть.... YAGNI ?
const fs = require('fs');
const path = require('path');

let filePath = path.join(__dirname, 'files');
let copyDirPath = path.join(__dirname, 'files-copy');

function copyDir(filePath) {
	return fs.readdir(filePath, (err, files) => {
		if (err) throw err;
		files.forEach(file => {
			const source = path.join(__dirname, 'files', file);
			const destinationDirectory = path.join(__dirname, 'files-copy', file);
			fs.copyFile(source, destinationDirectory, err => {
				if (err) throw err;
				console.log(`copying of "${file}" completed`);
			});
		});
	})
}
function makeDir(){
	fs.mkdir(copyDirPath, { recursive: true }, err => {
		if (err) throw err;
	});
}

fs.rm(copyDirPath, { recursive: true, force: true }, err => {
	if (err === 'ENOENT') {
		makeDir();
		copyDir(filePath)
	}
	else{
		makeDir();
		copyDir(filePath);
	}
});

makeDir();




