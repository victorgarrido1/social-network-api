//imports
const router = require("express").Router();

const {
    getThoughts,
    getOneThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction,
} = require("../../controllers/thoughtController");

// api/ thoughts
router.route("/").get(getThoughts).post(createThought);


//api thought/:id
router
.route("/:id")
.get(getOneThought)
.put(updateThought)
.delete(deleteThought);

//apithought
//ROUTER routes
router.route("/:thoughtId/reactions").post(addReaction);

//api/thought/:thoughtID Removal
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;