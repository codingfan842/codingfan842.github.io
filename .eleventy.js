module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("assets");
    eleventyConfig.addPassthroughCopy("src");
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