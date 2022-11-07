const fs = require('fs');
const path = require('path');

const bundleDirPath = path.join(__dirname, 'project-dist', 'bundle.css')
const stylesPath = path.join(__dirname, 'styles')

const bundleWriteStream = fs.createWriteStream(bundleDirPath);

fs.readdir(stylesPath,{ withFileTypes: true }, (err,files)=>{
	if(err) throw err;
	files.forEach(file => {

		const sourceFilePath = path.join(stylesPath,file.name)
			if(file.isFile() && path.extname(sourceFilePath) === '.css'){
				const styleReadStream = fs.createReadStream(sourceFilePath);
				styleReadStream.pipe(bundleWriteStream);
			}
	});
});