const axios = require('axios')
const cheerio = require('cheerio')

axios.get('https://m.cricbuzz.com/cricket-commentary/46611/ban-vs-sl-1st-test-sri-lanka-tour-of-bangladesh-2022').then((response) => {
    // Load the web page source code into a cheerio instance
  
    
  
    const $ = cheerio.load(response.data);
    const urlElems = $('.list-content span:nth-child(5)').text();
    const status = $('.cbz-ui-status').text();
    const title = $('#top').find('div').find('div:nth-child(9)').find('h4').text();

    const batTeam = $('#top h3.ui-li-heading span.miniscore-teams.ui-bat-team-scores').text();

    if (batTeam){
      
    const batsman1name = $('#top table tr:nth-child(2)').first().first().find('td:nth-child(1)').text();
    const batsman2name = $('#top table tr:nth-child(3)').first().first().find('td:nth-child(1)').text();
    const bowlername = $('#top').find('div:nth-child(11)').find('div:nth-child(3)').find('tr:nth-child(2)').find('td:nth-child(1)').text();
  
  
    const batsman1run = $('#top table tr:nth-child(2)').first().first().find('td:nth-child(2)').text();
    const batsman2run = $('#top table tr:nth-child(3)').first().first().find('td:nth-child(2)').text();
    const bowlerwikwt = $('#top').find('div:nth-child(11)').find('div:nth-child(3)').find('tr:nth-child(2)').find('td:nth-child(5)').text();
    const bowlerover = $('#top').find('div:nth-child(11)').find('div:nth-child(3)').find('tr:nth-child(2)').find('td:nth-child(2)').text();
  
    const lbb = $('#top').find('div').find('div:nth-child(11)').find('div.cb-list-item.miniscore-data.ui-branding-style.ui-branding-style-partner').find('div').children().children().find('span:nth-child(8)').text();
    const bowlTeam = $('#top h3.ui-li-heading span.teamscores.ui-bowl-team-scores').text();
    const crr = $('#top .ui-match-scores-branding .crr').text();
    var commentry = $('#paginationList').find('div').find('div:nth-child(3)').text();
    const commentry2 = $('#paginationList').find('div').find('div:nth-child(5)').text();
  if  (!commentry ){
   commentry =commentry2;
  }
  
  var BatNameRun = batTeam.split(' ');
  var BowlNameRun = bowlTeam.split(' ');
  
  console.log(batTeam)


    }
    
    else{
      const bat1run =  $('#top').find('div').find('div:nth-child(11)').find('div.cb-list-item.miniscore-data.ui-match-scores-branding').find('div.col-xs-9.col-lg-9.dis-inline').find('h3').find('span:nth-child(1)').text();
      const bat2run =  $('#top').find('div').find('div:nth-child(11)').find('div.cb-list-item.miniscore-data.ui-match-scores-branding').find('div.col-xs-9.col-lg-9.dis-inline').find('h3').find('span:nth-child(2)').text();
      //#top > div > div:nth-child(11) > div.cb-list-item.miniscore-data.ui-match-scores-branding > div > div.col-xs-9.col-lg-9.dis-inline > h3
      var BatNameRun1 = bat1run.split(' ');
      var BatName1 = BatNameRun1[0];
      var BatRun1 = bat1run.replace(BatName1, "").replace('-', "");

      var BatNameRun2 = bat2run.split(' ');
      var BatName2 = BatNameRun2[0];
      var BatRun2 = bat2run.replace(BatName2, "").replace('-', "");
  
      console.log(BatName1,':',BatRun1);
      console.log(BatName2,':',BatRun2);

    }

  
  });