var states = ["firstSlide", "secondSlide", "thirdSlide", "fourthSlide"]
var currentState = "firstSlide"

var breadcrumb = document.querySelector('.mybreadcrumb');
var breadcrumbSteps = document.querySelectorAll('.breadcrumb__step');

[].forEach.call(breadcrumbSteps, function (item, index, array) {
    item.onclick = function () {
        for (var i = 0, l = array.length; i < l; i++) {
            if (index < i) {
                array[i].classList.remove('breadcrumb__step--active');
            } else {
				array[i].classList.add('breadcrumb__step--active');
			}
        }
		goToState(index);
    };
});
function goToNextBreadcrumb() {
	for (var i = 0, l = breadcrumbSteps.length; i < l; i++) {
		if (breadcrumbSteps[i].style.display === "none") {
			breadcrumbSteps[i].style.display = "block"
			break;
		}
		if (breadcrumbSteps[i].classList.contains('breadcrumb__step--active'))
			continue;
		else {
			breadcrumbSteps[i].classList.add('breadcrumb__step--active');
			break;
		}
	}
}

$(".confirm-choice").click(function () {
    goToNextBreadcrumb();
	goToNextState();
})

$(".startbutton").click(function () {
    $(".prestate").fadeOut()
	
    $("#" + currentState).fadeIn()
	$(".centered-at-top").fadeIn()
	$(".my-footer").fadeIn()
})


function goToState(desiredState) {
	var currentIndex = states.indexOf(currentState)
	var nextIndex = desiredState

    // Gestisce la visualizzazione della presentazione
    if (currentIndex === nextIndex) return
    else currentState = states[nextIndex]
   

   $(".state").fadeOut()	
	changeBackground(currentState)	
    $("#" + currentState).fadeIn()
}

function goToNextState() {
    // Trova lo stato futuro della presentazione
    var currentIndex = states.indexOf(currentState)

	var nextIndex
    if (currentIndex === states.length - 1) nextIndex = states.length - 1
    else nextIndex = currentIndex + 1

    // Gestisce la visualizzazione della presentazione
    if (currentIndex === nextIndex) return
    else currentState = states[nextIndex]
    
	$(".state").fadeOut()
	changeBackground(currentState)
    $("#" + currentState).fadeIn()
}

function changeBackground(currentState) {
		if (currentState === "secondSlide") {
		$("body").css("background-color","#F6F6F6");
	} else if (currentState === "thirdSlide") {
		$("body").css("background-color","#ffcc00");
	} else {
		$("body").css("background-color","transparent");
	}
}