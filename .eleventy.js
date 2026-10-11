module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("assets");
    eleventyConfig.addPassthroughCopy("src");
    eleventyConfig.addPassthroughCopy("CNAME");
    eleventyConfig.addPairedShortcode("grayBox", (content) => {
        return `<div class="bg-gray p-3 m-2">${content}</div>`;
    });
    eleventyConfig.addFilter("where", (array, key, value) => {
        return array.filter(item => item[key] === value);

    });
}
return {
    markdownTemplateEngine: "njk", htmlTemplateEngine: "njk", templateFormats: ["md", "njk", "html"], dir: { input: ".", output: "_site" }

};



