var sliderPercent = document.getElementById("myRange");       // получаем первый платеж
var output = document.getElementById("demo");          // получаем соответствующую кнопку
output.innerHTML = sliderPercent.value; // отправляем значение в соответствующую кнопку


var sliderMonth = document.getElementById("myRange2");     // получаем период оплаты (месяцы)
var output2 = document.getElementById("demo2");        // получаем соответствующую кнопку
output2.innerHTML = sliderMonth.value; // отправляем значение в соответствующую кнопку

var pricePr = document.getElementById("pricePr");         // получаем начальную цену
var firstPrice = document.getElementById("firstPrice");   // получаем графу с первым взносом
firstPrice.innerHTML = pricePr.innerHTML*(sliderPercent.value/100); // Рассчитываем первый взнос первоначально

var fullPrice = document.getElementById("fullPrice");
var installmentValue = document.getElementById("installmentValue");
var installmentValueRes = (pricePr.innerHTML - (pricePr.innerHTML*(sliderPercent.value/100)))/sliderMonth.value

//расчет процентов

var percent = ((pricePr.innerHTML-pricePr.innerHTML*(sliderPercent.value/100)) * 0.05 * sliderMonth.value/12)


installmentValueRes = (pricePr.innerHTML - (pricePr.innerHTML*(sliderPercent.value/100)))/sliderMonth.value   // расчет ежемес. платежа
installmentValue.innerHTML = installmentValueRes.toFixed(2)

fullPriceRes = installmentValueRes*sliderMonth.value + (pricePr.innerHTML*(sliderPercent.value/100)) + percent; // расчет итогового платежа
fullPrice.innerHTML = fullPriceRes.toFixed(2)
// fullPrice.innerHTML = installmentValue.innerHTML*sliderMonth.value; // Display the default slider value


// Постоянно проверяем слайдер и меняем значение процента и тут же передаем значение в сумму первого взноса
sliderPercent.oninput = function() {
    output.innerHTML = this.value;
    firstPrice.innerHTML = pricePr.innerHTML*(sliderPercent.value/100);    // Рассчитываем первый взнос динамически
    installmentValueRes = (pricePr.innerHTML - (pricePr.innerHTML*(sliderPercent.value/100)))/sliderMonth.value    // Рассчитываем емежемесячный платеж динамически
    installmentValueResFix = installmentValueRes.toFixed(2)
    installmentValue.innerHTML = installmentValueResFix   // расчет ежемес. платежа динам
    percent = ((pricePr.innerHTML-pricePr.innerHTML*(sliderPercent.value/100)) * 0.05 * sliderMonth.value/12)
    fullPriceRes = installmentValueRes*sliderMonth.value + (pricePr.innerHTML*(sliderPercent.value/100)) + percent;
    fullPrice.innerHTML = fullPriceRes.toFixed(2)
}



// Проверяем изменение периода оплаты и должны менять ежемесячный платеж и итого
sliderMonth.oninput = function() {
    output2.innerHTML = this.value;
    installmentValueRes = (pricePr.innerHTML - (pricePr.innerHTML*(sliderPercent.value/100)))/sliderMonth.value    // Рассчитываем емежемесячный платеж динамически
    installmentValueResFix = installmentValueRes.toFixed(2)
    installmentValue.innerHTML = installmentValueResFix   // расчет ежемес. платежа динам
    percent = ((pricePr.innerHTML-pricePr.innerHTML*(sliderPercent.value/100)) * 0.05 * sliderMonth.value/12)
    fullPriceRes = installmentValueRes*sliderMonth.value + (pricePr.innerHTML*(sliderPercent.value/100)) + percent;
    fullPrice.innerHTML = fullPriceRes.toFixed(2)
}





// alert(pricePr)
// alert(slider.value)

// // Update the current slider value (each time you drag the slider handle)
// slider.oninput = function() {
//     firstPrice.innerHTML = pricePr*(slider.value/100);
// }




var calc_loan = function() {
  var value = 0;
  var n = $('#demo2').val();                   // Получаем месяцы оплаты
  //var r = ($('#interest_slider').val()/100)/12;         // Процент годовых, высчитывается оплата по проценту в месяц
  var R = Math.pow(r+1,n);                            //
  var P = $('#pricePr').val();                        // Изначальная стоимость
  var d = $('#firstPrice').val();                          // Первый взнос
  value=(P-d)*((r*(R))/(R-1));                             // Расчет ежемесячного платежа
  $('.installment-value').text("$ " + Humanize.formatNumber(value, 2));       // Присвоение значения графе ежемесячный платеж

}
// $('#repayment_value').text($('#repayment_slider').val()); Получение значения от слайдеров, уже есть
// $('#interest_value').text($('#interest_slider').val());

$('#car_price').change(function(event) {
  calc_loan();
});

$('#deposit').change(function(event) {
  calc_loan();
});

$('#repayment_slider').change(function(event) {
  $('#repayment_value').text($('#repayment_slider').val());
  calc_loan();
});

$('#interest_slider').change(function(event) {
  $('#interest_value').text($('#interest_slider').val());
  calc_loan();
});