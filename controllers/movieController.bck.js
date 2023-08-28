const Movie = require('../models/movies');

module.exports = {

    getByTitle : function (req , res , next)
    {  
        Movie.find({Title: {$regex: decodeURI(req.params.title), $options: 'i'}})
        .then((moviesList) => {
            if(moviesList.length === 0 || moviesList == null || moviesList == undefined)
            {
                res.status(200).json({status:"success",message:"No result Found",data:{}});
            }
            else
            {
                res.status(200).json({status:"success",message:"Results Found",data:{moviesList}});
            }            
        })
        .catch((error) => {
            //When there are errors We handle them here
            console.log(error);
            res.status(400).json({status:"error",message:"Bad Request",data:null});
        });

    },
    getByYear : function (req , res , next)
    {
    }


}