const {app, BrowserWindow} = require('electron')
const { Ignitor } = require('@adonisjs/ignitor')

const exec = require('child_process').exec;

let win = null;

app.on('ready', function () {
    win = new BrowserWindow({width: 1000, height: 600});

    //win.loadURL(`file://${__dirname}/public/loading.html`);

    /*exec("adonis serve", function(error, stdout, stderr) {
      // command output is in stdout
      console.log(stdout);
    });*/
    // Initialize the window to our specified dimensions
    //setTimeout(function(){
    win.loadURL('http://localhost:3333/login');
    //}, 5000);

    app.on('close', function () {
    });


});

//quit the app once closed
app.on('window-all-closed', function () {
    if (process.platform != 'darwin') {
        /*exec("taskkill /f /im node.exe", function(error, stdout, stderr) {
          // command output is in stdout
          console.log(stdout);
        });*/
        app.quit();
    }
});
