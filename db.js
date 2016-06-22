var md5 = require('js-md5');
var request = require('request');
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'eu-cdbr-azure-north-e.cloudapp.net',
    user: 'b7ddb322534be4',
    password: '43813008',
    database: 'easysafetydb'
});


function ShowLocks(gToken, callback) {
    var locks = {};
    locks['12345'] = {
        name: 'Home',
        pic: 3,
        access: 0,
        usedTime: "12:40",
        usedByUser: "sergiyvm96@gmail.com",
    };
    GetEmailFromGoogleToken(gToken, function (email) {
        if (email != undefined) {
            var query = "SELECT LockName, LockPic FROM AccessTokens WHERE Email='" + email + "'";
            connection.query(query, function (err, rows, fields) {
                if (!err)
                    callback(JSON.stringify({'status':'success','locks':locks,}));
                else
                    callback({'status':'mysql error'});
            });
        } else {
            callback({'status':'invalid token'});
        }
    });
}

function AddNewLock(gToken, lockId, lockName, lockPic, callback) {
    var d = new Date();
    var n = d.getTime();
    GetEmailFromGoogleToken(gToken, function (email) {
        if (email != undefined) {
            var accessToken = md5('' + n + lockId + email);
            var query = 'INSERT INTO AccessTokens VALUES ("' + accessToken + '","' + lockId + '","' + email + '",' + 0 + ',' + lockName + ',' + lockPic + ')';
            connection.query(query, function (err, rows, fields) {
                if (!err)
                    callback(JSON.stringify({'status':'success'}));
                else
                    callback({'status':'mysql error'});
            });
        } else {
            callback({'status':'invalid token'});
        }
    });
}

function EditLock(gToken, lockId, lockName, lockPic, callback) {
    GetEmailFromGoogleToken(gToken, function (email) {
        if (email != undefined) {
            var lockId = md5('' + n + email);
            var accessToken = md5('' + n + lockId + email);
            var query = 'UPDATE AccessTable SET LockName=value1, LockPic=value2 WHERE LockId="'+lockId+'" AND Email="'+email+'";';
            connection.query(query, function (err, rows, fields) {
                if (!err)
                    callback(JSON.stringify({'status':'success'}));
                else
                    callback({'status':'mysql error'});
            });
        } else {
            callback({'status':'invalid token'});
        }
    });
}

function RemoveLock(gToken, lockId) {}

function ShareLock(gToken, lockId, sharingEmail, sharingType) {}

function ShowLockInfo(gToken, lockId) {}

function RemoveAccessToken(gToken, accessToken) {}

function AddEventToHistory(accessToken) {}

exports.ShowLocks = ShowLocks;
exports.AddNewLock = AddNewLock;
exports.EditLock = EditLock;
exports.RemoveLock = RemoveLock;
exports.ShareLock = ShareLock;
exports.RemoveAccessToken = RemoveAccessToken;
exports.AddEventToHistory = AddEventToHistory;

function GetEmailFromGoogleToken(gToken, callback) {
    request
        .get('https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=' + gToken, function (err, httpResponse, body) {
            callback(JSON.parse(body).email);
        });
}