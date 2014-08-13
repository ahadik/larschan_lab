/*
 * GET home page.
 */

exports.index = function(req, res){
	console.log(req.device);
	if(req.device.type == 'phone'){
		res.render('index_mobile', { title: 'Express' });
	}else{
		res.render('index', { title: 'Express' });
	}
};