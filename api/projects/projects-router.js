// Write your "projects" router here!
const Project = require("./projects-model");
const Action = require("../actions/actions-model");

const router = require("express").Router();

router.get("/", (req, res) => {
  Project.get()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "can't find projects",
      });
    });
});

router.get("/:id", (req, res) => {
  Project.get(req.params.id)
    .then((project) => {
      if (!project) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist" });
      } else {
        res.json(project);
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "can't find projects",
      });
    });
});

router.post("/", (req, res) => {
  Project.insert(req.body)
    .then((project) => {
      if (!req.body.name || !req.body.description) {
          console.log('req')
        res.status(400).json({ message: "Name and description are required" });
      } else {
        res.status(201).json(project);
      }
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
});

router.put("/:id", (req, res) => {
  Project.update(req.params.id, req.body)
    .then((projects) => {
      if (!req.body.name || !req.body.description  || !req.body.completed) {
        res.status(400).json({ message: "Name and description are required" });
      } else if (!projects) {
        res.status(404).json({ message: "The post with the specified ID does not exist" });
      } else {
        res.json(projects);
      }
    })
    .catch(() => {
      res.status(500).json({
        message: "can't find projects",
      });
    });
});

router.delete("/:id", (req, res) => {
  Project.remove(req.params.id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json(count);
      } else {
        res.status(404).json({ message: "This post does not exist" });
      }
    })
    .catch(() => {
      res.status(500).json({
        message: "can't find projects",
      });
    });
});

router.get("/:id/actions", (req, res) => {
    Project.getProjectActions(req.params.id)
        .then( (actions) => {
            if (!actions.length) {
                res.status(404).json({ message: "There is no project with that ID" })
            } else {
                res.status(200).json(actions)
            }
        })
        .catch( () => {
            res.status(500).json({
                message: "can't find projects",
              });
        })
});

module.exports = router;
