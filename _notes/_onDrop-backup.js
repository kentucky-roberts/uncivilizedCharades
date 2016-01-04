
	
	// Drag players to teams ngDraggable.js
	//
	$scope.centerAnchor = true;
      $scope.toggleCenterAnchor = function () {$scope.centerAnchor = !$scope.centerAnchor}

        $scope.draggableObjects = [{name:'Player1'}, {name:'Player2'}, {name:'Player3'}, {name:'Player4'}];
        
        $scope.droppedObjects1 = [];
        $scope.droppedObjects2= [];
        
        $scope.onDropComplete1 = function(data,evt){
        	console.log("onDropComplete1 was called.");
            var index = $scope.droppedObjects1.indexOf(data);

            var playerIndex = $scope.draggableObjects.indexOf(data);

            $scope.draggableObjects.splice(playerIndex, 1);    
            console.log("data: " + data);
            console.log("index: " + index);
            console.log("playerIndex: " + playerIndex);
            if (index == -1) {
               $scope.droppedObjects1.push(angular.extend({}, data));
          }
        }
        $scope.onDragSuccess1= function(data,evt){
        	console.log("onDragSuccess1 was called.");
            //console.log("133","$scope","onDragSuccess1", "", evt);
            var index = $scope.droppedObjects1.indexOf(data);
            console.log($scope.droppedObjects1);
            if (index > -1) {
                $scope.droppedObjects1.splice(index, 1);
                //console.log(index);
            }
        }
        $scope.onDragSuccess2 = function(data,evt){
            var index = $scope.droppedObjects2.indexOf(data);
            console.log($scope.droppedObjects2);
            if (index > -1) {
                $scope.droppedObjects1.splice(index, 1);
                //console.log($scope.draggableObjects);
            }
        }
        $scope.onDropComplete2 = function(data,evt){
            var index = $scope.droppedObjects2.indexOf(data);
            var playerIndex = $scope.draggableObjects.indexOf(data);


            $scope.draggableObjects.splice(playerIndex, 1);    
            console.log("data: " + data);
            console.log("index: " + index);
            console.log("playerIndex:: " + playerIndex);
            if (index == -1) {
 			$scope.droppedObjects2.push(angular.extend({}, data));
                	// console.log($scope.draggableObjects);
               	// console.log($scope.droppedObjects2);
            }
        }

        var inArray = function(array, obj) {
            var index = array.indexOf(obj);
        }

        $scope.team1 = {
	    name: 'The Goodguys'
	  };

	  $scope.team2 = {
	    name: 'The Badguys'
	  };
