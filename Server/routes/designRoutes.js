var express = require ("express"),
router = express.Router();
const {getDesigns,getDesign, addDesign, editDesign, deleteDesign} = require("../controllers/designControllers");

router.get("/", getDesigns);
router.get("/:id", getDesign);
router.post('/', addDesign);
router.put('/:id', editDesign);
router.delete('/:id', deleteDesign);

module.exports = router;