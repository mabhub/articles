var marked   = require('marked');
var fs       = require('fs');
var renderer = new marked.Renderer();

renderer.code = function (code, lang, escaped) {
  if (this.options.highlight) {
    var out = this.options.highlight(code, lang);
    if (out != null && out !== code) {
      code = out;
    }
  }

  if (!lang) {
    return '<pre class="pre-hljs"><code class="hljs">'
      + (escaped ? code : escape(code, true))
      + '\n</code></pre>';
  }

  return '<pre class="pre-hljs"><code class="hljs '
    + this.options.langPrefix
    + escape(lang, true)
    + '">'
    + code
    + '\n</code></pre>\n';
};


marked.setOptions({
  langPrefix: '',
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
    html = marked(source, {renderer: renderer});
    fs.writeFileSync(filename + '.html', html);
  }
} else {
  console.log('Nothing to do.');
}
