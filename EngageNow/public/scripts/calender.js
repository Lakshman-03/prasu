document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var eventsSection = document.getElementById('events');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        dateClick: function(info) {
            var date = info.dateStr;
            var events = eventsSection.getElementsByClassName('event');
            for (var i = 0; i < events.length; i++) {
                if (events[i].getAttribute('data-date') === date) {
                    events[i].style.display = 'flex';
                    events[i].style.margin = '10px';
                } else {
                    events[i].style.display = 'none';
                }
            }
        }
    });

    calendar.render();
});