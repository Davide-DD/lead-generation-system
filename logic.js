var serviceSelected = null
var hasFirstSelected = false
var serviceSelectedOldColor = null

function findBg(element) {
    var classList = element.attr('class').split(/\s+/);
    var bg = null
    $.each(classList, function(index, item) {
        if (index === 2) {
            bg = item
        }
    });
    return bg
}

$(".service").on("click", function (event) {
    serviceSelected = $(this).attr('id')
    $(".service").each(function (i) {
        if (serviceSelected !== $(this).attr('id')) {
            if (!hasFirstSelected) {
                var classToRemove = findBg($(this))
                $(this).removeClass(findBg($(this))).addClass("bg-secondary")
            } 
            else {
                $(this).removeClass("bg-success").addClass("bg-secondary")
            }
        }
        else {
            if (!hasFirstSelected) {
                var classToRemove = findBg($(this))
                $(this).removeClass(classToRemove).addClass("bg-success")
            } 
            else {
                $(this).removeClass("bg-secondary").addClass("bg-success")
            }
        }
    });
    hasFirstSelected = true
});
