(function(module) {
try {
  module = angular.module('FileUploadModule');
} catch (e) {
  module = angular.module('FileUploadModule', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/components/fileUpload/fileUpload.html',
    '<div class="file-upload">\n' +
    '\n' +
    '  <!-- If multiple is true invalidFiles will be an array -->\n' +
    '  <ul ng-if="fileUploadCtrl.multiple && fileUploadCtrl.invalidFiles.length">\n' +
    '    <li ng-repeat="file in fileUploadCtrl.invalidFiles" style="color: red;">\n' +
    '      <strong>{{file.name}}</strong>\n' +
    '      <span ng-if="file.$error===\'pattern\'">is not the correct file type. Must be an image or PDF.</span>\n' +
    '      <span ng-if="file.$error===\'maxSize\'">is too big. Must be less than {{fileUploadCtrl.maxFileSize}}.</span>\n' +
    '    </li>\n' +
    '  </ul>\n' +
    '\n' +
    '  <!-- If multiple is false invalidFiles will be an object -->\n' +
    '  <ul ng-if="!fileUploadCtrl.multiple && fileUploadCtrl.invalidFiles.name">\n' +
    '    <li style="color: red;">\n' +
    '      <strong>{{fileUploadCtrl.invalidFiles.name}}</strong>\n' +
    '      <span ng-if="fileUploadCtrl.invalidFiles.$error===\'pattern\'">is not the correct file type. Must be an image or PDF.</span>\n' +
    '      <span ng-if="fileUploadCtrl.invalidFiles.$error===\'maxSize\'">is too big. Must be less than {{fileUploadCtrl.maxFileSize}}.</span>\n' +
    '    </li>\n' +
    '  </ul>\n' +
    '\n' +
    '  <div ng-repeat="file in fileUploadCtrl.files">\n' +
    '    <img ngf-src="file" ng-class="{disabled: file.status!==\'uploaded\', enabled: file.status===\'uploaded\', }" class="file-image">\n' +
    '    <div ng-if="file.status===\'uploading\'" class="file-progress-uploading">\n' +
    '      <uib-progressbar class="progress-striped" value="file.progress" type="warning">{{file.progress}}%</uib-progressbar>\n' +
    '    </div>\n' +
    '    <div ng-if="file.status===\'processing\'" class="file-progress-processing">\n' +
    '      <uib-progressbar class="progress-striped active" value="file.progress" type="primary">{{file.progress}}% (Processing)</uib-progressbar>\n' +
    '    </div>\n' +
    '    <div ng-if="file.status===\'uploaded\'" class="file-progress-uploaded">\n' +
    '      <p class="bg-success"><i class="fa fa-check-circle"></i> Uploaded!</p>\n' +
    '    </div>\n' +
    '    <div ng-if="file.status===\'error\'" class="file-progress-error">\n' +
    '      <p class="bg-danger"><i class="fa fa-times-circle"></i> Error!</p>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '  <div ngf-drop \n' +
    '    ngf-select \n' +
    '    ng-model="fileUploadCtrl.files" \n' +
    '    ngf-model-invalid="fileUploadCtrl.invalidFiles" \n' +
    '    ngf-drag-over-class="\'dragover\'" \n' +
    '    ngf-multiple="{{fileUploadCtrl.multiple}}" \n' +
    '    ngf-allow-dir="true"\n' +
    '    accept="{{fileUploadCtrl.accept}}"\n' +
    '    ngf-max-size="{{fileUploadCtrl.maxFileSize}}"\n' +
    '    ngf-pattern="{{fileUploadCtrl.pattern}}"\n' +
    '    class="drop-box"><span ng-transclude>Drop pdfs or images here or click to upload</span></div>\n' +
    '  <div ngf-no-file-drop class="drop-box-no-drop">File drag &amp; drop is not supported for this browser</div>\n' +
    '\n' +
    '</div>\n' +
    '');
}]);
})();
