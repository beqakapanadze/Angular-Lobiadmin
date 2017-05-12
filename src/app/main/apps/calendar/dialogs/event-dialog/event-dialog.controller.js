/**
 * Created by george on 5/8/17.
 */
(function () {
  'use strict';

  angular
    .module('app.calendar')
    .controller('EventDialogController', EventDialogControllerFn);

  /** @ngInject */
  function EventDialogControllerFn($uibModalInstance, Event, $scope, FileUploader, $timeout) {
    var vm = this;
    // variables
    vm.isEdit = !!Event.id;
    vm.eventStyles = ["primary", "success", "danger", "info", "warning", "gray", "cyan", "purple", "pink"];
    vm.eventDate = {startDate: Event.start, endDate: Event.end};
    vm.event = vm.isEdit ? Event : {
        id: Math.round(Math.random() * 1000000),
        className: ['event_primary'],
        start: vm.eventDate.startDate,
        end: vm.eventDate.endDate,
        allDay: true,
        title: "",
        description: ""
      };

    vm.filesToUpload = [];
    vm.uploader = new FileUploader();

    /*vm.uploader.filters.push({
      name: 'imageFilter',
      fn: function(item /!*{File|FileLikeObject}*!/, options) {
        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
      }
    });*/

    // CALLBACKS
    vm.uploader.onAfterAddingFile = addAttachment;
    vm.uploader.onCompleteItem = fileUploadComplete;
    vm.uploader.onCompleteAll = allFilesUploaded;

    // Methods
    vm.ok = ok;
    vm.cancel = cancel;
    vm.addAttacment = addAttachment;
    vm.fileUploadComplete = fileUploadComplete;
    vm.allFilesUploaded = allFilesUploaded;
    vm.removeAttachment = removeAttachment;

    init();
    function init() {
      $scope.$watch("vm.eventDate", function (newValue) {
        if (newValue.endDate == undefined) {
          vm.event.start = newValue;
          vm.event.end = newValue;
        } else {
          vm.event.start = newValue.startDate;
          vm.event.end = newValue.endDate;
        }
      });
      $scope.$watch("vm.event.allDay", function (newValue) {
      });
    }

    function ok() {
      console.log(vm.event);
      $uibModalInstance.close(vm.event);
    }

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }

    function addAttachment(fileItem) {
      var reader = new FileReader();

      reader.onload = function (e) {;
        console.info('File '+fileItem._file.name+' Added\n', {file:fileItem._file, base:e.target.result});
        vm.filesToUpload.push({file:fileItem._file, base:e.target.result});
        $scope.$apply();
      };
      reader.readAsDataURL(fileItem._file);
    }

    function fileUploadComplete(fileItem, response, status, headers) {
      console.info('File Uploaded', fileItem, response, status, headers);
    }

    function allFilesUploaded() {
      console.info('All Files Uploaded');
    }

    function removeAttachment(array, index) {
      array.splice(index,1);
    }
  }
})();