Style Guide

	Please follow AirBnb Style Guide , can be found in github


To start

	install angular-cli 

		npm install -g @angular/cli

	After cloning navigate to client folder

	We are using angular-cli , So all the features of angular-cli apply here , Also you can see that down
	Do 
		npm install
		ng serve

Folder Structure

	app

		We have lazy loading modules like auth , dashboard (more to be added) with their own internal routing

		All modules my contain their own directive , providers , services



		directives
			Will contain all the directives that are shared with all the modiles

		services
			Will contain services that are shared with all the modules

		data-models
			Will contain entity classes eg, user, idea , etc

	assets

		Will contain images , videos etc

	Rest of the files we dont need to worry about now, those will change very rarely or never



# Client

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
