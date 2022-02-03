const request=require('request');
const cheerio=require('cheerio');
const chalk=require('chalk');

request('https://www.worldometers.info/coronavirus/',cb);
console.log("start");
function cb(error,response ,html){

    if(error){
        console.log("something is wrong ");
    }else{
       // console.log("html",html); //print the html for worldometer
       handelhtml(html);
    }
    
    
}

function handelhtml(html){
    let settool=cheerio.load(html); //complex work done by cheerio just pass the selector u want
    //let arr=settool("h1"); //return in a array form
    let contarr=settool('#maincounter-wrap span');
    // for(let i=0;i<contarr.length;i++){
    //     let data= settool(contarr[i]).text();
    //     console.log("data" ,data);
    // }
    // //console.log(arr.length);
    let total=settool(contarr[0]).text();
    let deaths=settool(contarr[0]).text();
    let recoverd=settool(contarr[0]).text();

    console.log(chalk.gray('total cases :',total));
    console.log(chalk.red('deaths :',deaths));
    console.log(chalk.green('recovered :',recoverd));
}
console.log("end");
 //now for data to extract or parse we need module like cheerio 
