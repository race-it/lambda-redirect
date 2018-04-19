'use strict';
exports.handler = (event, context, callback) => {
  /*
   * Generate HTTP redirect response with 301 status code and Location header.
   */
   
   const request = event.Records[0].cf.request;
   
   // get the original URL path
   const path = request.uri
   const baseURI = "http://www.baseurl.com"

   const response = {
      status: '301',
      statusDescription: 'Found',
      headers: {
          location: [{
              key: 'Location',
              value: baseURI,
          }],
      },
  };
  
  const data = {
    "mappings" : [
      {
        "old" : '/path/to/old/resource',
        "new" : '/path/to/new/resource'
      },
      {
        "old" : '/pathadded/to/old/resource',
        "new" : '/pathremoved/to/new/resource'
      },
      {
        "old" : '/path/to/other/old/resource',
        "new" : '/path/to/other/new/place'
      }
    ]
  };

  var objFound = data.mappings.find(obj => obj.old === path);
  response.headers.location[0].value = baseURI + objFound.new;
  
  callback(null, response);
};

