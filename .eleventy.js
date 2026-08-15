module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("css");
    eleventyConfig.addPassthroughCopy("js");
    eleventyConfig.addPassthroughCopy("assets");
        eleventyConfig.addPassthroughCopy("src");

    eleventyConfig.addPassthroughCopy("**/*.txt")
    return {
        markdownTemplateEngine: "njk"
    };
};


  return {
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["md", "njk", "html"],
    dir: {
      input: ".",
      output: "_site"
    }
  };




