/**
 * Created by Mariya on 01.02.2017.
 */

console.log("Hello");

$(function () {
    // variables from column one
    var $LIST = $('.shop-list');
    var $ITEM_TEMPLATE = $('.row-template').html();
    var $addButton = $(".add-button");
    var $input = $(".add-item");

    //variables from column two
    var $NOT_BOUGHT = $('.elements-not-bought');
    var $BOUGHT = $('.bought');

    // console.log("Template:" + $ITEM_TEMPLATE);
    console.log("add-button:", $addButton);
    console.log("input:", $input);

    function addItem(title) {
        var $node = $($ITEM_TEMPLATE);
        var quantity = 1;
        var $quantity_label = $node.find(".count");
        $quantity_label.text(quantity);

        $node.find(".name").text(title);
        console.log("Name", $node.find(".name").text(title));
        console.log("Quantity-label", quantity);

        $node.find(".delete-button").click(function () {
            $node.remove();
        });

        var $minusButton = $(".minus-button");
        $node.find($minusButton).click(function () {
            console.log("Quantity", quantity);
            if (quantity > 1) {

                quantity--;
                $quantity_label.text(quantity);
            }

        });

        $node.find(".plus-button").click(function () {
            quantity++;
            if (quantity > 1)
                $minusButton.removeClass("disabled");
            $quantity_label.text(quantity);
        });

        $LIST.append($node); //Add to the end of the list
    }

    function addNewItem() {
        var item_name = $input.val();
        console.log(item_name);
        if (item_name.trim()) {
            addItem(item_name);
        }
        $input.val("");
        $input.focus();
    }

    //When you click on button "ADD", new item appears on the list
    $addButton.click(addNewItem);


    $input.attr("placeholder", "Назву товару");


    function updateNode(node, fn) {
        node.fadeOut(250, function () {
            fn();
            node.fadeIn(250);
        });
    }

});