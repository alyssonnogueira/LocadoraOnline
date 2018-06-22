const opengraph = require('open-graph');
const router = require('express').Router();

const url = require('url');

router.get('/opengraph', (req, res) => {
    if (!req.query.url) {
        return res.status(400).json({
            error: true
        })
    }
    const alt = "http://" + url.parse(req.query.url).hostname;
    opengraph(req.query.url, (err, meta) => {
        if (err || Object.keys(meta).length === 0) {
            return opengraph(alt, (err, meta) => {
                if (err || Object.keys(meta).length === 0) {
                    return res.status(400).json({
                        error: true
                    })
                }
                res.json(meta);
            })
        }
        res.json(meta);
    })
})

module.exports = router;