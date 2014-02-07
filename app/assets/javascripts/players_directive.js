angular.module('Colors.directives')
  .directive('playersCenterer', ['$parse', function ($parse) {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      compile: function (element, attrs) {
        var modelAccessor = $parse(attrs.ngModel);
        var container = $('<div class="players"><div ng-transclude></div></div>');
        element.replaceWith(container);

        return function (scope, element, attrs, controller) {
          scope.$watch(attrs.ngModel + '.length', function (players) {
            var height = $(element).height();
            element.css('width', (height / 5 * players) + 'px');
          });
        };
      }
    }
  }]);
