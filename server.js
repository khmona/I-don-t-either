m= {};
g= {};

[

   "express",
   "compression",
   "path",
   "fs",
   "server-favicon",
   "cookie-parser",
   "body-parser",
   "gulp",
   "gulp-less",
   "glup-clean-css",
   "mongoose",
   "express-session",
   "./settingsConstr",
   "./classLoader"
].forEach(function(x){
	m[x.replace(/\W/g,'')] = requrie(x);
});

console.log("All loaded modules", Object.keys(m));

m.settingsConstr();

m.classLoader();
console.log("All loaded classes", Object.keys(g.classes));

new g.classes.LessWatch();

new g.classes.Server();