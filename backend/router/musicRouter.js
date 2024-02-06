const router = require("express").Router();
const musicController = require("../controller/musicController")

router.get("/", musicController.GetAllMusic);
router.get("/total", musicController.GetTotalNumberOfMusic);
router.get("/artistinfo", musicController.GetArtistInfo);
router.get("/totalinfo", musicController.GetTotalInfo);
router.post("/", musicController.CreateMusic);
router.put("/:id", musicController.EditMusic);
router.delete("/:id", musicController.DeleteMusic);


module.exports = router;