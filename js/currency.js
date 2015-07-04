var currencyApp = angular.module('currencyApp', []);

currencyApp.controller('CurrencyCtrl', ['$scope', '$timeout', 'CurrencyService', function ($scope, $timeout, CurrencyService) {

	$scope.currencies = [
		{id: 0, label: 'EUR/USD', bid: 1.4563, ask: 2.2435},
		{id: 1, label: 'EUR/GBP', bid: 1.4321, ask: 1.9435},
		{id: 2, label: 'USD/CAD', bid: 1.9832, ask: 2.2435},
		{id: 3, label: 'AUD/CAD', bid: 1.1345, ask: 1.3435},
		{id: 4, label: 'USD/JPY', bid: 1.3455, ask: 1.5435}
	];

	$scope.transactions = [];

	$timeout(function updatePrices(){
		angular.forEach($scope.currencies, function(el) {
			var bid_price = CurrencyService.getNum();
			el.bid = (bid_price - ((Math.random()) + 0).toFixed(4)).toFixed(4);
			el.ask = bid_price;
		});
		$timeout(updatePrices, 15000);
	}, 15000);

	$scope.addTransaction = function(idx, type){
		var trans = '',
			cost = ''
			;

		switch(type){
			case 'ask':
				trans = 'Sell';
				cost = $scope.currencies[idx].ask;
				break;
			case 'bid':
				trans = 'Buy';
				cost = $scope.currencies[idx].bid;
				break;
		}

		$scope.transactions.push(
			{currency: $scope.currencies[idx].label, type: trans, price: cost, amount: CurrencyService.getAmt()}
		);
	};
}]);

currencyApp.service('CurrencyService', function() {
	this.getNum = function() {
		return ((Math.random() * 3) + 1).toFixed(4);
	};

	this.getAmt = function(){
		return Math.floor(((Math.random() * 30000) + 1000));
	};
});
