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
    var $STATUS_TEMPLATE = $('.bought-items-template').html();
    var $BOUGHT = $('.bought');

    console.log("Template:" + $ITEM_TEMPLATE);
    console.log("add-button:", $addButton);
    console.log("input:", $input);

    function addItem(title) {
        var $node = $($ITEM_TEMPLATE);
        var quantity = 1;
        var $quantityLabel = $node.find(".count");

        var $status = $($STATUS_TEMPLATE);

        $node.find(".not-bought").text(title);
        $node.find(".already-bought").text(title);
        $quantityLabel.text(quantity);
        console.log("Name", $node.find(".not-bought").text(title));
        console.log("Quantity-label", quantity);

        $status.find(".title").text(title);
        $status.find(".left-count").text(quantity);

        $node.find(".delete-button").click(function () {
            $node.remove();
            $(".left").each(function (i, item) {
                var item = $(item); //to have access to all jQuery functions
                console.log(item.find('.title').text());
            });
        });

        var $minusButton = $node.find(".minus-button");
        $minusButton.click(function () {
            console.log("Quantity", quantity);
            if (quantity == 1)
                $minusButton.addClass("disabled");
            if (quantity > 1) {
                quantity--;
                $quantityLabel.text(quantity);
            }

        });

        $node.find(".plus-button").click(function () {
            quantity++;
            if (quantity > 1)
                $minusButton.removeClass("disabled");
            $quantityLabel.text(quantity);
        });

        var $buyButton = $node.find(".buy-button");
        $buyButton.click(function () {
            $node.find(".not-bought").css({
                display: "none"
            });
            console.log($node.find(".not-bought"));
            $node.find(".already-bought").css({
                display: "inline-block"
            });
            $node.find(".buy-button").css({
                display: "none"
            });
            $node.find(".delete-button").css({
                display: "none"
            });
            $node.find(".unbuy-button").css({
                display: "inline-block"
            });
            $node.find(".minus-button").css({
                display: "none"
            });
            $node.find(".plus-button").css({
                display: "none"
            });
            $BOUGHT.append($status);
        });

        var $unbuyButton = $node.find(".unbuy-button");
        $unbuyButton.click(function () {
            $node.find(".not-bought").css({
                display: "inline-block"
            });
            console.log($node.find(".not-bought"));
            $node.find(".already-bought").css({
                display: "none"
            });
            $node.find(".buy-button").css({
                display: "inline-block"
            });
            $node.find(".delete-button").css({
                display: "inline-block"
            });
            $node.find(".unbuy-button").css({
                display: "none"
            });
            $node.find(".minus-button").css({
                display: "inline-block"
            });
            $node.find(".plus-button").css({
                display: "inline-block"
            });
            $NOT_BOUGHT.append($status);
        });

        var $rename = $node.find(".not-bought");
        var $nameEdit = $node.find(".name-edit");
        $rename.click(function () {
            $rename.css({
                display: "none"
            });
            $nameEdit.css("display", "inline-block");
            $nameEdit.val(title);
            $nameEdit.focus();
            // newName = $nameEdit.val();
        });

        var display = $nameEdit.css("display");
        if (display == "inline-block") {
            $node.find(".inhalt").focusout(function () {
                var newName = $nameEdit.val();
                console.log("New name", newName);
                $nameEdit.css("display", "none");
                $rename.css("display", "inline-block");
                $rename.text(newName);
            });
        }

        $NOT_BOUGHT.append($status);
        $LIST.append($node); //Add to the end of the list
        
    }

    addItem("Помідори");
    addItem("Печиво");
    addItem("Сир");

    function addNewItem() {
        var item_name = $input.val();
        console.log(item_name);
        if (item_name.trim()) {
            addItem(item_name);
        }
        $input.val("");
        $input.focus();
    }

    //When you click "ENTER", new item appears on the list
    $input.keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            console.log("Enter was pressed");
            addNewItem();
        }
    });

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
