const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { stdin, stdout } = process;

const filePath = path.join(__dirname, 'text.txt');

fs.writeFile(filePath, '', {}, (err) => {
	if (err) throw err;
})

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

rl.prompt();

console.log('Write your text to save in new file or write "exit" to close program')

rl.on('line', function (cmd) {
	if (cmd.trim() === 'exit'){
		rl.close();
	} 
	fs.appendFile(filePath, cmd, (err) => {
		if (err) throw err;
	})
})

process.on('exit', () => stdout.write('Bye-bye, ma friendo'));

