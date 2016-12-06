(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['angular'], factory);
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require('angular'));
  } else {
    // Browser globals (root is window)
    root.returnExports = factory(root.angular);
  }
}(this, function(angular) {

  angular.module('ngMeta', [])
    .provider('ngMeta', function() {

      'use strict';

      //Object for storing default tag/values
      var defaults = {};

      //One-time configuration
      var config = {
        useTitleSuffix: false
      };

      function Meta($rootScope) {


        var setTitle = function(title, titleSuffix) {
          if (!$rootScope.ngMeta) {
            throw new Error('Cannot call setTitle when ngMeta is undefined. Did you forget to call ngMeta.init() in the run block? \nRefer: https://github.com/vinaygopinath/ngMeta#getting-started');
          }

          $rootScope.ngMeta.title = angular.isDefined(title) ? title : (defaults.title || '');
          if (config.useTitleSuffix) {
            $rootScope.ngMeta.title += angular.isDefined(titleSuffix) ? titleSuffix : (defaults.titleSuffix || '');
          }
          return this;
        };


        var setTag = function(tag, value) {
          if (!$rootScope.ngMeta) {
            throw new Error('Cannot call setTag when ngMeta is undefined. Did you forget to call ngMeta.init() in the run block? \nRefer: https://github.com/vinaygopinath/ngMeta#getting-started');
          }
          if (tag === 'title' || tag === 'titleSuffix') {
            throw new Error('Attempt to set \'' + tag + '\' through \'setTag\': \'title\' and \'titleSuffix\' are reserved tag names. Please use \'ngMeta.setTitle\' instead');
          }

          $rootScope.ngMeta[tag] = angular.isDefined(value) ? value : defaults[tag];
          return this;
        };

        var setDefaultTag = function(tag, value) {
          if (!$rootScope.ngMeta) {
            throw new Error('Cannot call setDefaultTag when ngMeta is undefined. Did you forget to call ngMeta.init() in the run block? \nRefer: https://github.com/vinaygopinath/ngMeta#getting-started');
          }

          defaults[tag] = value;

          if (tag === 'title' || tag === 'titleSuffix') {
            this.setTitle($rootScope.ngMeta.title, $rootScope.ngMeta.titleSuffix);
          } else {
            this.setTag(tag, $rootScope.ngMeta[tag]);
          }

          return this;
        };

        var readRouteMeta = function(meta) {
          meta = meta || {};

          if (meta.disableUpdate) {
            return false;
          }

          setTitle(meta.title, meta.titleSuffix);

          var def = angular.copy(defaults);

          delete meta.title;
          delete meta.titleSuffix;
          delete def.title;
          delete def.titleSuffix;

          var metaKeys = Object.keys(meta);
          for (var i = 0; i < metaKeys.length; i++) {
            if (def.hasOwnProperty(metaKeys[i])) {
              delete def[metaKeys[i]];
            }
            setTag(metaKeys[i], meta[metaKeys[i]]);
          }

          var defaultKeys = Object.keys(def);
          for (var j = 0; j < defaultKeys.length; j++) {
            setTag(defaultKeys[j], def[defaultKeys[j]]);
          }
        };

        var update = function(event, current) {
          readRouteMeta(angular.copy(current.meta || (current.data && current.data.meta)));
        };



        var init = function() {
          $rootScope.ngMeta = {};
          $rootScope.$on('$routeChangeSuccess', update);
          $rootScope.$on('$stateChangeSuccess', update);
        };

        return {
          'init': init,
          'setTitle': setTitle,
          'setTag': setTag,
          'setDefaultTag': setDefaultTag
        };
      }


      this.setDefaultTitle = function(titleStr) {
        defaults.title = titleStr;
        return this;
      };


      this.setDefaultTitleSuffix = function(titleSuffix) {
        defaults.titleSuffix = titleSuffix;
        return this;
      };

      this.setDefaultTag = function(tag, value) {
        defaults[tag] = value;
        return this;
      };


      this.useTitleSuffix = function(bool) {
        config.useTitleSuffix = !!bool;
        return this;
      };


      this.mergeNestedStateData = function(state, parentDecoratorFn) {
      // original data
        var originalData = parentDecoratorFn(state) || {};

        // create new merged meta
        var parentMetaData = state.parent && state.parent.data && state.parent.data.meta;

        //Assign the merged meta if necessary to current state and return
        if (originalData.meta || parentMetaData) {
          var mergedMeta = angular.merge({}, parentMetaData, originalData.meta);
          originalData.meta = mergedMeta;
        }
        state.self.data = originalData;
        return originalData;
      };


      this.$get = function($rootScope) {
        return new Meta($rootScope);
      };
    });
}));
