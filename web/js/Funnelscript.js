$(document).ready(function () {
    $('.js-example-basic-single').select2();
     $('.color-label').select2({
        placeholder: 'Choisissez votre couleur',

     });
    
    $(".card-body").each(function(){
        var thisCard = $(this);
        thisCard.mouseover(function () { 
            
            var cardIn = thisCard.children("div").attr("class","icon-displayFlex");
            cardIn.fadeIn();
            cardIn.css("display","flex");
            cardIn.css("justify-content","space-around");
            
            
        });
        thisCard.mouseleave(function(){
            
            var outCard = thisCard.children("div").attr("class","icon-displayFlex");
            outCard.fadeOut();
        });
    })
   
    if ($("#scriptAS").val() == "true") {
        // var listBoards = JSON.parse($("#listBoards").val());
        var dataBdd = JSON.parse($("#dataBdd").val());
        
        $("#nameFunnel").val(dataBdd[0].name_funnel);

        $("#listBoardDest").after("<br><div id='divBoardSource'></div>");

        var i = 0;
        var classAs = "";
        dataBdd.forEach(function(){
            classAs = "boardLibSelect"+i;
            classAs2 = "listLibSelect"+i;

            var newObj = "<div class='form-group listBoardSource listBoardSource"+i+"' style='display: block;'>";
            newObj += "<label for='board-source' class='labelDest'>Tableau source :</label>";
            newObj += "<select name='board-source[]' class='board-source select-board js-example-basic-single ' id='"+classAs2+"'>";
            // newObj += "<select name='board-source[]' class='board-source select-board'>";
            newObj += "<optgroup label='Tableau(x) jamais sélectionné(s)' class='noSelectedOpt'>";

            newObj += "</optgroup>";
             newObj += "<optgroup label='Tableau(x) déjà sélectionné(s)' class='selectedOpt'>";
             newObj += "</optgroup>";
            newObj += "</select>";
            newObj += "<select name='list-source[]' class='list-source select-linked js-example-basic-single' id='"+classAs+"' >";
            // newObj += "<select name='list-source[]' class='list-source select-linked ' >";
            newObj += "<option>";
            newObj += "Sélectionnez votre liste source";
            newObj += "</option>";
            newObj += "</select>";
            newObj += "<button type='button' class='btn addBoardSource'><i class='fas fa-plus '></i></button>";
            newObj += "<button type='button' class='btn deleteBoardSource'><i class='fas fa-trash'></i></button>";
            newObj += "<i class='fas fa-circle-notch fa-spin'></i>";
            newObj += "</div>";
            
            $("#divBoardSource").append(newObj);
            $("#"+classAs).select2();
                $("#"+classAs2).select2();
            i++;
            
        });

        var listeTab = [];

        $.ajax({
            url: '../config/ajaxAS.php',
            type: 'POST',
            data: "action=getUserId",
            dataType: 'json',
            timeout: 3000,
            success: function (data) {
                if (data != null) {
                    $.ajax({
                        url: '../config/ajaxAS.php',
                        type: 'POST',
                        data: {action: "getBoards", id:data},
                        dataType: 'json',
                        timeout: 3000,
                        success: function (data) {
                            if (data != null) {
                                data.forEach(function(item){
                                    
                                    if (dataBdd[0].board_dest == item["idBoard"]) {
                                        $("#board-dest").append("<option value='"+item["idBoard"]+"' selected>"+item["name"]+"</option>");
                                    }
                                    else{
                                        $("#board-dest").append("<option value='"+item["idBoard"]+"'>"+item["name"]+"</option>");
                                        $(".noSelectedOpt").append("<option value='"+item["idBoard"]+"'>"+item["name"]+"</option>");
                                    }
                                });
                                $.ajax({
                                    url: '../config/ajaxAS.php',
                                    type: 'POST',
                                    data: { action: "getLists", idBoard: dataBdd[0].board_dest },
                                    dataType: 'json',
                                    timeout: 3000,
                                    success: function (data) {
                                        if (data != null) {
                                            data.forEach(function(item){
                                                if (item["idList"] == dataBdd[0].list_dest) {
                                                    $(".list-destination").append("<option value='"+item["idList"]+"' selected>"+item["name"]+"</option>");
                                                }else{
                                                    $(".list-destination").append("<option value='"+item["idList"]+"'>"+item["name"]+"</option>");
                                                }
                                            });
                                            UpdateList(dataBdd, 0);
                                        }
                                    },
                                    error: function () {
                                        alert("Probleme AJAX - 5");
                                    }
                                });
                            }
                        },
                        error: function () {
                            alert("Probleme AJAX - 3");
                        }
                    });
                }
            },
            error: function () {
                alert("Probleme AJAX - 2");
            }
        });
    }
    
    var options = $("#board-dest");

     
        $("#board-dest").change("blur", function () {

        var valDestSelected = $("#board-dest").val();
            $(".board-source").each(function(index){
                  $(this).find('option').each(function(){
                    
                     if( $(this).attr('value')=== valDestSelected){
                        $(this).css("display", "none");
                        

                     }else {
                        $(this).css("display", "block");
                        
                     }
                  })
                 
            })
       
    });       
});

function UpdateList(dataList, i){

    var item = dataList[i];
   
    $.ajax({
        url: '../config/ajaxAS.php',
        type: 'POST',
        data: { action: "getTable", idList: item.lists },
        dataType: 'json',
        timeout: 3000,
        success: function (data) {
            if (data != null) {

                $(".listBoardSource"+i).find(".board-source").val(data["idBoard"]);
                var test = $(".listBoardSource"+i).find(".board-source").val();
                var test2 = $(".listBoardSource"+i).find(".board-source option[value="+test+"]");
                var test3 = $(".listBoardSource"+i).find(".board-source optgroup.selectedOpt").append(test2);

                $(".board-source").select2();
                $("#"+classAs2).select2();
                
                var listSel = data["idList"];

                $.ajax({
                    url: '../config/ajaxAS.php',
                    type: 'POST',
                    data: { action: "getLists", idBoard: data["idBoard"] },
                    dataType: 'json',
                    timeout: 3000,
                    success: function (data) {
                        if (data != null) {
                            data.forEach(function(item){
                                if (listSel == item["idList"]) {
                                    $(".listBoardSource"+i).find(".list-source").append("<option value='"+item["idList"]+"' selected>"+item["name"]+"</option>");
                                }else{
                                    $(".listBoardSource"+i).find(".list-source").append("<option value='"+item["idList"]+"'>"+item["name"]+"</option>");
                                }
                            });

                            $(".listBoardSource"+i).find(".fa-circle-notch").fadeOut();

                            var iPlusUn = parseInt(i) + parseInt(1);
                            if (dataList[iPlusUn] != null) {
                                setTimeout(function(){ UpdateList(dataList, iPlusUn); }, 300);
                            }
                        }
                    },
                    error: function () {
                        alert("Probleme AJAX - 1");
                    }
                });
            }
        },
        error: function () {
            alert("Probleme AJAX - 1");
        }
    });
}
