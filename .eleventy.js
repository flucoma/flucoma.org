const { DateTime } = require("luxon");
const UglifyJS = require("uglify-es");

module.exports = function(eleventyConfig) {
  eleventyConfig.addLayoutAlias("post", "layouts/post.njk");

  // Date formatting (human readable)
  eleventyConfig.addFilter("ddMMyy", dateObj => {
    return DateTime.fromJSDate(dateObj).toFormat("dd.MM.yy");
  });

  // Ordered biogs
   eleventyConfig.addCollection("people", function(collection) {
    return collection.getFilteredByGlob("_team/*.md").sort(function(a, b) {
      return b.data.weighting - a.data.weighting;
    });
  });

  // Minify JS
  eleventyConfig.addFilter("jsmin", function(code) {
    let minified = UglifyJS.minify(code);
    if (minified.error) {
      console.log("UglifyJS error: ", minified.error);
      return code;
    }
    return minified.code;
  });


  eleventyConfig.addFilter("commission", function(c){
    let re = /[^\/]+$/g; 
    return `<ul class="commission-item">
              <li class="commission-by"><a href="${c.site}">${c.by}</a></li>
              <li class="commission-title">${c.title}</li> 
              <li class="commission-note">${c.note}</li> 
              <li class="commission-video">
                <iframe src="https://www.youtube.com/embed/${c.url.match(re)}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>                
              </li>
            </ul>`
  }); 
  
  eleventyConfig.addFilter("madeWith", function(collection){    
    let sortedCollection = collection.sort(function (a,b){
        return (parseInt(a.year) > parseInt(b.year)) ? 1 : 
                (parseInt(b.year) > parseInt(a.year)) ? -1 : 0;
    }
    );    
    let res =  '<ul class="madewith-block">'; 
    sortedCollection.forEach((a) => res +=
      `<li class="madewith-item">         
        <div class="madewith-content">
          <h6 class="madewith-title"><a class="madewith-link" href="${a.url}" target="_blank">
            ${a.name}</a></h6>
          <p class="madewith-author">${a.by} (${a.year})</p>          
          <div class="madewith-overlay">${a.desc}</div>
        </div>
      </li>`);
    return res + '</ul>'
  }); 
  

  // Copy the `img` directory
  eleventyConfig.addPassthroughCopy("img");

  // Copy the `css` directory
  eleventyConfig.addPassthroughCopy("css");

  // Copy the `fonts` directory
  eleventyConfig.addPassthroughCopy("fonts");

  return {
    passthroughFileCopy: true
  };
};
