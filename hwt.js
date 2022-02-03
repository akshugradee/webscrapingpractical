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
 //--- find team name ----//
 let winingteam;
 function extracthtml(html){
     let $=cheerio.load(html);
     let teamArr=$(".match-info.match-info-MATCH .team"); //make a match but we couldfind get so
     for(let i=0;i<teamArr.length;i++){
     let hasclass =$(teamArr[i]).hasClass('team-gray'); //use hasclass to check if this element present or not
     if(hasclass==false){
       let teamName=  $(teamArr[i]).find(".name"); //if not we will search for the name
       winingteam=teamName.text().trim();
    //    console.log(winingteam);
    //    winingteam=teamName.trim();
    //    console.log(winingteam);
     }
     

     }
//shortr form of html
     let ingingsArr=$(".card.content-block.match-scorecard-table .Collapsible");
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
            //wining team bowler table
            let hwt=0;
            let hwicktaker="";
            if(winingteam==team){
                //console.log(team);
             let tableele=   $(ingingsArr[i]).find('.table.bowler');
                //we need names and wicket
                //all bowlers present in the  so we need first row
        let allbowlers = $(tableele).find("tr");
        //bowlers and names and wicket
        for(let j=0;j<allbowlers.length;j++){
            let allcolofplay=$(allbowlers[j]).find("td");  //all col are theri [0]- bowling name ,[4 -wicket]
            let playername=$(allcolofplay[0]).text();
            let wicket=$(allcolofplay[4]).text();
            if(wicket>=hwt){
                hwt=wicket;
                hwicktaker=playername;
            }
           

        }
        console.log(`wining team ${winingteam} highest wicket taker${hwicktaker}  highest wicket ${hwt}`);

            }
          
        }
    }
 

 //-- ingings name for both team to get the tabel---//