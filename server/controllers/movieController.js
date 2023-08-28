const Movie = require('../models/movies');

exports.getByTitle = async (req, res, next) => {
    const page = +req.query.page || 2; //Converting it to integer
    const PER_PAGE_COUNT = 2;

    let searchValue = req.query.searchValue;
    let searchBy = req.query.searchBy;    
    let totalMovies , moviesCount , movies; 
    try {

       /*previousPage: page - 1,
            hasNextPage: PER_PAGE_COUNT * page < totalMovies,
            hasPreviousPage: page > 1,*/


      if( (searchBy == null || searchBy=='' || searchBy==undefined) && (searchValue == null || searchValue=='' || searchValue==undefined) )
      {
        moviesCount = await Movie.countDocuments();
        movies = await Movie.find().limit(PER_PAGE_COUNT);

      }
      else
      {
        moviesCount = await Movie.countDocuments({[searchBy]: {$regex: decodeURI(searchValue), $options: 'i'}});
        movies = await Movie.find({[searchBy]: {$regex: decodeURI(searchValue), $options: 'i'}}).skip((page - 1) * PER_PAGE_COUNT).limit(PER_PAGE_COUNT);

      }
                
        totalMovies = moviesCount;
        let pagination = {
            totalMovies: totalMovies,
            currentPage: page,            
            moviesList: movies
          }; 
          res.status(200).json({status:"success", "message":"Movies Found",data:pagination});      
    } catch (error) {
        res.status(500).json({status:"error", "message":error})
    }   
};

/*
exports.getByTitle = (req, res, next) => {
    const page = +req.query.page || 1;
    let totalMovies;
    Movie.countDocuments({Title: {$regex: decodeURI(req.params.title), $options: 'i'}})
      .then(moviesCount =>{
        totalMovies=moviesCount;
        return Movie.find({Title: {$regex: decodeURI(req.params.title), $options: 'i'}}).skip((page - 1) * PER_PAGE_COUNT).limit(PER_PAGE_COUNT);
      })
      .then(movies => {
        let pagination = {
          totalMovies: totalMovies,
          currentPage: page,
          previousPage: page - 1,
          hasNextPage: PER_PAGE_COUNT * page < totalMovies,
          hasPreviousPage: page > 1,
          moviesList: movies
        };

        res.status(200).json({status:"success", "message":"Movies Found",data:pagination});
      })
    .catch(err => {
      next(err);
    });
};
*/

// module.exports = {

//     getByTitle : function (req , res , next)
//     {  
//         Movie.find({Title: {$regex: decodeURI(req.params.title), $options: 'i'}})
//         .then((moviesList) => {
//             if(moviesList.length === 0 || moviesList == null || moviesList == undefined)
//             {
//                 res.status(200).json({status:"success",message:"No result Found",data:{}});
//             }
//             else
//             {
//                 res.status(200).json({status:"success",message:"Results Found",data:{moviesList}});
//             }            
//         })
//         .catch((error) => {
//             //When there are errors We handle them here
//             console.log(error);
//             res.status(400).json({status:"error",message:"Bad Request",data:null});
//         });

//     },
//     getByYear : function (req , res , next)
//     {
//     }


// }