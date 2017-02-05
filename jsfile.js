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
    var $BOUGHT = $('.bought-items');

    console.log("Template:" + $ITEM_TEMPLATE);
    console.log("add-button:", $addButton);
    console.log("input:", $input);

    function addItem(title) {
        var $node = $($ITEM_TEMPLATE);
        var quantity = 1;
        var $quantityLabel = $node.find(".count");

        var $status = $($STATUS_TEMPLATE);
        var $alreadyBought = $node.find(".already-bought");
        var $notBought = $node.find(".not-bought");
        var $unbuyButton = $node.find(".unbuy-button");
        var $buyButton = $node.find(".buy-button");
        var $deleteButton = $node.find(".delete-button");

        // "DELETE-BUTTON"
        $deleteButton.click(function () {
            $node.remove();
            $status.remove();
        });

        // "MINUS-BUTTON"
        var $minusButton = $node.find(".minus-button");
        $minusButton.click(function () {
            console.log("Quantity", quantity);
            if (quantity == 2)
                $minusButton.addClass("disabled");
            if (quantity > 1) {
                quantity--;
                $quantityLabel.text(quantity);
                $status.find(".left-count").text(quantity);
            }

        });

        // "PLUS-BUTTON"
        $node.find(".plus-button").click(function () {
            quantity++;
            if (quantity > 1)
                $minusButton.removeClass("disabled");
            $quantityLabel.text(quantity);
            $status.find(".left-count").text(quantity);
        });

        // "BUY-BUTTON"
        $buyButton.click(function () {
            $notBought.css("display", "none");
            $alreadyBought.css({
                display: "inline-block"
            });
            $buyButton.css({
                display: "none"
            });
            $deleteButton.css({
                display: "none"
            });
            $unbuyButton.css({
                display: "inline-block"
            });
            $node.find(".minus-button").css({
                display: "none"
            });
            $node.find(".plus-button").css({
                display: "none"
            });
            $alreadyBought.text(title);
            $BOUGHT.append($status);
        });

        // "UNBUY-BUTTON"
        $unbuyButton.click(function () {
            $alreadyBought.css({
                display: "none"
            });
            $notBought.css({
                display: "inline-block"
            });
            $buyButton.css({
                display: "inline-block"
            });
            $deleteButton.css({
                display: "inline-block"
            });
            $unbuyButton.css({
                display: "none"
            });
            $node.find(".minus-button").css({
                display: "inline-block"
            });
            $node.find(".plus-button").css({
                display: "inline-block"
            });
            $status.remove();
            $NOT_BOUGHT.append($status);
        });

        // "NAME-EDIT"
        var $nameEdit = $node.find(".name-edit");
        $notBought.click(function () {
            $notBought.css({
                display: "none"
            });
            $nameEdit.css("display", "inline-block");
            $nameEdit.val(title);
            $nameEdit.focus();
            // newName = $nameEdit.val();
        });

        function newName() {
            var updatedName = $nameEdit.val();
            console.log("New name", updatedName);
            $nameEdit.css("display", "none");
            $notBought.css("display", "inline-block");
            $notBought.text(updatedName);
            title = updatedName;
            $status.find(".title").text(updatedName);
            $nameEdit.val(updatedName);
        }

        $nameEdit.keypress(function (event) {
            var keycode = (event.keyCode ? event.keyCode : event.which);
            if (keycode == '13') {
                console.log("Enter was pressed");
                newName();
            }
        });

        // $node.find(".inhalt").focusout(newName);

        $notBought.text(title);

        $quantityLabel.text(quantity);
        console.log("Name", $notBought.text(title));
        console.log("Quantity-label", quantity);

        $status.find(".title").text(title);
        $status.find(".left-count").text(quantity);

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
