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
				src: ['src/js/assets/angular.min.js', 'src/js/assets/*.js'],
				dest: 'dist/js/assets.js'
			}
		},
		copy : {
			main: {
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
					//append: true,
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
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-angular-templates');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-replace');

	grunt.registerTask('dist', ['ngtemplates', 'uglify:dist', 'cssmin:dist']);
	grunt.registerTask('pack', ['uglify:pack', 'copy', 'cssmin:pack', 'replace']);

};
