function retrieveAllBlogposts() {
  var blogpostList = [];

  const ss = openSpreadSheet();
  const blogpost_tab = ss.getSheetByName( BLOGPOST_TAB_NAME );
  var columnValues = blogpost_tab.getRange(2, 1, blogpost_tab.getLastRow(), blogpost_tab.getLastColumn()).getValues();
  for(let post of columnValues) {
    if (post[0] != '') {
      blogpost = {}
      blogpost.id = post[0];
      blogpost.title = post[1];
      blogpost.content = post[2];
      blogpost.author = post[3];
      blogpost.type = post[4];
      blogpost.related_opportunity_id = post[5];
      blogpost.timestamp = post[6].toString();

      blogpostList.push(blogpost);
    }
    
  }
  return blogpostList;
}

// var post = {
//   "title": "I want to eat some sushi",
//   "content": "Sushi is wonderful af",
//   "related_opportunity_id": 2
// }
function createNewEventPost(post) {
  post.type = "event";
  createNewPost(post);
}

function createNewWorkshopPost(post) {
  post.type = "workshop";
  createNewPost(post);
}

function createNewTrainingPost(post) {
  post.type = "training";
  createNewPost(post);
}

// var post = {
//   "title": "I want to eat some sushi",
//   "content": "Sushi is wonderful af",
//   "type": "workshop",
//   "related_opportunity_id": 2
// }
function createNewPost(post) {

  try {
    if(!checkIfUserHasReserved) {
      throw new Error("User has yet to log in.");
    }

    var user= getUserDetails();
    var currTimestamp = new Date();

    const ss = openSpreadSheet();
    const blogpost_tab = ss.getSheetByName( BLOGPOST_TAB_NAME );

    var lastRow = blogpost_tab.getLastRow();
    var blogpostId = 0;
    if (lastRow === 1) {
      blogpostId = 1;
    } else {
      blogpostId = lastRow;
    }
    var blogpostInfo = [blogpostId, post.title, post.content, user.fullName, post.type, post.related_opportunity_id, currTimestamp];
    blogpost_tab.appendRow(blogpostInfo);
    return 200;
  } catch (error) {
    console.log("An error has occurred: " + error);
    return 500;
  }

}