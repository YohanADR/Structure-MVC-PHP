$(document).ready(function(){
    $("#utilisateur").change(function(){
        var user = $(this).val();
        
        $.ajax({
            url: "config/ajax_user.php",
            type: "POST",
            data: 'user=' + user,
            dataType: 'json',
            timeout: 3000,
            success: function(data){
               console.log(data);

              
               if(data != false){
                $("#utilisateur").css("border-color", "red");
                $("#submit").attr("disabled", "disabled");
                valid = false;
               }else{
                $("#utilisateur").css("border-color", "green");
                $("#submit").removeAttr("disabled", "");
                valid = true;
               }


               
            }
        })
        
    })
    var inputUser = "";
   var token = jQuery(location).attr("hash");
                if(token != null){
                    splitToken = token.split("=");
                    var thisToken = splitToken[1];
                    
                    console.log(thisToken);
             if(thisToken != null & thisToken != "&error"){
               

$.ajax({
            url: "config/ajaxMyAcc.php",
            type: "POST",
            data: 'token=' + thisToken,
            dataType: 'json',
            timeout: 3000,
            success: function(data){
                console.log(data);
               if(data != null){
                  test = $("#token").val(data);
                  window.location.replace("https://funnels.anjouweb.com/index.php?controller=user&action=myParam");
               }else{

                alert("Probleme Token");
                 
               }
         
               
           
            }
        })

            }else if(thisToken === "&error"){
                alert("vous avez rejeté le token");
                }
            }



     $(document).on("click", ".edit-myAccount", function () {
            var thisInput = $(this).parent().parent().find(".input-myAccount").attr('id');
            $(this).parent().parent().find(".input-myAccount").removeAttr("readonly");
            inputUser = $(this).parent().parent().find(".input-myAccount").val();
            $(this).replaceWith("<i class='fas fa-check valid-myAccount' style='color: green'></i><i class='fas fa-times return-myAccount' style= 'color: red'></i>");
           
            console.log(thisInput);
            if(thisInput === "token"){
            window.location.replace("https://trello.com/1/authorize?callback_method=fragment&response_type=fragment&expiration=never&scope=read,write,account&name=https://funnels.anjouweb.com&key=be21142523da97a73202df28008bc31c&return_url=https://funnels.anjouweb.com/index.php%3Fcontroller%3Duser%26action%3DmyParam");

            }
            
            
    });

     $(document).on("click", ".return-myAccount", function () {
            
            
            $(this).parent().parent().find(".input-myAccount").val(inputUser);
            $(this).parent().parent().find(".input-myAccount").attr("readonly", "readonly");
            parent = $(this).parent();
            parent.replaceWith("<div class='icon-myAccount'><i class='fas fa-edit edit-myAccount'></i></div>");
            
                      
    });

     $(document).on("click", ".valid-myAccount", function () {
            
            var idInput = $(this).parent().parent().find(".input-myAccount").attr('id');
            var valInputUser = $(this).parent().parent().find(".input-myAccount").val();
           
            $(this).parent().parent().find(".input-myAccount").attr("readonly","readonly");
            parent = $(this).parent();
            parent.replaceWith("<div class='icon-myAccount'><i class='fas fa-edit edit-myAccount'></i></div>");
             thisparent = $(this).parent().find(".input-myAccount");
             if(idInput === nameUser){
                 $.ajax({
            url: "config/ajaxMyAcc.php",
            type: "POST",
            data: 'username=' + valInputUser,
            dataType: 'json',
            timeout: 3000,
            success: function(data){
               if(data != "false"){
                  $(this).parent().parent().find(".input-myAccount").val(data);
                  console.log("bonjour");
               }else{
                $("#nameUser").val(inputUser);
                 
               }
         
               
           
            }
        })

             }
           
                      
    });
})