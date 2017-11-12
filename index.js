#!/usr/bin/env node

//  https://torrentapi.org/apidocs_v2.txt

const request = require('superagent');
const program = require('commander');

const baseUrl = 'https://torrentapi.org/pubapi_v2.php';

const searchTorrent = (token, search, retryCount) => {
  request
    .get(baseUrl)
    .query({
      mode: 'search',
      search_string: search,
      category: '18',
      sort: 'seeders',
      token,
      app_id: 'rarbg-cli',
    })
    .end((err, res) => {
      if (res.statusCode === 200 && res.body.torrent_results) {
        console.log(res.body.torrent_results[0].download);
      } else if (retryCount > 0) {
        searchTorrent(token, search, retryCount - 1);
      } else {
        console.log('Not Found :(');
      }
    });
};


program
  .arguments('<search>')
  .action((search) => {
    request
      .get(baseUrl)
      .query({ get_token: 'get_token', app_id: 'rarbg-cli' })
      .end((err, res) => {
        if (res.statusCode === 200) {
          searchTorrent(res.body.token, search, 1);
        } else {
          console.log('Authentication Error');
        }
      });
  })
  .parse(process.argv);
