$(document).ready(function () {
  const AmenitiesChecked = {};
  $(document).on('change', "input[type='checkbox']", function () {
    if (this.checked) {
      AmenitiesChecked[$(this).data('id')] = $(this).data('name');
    } else {
      delete AmenitiesChecked[$(this).data('id')];
    }
    const Objs = Object.values(AmenitiesChecked);
    if (Objs > 0) {
      $('div.amenities > h4').text(Object.values(AmenitiesChecked).join(','));
    } else {
      $('div.amenities > h4').html('&nbsp;');
    }
    console.log(AmenitiesChecked);
  });
  $.getJSON('http://0.0.0.0:5001/api/v1/status/', (data) => {
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({}),
    success: data => {
      for (const place of data) {
        const template = `<article>
      <div class="title">
        <h2>${place.name}</h2>
        <div class="price_by_night">$${place.price_by_night}</div>
        </div>
        <div class="information">
          <div class="max_guest">
          <div class="image_guest"></div>
	  <br />
	  ${place.max_guest} Guests
	  </div>
          <div class="number_rooms">
          <div class="img_room"></div>
	  <i class="fa fa-bed fa-3x" aria-hidden="true"></i>
	  <br />
	  ${place.number_rooms} Bedrooms
	  </div>
	  <div class="number_bathrooms">
	  <div class="img_bathrooms"></div>
	  <br />
	  ${place.number_bathrooms} Bathroom
	  </div>
	</div>
	<div class="description">
        ${place.description}
	</div>
      </article>`;
        $('section.places').append(template);
      }
    }
  });
});
