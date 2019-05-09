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
