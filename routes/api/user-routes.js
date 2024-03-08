const router = require("express").Router();

const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
} = require('../../controllers/userController');

//api/user
router.route("/").get(getUsers).post(createUser);

//api/user/:id
//this is how express nows back the backend!!
router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

//api/user/:userId/friends/:friendId
router.route("/:userId/friends/:friendId").post(addFriend).delete(deleteFriend);

//exports
module.exports = router;


//