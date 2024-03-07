const router = require("express").Router();

const {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
} = require('../../controllers/userController');


///api/user/:id
router.route("/").get(getAllUser).post(createUser);

//api/user/:id
route.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

//api/user/:userId/friends/:friendId
router.route("/:userId/friends/:friendId").post(addFriend).delete.apply(deleteFriend);


//exports
module.exports = router;