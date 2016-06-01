'use strict';

/**
 * FileUploadDirective
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
function fileUploadDirective() {
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