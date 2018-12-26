function checkCaptchaValidity() {
    var result = grecaptcha.getResponse()
    if (!result) {
        // Display error
        $("#captchaError").css("display", "")
    }
    else {
        $("#captchaError").css("display", "none")
    }
    return result
}

function addClient(name, surname, email) {
    var separator = ","
    var clientInfos = name + separator + surname + separator + email
    $.ajax({
        method: "POST",
        url: "http://localhost:8888/server/addClient.php", // TODO: cambiare l'indirizzo
        data: { row: clientInfos }
    })
}

function createEstimation(serviceSelected, checkboxesSelected, radioSelected) {
    var doc = new jsPDF()

    doc.addFileToVFS('Proxima Nova Bold.ttf', font)
    doc.addFont('Proxima Nova Bold.ttf', 'custom', 'normal')
    doc.setFont('custom')

    doc.addImage(header, 'JPEG', 15, 15, 180, 60)

    /**
     *  INIZIO IMPOSTAZIONE TITOLI E FINE SEZIONI
    **/
    doc.setFontSize(16);

    doc.text("Abbonamento\n" + serviceSelected.children()[1].innerText, 15, 75)  // TODO: cambiare ACI con il servizio selezionato

    doc.addImage(greenDivider, 'JPEG', 14, 120, 180, 1.5)

    doc.text('Durata\nabbonamento', 15, 135) // TODO: cambiare la durata dell'abbonamento
    doc.text("TOTALE " + "453.00€", 180, 165, null, null, 'right'); // TODO: cambiare totale

    doc.addImage(redDivider, 'JPEG', 14, 180, 180, 1.3)

    doc.text('Servizi singoli', 15, 195) // TODO: aggiungere i servizi selezionati dall'utente
    doc.text("TOTALE " + "453.00€", 180, 235, null, null, 'right'); // TODO: cambiare totale
    /**
     *  FINE IMPOSTAZIONE TITOLI E FINE SEZIONI
    **/

    /**
     *  INIZIO IMPOSTAZIONE CONTENUTI
    **/
    doc.setFontSize(12);

    doc.text("Gestione pagina Facebook\nPiano editoriale\n5 post grafici", 75, 75)  // TODO: cambiare ACI con il servizio selezionato

    doc.text(radioSelected.value, 75, 135)  // TODO: cambiare ACI con il servizio selezionato

    doc.text("Logo\nVisit card\nLocandina", 75, 195)  // TODO: cambiare ACI con il servizio selezionato
    doc.text("Logo\nVisit card\nLocandina", 115, 195)  // TODO: cambiare ACI con il servizio selezionato
    /**
     *  FINE IMPOSTAZIONE CONTENUTI
    **/

    doc.addImage(endArrow, 'JPEG', 180, 245, 15, 15)

    doc.output('dataurlnewwindow')
}

$('.needs-validation').submit(function (event) {
    event.preventDefault()

    if ($(this)[0].checkValidity() === false) {
        checkCaptchaValidity()
    }
    else {
        if (!checkCaptchaValidity()) {
            return
        }

        // Trovo il servizio selezionato
        var serviceSelected = $('#' + serviceSelectedId)

        // Trovo i servizi aggiuntivi spuntati
        var checkboxesSelected = $('input[name="checkboxes"]:checked')

        // Trovo per quanto tempo sono richiesti i servizi
        var radioSelected = $('input[name="radios"]:checked')[0]

        // Trovo i campi di nome, cognome e e-mail
        var name = $("#name").val()
        var surname = $("#surname").val()
        var email = $("#email").val()

        addClient(name, surname, email)

        createEstimation(serviceSelected, checkboxesSelected, radioSelected)
    }
    $(this)[0].classList.add('was-validated');
})

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