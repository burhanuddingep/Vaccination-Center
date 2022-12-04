(function ($, Drupal,drupalSettings) {
    'use strict';
    Drupal.behaviors.olivero_base_theme = {
        attach: function (context, settings) {
            $('.register-link', context).once('api_token').each(
                function (element) {
                    //Getting nid,uid from drupalSettings
                    var user_id = drupalSettings.vc_register_users.current_user_id;
                    var node_id = drupalSettings.vc_register_users.node_id;
    
                    //First check if user is registered or not
                    $.ajax({
                        type: "POST",
                        url: "/check-user-register",
                        data : { user_id : user_id, node_id : node_id },
                        success: function (result) {
                            if(result.data == 1) {
                                $(".register-link").attr('disabled','disabled');
                                $(".register-link").attr('value', 'Already registered for this center');
                            }
                            if(result.data == 2) {
                                $(".register-link").attr('disabled','disabled');
                                $(".register-link").attr('value', 'Already registered for other center');
                            }
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                        }
                    })
    
                    //AJAX call to register the user.
                    $(".register-link").on('click', function () { 
                        var $btn = $(this).prop("disabled", true);
                        var $img = $btn.prev('.img').show(); 
                        $.ajax({
                            type: "POST",
                            url: "/register-user",
                            data : { user_id : user_id, node_id : node_id },
                            success: function (data) {
                                if(data.result) {
                                    console.log($(".register-link .register-success").length);
                                    if($(".register-link .register-success").length < 1) {
                                        $(".register-link").after("<h4 class='register-success'>Registered Successfully!</h4>");
                                    }
                                    $(".register-link").attr('disabled','disabled');
                                    $(".register-link").attr('value', 'Already registered for this center');
                                    $(".field--name-field-no-of-vaccination-slots .field__item").text(data.remaining_slots);
                                    $img.hide();
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                            }
                        });
                    })
                }
            );
        }
    }
})(jQuery, Drupal, drupalSettings);