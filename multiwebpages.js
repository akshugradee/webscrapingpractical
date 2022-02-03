
//birthday of the batsmen

const request= require('request');
 const cheerio=require('cheerio');
const url='https://www.espncricinfo.com/series/ipl-2020-21-1210595/chennai-super-kings-vs-kings-xi-punjab-53rd-match-1216506/full-scorecard'
    request(url,cb);
 function cb(error,response,html){
     if(error){
         console.log("error 404 found");
     }else{
         //console.log(html);
         extracthtml(html);
     }
 }

 function extracthtml(html){
    let $=cheerio.load(html);
   
    

    
//shortr form of html
    let ingingsArr= $(".card.content-block.match-scorecard-table .Collapsible");
       let htmlstr="";
       for(let i=0;i<ingingsArr.length;i++){
           // let chtml=$(ingingsArr[i]).html()
           // htmlstr +=chtml;
           //console.log(htmlstr);
           //teams of names
           
           let teamnameele=$(ingingsArr[i]).find(".header-title.label");
           let team=teamnameele.text();
          team= team.split('INNINGS')[0];
          team=team.trim();
          // console.log(team);
           //wining team bowler tabl
           let tabelele=$(ingingsArr[i]).find(".table.batsman");
           let allbatsman=$(tabelele).find("tr");
           //console.log(allbatsman);
           for(let j=0;j<allbatsman.length;j++){
               let allcolsofplayer=$(allbatsman[j]).find("td");
               let isbatman=$(allcolsofplayer[0]).hasClass("batsman-cell");
           
               if(isbatman==true){

               let href=$(allcolsofplayer[0]).find("a").attr("href");
               let playername=$(allcolsofplayer[0]).text();
               let fulllink="https://www.espncricinfo.com"+href;
               //console.log(fulllink);
               //console.log(`teamname ${team} playername ${playername}`);
               getbirthdaypage(fulllink,playername,team);
           }
        }
       }
    }
    function getbirthdaypage(url,playername,team){
        request(url,cb);
        function cb(err,response,html){
            if(err){
                console.log("eror");

            }else{
             extractbirthday(html,playername,team);
            }
        }

    }
    function extractbirthday(html,playername,team){
        let $=cheerio.load(html);
        let birthday=$('.player-card-description')
        let bod=$(birthday[1]).text();
        console.log(`${playername},'playes for'${team} 'was born on'${bod}`);
    }
    console.log("done ");