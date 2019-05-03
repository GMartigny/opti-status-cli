
function notAFunction () {}

module.exports = function () {
    function ok () {
        return Math.random() > 0.5;
    }

    try {
        if (ok()) {
            notAFunction();
        }
    }
    catch (e) {
        return "fail";
    }
};
