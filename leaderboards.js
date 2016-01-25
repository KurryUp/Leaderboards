PlayersList = new Mongo.Collection('players');

if (Meteor.isClient) {
  console.log("Hello client");
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.leaderboard.player = function() {
    return "Some other text"
  }
  
  Template.leaderboard.helpers({
    'player': function(){
        return PlayersList.find({}, {sort: {score: -1} })
    },
    'selectedClass': function(){
        var playerId = this._id;
		var selectedPlayer = Session.get('selectedPlayer');
		if(playerId == selectedPlayer){
			return "selected"
		}
    },
	'showSelectedPlayer': function(){
		var selectedPlayer = Session.get('selectedPlayer');
		return PlayersList.findOne(selectedPlayer)
	}
  });

  Template.addPlayerForm.events({
    'submit form': function(event){
        event.preventDefault();
		var playerNameVar = event.target.playerName.value;
		PlayersList.insert({
			name: playerNameVar,
			score: 0
		});
    }
  });
  
  Template.leaderboard.events({
    'click .player': function(){
        var playerId = this._id;
		Session.set('selectedPlayer', playerId);
    },
	'click .increment': function(){
		var selectedPlayer = Session.get('selectedPlayer');
		PlayersList.update(selectedPlayer, {$inc: {score: 5} });
	},
	'click .decrement': function(){
		var selectedPlayer = Session.get('selectedPlayer');
		PlayersList.update(selectedPlayer, {$inc: {score: -5} });
	},
	'click .remove': function(){
		var selectedPlayer = Session.get('selectedPlayer');
		PlayersList.remove(selectedPlayer);
	}
  });
}

if (Meteor.isServer) {
  console.log("Hello server");
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
