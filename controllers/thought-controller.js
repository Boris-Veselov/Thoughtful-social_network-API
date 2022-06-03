const { User, Thought } = require("../models");

const thoughtController = {

    // create new Thought 
    createThought({ body }, res) {
        Thought.create(body)
        .then((thoughtData) => {
            return User.findOneAndUpdate({ _id: body.userId },{ $push: { thoughts: thoughtData._id } },{ new: true }
            );
        })
        .then((dbUserData) => {
            if (!dbUserData) {
            res
                .status(404)
                .json({ message: "No such User with this id!" });
            return;
            }
            res.json(dbUserData);
        })
        .catch((err) => res.json(err));
    },
    
    // get all Thoughts
    getAllThoughts(req, res) {
        Thought.find({})
        .select("-__v")
        .then((dbThoughtData) => res.json(dbThoughtData))
        .catch((err) => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    //cget one Thought by id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
            res
                .status(404)
                .json({ message: "No such Thought with this id!" });
            return;
            }
            res.json(dbThoughtData);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // update Thought
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
            res
                .status(404)
                .json({ message: "No such Thought with this id!" });
            return;
            }
            res.json(dbThoughtData);
        })
        .catch((err) => res.status(400).json(err));
    },

    // delete Thought
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id }).then((dbThoughtData) => {
            if (!dbThoughtData) {
            res
                .status(404)
                .json({ message: "No such Thought with this id!" });
            return;
            }
            res.json(dbThoughtData);
        })
        .catch((err) => res.status(400).json(err));
    },

    // add Reaction
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtId },{ $addToSet: { reactions: body } },{ new: true })
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
            res
                .status(404)
                .json({ message: "No such Thought with this id!" });
            return;
            }
            res.json(dbThoughtData);
        })
        .catch((err) => res.json(err));
    },

    // delete Reaction
    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtId },{ $pull: { reactions: { reactionId: params.reactionId } } },{ new: true })
        .then((dbThoughtData) => res.json(dbThoughtData))
        .catch((err) => res.json(err));
    },
};

module.exports = thoughtController;