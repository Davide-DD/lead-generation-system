var states = ["chooseService", "extraServices", "timeOfService", "data"]
var currentState = "chooseService"
var serviceSelectedId = null
var hasFirstSelected = false

$(document).ready(function () {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    $('.needs-validation').submit(function (event) {
        if ($(this)[0].checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
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
        }
        $(this)[0].classList.add('was-validated');
    })
});

function findBg(element) {
    var classList = element.attr('class').split(/\s+/);
    var bg = null
    $.each(classList, function (index, item) {
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
            if (!hasFirstSelected) $(this).removeClass(findBg($(this))).addClass("bg-secondary")
            else $(this).removeClass("bg-success").addClass("bg-secondary")
        }
        else {
            if (!hasFirstSelected) $(this).removeClass(findBg($(this))).addClass("bg-success")
            else $(this).removeClass("bg-secondary").addClass("bg-success")
        }
    });
    hasFirstSelected = true
});

function goToNextState(command) {
    // Trova lo stato futuro della presentazione
    var currentIndex = states.indexOf(currentState)
    var nextIndex
    if (command === "previous") {
        if (currentIndex === 0) nextIndex = 0
        else nextIndex = currentIndex - 1
    } 
    else {
        if (currentIndex === states.length - 1) nextIndex = states.length - 1
        else nextIndex = currentIndex + 1
    }
    
    // Gestisce l'abilitazione o la disabilitazione dei pulsanti
    if (nextIndex === states.length - 1) $("#next").prop("disabled", true)
    else if (nextIndex === 0) $("#previous").prop("disabled", true)
    else {
        $("#previous").prop("disabled", false)
        $("#next").prop("disabled", false)
    }

    // Gestisce la visualizzazione della presentazione
    if (currentIndex === nextIndex) return
    else currentState = states[nextIndex]
    $(".state").slideUp()
    $("#" + currentState).slideDown()
}

$("#previous").click(function () {
    goToNextState("previous")
})

$("#next").click(function () {
    goToNextState("next")
})