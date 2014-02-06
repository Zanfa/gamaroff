angular.module('Colors.services')
  .factory('Messages', ['PubNub', function (PubNub) {
    var channel = 'ColorsChannel'

    PubNub.init({
      publish_key: 'pub-c-67e4541d-8897-46cf-8b3b-3115e67df4d3',
      subscribe_key: 'sub-c-57d1e58c-78a2-11e3-afe2-02ee2ddab7fe'
    });

    var publish = function (msg) {

      // Remove garbage injected by angular
      if (msg.player) delete msg.player['$$hashKey']
      else if (msg.players) {
        for (var i = 0; i < msg.players.length; i++) {
          delete msg.players[i]['$$hashKey'];
        }
      }

      PubNub.ngPublish({
        channel: channel,
        message: msg
      })
    };

    var subscribe = function () {
      PubNub.ngSubscribe({
        channel: channel
      })
    };

    return {
      publish: publish,
      subscribe: subscribe,
      channel: PubNub.ngMsgEv(channel)
    }
  }]);

