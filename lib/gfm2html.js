var marked = require('marked');
var fs     = require('fs');

marked.setOptions({
  highlight: function (code, lang) {
    var hl = require('highlight.js');
    return hl.highlightAuto(code, lang ? [lang] : hl.listLanguages()).value;
  }
});

var filename, source, html;

if (process.argv && process.argv[2]) {
  filename = process.argv[2];
  if (fs.existsSync(filename)) {
    source = fs.readFileSync(filename).toString();
    html = marked(source);
    fs.writeFileSync(filename + '.html', html);
  }
} else {
  console.log('Nothing to do.');
}
