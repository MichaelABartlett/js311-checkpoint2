# backend_express_with_router_controller_mysql
first checkpoint for JS311

to deploy on Heroku 
    michaelbcheckpoint.herokuapp.com

 if changes have been made then it has to be pushed to Heroku

 git add .

 git commit -m "something here"

 git push heroku master   

 when using PostMan make sure the address being used is "https://michaelbcheckpoint.herokuapp.com"
    this will got to the right of the 'get' selection box area and before the /what you want to do

    admin user
        username: "motoCodeMan"
        password: "12345"

    user
        username: "Motoxxman"
        password: "12345"



steps I need to do

run npm run build in \client folder

in server folder index.js and add

    if(process.env.NODE_ENV === 'production')
        app.use(express.static('client/build'))

