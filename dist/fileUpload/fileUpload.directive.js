'use strict';

/**
 * FileUploadDirective
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
function fileUploadDirective() {
  require('./fileUpload.js');
  return {
    restrict: 'EA',
    transclude: true,
    controller: 'FileUploadController',
    controllerAs: 'fileUploadCtrl',
    templateUrl: '/components/fileUpload/fileUpload.html',
    scope: {
      forFiles: '=',
      forFile: '=',
      multiple: '=',
      accept: '=',
      maxFileSize: '=',
      pattern: '='
    }
  };
}

exports.default = fileUploadDirective;