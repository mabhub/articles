var fs         = require('fs');
var request    = require('request');
var prompt     = require('prompt');

var sourcefile, fileContent;

if (process.argv[2] && fs.existsSync(process.argv[2])) {

    sourcefile  = process.argv[2];
    fileContent = fs.readFileSync(sourcefile).toString();

    prompt.start();

    prompt.get({
        properties: {
            postpath: {
                description: 'Chemin complet du end-point de l\'article',
                message: 'Ce champs est requis',
                required: true
            },
            tri: {
                description: 'Utilisateur',
                message: 'Ce champs est requis',
                required: true
            },
            passwd: {
                description: 'Mot de passe (non stocké)',
                message: 'Ce champs est requis',
                replace: '*',
                required: true,
                hidden: true
            }
        }
    }, function (err, result) {
        if (err) throw err;

        request.post(result.postpath + '/update-content', {
            'auth': {
                'user': result.tri,
                'pass': result.passwd,
                'sendImmediately': false
            },
            'form': {
                'text': fileContent
            }
        }, function (err, httpResponse, body) {
            if (err) throw err;
            console.log(body);
        });
    });

}
