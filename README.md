# Citizen Engagement Mobile Application

<a name="top"></a>

This repository contains the "Reporter" mobile application.

* [Features](#features)

* [The user interface](#ui)
* [Install application dependencies](#setup-deps)
* [Serve the application locally](#setup-serve)


<a name="features"></a>
## Features

This guide describes the list of features, with their current development status.

The app allows "citizens" to do the following:

* [in progress] add new issues 
  * [complete] the issue should have a type and description;
  * [not done]the user should be able to take a photo of the issue;
  * [in progress]the issue should be geolocated;
* [complete] see existing issues on an interactive map ;
* [complete] browse the list of existing issues:
  * [complete] issues's status is visible;
  * [in progress] issues should be sorted by date ;
* [complete] see the details of an issue :
  * date;
  * description;
  * picture;
  * comments;
* [in progress] add comments to an issue .

The  app allows "staff" to do the following:

* [in progress] add new issues
  * see above
* [complete]see existing issues on an interactive map;
* [complete] browse the list of existing issues:
  * [complete] issues's status is visible;
  * [in progress] allow the staff to assign issue to himself;
  * [in progress] issues should be sorted by date;
* [complete] see the details of an issue:
  * date;
  * description;
  * picture;
  * comments;
* [in progress] add comments to an issue.

<a href="#top">Back to top</a>


<a name="ui"></a>
## 1. The user interface

This app proposes to use a tab view with 3 screens, and an additional 4th screen accessible from the issue list:

* the new issue tab;
* the issue map tab;
* the issue list tab:
  * the issue details screen.

<a href="#top">Back to top</a>

<a name="setup-deps"></a>
### Install application dependencies

Install development tools with:

    npm install

Make sure you have Bower installed (you might need to run this command with `sudo`):

    npm install -g bower

Install application libraries with:

    bower install

<a href="#top">Back to top</a>

<a name="setup-serve"></a>
### Serve the application locally

To make sure everything was set up correctly, use the following command from the repository to serve the application locally in your browser:

    ionic serve

<a href="#top">Back to top</a>
