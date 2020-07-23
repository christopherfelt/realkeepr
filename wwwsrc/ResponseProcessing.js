export default class ResponseProcessing {
  static processResponseURls(subredditPostCollection) {
    let youtubeCollection = [];
    let otherCollection = [];
    for (let i = 0; i < subredditPostCollection.length; i++) {
      console.log(subredditPostCollection[i].data.url);
      let result = this.processSingleURL(subredditPostCollection[i].data.url);
      if (result[0]) {
        youtubeCollection.push(result[1]);
      } else {
        otherCollection.push(result[1]);
      }
    }
    let youtubeObjectArray = [];
    for (let i = 0; i < youtubeCollection.length; i++) {
      let newObj = {};
      newObj[i] = youtubeCollection[i];
      youtubeObjectArray.push(newObj);
    }
    // return youtubeObjectArray;
    return [youtubeCollection, otherCollection];
  }

  static processSingleURL(youtubeURL) {
    let youtubeURLSearchResult = youtubeURL.search("youtube");
    let youtubeShortenedURLSearchResult = youtubeURL.search("youtu.be");
    let youtubeURLArray = youtubeURL.split("/");
    if (youtubeURLSearchResult != -1) {
      let youtubeID = youtubeURLArray[3].split("=")[1];
      return [true, youtubeID];
    } else if (youtubeShortenedURLSearchResult != -1) {
      return [true, youtubeURLArray[3]];
    } else {
      return [false, youtubeURL];
    }
  }

  static validateYoutubeURL(youtubeURL) {
    let youtubeURLSearchResult = youtubeURL.includes("youtube");
    let youtubeShortenedURLSearchResult = youtubeURL.includes("youtu.be");
    return youtubeURLSearchResult || youtubeShortenedURLSearchResult;
  }
}
