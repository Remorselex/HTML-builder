// Немного YOLO кода. К слову можно было еще через async сделать. Но да ладно )
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
		makeDir();
		copyDir(filePath);
});

//Адекватный код если надо ->

// let filePath = path.join(__dirname, 'files');
// let copyDirPath = path.join(__dirname, 'files-copy');

// fs.mkdir(filePath, {recursive: true}, () => { });

// fs.readdir(copyDirPath, {withFileTypes: false}, (err, files) =>{

// 	files.forEach(file =>{
// 		fs.copyFile(path.join(filePath, file), path.join(copyDirPath,file),()=>{
// 			console.log(`File ${file} copyed `);
// 		});
// 	});
// });