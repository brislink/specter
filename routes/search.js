exports.searchByTitle = function(req,res){
    
    var searchQuery = req.body;
    console.log(searchQuery);
    var response = [
        {
        "_id": "another-post",
        "title" : "Another post",
        "wordCount" : "40"
    },
        {
        "_id": "test",
        "title" : "Test",
        "wordCount" : "700"}
        ];
    
    return res.send(response);
};

function buildSearchQuery(searchTerm){
    
var query = {  
    
    "query":{
        "bool":{
            "must":{
                "match":{
                    "title":{
                        "query": searchTerm,
                        "operator": "and"    
                    }
                }
            },
                "should":[
                    {
                        "match" :{
                            
                            "postHtml" : searchTerm  
                        }
                    },
                    {
                        "match":{
                            "caption" : searchTerm
                        }
                    }
                ]
            }
        }
    };
}
