var key = "Sq9Q11ZFYfMEvNXMXUF-I4PzGb5JesrwdDJTTqjeLJE";
var arr = ["car", "COVID-19", "Technology", "food", "babies", "games"];
var randomeArr = arr[Math.floor(Math.random() * arr.length)];
//getting randome  picture on page load

window.onload = (event) => {
  $(".counter").text(`Searching for pictures..`);
  $(".option-layer div, .inputLayer button").addClass("disableClcik");
  var bd = $("body").hasClass("darkmode--activated");
  if (bd) {
    $(".topBelow p, .counter").css({
      color: "white",
    });
  } else {
    console.log("nope");
    $(".topBelow p, .counter").css({
      color: "black",
    });
  }
  var i = 0;
  var inc = setInterval(() => {
    var url = `https://api.unsplash.com/search/photos?page=${i++}&per_page=30&query=${randomeArr}&client_id=${key}`;

    Promise.all([
      fetch([url]).then((value) => {
        return value.json();
      }),
    ])
      .then((x) => {
        if (x.results <= 0)
          return swal(
            "Sorry couldn't get what you clicked please either reclick or refresh page..."
          );

        for (var i = 0; i < x.length; i++) {
          x[i].results.forEach((element) => {
            // console.log("the elements", element)
            $(".lds-ripple ").hide();
            $(".flex-item-allBelow").append(
              `<div class="flex-item-div" style="visibility: visible;"><img src="${element.urls["regular"]}"></div>`
            );
          });
          var allimageAmount = $(".flex-item-allBelow div").length;
          console.log(`There are ${allimageAmount} pictures`);
          $(".counter").text(`${allimageAmount} pictures..`);
        }
      })
      .catch((e) => {
        return (
          swal("Sorry having problem getting more pictures..."),
          clearInterval(inc),
          $(".option-layer div, .inputLayer button").removeClass("disableClcik")
        );
      });
  }, 1000);
  $(".flex-item-allBelow").on("click", "div", function () {
    $(".popoutLayer").css("display", "flex");
    $(".popout img").attr("src", $(this).find("img").attr("src"));
    $(".downloadImg").attr("href", $(this).find("img").attr("src"));
  });
  setTimeout(() => {
    clearInterval(inc);
    console.log("30s have passed");
    $(".option-layer div, .inputLayer button").removeClass("disableClcik");
  }, 30000);
};

/////////////////////////////////////////////////////////////////----------------------------///////////////////////////////////////////////
var i = 0;

$(".option-layer").on("click", "div", function (e) {
  if ($(this).hasClass("disableClcik"))
    return (
      e.preventDefault(),
      swal(
        "Sorry cant make a search on this, request on pictures havent ended.."
      )
    );
  $(".counter").text(`Searching for pictures..`);

  $(".flex-item-allBelow").empty();

  if ($(".inputLayer button").hasClass("disableClcik"))
    return (
      $(".option-layer div, .inputLayer button").addClass("disableClcik"),
      e.preventDefault(),
      swal(
        "Sorry cant make a search on this, request on pictures havent ended.."
      )
    );

  $(".option-layer div").not(this).addClass("disableClcik");
  $(".inputLayer button").addClass("disableClcik");
  $(".option-layer div").not(this).css("background", "rgb(105, 97, 100)");
  $(this).css({
    background: "black",
  });

  var isif = $(".option-layer div").not(this);
  // if (isif) return clearInterval(inc);
  $(".lds-ripple ").show();
  console.log("choosen", $(this).text());
  var inc = setInterval(() => {
    var url = `https://api.unsplash.com/search/photos?page=${i++}&per_page=30&query=${$(
      this
    ).text()}&client_id=${key}`;
    //setTimeout(() => {
    Promise.all([
      fetch([url], {
        method: "get",
      }).then((value) => {
        return value.json();
      }),
    ])
      .then((x) => {
        if (x.results <= 0)
          return swal(
            "Sorry couldn't get what you clicked please either reclick or refresh page..."
          );

        for (var i = 0; i < x.length; i++) {
          x[i].results.forEach((element) => {
            // console.log("the elements", element)
            $(".lds-ripple ").hide();
            $(".flex-item-allBelow").append(
              `<div class="flex-item-div" style="visibility: visible;"><img src="${element.urls["regular"]}"></div>`
            );
          });
          var allimageAmount = $(".flex-item-allBelow div").length;
          console.log(`There are ${allimageAmount} pictures`);
          $(".counter").text(`${allimageAmount} pictures..`);
        }
      })
      .catch((e) => {
        return (
          swal("Sorry having problem getting more pictures..."),
          clearInterval(inc),
          $(".option-layer div").not(this).removeClass("disableClcik"),
          $(".option-layer div").not(this).css("background", "#D26"),
          $(".inputLayer button").removeClass("disableClcik")
        );
      });
    //}, 1500);
  }, 1000);
  setTimeout(() => {
    clearInterval(inc);
    console.log("30s have passed");
    $(".option-layer div").not(this).removeClass("disableClcik");
    $(".option-layer div").not(this).css("background", "#D26"),
      $(".inputLayer button").removeClass("disableClcik");
  }, 30000);
});

/////////////////////////////////////////////////////////////////////////-----------SEARCH---------------/////////////////////////////////////
$("#formSearching").submit(function (e) {
  e.preventDefault();
  if ($(this).find("button").hasClass("disableClcik"))
    return (
      e.preventDefault(),
      swal(
        "Sorry cant make a search on this, request on pictures havent ended.."
      )
    );
  console.log("searched for", $(this).find("input").val());
  $(".flex-item-allBelow").empty();

  $(".counter").text(`Searching for pictures..`);
  $(".option-layer div").addClass("disableClcik");
  var bd = $("body").hasClass("darkmode--activated");
  if (bd) {
    $(".topBelow p, .counter").css({
      color: "white",
    });
  } else {
    $(".topBelow p, .counter").css({
      color: "black",
    });
  }
  var i = 0;
  var inc = setInterval(() => {
    var url = `https://api.unsplash.com/search/photos?page=${i++}&per_page=30&query=${$(
      this
    )
      .find("input")
      .val()}&client_id=${key}`;

    Promise.all([
      fetch([url]).then((value) => {
        return value.json();
      }),
    ])
      .then((x) => {
        if (x.results <= 0)
          return swal(
            "Sorry couldn't get what you searched please either reclick or refresh page..."
          );

        for (var i = 0; i < x.length; i++) {
          x[i].results.forEach((element) => {
            // console.log("the elements", element)
            $(".lds-ripple ").hide();
            $(".flex-item-allBelow").append(
              `<div class="flex-item-div" style="visibility: visible;"><img src="${element.urls["regular"]}"></div>`
            );
          });
          var allimageAmount = $(".flex-item-allBelow div").length;
          console.log(`There are ${allimageAmount} pictures`);
          $(".counter").text(`${allimageAmount} pictures..`);
        }
      })
      .catch((e) => {
        return (
          swal("Sorry having problem getting more pictures..."),
          clearInterval(inc),
          $(".option-layer div").removeClass("disableClcik")
        );
      });
  }, 1000);
  $(".flex-item-allBelow").on("click", "div", function () {
    $(".popoutLayer").css("display", "flex");
    $(".popout img").attr("src", $(this).find("img").attr("src"));
    $(".downloadImg").attr("href", $(this).find("img").attr("src"));
  });
  setTimeout(() => {
    clearInterval(inc);
    console.log("30s have passed");
    $(".option-layer div").removeClass("disableClcik");
  }, 30000);
});
/////////////////////////////////////////////////////////////------------------------------------------------------///////////////////////////////////////
$(".circle").on("click", function () {
  $(".right-searchLayer, .right-searchLayerBelow").show(200);
  $(".counterbtn").hide();
  $(".topBelow p").css("color", "white");
});
$(".close").on("click", function () {
  $(".counterbtn").show();

  $(".right-searchLayer, .right-searchLayerBelow").hide(200);
  $(".downloadImg").css("background", "lightblue");
});

$(".closepop").on("click", function () {
  $(".popoutLayer").hide("200");
  $(".downloadImg").css("background", "lightblue");
});
$(".downloadImg").on("click", function () {
  $(this).css("background", "red");
});

/*
var arry = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
var y = [];
var rd = setInterval(() => {
  y.push(arry[Math.floor(Math.random() * arry.length)]);
}, 100);
setTimeout(() => {
  clearInterval(rd);
  console.log(
    "this is the number plus letters",
    Math.floor(Math.random() * 100000000000) + y.join("")
  );
}, 500);*/
