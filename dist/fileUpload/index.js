'use strict';

var _angular = require('angular');

var _angular2 = _interopRequireDefault(_angular);

var _ngFileUpload = require('ng-file-upload');

var _ngFileUpload2 = _interopRequireDefault(_ngFileUpload);

var _fileUpload = require('./fileUpload.controller');

var _fileUpload2 = require('./fileUpload.directive');

var _fileUpload3 = _interopRequireDefault(_fileUpload2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_angular2.default.module('FileUploadModule', [_ngFileUpload2.default]).controller('FileUploadController', _fileUpload.FileUploadController).directive('fileUpload', _fileUpload3.default);