const {Thoughts, Users} = require('../models');

module.exports = {
  // Get all thoughts
 getThoughts(req, res) {
    Thoughts.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // Get a thought
  getSingleThought(req, res) {
    console.log(req.params);
    Thoughts.findOne({ _id: req.params.ThoughtId })
      .select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a Thought
  createThought(req, res) {
    Thoughts.create(req.body)
      .then((thought) => res.json(thought))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete a Thought
  deleteThought(req, res) {
    Thoughts.findOneAndDelete({ _id: req.params.ThoughtId })
    .then(() => res.json({ message: 'thought deleted!' }))
    .catch((err) => res.status(500).json(err));
  },
  // Update a  Thought
  updateThought(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.ThoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};
