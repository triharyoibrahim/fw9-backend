const response = require("../../helpers/standardResponse");
const { validationResult } = require("express-validator");
const transferModel = require("../../models/transfer");
const usersModel = require("../../models/users");
const profileModel = require("../../models/profile");

exports.createTransfer = (req, res) => {
  const sender_id = req.authUser.id;
  const {amount, pin} = req.body;
  const validation = validationResult(req);

  usersModel.getDetailUsers(sender_id,(err, results)=>{
    if (results.rows.length > 0){
      const user = results.rows[0];
      console.log(user)
      profileModel.getDetailProfileByUserId(sender_id,(err, resultsUsers)=>{
        if(resultsUsers.rows.length > 0){
          const profile = resultsusers.rows[0];
          console.log(profile)
        } 
        // else {
        //   return response(res, 'Wrong input Pin', null, null, 400);
        // } 
      })
    }
  })
}

    