
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

$("#confirm").click(function () {
    goToNextBreadcrumb();
})
