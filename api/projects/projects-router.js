// Write your "projects" router here!
const { checkProjectPayload, checkProjectCompleted } = require("./projects-middleware")
const Project = require("./projects-model");
const Action = require("../actions/actions-model");

const router = require("express").Router();

router.get("/", (req, res, next) => {
  Project.get()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch(next)
});

router.get("/:id", (req, res, next) => {
  Project.get(req.params.id, req.body)
    .then((project) => {
      if (project) {
        res.status(200).json(project);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist" });
      }
    })
    .catch(next)
});

router.post("/", checkProjectPayload, (req, res, next) => {
  Project.insert(req.body)
    .then((project) => {

        res.status(201).json(project);
      
    })
    .catch(next)
});

router.put("/:id", checkProjectPayload, checkProjectCompleted,(req, res, next) => {
  Project.update(req.params.id, req.body)
    .then((projects) => {
        res.status(200).json(projects);
    })
    .catch(next)
});

router.delete("/:id", (req, res, next) => {
  Project.remove(req.params.id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json(count);
      } else {
        res.status(404).json({ message: "This post does not exist" });
      }
    })
    .catch(next)
});

router.get("/:id/actions", (req, res, next) => {
  Project.getProjectActions(req.params.id)
    .then((actions) => {
      if (!actions.length) {
        res.status(404).json([]);
      } else {
        res.status(200).json(actions);
      }
    })
    .catch(next)
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    custom: "something went wrong!",
    message: err.message,
    stack: err.stack,
  })
})
module.exports = router;
