
import toggleSelection  from "@packages/utils/toggle-selection";
export default function copy(text) {

    var range,
        selection,
        mark,
        success = false,
        message = "Copy to clipboard: #{key}, Enter",
        reselectPrevious;

    try {
        reselectPrevious = toggleSelection();
        // //dom中的范围，可以对DOm进行操作
        range = document.createRange();
        //用户选择的文本范围或光标的当前位置。
        selection = document.getSelection();

        mark = document.createElement("span");
        mark.textContent = text;

        mark.style.all = "unset";

        mark.style.position = "fixed";
        mark.style.top = 0;
        mark.style.clip = "rect(0,0,0,0)";

        mark.style.whiteSpace = "pre";
        mark.style.webkitUserSelect = "text";
        mark.style.mozUserSelect = "text";
        mark.style.msUserSelect = "text";
        mark.style.userSelect = "text";

        mark.addEventListener("copy", function (e) {
            e.stopPropagation();
        });

        document.body.appendChild(mark);
        range.selectNodeContents(mark);
        selection.addRange(range);

        var successful = document.execCommand("copy");
        if (!successful) {
            throw new Error("copy command was unsuccessful");
        } 
        success = true;


    } catch (e) {
        
        try {
            window.clipboardData.setData("text", text);
            success = true;
        } catch (err) {
            window.prompt(message, text);
        }

    }finally {
        if (selection) {
            if (typeof selection.removeRange == "function") {
                selection.removeRange(range);
            } else {
                selection.removeAllRanges();
            }
        }

        if(mark){
            document.body.removeChild(mark);
        }
        //reselectPrevious();
    }
    return success;
}