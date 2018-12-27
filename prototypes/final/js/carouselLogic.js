/**
 * 
 * INIZIO SLIDE DI SELEZIONE DEL SERVIZIO
 * 
 */
var serviceSelectedId = ""
$(".service-button").click(function (event) {
    serviceSelectedId = $(this)[0].innerText
    $(this).focus()
    console.log(serviceSelectedId) // TODO: rimuovere finiti i test
});
var aciInfo = "", magmaInfo = ""
$(".aci-info").each(function() {
    aciInfo += $(this)[0].innerText + "\n"
})
$(".magma-info").each(function() {
    magmaInfo += $(this)[0].innerText + "\n"
})
/**
 * 
 * FINE SLIDE DI SELEZIONE DEL SERVIZIO
 * 
 */

/**
 * 
 * INIZIO SLIDE DI SELEZIONE DELLA DURATA
 * 
 */
var lengthSelectedId = ""

$(".length-button").click(function (event) {
    lengthSelectedId = $(this)[0].innerText
    $(this).focus()
    console.log(lengthSelectedId) // TODO: rimuovere finiti i test
});
/**
 * 
 * FINE SLIDE DI SELEZIONE DELLA DURATA
 * 
 */

/**
 * 
 * INIZIO SLIDE DI SELEZIONE DEI SERVIZI AGGIUNTIVI
 * 
 */
var firstSelectedServicesIds = "", secondSelectedServicesIds = ""
var totalSelectedServicesPrice = 0
$(".confirmSelectedServices").click(function (event) {
    var separation = $('input[type="checkbox"]:checked').length / 2
    var counter = 0;
    $('input[type="checkbox"]:checked').each(function() {
        counter <= separation ? 
        firstSelectedServicesIds += $(this)[0].value.substring(0, $(this)[0].value.indexOf("-") - 1) + "\n" :
        secondSelectedServicesIds += $(this)[0].value.substring(0, $(this)[0].value.indexOf("-") - 1) + "\n";
        totalSelectedServicesPrice += parseFloat($(this)[0].value.substring($(this)[0].value.indexOf("-") + 2))
        counter += 1;
    })    
});
/**
 * 
 * FINE SLIDE DI SELEZIONE DEI SERVIZI AGGIUNTIVI
 * 
 */

/**
* 
* INIZIO SLIDE DI COMPILAZIONE FORM
* 
*/
var name, surname, email, telephone, website, company

$('.needs-validation').submit(function (event) {
    event.preventDefault()

    if ($(this)[0].checkValidity() === false) {
        checkCaptchaValidity()
    }
    else {
        if (!checkCaptchaValidity()) {
            return
        }

        name = $("#name").val()
        surname = $("#surname").val()
        email = $("#email").val()
        telephone = $("#telephone").val()
        website = $("#website").val()
        company = $("#company").val()

        addClient()

        createEstimation()
    }
    $(this)[0].classList.add('was-validated');
})

function checkCaptchaValidity() {
    var result = grecaptcha.getResponse()
    if (!result) {
        $("#captchaError").css("display", "")
    }
    else {
        $("#captchaError").css("display", "none")
    }
    return result
}
/**
 * 
 * FINE SLIDE DI COMPILAZIONE FORM
 * 
 */

/**
 * 
 * INIZIO LOGICA APPLICATIVA
 * 
 */

/**
 * INIZIO LOGICA DI SALVATAGGIO CLIENTE
 */
var separator = ","

function addClient() {
    var clientInfos = name + separator + 
    surname + separator + 
    email + separator + 
    telephone + separator + 
    website + separator +
    company + separator;
    $.ajax({
        method: "POST",
        url: "../../server/addClient.php", // TODO: cambiare l'indirizzo
        data: { row: clientInfos }
    })
}
/**
 * FINE LOGICA DI SALVATAGGIO CLIENTE
 */

/**
 * INIZIO LOGICA DI CREAZIONE PREVENTIVO
 */
var serviceLengthPrices = { "aci3months" : 200.00, "aci6months" : 400.00, "aci12months" : 800.00, 
"magma3months" : 300.00, "magma6months" : 600.00, "magma12months" : 1200.00 }
function createEstimation() {
    var doc = new jsPDF()

    doc.addFileToVFS('Proxima Nova Bold.ttf', font)
    doc.addFont('Proxima Nova Bold.ttf', 'custom', 'normal')
    doc.setFont('custom')

    doc.addImage(header, 'JPEG', 15, 15, 180, 60)

    /**
     *  INIZIO IMPOSTAZIONE TITOLI E FINE SEZIONI
    **/
    doc.setFontSize(16);

    doc.text("Abbonamento\n" + serviceSelectedId, 15, 75)

    doc.addImage(greenDivider, 'JPEG', 14, 120, 180, 1.5)

    doc.text('Durata\nabbonamento', 15, 135)
    doc.text("TOTALE " + serviceLengthPrices[serviceSelectedId.toLowerCase() + lengthSelectedId.toLowerCase()], 180, 165, null, null, 'right');

    doc.addImage(redDivider, 'JPEG', 14, 180, 180, 1.3)

    doc.text('Servizi singoli', 15, 195)
    doc.text("TOTALE " + totalSelectedServicesPrice, 180, 265, null, null, 'right');
    /**
     *  FINE IMPOSTAZIONE TITOLI E FINE SEZIONI
    **/

    /**
     *  INIZIO IMPOSTAZIONE CONTENUTI
    **/
    doc.setFontSize(12);

    serviceSelectedId === "Aci" ? doc.text(aciInfo, 75, 75) : doc.text(magmaInfo, 75, 75)

    doc.text(lengthSelectedId, 75, 135)

    doc.text(firstSelectedServicesIds, 75, 195)
    doc.text(secondSelectedServicesIds, 135, 195)

    /**
     *  FINE IMPOSTAZIONE CONTENUTI
    **/

    doc.addImage(endArrow, 'JPEG', 180, 270, 15, 15)

    doc.output('dataurlnewwindow')
}
/**
 * FINE LOGICA DI CREAZIONE PREVENTIVO
 */