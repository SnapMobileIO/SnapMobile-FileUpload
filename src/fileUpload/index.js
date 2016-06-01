'use strict';

import angular from 'angular';
import ngFileUpload from 'ng-file-upload';
import { FileUploadController } from './fileUpload.controller';
import fileUploadDirective from './fileUpload.directive';

angular.module('FileUploadModule', [ngFileUpload])
  .controller('FileUploadController', FileUploadController)
  .directive('fileUpload', fileUploadDirective);

require('./fileUpload.js');
