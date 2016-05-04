module.exports = function () {
    this.getReqInfo = function (req) {
        var info = '';
        if(req && req.headers) {
            for (var name in req.headers) {
                info += name + ': ' + req.headers[name] + '<br>';                
            }
        }
        return info.length === 0 ? 'no more request info' : info;
    }
    
    /**
     * @param req express请求
     */
    this.getReq__ = function (req) {
        var info = '<p>';
        if (req.param) {
            info += 'Request param:<br>';
            info += JSON.stringify(req.param) + '<br>';
        }
        if (req.query) {
            info += 'Request query:<br>';
            info += JSON.stringify(req.query) + '<br>';
        }
        if (req.route) {
            info += 'Request route:<br>';
            info += JSON.stringify(req.route) + '<br>';
        }
        if (req.cookies) {
            info += 'Request cookies:<br>';
            info += JSON.stringify(req.cookies) + '<br>';
        }
        if (req.headers) {
            info += 'Request header:<br>';
            info += JSON.stringify(req.headers) + '<br>';
        }
        if (req.accepts) {
            info += 'Request accepts:<br>';
            info += JSON.stringify(req.accepts) + '<br>';
        }
        if (req.ip) {
            info += 'Request ip:<br>';
            info += JSON.stringify(req.ip) + '<br>';
        }                
        if (req.path) {
            info += 'Request host:<br>';
            info += JSON.stringify(req.path) + '<br>';
        }        
        if (req.xhr) {
            info += 'Request xhr:<br>';
            info += JSON.stringify(req.xhr) + '<br>';
        }
        if (req.url) {
            info += 'Request url:<br>';
            info += JSON.stringify(req.url) + '<br>';
        }
        if (req.session) {
            info += 'Request session:<br>';
            info += JSON.stringify(req.session) + '<br>';
        }
        return info.length === 0 ? '<p>no more request info</p>' : info + '</p>';
    }
    
    this.testPage = function testPage(req, res) {
        if(!req.query || !req.query.testPage) return false;
        console.log('testPage: ' + req.query.testPage);
        res.render(req.query.testPage);
        return true;
    }
    
    this.siteRoute = function siteRoute(req, res) {
        
    }
    return this;
}