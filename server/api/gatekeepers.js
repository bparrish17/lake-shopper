

const isAuthenticated = (req, res, next) => {
    if(!req.isAuthenticated()) {
      const error = new Error('Get out!');
      error.status = 401
      return next(error);
    } else {
      next();
    }
}
  
const isAdmin = (req, res, next) => {
    if(req.user && !req.user.dataValues.isAdmin) {
      const error = new Error('Why are you snooping? Go buy a boat!');
      error.status = 401
      return next(error);
    } else {
      next();
    }
}

// const isThisUser = (req, res, next) => {
//     if(!req.isAuthenticated()) {
//         const error = new Error('Get out!');
//         error.status = 401
//         return next(error);
//     } else {

//             if(!req.user.dataValues.id) {
    
//             }
//         }
//     }
// }

module.exports = {
    isAdmin,
    isAuthenticated
}
