//imports
const router = require("express").Router();

const {
    getAllThoughts,
    getOneThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction,
} = require("../../controllers/thoughtController");

// api/ thoughts
router.route("/").get(getAllThoughts).post(createThought);


//api thought/:id
router
.route("/:id")
.get(getOneThoughtById)
.put(updateThought)
.delete(deleteThought);

//apithought
//ROUTER routes
router.router("/:thoughtId/reactions").post(addReaction);

//api/thought/:thoughtID Removal
router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);

module.exports = router;