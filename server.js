var http = require('http'), 
    fs = require('fs'), 
    url = require('url'),
    port = 8080;

/* Global variables */
var listingData, server;

var requestHandler = function(request, response)
{
  /*
    Your request handler should send listingData in the JSON format if a GET request 
    is sent to the '/listings' path. Otherwise, it should send a 404 error. 

    HINT: explore the request object and its properties 
    http://stackoverflow.com/questions/17251553/nodejs-request-object-documentation
   */
  var parsedUrl = url.parse(request.url);
  var pathname = parsedUrl.pathname;
   if( pathname == '/listings' && request.method == 'GET') //get request
   {
      //response.writeHead(200, {'Content-Type': 'application/json'});
      //response.write(listingData);
      response.end(listingData);
   }
   else
   {
      response.writeHead(404);
      //response.statusCode = 404;
      response.end('Bad gateway error');
   }   
}

fs.readFile('listings.json', 'utf8', function(err, data)
{
  /*
    This callback function should save the data in the listingData variable, 
    then start the server. 
   */
   if(err)
    throw error;
   listingData = data;
});

server = http.createServer(requestHandler);//out
server.listen(port, function() //once the server is listening, this callback function is executed
{
    console.log('Server listening on: http://127.0.0.1:' + port);
});

/*

   listingData = fs.createReadStream(data);
   if(err)
   {//error
      response.writeHead(404, {'Content-Type': 'text/plain'});
      response.write('404 Error. Page does not exist.\n');
      listingData.on('close', closeCallback);
   }
   else
   {
      if( pathname == '/listings' )//get request
      {    
          listingData.on('data', writeCallback);
      }
      else
      {
         response.writeHead(404, {'Content-Type': 'text/plain'});
         response.write('404 Error. Page does not exist.\n');
         listingData.on('close', closeCallback);
      }

    server = http.createServer(onRequest);//out
    server.listen(port, function() //once the server is listening, this callback function is executed
    {
      console.log('Server listening on: http://127.0.0.1:' + port);
    });
  }

function onRequest(request, response)
{
    
  //listingData = fs.createReadStream('listings.json');
    /*if( pathname == '/listings' ){//get request
        listingData.on('data', writeCallback);
    }
    else{
        //response.writeHead(404, {'Content-Type': 'text/plain'});
        //response.write('404 Error. Page does not exist.\n');
        //listingData.on('close', closeCallback);
        //response.end();
    }
    */
    /*
    function writeCallback(data){
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.write(data);
    }

    function closeCallback(){
        response.end();
    }
*/
//}
