  var imgs = [
        'images/slide1.jpg',
        'images/slide3.jpg',
        'images/slide4.jpg',
        'images/slide5.jpg'];
        var cnt = imgs.length;

        $(function() {
            setInterval(Slider, 3000);
        });

        function Slider() {
        $('#imageSlide').fadeOut("slow", function() {
           $(this).attr('src', imgs[(imgs.length++) % cnt]).fadeIn("slow");
        });
        }