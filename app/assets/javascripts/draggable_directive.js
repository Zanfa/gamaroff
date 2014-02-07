angular.module('Colors.directives')
  .directive('draggable', function () {
    return {
      restrict: 'A',
      link: function (scope, el, attr) {
        var dragStart;

        el.on('touchstart', function (e) {

          dragStart = {
            x: e.pageX,
            y: e.pageY,
            top: $(el).offset().top
          };

          e.preventDefault();
        });
        el.on('touchend', function (e) {
          console.log(scope);
          console.log(attr);
          el = $(el);
          scope.choose(Math.round(parseInt(el.offset().top) / el.height()));
          el.css('top', 20 * scope.player.color + '%');

          e.preventDefault();
        });
        el.on('touchmove', function (e) {
          el.css('top', (dragStart.top + e.pageY - dragStart.y) + 'px');

          e.preventDefault();
        });
      }
    };
  });
