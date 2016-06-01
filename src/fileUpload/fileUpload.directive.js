'use strict';

/**
 * FileUploadDirective
 */
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

export default fileUploadDirective;
