function customResponses(req, res, next) {
  res.badRequest = function(url, errors) {
    req.flash('danger', errors); // This stores the error message. flash() always stores a locals object, so you can access the error under locals.messages.danger, abbreviated to message.danger in views/albums/new, views/sessions/index and in views/registrations/index, the three places where the user can type wrong stuff that can store something in res.badRequest. I'm not really sure why we can't just directly store the error in the locals.messages object without using flash().
    // This is always sent to those three ejs pages (even if there is no bad request), but because all those three ejs pages have an if statement that determines whether or not messages.danger exists, it renders a red error message only if there is indeed an error. What stores res.badRequest is determined in our controllers.
    // flash() docs => https://github.com/expressjs/express-messages
    console.log(url);
    return res.redirect(url); // return is used here, terminating everything after it in the controllers (there shouldn't be anything after it anyway, because these are only used in caught errors).
  };
  next();
}

module.exports = customResponses;
