'use strict';

class FileUploadController {

  constructor($http, $scope, Upload) {
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

    this.$scope.$watch('fileUploadCtrl.files', () => {
      if (!this.mutiple && !this._isArray(this.files)) {
        this.files = [this.files];
      } else {
        this.uploadFiles(this.files);
      }
    });
  }

  /**
   * Run uploadFile() on array of files.
   * If there is an error with a photo, it will be included as null in the array
   * @param  {Array} files Array of files to upload
   */
  uploadFiles(files) {
    if (files && files.length) {
      for (let i = 0; i < files.length; i++) {
        if (files[i] && !files[i].$error) {
          this.uploadFile(files[i]);
        }
      }
    }
  }

  uploadFile(file) {
    file.progress = 0;
    file.status = this.statuses.UPLOADING;

    this.$http.get('/api/aws/s3Signature?fileName=' + file.name + '&fileType=' + file.type)
      .then((response) => {
        file.s3Key = response.data.s3Key;

        return this.Upload.upload({
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
      })
      .then((response) => {
        if (response.status === 204 || response.status === 200) {
          file.status = this.statuses.UPLOADED;

          // Create the file object that will be sent to the server
          let fileObject = { name: file.name, type: file.type, url: file.s3Key, size: file.size };

          // Set either object or array depending on if we expect mutiple files (defined in directive)
          if (this.multiple) {
            this.$scope.forFiles = this.$scope.forFiles || [];
            this.$scope.forFiles.push(fileObject);
          } else {
            this.$scope.forFile = fileObject;
          }

        } else {
          file.status = this.statuses.ERROR;
        }

      }, null, (event) => {
        let progressPercentage = parseInt(100.0 * event.loaded / event.total);
        file.progress = progressPercentage;

        if (progressPercentage == 100) {
          file.status = this.statuses.PROCESSING;
        }
      })
      .catch((err) => {
        file.status = this.statuses.ERROR;
      });
  }

  _isArray(object) {
    return Object.prototype.toString.call(object) === '[object Array]';
  }
}

export { FileUploadController };
