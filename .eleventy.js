module.exports = function (eleventyConfig) {

  eleventyConfig.addGlobalData("permalink", "{{ page.filePathStem }}.html");
};