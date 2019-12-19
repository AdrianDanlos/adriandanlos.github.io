$( document ).ready(function() {
    let api = 'https://api.mozambiquehe.re/bridge?platform=PC&player=N3Essential,N3EssentialSmurf,EssentialReborn,spacexfanboy,asiatristanvigo&auth=';
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
                visualizarDatos(datosTotales, "N3Essential(ALL)");
            }
        });
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

    function visualizarDatos(datosTotales, user) {
        //Date
        let d = new Date();
        $('#refresh-time').html("Last refresh: " + d.getHours() + ' : ' + d.getMinutes() + ' : ' + d.getSeconds() + '  GMT+1');
        //User
        $('#user-info').html("User: " + user);
        //Data
        let dataContainers = $('.data');
        for (let i = 0; i < dataContainers.length; i++) {
            dataContainers[i].innerHTML = datosTotales[Object.keys(datosTotales)[i]];
        }
    }

});


