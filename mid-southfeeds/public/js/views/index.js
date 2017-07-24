(function($) {
    $('button.close').off('click').on('click', function (e) {
        $('div.row.row-expand').slideUp(500);
    });
    
    $('div.thumbnail').off('click').on('click', function (e) {
        var category = e.currentTarget.classList[2];
        
        $('div.msf-card').hide();

        $('div.row.row-expand').show();
        $('div.msf-card.' + category).show();
        $("html, body").animate({ scrollTop: $('.row-expand')[0].scrollHeight }, 500);
    });
})(jQuery);