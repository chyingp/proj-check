/**
 * 项目自动化检查，包括：
 * 1、monitor上报
 * 2、TODO badjs、测速、xxx？（对脚手架有要求）
 */
require("babel-register")({
	presets: [
	    require("babel-preset-env"),
	]
});

const glob = require('glob');
const fs = require('fs');

const configFilePaths = glob.sync('src/pages/**/report/config.js', {
	realpath: true
});

function getInvalidMonitorArr(filepath) {
	
	const mod = require(filepath);
	const reportMonitorConf = mod.REPORT_MONITOR;
	let invalidArr = [];

	for (let key in reportMonitorConf) {
		let value = reportMonitorConf[key] - 0;
		if (value === 0 || value === 1) {
			invalidArr.push(key);
		}		
	}

	return invalidArr;
}

function isBadjsIdValid(filepath) {
	const mod = require(filepath).default;
	const badjsId = mod.badjsId - 0;
	if (badjsId === 1 || badjsId === 0) {
		return false;
	} else {
		return true;
	}
}

function checkBadjs() {
	const pattern = 'src/pages/index/business/window-gConfig';
	const configFilePaths = glob.sync(pattern, {
		realpath: true
	});
	// console.log(`[badjs配置检查] 开始.`);
	configFilePaths.forEach((filepath, index) => {
		const seq = index + 1;
		console.log(`[${seq}] 配置文件路径：${filepath}`);
		const isValid = isBadjsIdValid(filepath);
		if (isValid === true) {
			console.log(`[${seq}] 检查结论：通过.`);
		} else {
			console.log(`[${seq}] 检查结论：不通过.`);
			console.log(`[${seq}] 错误id：badjsId.`);
		}		
	});
	// console.log(`[badjs配置检查] 结束.`);
}

function checkMonitor() {
	const pattern = 'src/pages/**/report/config.js';
	const configFilePaths = glob.sync(pattern, {
		realpath: true
	});
	// console.log(`[monitor配置检查] 开始.`);
	configFilePaths.forEach((filepath, index) => {
		const seq = index + 1;
		console.log(`[${seq}] 配置文件路径：${filepath}`);
		const invalidArr = getInvalidMonitorArr(filepath);
		if (invalidArr.length === 0) {
			console.log(`[${seq}] 检查结论：通过.`);
		} else {
			console.log(`[${seq}] 检查结论：不通过.`);
			console.log(`[${seq}] 有问题的上报项：${invalidArr.join(', ')}.`);
		}		
	});
	// console.log(`[monitor配置检查] 结束.`);	
}

function setLabelAndRun(label, callback) {
	console.log(`[${label}] 开始.`);
	callback();
	console.log(`[${label}] 结束.\n`);
}

function run() {
	setLabelAndRun('monitor配置检查', checkMonitor);
	setLabelAndRun('badjs配置检查', checkBadjs);
}

exports.run = run;