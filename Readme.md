Node-workout-robot
=========================

This web application will help you keep fit on your lunch-break by designing and running a workout for your to perform.


Note:
-----
Other than the libraries I used, the only code I did not write was the CSS - CSS styling is very time consuming and depending on what your doing, you can spend 3 hours trying to got even a small part of an application to look right.
In-spite of all the RAD software \ languages and libraries I used - this application still took me 12 hours to build.


Running
-------------
This application was developed inside  a Vagranted Environment, so will require Vagrant to be installed for the following commands to work
http://www.vagrantup.com/ has information on how to install vagrant

######Firstly
	unzip the project and cd into the project directory
######Execute:
	vagrant box add precise64 http://files.vagrantup.com/precise64.box
	vagrant plugin install vagrant-salt  )
This will download an ubuntu virtual machine and install a plug-in required for salt to be used a provisioning system 

I actually have created a pull request on the vagrant repo that allows salt to come as a pre-installed provisioning system for Vagrant (fingers crossed its included in the next version of vagrant! see - https://github.com/mitchellh/vagrant/pull/1626)

######Finally Execute
	vagrant up

This may take a while, but it should download all required software (node.js, mysql and dependencies OS libraries) to a guest vm, and start the application.

	Navigate to http://localhost:3200 in a browser to see everything in action.


Running Testcases
-------------
	Test can be run at http://localhost:3200/SpecRunner.html 



Notable Files and Folders
-------------
*	__entry.js__ - application entry point, takes to arguments, init (populates the database) and start (runs the application)

*	__package.json__ - details information about the project, and lists dependand node.js libraries

*	__public__ - were all static content is located

*	__public/app.coffee__ - code that runs the web client 

*	__public/spec/ApplicationSpec.coffee__  - contains the web clients test cases

*	__views/index.jade__ - this gets processed into HTML and  served to the client

*	__srv/salt/node.sls__ - specifies what needs to be installed and run inside the guest vm




Technologies
-------------
This is were I justify my technology choices, however I will try and avoid reasons such as - I can develop the application faster, as ultimately many reasons will boil down to this anyway.

### Languages
#####Coffee-script:
Coffee-script makes it easy to embedded HTML and interpolate variables without a template engine inside a script, see #Client Side Rendering Without Template Engine As for the test cases they were written in coffee script as they are much easier to read than javascript test cases

#####Javascript:
Node.js is a javascript runtime, see #Node.JS for more information

#####Jade:
Jade acts as a alternative syntax for html with a little extra features, this was used to allow rapid prototyping of the UI

###Software
#####Mysql:
Easy setup, and good support by many libraries

#####Node.js:
A Very large number of great RAD frameworks run in node.js

#####Vagrant + Salt:
This will make getting this application up and running (so it can be evaluated \ improved) on other pc's much easier

###Client-side libraries
#####JQuery\Jquery-ui
Makes DOM manipulation \ ajax \ and event binding easier and cross platform

#####Underscore
Needed to compile client side coffee-script and has some really cool helper functions to help help with my FP approach (did not use any of them however)

#####Nothing Else?
I was thinking of using backbone, however I was not doing anything that would warrant overhead of defining everything under the backbone structure, however I did copy its core philosophy so I guess its there in spirit!

###Server-side libraries
#####Express.js
Its a very well established web application framework although it is lightweight it has alot  of support baked in, and extending it on the chance that it did not do what I needed would not be difficult.

#####Sequelize
This is an ORM framework that makes working with databases very easy and efficient, this made defining a setup process for the database very easy.


Approach
-------------

##### Client side Rendering
Rendering components client-side is required for real-time applications, and allows for better separation of concerns between the Server and Client,
The server now became only responsible for API access and serving static content, and the client responsible for processing data from the API and communicating with it.

##### Functional Style \ Very little state
I Moved all application state to Model and Model.state and had the rest of the application either manipulate that or base its own state upon it.
This made developing this application easy and resulted in less time troubleshooting bugs as there is less that can be caused by taking this approach.


##### No Template engine, and raw HTML string manipulation
This application was designed to be run on a mobile phone and the design involved large portions of the screen being re-rendered every second.
DOM manipulation can be expensive, and managing state in a UI can become difficult and hard to troubleshoot (page taken out of the backbone.js book).


##### Restish API + JSONP
The phone interview alluded to heavy application of REST, and Cross origin resources, so I thought I would make my application Cross origin friendly, which it is entirely.

##### CSS Theme
I used a CSS Theme similar to Twitters Bootstrap, this was entirely to allow for the delivery for a visually pleasing product without having to sacrifice time from other area's of the application. However this did require an understanding of CSS to build the interface correctly.
