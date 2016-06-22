var db = require("./db.js");

var appRouter = function (app) {
    app.post("/locks", function (req, res) {
        var callback = function (data) {
            res.send(data);
        };
        if (req.body.gToken) {
            db.ShowLocks(req.body.gToken, callback);
        }
    });
    
    app.post("/lock/new", function (req, res) {
        var gToken = req.body.gToken;
        var lockId = req.body.lockId;
        var lockName = req.body.lockName;
        var lockPic = req.body.lockPic;
        var callback = function (data) {
            res.send(data);
        };
        if (gToken && lockId && lockName && lockPic) {
            db.AddNewLock(gToken, lockId, lockName, lockPic, callback);
        }
    });
    
    app.post("/lock/edit", function (req, res) {
        var gToken = req.body.gToken;
        var lockId = req.body.lockId;
        var lockName = req.body.lockName;
        var lockPic = req.body.lockPic;
        var callback = function (data) {
            res.send(data);
        };
        if (gToken && lockId && lockName && lockPic) {
            db.EditLock(gToken, lockId, lockName, lockPic, callback);
        }
    });
    
    app.post("/lock/remove", function (req, res) {
        var gToken = req.body.gToken;
        var lockId = req.body.lockId;
        if (gToken && lockId) {
            db.RemoveLock(gToken, lockId);
        }
    });
    
    app.post("/lock/share", function (req, res) {
        var gToken = req.body.gToken;
        var lockId = req.body.lockId;
        var sharingEmail = req.body.sharingEmail;
        var sharingType = req.body.sharingType;
        if (gToken && lockId && sharingEmail && sharingType) {
            db.ShareLock(gToken, lockId, sharingEmail, sharingType);
        }
    });
    
    app.post("/lock/ban", function (req, res) {
        var gToken = req.body.gToken;
        var accessToken = req.body.accessToken;
        if (gToken && sharingToken) {
            db.RemoveAccessToken(gToken, accessToken);
        }
    });
    
    app.post("/lock/open", function (req, res) {
        var accessToken = req.body.accessToken;
        if (accessToken && lockId) {
            db.AddEventToHistory(accessToken);
        }
    });
}

module.exports = appRouter;