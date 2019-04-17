$(window).on("load", function() {
  doAllTheThings();
});
document.fonts.ready.then(doAllTheThings);

function doAllTheThings() {
  $(window).resize(makeBorderOfNumbers);
  $(document).on('input', '#hz-slider', makeBorderOfNumbers)
  $(document).on('input', '#vt-slider', makeBorderOfNumbers)

  makeBorderOfNumbers();
}

function changeNumber(elt) {
  $(elt).html(Math.floor(Math.random() * 9));
}

function makeBorderOfNumbers() {
  $('.card').each(function() {
    let target = $(this);

    target.css('border-width', '0px');

    const num_width = 14.41;
    const num_height = 32;

    let hz_space = parseInt($('#hz-slider').val());
    let amt = target.outerWidth() / (num_width + hz_space) + 1
    let nmb = Math.floor(amt);
    let rem = (amt - nmb) * (num_width + hz_space) / (nmb - 1);
    let dist = num_width + hz_space + rem;

    let elements_to_add = []

    for (let i = 0; i < nmb; i++) {
      elements_to_add[elements_to_add.length] = `<span onmouseover="changeNumber(this)"
      style="cursor: default; position: absolute;left:${-num_width/2 + i*dist}px;
      top: -${num_height/2}px;font-size: 24px;">${Math.floor(Math.random()*9)}</span>`;
    }


    for (let i = 0; i < nmb; i++) {
      elements_to_add[elements_to_add.length] = `<span onmouseover="changeNumber(this)"
      style="cursor: default;position: absolute;left:${-num_width/2 + i*dist}px;
      bottom: ${-num_height/2}px;font-size: 24px;">${Math.floor(Math.random()*9)}</span>`;

    }

    let vt_space = parseInt($('#vt-slider').val());
    amt = target.outerHeight() / (num_height + vt_space);
    nmb = Math.floor(amt);
    rem = (amt - nmb) * (num_height + vt_space) / (nmb);
    dist = num_height + vt_space + rem;

    for (let i = 1; i < nmb; i++) {
      elements_to_add[elements_to_add.length] = `<span onmouseover="changeNumber(this)"
      style="cursor: default;position: absolute;left:-${num_width/2}px;top: ${-num_height/2  + i*dist}px;
      font-size: 24px;">${Math.floor(Math.random()*9)}</span>`;
    }
    for (let i = 1; i < nmb; i++) {
      elements_to_add[elements_to_add.length] = `<span onmouseover="changeNumber(this)"
      style="cursor: default;position: absolute;right:-${num_width/2}px;top: ${-num_height/2 + i*dist}px;
      font-size: 24px;">${Math.floor(Math.random()*9)}</span>`;
    }
    let children = target.children('div')
    if (children.length > 0) {
      let exists = false;
      let loc = 0;
      for (let i = 0; i < children.length; i++) {
        if ($(children[i]).hasClass('border-numbers')) {
          exists = true;
          loc = i;
          break;
        }
      }
      if (exists) {
        $(children[loc]).html(elements_to_add.join(''))
      }
    } else {
      target.append(`<div class='border-numbers'>${elements_to_add.join('')}</div>`);
    }

  })
}
