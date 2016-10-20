angular
.module('mainApp')
.controller('foodController', function ($scope, $filter, nixApi) {

	$scope.foodmodel = {
		product: [{ 
			qty: 20,
			measure: 'g',
			food: 'tomato',
			Energy: '3.60 kcal',
			NDB_number: 11529
		}]
	}; 

	$scope.columns = [
	{
		header:     'qty',
		valueField: 'serving_qty'
	},
	{
		header:     'measure',
		valueField: 'serving_unit'
	},
	{
		header:     'food',
		valueField: 'parsed_query.food'
	},
	{
		header:     'Energy',
		getValue:   function (estimation) {
			var result;
			if (estimation.nutrients) {
				result = $filter('nutrient')(estimation.nutrients, 208);
				if (result) {
					return $filter('number')(result.value, 2).toString() + ' ' + result.unit;
				}
			}
		},
		getSummary: function () {
			var result;
			if ($scope.apiResponse && $scope.apiResponse.total) {
				result = $filter('nutrient')($scope.apiResponse.total.nutrients, 208);
				if (result) {
					return $filter('number')(result.value, 2).toString() + ' ' + result.unit;
				}
			}
		}
	},
	{
		header:     'NDB number',
		valueField: 'ndb_no'
	}
	];

	$scope.data = '';
	$scope.apiResponse = null;

	$scope.estimate = function estimate() {
		localStorage.clear();
		estimate.error = null;
		$scope.apiResponse = null;
		nixApi.natural($scope.data)
		.success(function (apiResponse) {
			$scope.apiResponse = apiResponse;
			console.log($scope.apiResponse);
		})
		.error(function (error) {
			estimate.error = error;
		});
	};

	$scope.getProperty = function (object, property) {
		var current = object, keys = property.split('.'), i;
		for (i = 0; i < keys.length; i += 1) {
			if (current[keys[i]]) {
				current = current[keys[i]];
			} else {
				current = null;
				break;
			}
		}

		return current;
	};

	$scope.addToFoodLog = function() {

		console.log(column.valueField);

	};

});