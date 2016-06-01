'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FileUploadController = function () {
  function FileUploadController($http, $scope, Upload) {
    var _this = this;

    _classCallCheck(this, FileUploadController);

    this.$http = $http;
    this.$scope = $scope;
    this.Upload = Upload;

    // Default that can be overwritten in the directive declaration
    this.multiple = this.$scope.multiple || false;
    this.accept = this.$scope.accept || 'image/*,application/pdf';
    this.pattern = this.$scope.pattern || 'image/*,application/pdf';
    this.maxFileSize = this.$scope.maxFileSize || '5MB';

    this.files = [];
    this.invalidFiles = [];
    this.statuses = {
      ERROR: 'error',
      UPLOADING: 'uploading',
      UPLOADED: 'uploaded',
      PROCESSING: 'processing'
    };

    this.$scope.$watch('fileUploadCtrl.files', function () {
      if (!_this.mutiple && !_this._isArray(_this.files)) {
        _this.files = [_this.files];
      } else {
        _this.uploadFiles(_this.files);
      }
    });
  }

  /**
   * Run uploadFile() on array of files.
   * If there is an error with a photo, it will be included as null in the array
   * @param  {Array} files Array of files to upload
   */


  _createClass(FileUploadController, [{
    key: 'uploadFiles',
    value: function uploadFiles(files) {
      if (files && files.length) {
        for (var i = 0; i < files.length; i++) {
          if (files[i] && !files[i].$error) {
            this.uploadFile(files[i]);
          }
        }
      }
    }
  }, {
    key: 'uploadFile',
    value: function uploadFile(file) {
      var _this2 = this;

      file.progress = 0;
      file.status = this.statuses.UPLOADING;

      this.$http.get('/api/aws/s3Signature?fileName=' + file.name + '&fileType=' + file.type).then(function (response) {
        file.s3Key = response.data.s3Key;

        return _this2.Upload.upload({
          skipAuthorization: true,
          url: 'https://' + response.data.s3Bucket + '.s3.amazonaws.com/',
          method: 'POST',
          data: {
            key: response.data.s3Key,
            AWSAccessKeyId: response.data.awsAccessKey,
            acl: 'public-read',
            policy: response.data.s3Policy,
            signature: response.data.s3Signature,
            'Content-Type': file.type != '' ? file.type : 'application/octet-stream',
            file: file
          }
        });
      }).then(function (response) {
        if (response.status === 204 || response.status === 200) {
          file.status = _this2.statuses.UPLOADED;

          // Create the file object that will be sent to the server
          var fileObject = { name: file.name, type: file.type, url: file.s3Key, size: file.size };

          // Set either object or array depending on if we expect mutiple files (defined in directive)
          if (_this2.multiple) {
            _this2.$scope.forFiles = _this2.$scope.forFiles || [];
            _this2.$scope.forFiles.push(fileObject);
          } else {
            _this2.$scope.forFile = fileObject;
          }
        } else {
          file.status = _this2.statuses.ERROR;
        }
      }, null, function (event) {
        var progressPercentage = parseInt(100.0 * event.loaded / event.total);
        file.progress = progressPercentage;

        if (progressPercentage == 100) {
          file.status = _this2.statuses.PROCESSING;
        }
      }).catch(function (err) {
        file.status = _this2.statuses.ERROR;
      });
    }
  }, {
    key: '_isArray',
    value: function _isArray(object) {
      return Object.prototype.toString.call(object) === '[object Array]';
    }
  }]);

  return FileUploadController;
}();

exports.FileUploadController = FileUploadController;