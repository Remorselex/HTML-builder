const fs = require('fs');
const path = require('path');

let filePath = path.join(__dirname, 'secret-folder');

fs.readdir(filePath, { withFileTypes: true }, (err, files) => {

	files.forEach(file => {
		if (file.isFile()) {
			fs.stat(filePath + `\\${file.name}`, (err, fileInfo) => {
				let fileSize = (fileInfo.size / 1024).toFixed(2);
				console.log(`${path.parse(file.name).name} - ${path.extname(file.name).slice(1)} - ${fileSize}kb`)
			});
		}
	});

});


