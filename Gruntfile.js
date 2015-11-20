module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			dist: {
				options: {
					mangle: {
						except: ['angular']
					},
					wrap: '<%= pkg.name %> ',
					compress: true,
					banner: '/*! <%= pkg.name %>  \n'
						+ ' * Copyright 2015-<%= grunt.template.today("yyyy") %> sevdog\n'
						+ ' *\n'
						+ ' * Licensed under the Apache License, Version 2.0 (the "License");\n'
						+ ' * you may not use this file except in compliance with the License.\n'
						+ ' * You may obtain a copy of the License at\n'
						+ ' * \n'
						+ ' *    http://www.apache.org/licenses/LICENSE-2.0\n'
						+ ' * \n'
						+ ' * Unless required by applicable law or agreed to in writing, software\n'
						+ ' * distributed under the License is distributed on an "AS IS" BASIS,\n'
						+ ' * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n'
						+ ' * See the License for the specific language governing permissions and\n'
						+ ' * limitations under the License. \n */\n'
				},
				src: ['src/js/app/i18n/*.js', 'src/js/app/app.js', 'src/js/app/controllers/*.js',
				      'src/js/app/services/*.js', 'src/js/app/directives/*.js', 
				      'src/js/app/templates/<%= pkg.name %>.js'],
				dest: 'dist/js/<%= pkg.name %>.js'
			},
			pack: {
				mangle: false,
				src: ['src/js/assets/angular.min.js', 'src/js/assets/*.js'],
				dest: 'dist/js/assets.js'
			}
		},
		copy : {
			pack: {
				expand: true,
				cwd: 'src/fonts/',
				src: '**',
				dest: 'dist/fonts/'
			}
		},
		ngtemplates: {
			app: {
				cwd: 'src/templates/',
				src: '*.html',
				dest: 'src/js/app/templates/<%= pkg.name %>.js',
				options: {
					module: '<%= pkg.name %>',
					prefix: 'templates/',
					htmlmin: {
						collapseWhitespace: true,
						collapseBooleanAttributes: true,
						removeComments: true
					}
				}
			}
		},
		cssmin: {
			options: {
				s0: true,
			},
			dist: {
				src: 'src/css/*.css',
				dest: 'dist/css/<%= pkg.name %>.css'
			},
			pack: {
				src: 'src/css/assets/*.css',
				dest: 'dist/css/assets.css'
			}
		},
		replace: {
			pack: {
				options: {
					patterns: [{
						match: '../../fonts/',
						replacement: '../fonts/'
					}],
					usePrefix: false
				},
				src: 'dist/css/assets.css',
				dest: 'dist/css/assets.css'
			},
			dist: {
				options: {
					patterns: [{
						match: /<!-- Dev(.|\s)*?\/Dev -->/g,
						replacement: ''
					}, {
						match: '<!-- Prod-js -->',
						replacement: '<script type="text/javascript" src="./js/assets.js"></script>\n' +
							'	<script type="text/javascript" src="./js/rspls.js"></script>'
					}, {
						match: '<!-- Prod-css -->',
						replacement: '<link href="./css/assets.css" type="text/css" rel="stylesheet">\n' +
							'	<link href="./css/rspls.css" type="text/css" rel="stylesheet">'
					}],
					usePrefix: false
				},
				src: 'src/index.html',
				dest: 'dist/index.html'
			}
		},
		jasmine: {
			src: ['src/js/app/i18n/*.js', 'src/js/app/app.js', 'src/js/app/controllers/*.js',
			      'src/js/app/services/*.js', 'src/js/app/directives/*.js', 
			      'src/js/app/templates/<%= pkg.name %>.js'],
			options: {
				vendor: ['src/js/assets/angular.min.js', 'src/js/assets/*.js'],
				helpers: ['test//helpers/*.js'],
				specs: ['test/services/*.js'],
				summary: true
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-angular-templates');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-replace');
	grunt.loadNpmTasks('grunt-contrib-jasmine');

	grunt.registerTask('dist', ['ngtemplates', 'uglify:dist', 'replace:dist', 'cssmin:dist']);
	grunt.registerTask('pack', ['uglify:pack', 'copy:pack', 'cssmin:pack', 'replace:pack']);
	grunt.registerTask('test', ['jasmine']);

};
