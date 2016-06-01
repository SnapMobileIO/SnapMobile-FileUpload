(function(module) {
try {
  module = angular.module('FileUploadModule');
} catch (e) {
  module = angular.module('FileUploadModule', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/components/fileUpload/fileUpload.html',
    '<style>\n' +
    '  .button {\n' +
    '    -moz-appearance: button;\n' +
    '    /* Firefox */\n' +
    '    -webkit-appearance: button;\n' +
    '    /* Safari and Chrome */\n' +
    '    padding: 10px;\n' +
    '    margin: 10px;\n' +
    '    width: 70px;\n' +
    '  }\n' +
    '  .drop-box {\n' +
    '    background: #F8F8F8;\n' +
    '    border: 5px dashed #DDD;\n' +
    '    width: 100%;\n' +
    '    text-align: center;\n' +
    '    padding: 25px 12px;\n' +
    '    line-height: auto;\n' +
    '    height: auto;\n' +
    '    cursor: pointer;\n' +
    '  }\n' +
    '  .dragover {\n' +
    '    border: 5px dashed blue;\n' +
    '  }\n' +
    '  .disabled {\n' +
    '    opacity: 0.5;\n' +
    '  }\n' +
    '  .enabled {\n' +
    '    opacity: 1.0;\n' +
    '  }\n' +
    '</style>\n' +
    '\n' +
    '<!-- If multiple is true invalidFiles will be an array -->\n' +
    '<ul ng-if="fileUploadCtrl.multiple && fileUploadCtrl.invalidFiles.length">\n' +
    '  <li ng-repeat="file in fileUploadCtrl.invalidFiles" style="color: red;">\n' +
    '    <strong>{{file.name}}</strong>\n' +
    '    <span ng-if="file.$error===\'pattern\'">is not the correct file type. Must be an image or PDF.</span>\n' +
    '    <span ng-if="file.$error===\'maxSize\'">is too big. Must be less than {{fileUploadCtrl.maxFileSize}}.</span>\n' +
    '  </li>\n' +
    '</ul>\n' +
    '\n' +
    '<!-- If multiple is false invalidFiles will be an object -->\n' +
    '<ul ng-if="!fileUploadCtrl.multiple && fileUploadCtrl.invalidFiles.name">\n' +
    '  <li style="color: red;">\n' +
    '    <strong>{{fileUploadCtrl.invalidFiles.name}}</strong>\n' +
    '    <span ng-if="fileUploadCtrl.invalidFiles.$error===\'pattern\'">is not the correct file type. Must be an image or PDF.</span>\n' +
    '    <span ng-if="fileUploadCtrl.invalidFiles.$error===\'maxSize\'">is too big. Must be less than {{fileUploadCtrl.maxFileSize}}.</span>\n' +
    '  </li>\n' +
    '</ul>\n' +
    '\n' +
    '<div class="row">\n' +
    '  <div class="text-center" ng-repeat="file in fileUploadCtrl.files">\n' +
    '    {{file.name}}<br>\n' +
    '    <img ngf-src="file" ng-class="{disabled: file.status!==\'uploaded\', enabled: file.status===\'uploaded\', }" style="max-width: 100%; max-height: 100%;">\n' +
    '    <div ng-if="file.status===\'uploading\'">\n' +
    '      <uib-progressbar class="progress-striped" value="file.progress" type="warning">{{file.progress}}%</uib-progressbar>\n' +
    '    </div>\n' +
    '    <div ng-if="file.status===\'processing\'">\n' +
    '      <uib-progressbar class="progress-striped active" value="file.progress" type="primary">{{file.progress}}% (Processing)</uib-progressbar>\n' +
    '    </div>\n' +
    '    <div ng-if="file.status===\'uploaded\'">\n' +
    '      <p class="bg-success"><i class="fa fa-check-circle"></i> Uploaded!</p>\n' +
    '    </div>\n' +
    '    <div ng-if="file.status===\'error\'">\n' +
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
    '  <div ngf-no-file-drop>File drag &amp; drop is not supported for this browser</div>\n' +
    '</div>\n' +
    '');
}]);
})();
