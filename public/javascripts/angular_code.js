function ContentController($scope){
	//set a variable for the updates
	var updates = updateList;

	$scope.orderedUpdates = orderUpdates(updates);
	$scope.parsedPublications = citations;
	$scope.head = head;
	$scope.members = members;
	$scope.content = pageContent;
	
}

function orderUpdates(updates){
	var orderedUpdates = [];
	for (update in updates){
		//if this is the first element
		if (orderedUpdates.length===0){
			orderedUpdates.push(updates[update]);
		}else{
			var date = moment(updates[update].year+"-"+updates[update].month, 'YYYY MMM');
			var count = 0;
			for (orderedUpdate in orderedUpdates){
				//if the current date is after this orderedUpdate
				if(date.isAfter(orderedUpdates[orderedUpdate].year+"-"+orderedUpdates[orderedUpdate].month, 'YYYY MMM')){
					//break so update is inserted at proper position
					break;
				}
				count++;
			}
			orderedUpdates.splice(count, 0, updates[update]);
		}
	}
	//	console.log(orderedUpdates);
	return orderedUpdates;
}