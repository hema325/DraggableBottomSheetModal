

$("button[data-target][data-action='show']").click(function () {
    let target = $($(this).attr("data-target")).removeClass("hide").addClass("show");
});

$("button[data-target][data-action='hide']").click(function () {
    let target = $($(this).attr("data-target")).addClass("hide").removeClass("show");
});

const sheet = $(".sheet");
const draggingBtn = $(".sheet>.line");

let startY = 0;
let startTop = 0;
let isDragging = false;

const dragStart = (e) => {
    isDragging = true;
    startY = e.pageY || e.touches?.[0].pageY;
    startTop = parseInt(sheet.css("top"));
    draggingBtn.addClass("dragging");
}

const dragging = (e) => {

    if (!isDragging)
        return;

    let movedDistance = (e.pageY || e.touches?.[0].pageY) - startY;
    let newTop = startTop + movedDistance;
    if (newTop >= 0)
        sheet.css({ top: newTop });
}

const dragStop = () => {
    isDragging = false;
    draggingBtn.removeClass("dragging");

    let newTop = parseInt(sheet.css("top"));
    if (newTop < startY - 100) {
        sheet.animate({ top: "0vh" }, 400);
        sheet.addClass("fullscreen");
        return;
    }
    else if (startY <= 200 && newTop > startY + 100) {
        sheet.animate({ top: "60vh" }, 400);
    }
    else if (newTop > startY + 100) {
        sheet.removeClass("show").addClass("hide");

        setTimeout(() => {
            sheet.removeAttr("style");
        }, 400);
    }
    else {
        sheet.animate({ top: startTop }, 400);
        return;
    }

    sheet.removeClass("fullscreen");
}

draggingBtn.mousedown(dragStart);
$(window).mouseup(dragStop).mousemove(dragging);

draggingBtn.on("touchstart", dragStart);
$(window).on("touechend", dragStop).on("touchmove", dragging);