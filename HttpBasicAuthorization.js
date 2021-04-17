/**
 * * created by: ADAMETS VLADISLAV
 * * github: https://github.com/adametsofficial
 *
 * * class HttpBasicAuthorization
 * 
 * * version 1.0.0
 */

class HttpBasicAuthorization {
  static authData = {
    login: "admin",
    password: "admin",
  };

  static _express(req, res, next) {
    // parse login and password from headers
    const b64auth = (req.headers.authorization || "").split(" ")[1] || "";
    const [login, password] = Buffer.from(b64auth, "base64")
      .toString()
      .split(":");

    // Verify login and password are set and correct
    if (
      login &&
      password &&
      login === HttpBasicAuthorization.authData.login &&
      password === HttpBasicAuthorization.authData.password
    ) {
      // Access granted...
      return next();
    }

    // Access denied...
    res.set("WWW-Authenticate", 'Basic realm="401"');
    res.status(401).send("<h1>Access denied...</h1>");
  }

  static native(req, res) {
    const b64auth = (req.headers.authorization || "").split(" ")[1] || "";
    const [login, password] = Buffer.from(b64auth, "base64")
      .toString()
      .split(":");

    if (
      login &&
      password &&
      login === HttpBasicAuthorization.authData.login &&
      password === HttpBasicAuthorization.authData.password
    ) {
      return Promise.resolve();
    }

    res.writeHead(401, { "WWW-Authenticate": 'Basic realm="nope"' });
    res.end("<h1>Access denied...</h1>");

    return Promise.reject();
  }
}
