module.exports = function (eleventyConfig) {

  eleventyConfig.addGlobalData("permalink", "{{ page.filePathStem }}.html");

  return {
    // This makes sure HTML files use Nunjucks
    dir: {
      output: "public",
    },
  };
};