(function($) {
    $('button.close').off('click').on('click', function (e) {
        $('div.row.row-expand').hide();
    });
    
    $('div.thumbnail').off('click').on('click', function (e) {
        var category = e.currentTarget.classList[2];
        
        $('div.msf-card').hide();

        $('div.row.row-expand').show();
        $('div.msf-card.' + category).show();
        
        console.log(category);
    });
})(jQuery);