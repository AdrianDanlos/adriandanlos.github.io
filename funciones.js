$( document ).ready(function() {
    let api = 'https://cors-anywhere.herokuapp.com/https://api.mozambiquehe.re/bridge?platform=PC&player=N3Essential,N3EssentialSmurf,EssentialReborn,spacexfanboy,asiatristanvigo,thechinesesoul&auth=';
    let key = 'LPuQwxrvLY7hspWf1eST';

    //First call
    ajaxCall();
    //Repetitive calls each 20s
    setInterval(()=>{
        ajaxCall();
    }, 20000); //20s


    function ajaxCall(){
        $.ajax({
            url: api + key,
            contentType: "application/json",
            dataType: 'json',
            success: function(result){
                let datosTotales = sumarDatos(result);
                let datosRanking = getRanking(result);
                visualizarDatos(datosTotales, datosRanking, "N3Essential(ALL)");
                console.log(result);
            }
        });
    }

    function getRanking(result){
        let rankName = result[0]['global']['rank']['rankName'];
        let rankScore = result[0]['global']['rank']['rankScore'];
        let rankDiv = result[0]['global']['rank']['rankDiv'];
        let rankImg = result[0]['global']['rank']['rankImg'];

        return [rankName, rankDiv, rankScore, rankImg];
    }

    function sumarDatos(result){
        let datosTotales = {
            "kills": 0,
            "wins": 0,
            "top3": 0
        };
        result.forEach((item, index) => {
            datosTotales.kills += result[index]['legends']['selected']['Pathfinder']['kills'];
            datosTotales.wins += result[index]['legends']['selected']['Pathfinder']['wins_season_3'];
            //Excepcion para el top3 por no tener activado el banner en apex
            if(("top_3" in result[index]['legends']['selected']['Pathfinder'])){
                datosTotales.top3 += result[index]['legends']['selected']['Pathfinder']['top_3'];
            }
        });
        return datosTotales;
    }

    function visualizarDatos(datosTotales, datosRanking, user) {
        //Date
        let d = new Date();
        $('#refresh-time').html("Last refresh: " + d.getHours() + ' : ' + d.getMinutes() + ' : ' + d.getSeconds() + '  GMT+1');
        //User
        $('#user-info').html(user);
        //Data
        let dataContainers = $('.data');
        for (let i = 0; i < dataContainers.length; i++) {
            dataContainers[i].innerHTML = datosTotales[Object.keys(datosTotales)[i]];
        }
        //Ranking


        $('#rank').html(datosRanking[0] + " " + romanize(datosRanking[1]) + " " + datosRanking[2]);
        $('.rank-logo').attr('src', datosRanking[3]);
    }

    function romanize(number) {
        switch (number) {
            case 1: return 'I';
                break;
            case 2: return 'II';
                break;
            case 3: return 'III';
                break;
            case 4: return 'IV';
                break;
        }
    }

});


