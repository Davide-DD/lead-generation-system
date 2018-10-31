$(document).ready(function () {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    $('.needs-validation').submit(function (event) {
        if ($(this)[0].checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            event.preventDefault();
            event.stopPropagation();

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

            // Invoco il file addClient.php server-side che aggiunge il cliente al file .csv
            var separator = ","
            var clientInfos = name + separator + surname + separator + email
            $.ajax({
                method: "POST",
                url: "addClient.php",
                data: { row: clientInfos }
            })
                .done(function (msg) {
                    alert("Data Saved: " + msg);
                });
        }
        $(this)[0].classList.add('was-validated');
    })
});


/**
 * 
 * Parte di logica che gestisce il cambio di colori quando un servizio è selezionato (nella prima slide)
 * 
 */
var serviceSelectedId = null
var hasFirstSelected = false

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