var oldSelected = null
var oldColor = null

function switchColor(selected) {
    if (selected.hasClass("bg-primary")) {
        selected.removeClass("bg-primary").addClass("bg-success")
        oldColor = "bg-primary"
    }
    else {
        selected.removeClass("bg-danger").addClass("bg-success")
        oldColor = "bg-danger"
    }
    console.log(selected)
}

$(document).ready(function(){
    $(".service").each(function(i){
        $(this).on("click", function(event){
            if (oldSelected !== null) oldSelected.removeClass("bg-success").addClass(oldColor)
            switchColor($(this))
            oldSelected = $(this)
        });
    });
});