/**
 * downCount: Simple Countdown clock with offset
 * Traduçãpo por: Bruno Alves Aguiar
 * Adição de função por: Bruno Alves Aguiar
 * Author: Sonny T. <hi@sonnyt.com>, sonnyt.com
 */

(function ($) {

    $.fn.downCount = function (options, callback) {
        var settings = $.extend({
                date: null,
                offset: null
            }, options);

        // Mostra um erro se a data não for definida
        if (!settings.date) {
            $.error('A data não foi definida');
        }

        // Mostra um erro se a data for definida de forma errada
        if (!Date.parse(settings.date)) {
            $.error('O formato da data está incorreto, um exemplo seria assim: 12/24/2012 12:00:00.');
        }

        // Salva o container
        var container = this;

        /**
         * Troca o fuso horário
         */
        var currentDate = function () {
            // get client's current date
            var date = new Date();

            // turn date to utc
            var utc = date.getTime() + (date.getTimezoneOffset() * 60000);

            // set new Date object
            var new_date = new Date(utc + (3600000*settings.offset))

            return new_date;
        };

        /**
         * Função de calcular as datas
         */
        function countdown () {
            var target_date = new Date(settings.date), // set target date
                current_date = currentDate(); // get fixed current date

            // difference of dates
            var difference = target_date - current_date;

            // if difference is negative than it's pass the target date
            if (difference < 0) {
                // stop timer
                clearInterval(interval);

                if (callback && typeof callback === 'function') callback();

                return;
            }

            // Variáveis básicas do Math
            var _second = 1000,
                _minute = _second * 60,
                _hour = _minute * 60,
                _day = _hour * 24;

            // Calcula as datas
            var days = Math.floor(difference / _day),
                hours = Math.floor((difference % _day) / _hour),
                minutes = Math.floor((difference % _hour) / _minute),
                seconds = Math.floor((difference % _minute) / _second);

                // Fixa as datas e mostra os dois digitos
                days = (String(days).length >= 2) ? days : '0' + days;
                hours = (String(hours).length >= 2) ? hours : '0' + hours;
                minutes = (String(minutes).length >= 2) ? minutes : '0' + minutes;
                seconds = (String(seconds).length >= 2) ? seconds : '0' + seconds;

            // Altera o nome das datas
            var ref_days = (days === 1) ? 'Dia' : 'Dias',
                ref_hours = (hours === 1) ? 'Hora' : 'Horas',
                ref_minutes = (minutes === 1) ? 'Minuto' : 'Minutos',
                ref_seconds = (seconds === 1) ? 'Segundo' : 'Segundos';

            // Define o DOM
            container.find('.days').text(days);
            container.find('.hours').text(hours);
            container.find('.minutes').text(minutes);
            container.find('.seconds').text(seconds);

            container.find('.days_ref').text(ref_days);
            container.find('.hours_ref').text(ref_hours);
            container.find('.minutes_ref').text(ref_minutes);
            container.find('.seconds_ref').text(ref_seconds);
        };
        
        // Inicia
        var interval = setInterval(countdown, 1000);
    };

})(jQuery);