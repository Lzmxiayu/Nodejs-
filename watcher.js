// 对指定目录进行监视的脚本
const fs = require('fs');
const events = require('events');
class Watcher extends events.EventEmitter {
	constructor(watchDir, processedDir) {
		super();
		this.watchDir = watchDir;
		this.processedDir = processedDir;
	}
	watch() {
		fs.readdir(this.watchDir, (err, files) => {
			if (err) throw err;
			for (var index in files) {
				this.emit('process', files[index]);
			}
		});
	}
	start() {
		fs.watchFile(this.watchDir, () => {
			this.watch();
		});
	}
}
module.exports = Watcher;

// 当指定文件夹内容发生改变，将其移动到另一指定文件夹，并将文件名改成小写
const watchDir='./watch';
const processedDir='./done'
const watcher = new Watcher(watchDir, processedDir);
	watcher.on('process', (file) => {
		const watchFile = `${watchDir}/${file}`;
		const processedFile = `${processedDir}/${file.toLowerCase()}`;
		fs.rename(watchFile, processedFile, err => {
			if (err) throw err;
	});
});
watcher.start();