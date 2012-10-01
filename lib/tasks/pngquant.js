/**
 * pngquant.js - PNG optimization via pngquant
 * 
 * Copyright (c) 2012 DIY Co
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this 
 * file except in compliance with the License. You may obtain a copy of the License at:
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under 
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF 
 * ANY KIND, either express or implied. See the License for the specific language 
 * governing permissions and limitations under the License.
 *
 * @author Zachary Bruggeman <zbruggeman@me.com>
 */

var _        = require('underscore'),
	exec     = require('child_process').exec,
	colorize = require('../colorize');

module.exports = function(roto) {

	roto.defineTask('pngquant', function(callback, options, target, globalOptions) {

		var files;
		var args = [];

		_.defaults(options, {
			binary    : './bin/pngquant',
			force     : true,
			verbose   : false,
			suffix    : '.png',
		});

		// read files
		var files = roto.findFiles(options.files, options.ignore);
		if (!files.length) {
			roto.error(colorize('Error: ', 'red') + 'No valid files were provided. \n');
			return callback(false);
		};

		// push args
		if (options.force) {
			args.push('--force');
		};
		if (options.verbose) {
			args.push('--verbose');
		}
		args.push('--ext ' + options.suffix);
		args.push('-- ' + files.join(' '));

		// run pngquant
		var proc = exec(options.binary + ' ' + args.join(' '), function(err, stdout, stderr) {
			if (err) {
				throw err;
			} else {
				roto.notice(stderr + '\n');
				callback();
			}
		});

	});
};