angular
	.module('app')
	.service('CountdownService', CountdownService);

CountdownService.$inject = [];
function CountdownService() {
	console.log("CountdownServie was called...");
    this.tags = {
        a: true,
        b: true
    };
    this.setTrueTag = function() {
        this.tags.a = true;
        this.tags.b = true;
    };
    this.setFalseTag = function() {
        this.tags.a = false;
        this.tags.b = false;
    };
};