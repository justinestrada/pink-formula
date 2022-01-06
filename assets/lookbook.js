$(document).ready(function () {

    $('#btn-back').on('click', function () {
        window.history.back();
    });

    const lookBookPageToggle = $('#lookbook-toggle-view');
    lookBookPageToggle.on('click', function () {
        const $lookbook_item_containers = $('#loobBookPageLayout');

        if ($lookbook_item_containers.hasClass('row-cols-md-2')) {
            $lookbook_item_containers.removeClass('row-cols-md-2 row-cols-lg-3');
            $lookbook_item_containers.children('.col').addClass('toggledCol');
        } else {
            $lookbook_item_containers.addClass('row-cols-md-2 row-cols-lg-3');
            $lookbook_item_containers.children('.col').removeClass('toggledCol')
        }

    })

});