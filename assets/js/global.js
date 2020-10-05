(function ($) {
  "use strict"; // Start of use strict

  // Toggle the side navigation
  $("#sidebarToggle, #sidebarToggleTop").on('click', function (e) {
    $("body").toggleClass("sidebar-toggled");
    $(".sidebar").toggleClass("toggled");
    if ($(".sidebar").hasClass("toggled")) {
      $('.sidebar .collapse').collapse('hide');
    };
  });

  // Close any open menu accordions when window is resized below 768px
  $(window).resize(function () {
    if ($(window).width() < 768) {
      $('.sidebar .collapse').collapse('hide');
    };
  });

  // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
  $('body.fixed-nav .sidebar').on('mousewheel DOMMouseScroll wheel', function (e) {
    if ($(window).width() > 768) {
      var e0 = e.originalEvent,
        delta = e0.wheelDelta || -e0.detail;
      this.scrollTop += (delta < 0 ? 1 : -1) * 30;
      e.preventDefault();
    }
  });

  // Scroll to top button appear
  $(document).on('scroll', function () {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });

  // Smooth scrolling using jQuery easing
  $(document).on('click', 'a.scroll-to-top', function (e) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: ($($anchor.attr('href')).offset().top)
    }, 1000, 'easeInOutExpo');
    e.preventDefault();
  });

})(jQuery); // End of use strict


const asyncReq = (action, method, body, callback) => {
  fetch(action, {
    method: method,
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(body)
  })
    .then(function (res) {
      return res.json(); //convert response into readable data and return it to the callback functions
    })
    .then(callback)
    .catch(function (err) {
      console.log(err);
    });
}

// HELPER FUNCTIONS

const showPreloader = (parent) => {
  if (!parent.innerHTML.match(/^<div id="preload"/g)) {


    if (parent.localName == 'tbody') {
      parent.innerHTML = `<tr>
      <td colspan="5"> 
      <div id="preload" class="preloader">
      <div class="sk-folding-cube">
      <div class="sk-cube1 sk-cube"></div>
      <div class="sk-cube2 sk-cube"></div>
      <div class="sk-cube4 sk-cube"></div>
      <div class="sk-cube3 sk-cube"></div>
      </div> 
      </div>
      </td>
      </tr>`;
    } else {
      parent.innerHTML = `<div id="preload" class="preloader">
      <div class="sk-folding-cube">
      <div class="sk-cube1 sk-cube"></div>
      <div class="sk-cube2 sk-cube"></div>
      <div class="sk-cube4 sk-cube"></div>
      <div class="sk-cube3 sk-cube"></div>
      </div> </div>`;
    }

    parent.classList.remove('fadeIn')
    void parent.offsetWidth;
    parent.classList.add('fadeIn')



  }
}

const removePreloader = () => {
  let preloader = document.querySelector('#preload');
  if (preloader) {

    preloader.classList.remove('fadeOut')
    void preloader.offsetWidth;
    preloader.classList.add('fadeOut')
  }
}

function tagListen(checkbox) {
  let numberInputs = document.querySelectorAll('#numbers-input span');

  for (let j = 0; j < numberInputs.length; j++) {
    if(checkbox.id == numberInputs[j].innerText) {
      checkbox.checked = true; //checks input if already selected
    }
  }
    checkbox.addEventListener("click", function () {
      if (this.checked) {
          input.add(this.id)
      } else {
          input.remove(this.id);
      }
  });

}

function showResponse(data) {

  if(data === true) {
    return;
  }

  removePreloader();

  // setTimeout(() => {

  filterBody.classList.remove('fadeIn')
  void filterBody.offsetWidth;

  let row = '';
  filterBody.innerHTML = row;

  for (let m = 0; m < data.length; m++) {
    if (title == 'contacts') {
      row = '<tr><td>' + data[m].group + '</td>'
      row += '<td>' + data[m].name + '</td>'
      row += '<td>' + data[m].company + '</td>';
      row += '<td>' + data[m].number + '</td>';
      row += '<td>' + data[m].email + '</td>';
      row += '<td><input type="checkbox" name="optIn" checked= '
      +data[m].optIn+
      ' disabled="" readonly=""></input></td>';
      
      row+= '<td class="editDelete d-flex justify-content-around">\
              <a class="left btn btn-primary" href="/editContact"><i class="fa fa-edit"></i></a>\
              <form action="/deleteContact" method="post" class="right">  \
                  <input type="hidden" name="_id" value="'+data[m]._id+'">\
                  <input type="hidden" name="async" value="false">\
                  <button class="btn btn-primary" type="submit"><i class="fa fa-trash"></i></button>\
              </form>\
      </td>';
      row += '</tr>';
      filterBody.innerHTML += row;
      let u = new Update();
      u.editListen(filterBody.firstChild)

    } else if (title == 'messages') {
      row = '<tr><td class="flex start-left flex-wrap pt-0">'
      for (let c = 0; c < data[m].contact.length; c++) {
        let contact = data[m].contact[c];
        row += '<div class="cross-fade c-tag">\
            <div class="top">' + contact.name + '</div> \
          <div class="under">' + contact.number + '</div></div>';

      }
      row += '</td><td>' + data[m].message + '</td>';
      row += '<td>' + data[m].date + '</td>';
      row += '<td>\
        <form action="/delete"'+ this.type + '" method="post" class="delete">  \
            <input type="hidden" name="_id" value="'+ data[m]._id + '">\
            <input type="hidden" name="async" value="false">\
            <button class="btn btn-primary" type="submit"><i class="fa fa-trash"></i></button>\
        </form>\
        </td>'
      row += '</tr>';
      
      filterBody.innerHTML += row;
     

    } else if (title == 'Send SMS') {

      row = '<li class="list-group-item">\
        <div class="row align-items-center no-gutters">\
            <div class="col-1 text-right">\
                <div class="custom-control custom-checkbox">\
                    <input class="custom-control-input" type="checkbox" id="'+ data[m].number + '">\
                    <label class="custom-control-label" for="'+ data[m].number + '"></label>\
                </div>\
            </div>\
            <div class="col text-right mr-2">\
                <h6 class="mb-0"><strong>'+ data[m].name + '</strong></h6>\
                <span class="text-xs">'+ data[m].number + '</span>\
            </div>\
        </div>\
    </li>';
    filterBody.innerHTML += row;
    tagListen(filterBody.firstChild.querySelector('.custom-control-input'))
    }
  
  
  }
  
  // let contactItems = document.querySelectorAll('#contact-list .custom-control-input');
  // let numberInputs = document.querySelectorAll('#numbers-input span');

  // for (let i = 0; i < contactItems.length; i++) {
  //   //Check if number is already tagged
  //   for (let j = 0; j < numberInputs.length; j++) {
  //     if(contactItems[i].id == numberInputs[j].innerText) {
  //       contactItems[i].checked = true; //checks input if already selected
  //     }
      
  //   }   
  //    contactItems[i].addEventListener("click", function () {
  //         if (this.checked) {
  //             input.add(this.id)
  //         } else {
  //             input.remove(this.id);
  //         }
  //     });
  // }


  filterBody.classList.add('fadeIn')
  // }, 1000);
}


class Filter {
  constructor(type) {
    this.type = type;
    this.order = [];
    this.cols = Array.from(document.querySelectorAll('.col-sort'));

    for (let i = 0; i < this.cols.length; i++) {
      this.order.push(-1)
    }
    this.amount = document.getElementById('filterAmount') ? document.getElementById('filterAmount') : 0;
    this.filter = { limit: -1, sort: {} };

  }

  startListen() {

    if(this.amount === 0) {
      this.searchListen();
    } else {
      this.searchListen();
      this.sortListen();
      this.allListen();
      this.amountListen();
    }

  }

  //Setter Function

  setFilter(index) {

    this.filter.sort = {};

    if (typeof index !== 'undefined') {
      let key = this.cols[index].id.replace('-sort', '');
      this.filter.sort = { ...this.filter.sort, [key]: this.order[index] }
      this.order[index] = this.order[index] == -1 ? 1 : -1;
    }

    this.filter.term = search.querySelector('input[type="search"]').value;
    this.filter.limit = parseInt(this.amount.value);
    this.filter.async = true;
  }

  //Listener functions

  sortListen() {
    for (let i = 0; i < this.cols.length; i++) {

      this.cols[i].addEventListener('click', e => {
        e.preventDefault()

        showPreloader(filterBody)
        this.setFilter(i);

        asyncReq('/' + this.type + 'Filter', 'post', this.filter, showResponse)
      })

    }
  }

  allListen() {

 
      let all = document.getElementById('all')

      all.addEventListener('submit', (e) => {
        e.preventDefault();
        let limit = all.querySelector('input[type="hidden"]').value;
        this.filter.limit = parseInt(limit);
        this.filter.async = true;
        this.filter.term = '';
        search.querySelector('input[type="search"]').value = '';


        asyncReq('/' + this.type + 'Filter', 'post', this.filter, showResponse)

      })

  }

  searchListen() {

    let search = document.getElementById("search");

    search.addEventListener('submit', e => {
      e.preventDefault();
      showPreloader(filterBody)
      this.setFilter();
      // let searchTerm = search.querySelector('input[type="search"]').value;

      asyncReq('/search' + this.type, 'post', this.filter, showResponse)

    })
  }

  amountListen() {


    this.amount.addEventListener('change', (e) => {
      // let filter = { amount: parseInt(e.target.value) };
      showPreloader(filterBody)
      this.setFilter();

      asyncReq('/' + this.type + 'Filter', 'post', this.filter, showResponse)
      // messageFilter(filter)
    })
  }

}



