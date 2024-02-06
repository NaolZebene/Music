const { music } = require('./joiSchemaValidation');

module.exports = {
    addMusicValidation: async function (req, res, next) {
        const value = await music.validate(req.body);
        if (value.error) {
            return res.json({
                msg: value.error.details[0].message
            }).status(403)
        }
        next();
    }

}