$(document).ready(function () {
    boardSelect();
    // boardModif();
    var urlGetToken = window.location.href;

    var token = urlGetToken.split(["action="])[1];
    var search = token.search("getToken");

    // console.log(search);
    if (search == 0) {
        taketoken();
    }




    // Creat a function on click for the submit Form for 
    // control the value of field
    $("#submit").on("click", function () {
        valid = true;

        if ($("#utilisateur").val() == "") {
            $("#utilisateur").css("border-color", "red");
            valid = false;
        }
        if ($("#mdp").val() != $("#mdpRepeat").val()) {
            $("#mdp").css("border-color", "red");
            $("#mdpRepeat").css("border-color", "red");
            valid = false;
        }
        if ($("#mdp").val() == "") {
            $("#mdp").css("border-color", "red");

            valid = false;
        }
        if ($("#mdpRepeat").val() == "") {
            $("#mdpRepeat").css("border-color", "red");
            valid = false;
        }


        return valid;
    })


    $("#connect").on("click", function () {
        valid = true;

        if ($("#user").val() == "") {
            $("#user").css("border-color", "red");
            valid = false;
        }
        if ($("#password").val() == "") {
            $("#password").css("border-color", "red");

            valid = false;
        }
        console.log(valid);
        return valid;
    })
    // page création funnel
    $("#createFunnel").on("click", function () {
        valid = true

        if ($("#nameFunnel").val() == "") {
            $("#nameFunnel").css("border-color", "red");
            valid = false;
        }

        if ($("#board-dest").val() == "") {
            $("#board-dest").css("border-color", "red");
            valid = false;
        }

        if ($(".board-source").val() == "") {
            $(".board-source").css("border-color", "red");
            valid = false;
        }

        if ($(".list-source").val() == "") {
            $(".list-source").each(function () {
                if ($(this).val() == "") {
                    $(".list-source").css("border-color", "red");
                    valid = false;
                }
            });

        }

        return valid;
    })
    // Liée les select
    $("#nameFunnel").change("blur", function () {

        if ($("#nameFunnel").val() != "") {
            $("#listBoardDest").css("display", "block");
        } else {
            $("#listBoardDest").css("display", "flex");
            $("#listBoardDest").css("flex-wrap", "wrap");
        }

    })
    $("#board-dest").change("blur", function () {

        if ($("#board-dest").val() != "") {
            $(".listBoardSource").css("display", "block");
        } else {
            $("#listBoardSource").css("display", "flex");
            $("#listBoardSource").css("flex-wrap", "wrap");
        }
    });

    $(".list-destination").change("blur", function () {

        if ($(this).val() == "createList") {
            $("#nameList").css("display", "block");
        } else {
            $("#nameList").css("display", "none");
        }
    });

    // hidden : Tab source
    $("#board-dest").on("change", function () {
        boardDest = $(this);
        valBoardDest = boardDest.val()
        $(".board-source option").each(function () {

            if ($(this).val() == valBoardDest) {

                $(this).css("display", "none");
            } else if ($(this).val() != valBoardDest) {
                $(this).css("display", "block");
            }
        });



    })

    $(".list-source").on("change", function () {
        listSource = $(this);
        valListSource = listSource.val();

        $(this).children().each(function () {
            if ($(this).val() == valListSource) {
                selectOptionHidden(valListSource);
            }
        });

        var test = [];
        $(".list-source").each(function () {
            test.push($(this).val());
            for (index = 0; index < test.length; index++) {
                $(".list-source option").each(function () {
                    if ($(this).is(":hidden") && $(this).val() != test[index]) {
                        $(this).css("display", "block");

                    }
                })

            }
        })

    })


    function selectOptionHidden(id) {
        $(".list-source").each(function () {
            $(this).children().each(function () {
                if ($(this).val() == id) {
                    $(this).css("display", "none");
                }
            })
        })
    }

    $(document).on("click", ".addBoardSource", function () {

            parent = $(this).parent().find(".js-example-basic-single").select2('destroy');
            cloned = $(this).parent().clone(true, true);
            parentClone = $(this).parent();
            cloned.insertAfter(parentClone);
            
            
            test = $(this).parent().next().find(".js-example-basic-single").removeAttr('id');
            $(this).parent().find(".js-example-basic-single").select2();
            $(this).parent().next().find(".js-example-basic-single").select2();
              console.log(test);
    });


    $(document).on("click", ".deleteBoardSource",function () {

        $(this).parent().remove();
    });




    function boardSelect() {
        $(document).on("change",".select-board", function () {

            list = $(this);
            idboard = list.val();
            list.parent().find(".list-source option").remove();
            list.parent().find(".list-destination option").remove();
            list.parent().find(".list-source ").append("<option value=''>Sélectionnez votre liste source</option>");
            list.parent().find(".list-destination ").append("<option value=''>Sélectionnez votre liste de destination</option>");
            list.parent().find(".list-destination ").append("<option value='createList'>Créer une liste</option>");
            $.ajax({
                url: "config/ajax_request.php",
                type: "POST",
                data: 'idBoardsDest=' + idboard,
                dataType: 'json',
                timeout: 3000,
                success: function (data) {
                    if (data != null) {

                        for (let index = 0; index < data.length; index++) {

                            list.parent().find(".list-source").append("<option value='" + data[index][0].id + "'>" + data[index][0].name + "</option>");
                            list.parent().find(".list-destination").append("<option value='" + data[index][0].id + "'>" + data[index][0].name + "</option>");
                        };
                    }




                }
            });


        })
    }









    // function boardModif() {
    //     $(".select-board").each(function () {

    //         var list = $(this);
    //         var idboard = list.val();

    //         $.ajax({
    //             url: "config/ajax_request.php",
    //             type: "POST",
    //             data: 'idBoardsDest=' + idboard,
    //             dataType: 'json',
    //             timeout: 3000,
    //             success: function (data) {
    //                 if (data != null) {
                        
    //                     for (let index = 0; index < data.length; index++) {

    //                         $(".select-board").each(function () {
    //                             var board = $(this);
    //                             var idboard = board.val();
    //                             var list = board.parent().find(".list-source").val();
    //                             if (data[index][0].idBoard == idboard && data[index][0].id != list ) {

    //                                 board.parent().find(".list-source").append("<option value='" + data[index][0].id + "'>" + data[index][0].name + "</option>");
    //                                 // board.parent().find(".list-destination").append("<option value='"+data[index][0].id+"'>"+data[index][0].name+"</option>");
    //                             }

    //                         })
    //                     };
    //                 }




    //             }
    //         });


    //     })
    // }


})

function taketoken() {

    var urlGetToken = window.location.href;
    var token = urlGetToken.split(["#token="])[1];
    searchtoken = token.search("error");
    // console.log(searchtoken);

    $.ajax({
        url: "config/token.php",
        type: "POST",
        data: "token=" + token + "&error=" + searchtoken,
        timeout: 10000,
        success: function (data) {
            if (data != null) {
               
                window.location.replace("https://funnels.anjouweb.com/index.php?controller=home&action=displayHome");

            }
        }
    })


}