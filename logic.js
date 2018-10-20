var serviceSelectedId = null
var hasFirstSelected = false

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
    serviceSelectedId = $(this).attr('id')
    $(".service").each(function (i) {
        if (serviceSelectedId !== $(this).attr('id')) {
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

$( "#confirm" ).click(function(event) {
    event.preventDefault()
    
    // Trovo il servizio selezionato
    var serviceSelected = $('#' + serviceSelectedId)
    console.log(serviceSelected)

    // Trovo i servizi aggiuntivi spuntati
    var checkboxesSelected = $('input[name="checkboxes"]:checked')
    console.log(checkboxesSelected)

    // Trovo per quanto tempo sono richiesti i servizi
    var radioSelected = $('input[name="radios"]:checked')[0]
    console.log(radioSelected)

    // Trovo i campi di nome, cognome e e-mail
    var name = $("#name").val()
    var surname = $("#surname").val()
    var email = $("#email").val()
    console.log(name + "," + surname + "," + email)
});