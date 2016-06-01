'use strict';

/**
 * FileUploadDirective
 */
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

export default fileUploadDirective;
