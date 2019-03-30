$(document).ready(function() {
	$(".menu-icon").on("click", function() {
		$("nav ul").toggleClass("showing");
  });
  $('.owl-carousel').owlCarousel({
        center: true,
        items: 2,
        margin: 10,
        responsive: {
          600: {
            items: 4
          }
        }
      });
      $('#mymodal').on('click', '.image', function () {
        var image = $(this).data('image')
        $('#ImageModal').modal('show');
        $('.product_image').html("<img src='/assets/img/product/" + image + "'></img>");
      });
});