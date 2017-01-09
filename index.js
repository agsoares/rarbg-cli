#!/usr/bin/env node

//https://torrentapi.org/apidocs_v2.txt

let request = require('superagent')
let program = require('commander');

const baseUrl = 'https://torrentapi.org/pubapi_v2.php';

let searchTorrent = (token, search, params) => {
    request
      .get(baseUrl)
      .query({ mode: 'search', search_string: search, category: '18', sort: 'seeders' , token: token, app_id : 'rarbg-cli' })
      .end((err, res) => {
        if (res.statusCode === 200) {
          if (res.body.torrent_results) {
            console.log(res.body.torrent_results[0].download)
          } else {
            console.log ('Not found :(')
          }
          
        } else {
          console.log ('Error')
        }
    });
};

program
  .arguments('<search>')
  .action((search) => {
      request
        .get(baseUrl)
        .query({ get_token: 'get_token', app_id : 'rarbg-cli' })
        .end((err, res) => {
          if (res.statusCode === 200) {
            searchTorrent (res.body.token, search, null) 
          } else {
            console.log ('Error')
          }
        });
  })
  .parse(process.argv);

