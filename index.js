#!/usr/bin/env node

let program = require('commander');

const baseUrl = "https://rarbg.to/torrents.php?search=<search>&category=1;<categories>";

program
  .arguments('<search>')
  .action((search) => {
      let categories = "18;41"
      let url = baseUrl
                  .replace("<search>", encodeURI(search))
                  .replace("<categories>", categories)

      console.log(url)
  })
  .parse(process.argv);

