/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function() {   
    /************************Banner flshing***************/
    //alert("hi");
    $(function() {
        /* SET PARAMETERS */
        var change_img_time = 2000;
        var transition_speed = 500;

        var simple_slideshow = $("#exampleSlider"),
                listItems = simple_slideshow.children('li'),
                listLen = listItems.length,
                i = 0,
                changeList = function() {

                    listItems.eq(i).fadeOut(transition_speed, function() {
                        i += 1;
                        if (i === listLen) {
                            i = 0;
                        }
                        listItems.eq(i).fadeIn(transition_speed);
                    });

                };

        listItems.not(':first').hide();
        setInterval(changeList, change_img_time);

    });
    /******************** news flashing*******************/
    /* $(function() {
        /* SET PARAMETERS 
        var change_img_time = 5000;
        var transition_speed = 500;

        var simple_slideshow = $("#NewsSlider"),
                listItems = simple_slideshow.children('li'),
                listLen = listItems.length,
                i = 0,
                changeList = function() {

                    listItems.eq(i).fadeOut(transition_speed, function() {
                        i += 1;
                        if (i === listLen) {
                            i = 0;
                        }
                        listItems.eq(i).fadeIn(transition_speed);
                    });

                };

        listItems.not(':first').hide();
        setInterval(changeList, change_img_time);

    });*/
});