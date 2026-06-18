const router = require("express").Router();
const controller =
    require("../controllers/todoController");

const auth =
    require("../middleware/auth");

router.get("/", auth, controller.getTodos);
router.get("/:id", auth, controller.getTodoById);

router.post("/", auth, controller.createTodo);

router.put("/:id", auth, controller.updateTodo);

router.delete("/:id", auth, controller.deleteTodo);

module.exports = router;
