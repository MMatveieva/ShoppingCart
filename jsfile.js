/**
 * Created by Mariya on 01.02.2017.
 */

$(function () {
    var $LIST = $('.shop-list');
    var $ITEM_TEMPLATE = $('.ROW-TEMPLATE').html();

    function addItem(title) {
        var $node = $($ITEM_TEMPLATE);
        var quantity = 1;
        var $quantity_label = $node.find(".count");
        $quantity_label.text(quantity);

        $node.find(".item").text(title);

        $node.find(".delete-button").click(function () {
            $node.remove();
        });

        $node.find(".minus-button").click(function () {
            if (quantity > 1) {
                quantity--;
                $quantity_label.text(quantity);
            }
        });

        $node.find(".plus-button").click(function () {
            quantity++;
            $quantity_label.text(quantity);
        });

        $LIST.append($node); //Add to the end of the list
    }

    addItem("orange 1");

    var $addButton = $(".plus-button");
    var $input = $(".new-item");

    function addNewItem() {
        var item_name = $input.val();
        if (item_name.trim()) {
            addItem(item_name);
        }
        $input.val("");
        $input.focus();
    }

    $input.attr("placeholder", "Введіть назву товару");


    function updateNode(node, fn) {
        node.fadeOut(250, function () {
            fn();
            node.fadeIn(250);
        });
    }

});