angular.module('Colors', ['Colors.controllers', 'ngTouch']);
angular.module('Colors.controllers', ['Colors.services', 'Colors.values']);
angular.module('Colors.services', ['pubnub.angular.service']);
angular.module('Colors.values', []);
