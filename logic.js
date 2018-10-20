var serviceSelected = null
var serviceSelectedOldColor = null

function switchColor(selected) {
    if (selected.hasClass("bg-primary")) {
        selected.removeClass("bg-primary").addClass("bg-success")
        serviceSelectedOldColor = "bg-primary"
    }
    else {
        selected.removeClass("bg-danger").addClass("bg-success")
        serviceSelectedOldColor = "bg-danger"
    }
}

$(".service").on("click", function (event) {
    serviceSelected = $(this)
    $(".service").each(function (i) {
        if (serviceSelected.is($(this))) $(this).removeClass("bg-success").addClass("bg-secondary")
        else serviceSelected.removeClass("bg-secondary").addClass("bg-success")
    });
});
