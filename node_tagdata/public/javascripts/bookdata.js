$(function() {
    //
    $("#addbook_btn").on("click", function() {
        console.log("[add book]");
        //title取得
        var title = $('#title').val();
        //author取得
        var author = $("#author").val();

        //タグ取得
        var tags = $('.chips-autocomplete').material_chip('data');
        tags = get_tagValue(tags)

        if (title == "") return false;

        var data = {
            "title": title,
            "author": author,
            "tags": tags
        }
        console.log(data);

        //ajaxPost
        var url = conf_bookdata.ajaxUrl.addbook;
        var type = conf.ajaxType.post;
        var datatype = conf.ajaxDataType.json;
        var func = common.ajax_status;
        common.ajax_req(url, type, datatype, data, func);
    });

    //タグのデータを取得する
    function get_tagValue(tags) {
        var tagvalues = _.map(tags, function(val) {
            //{tags : "tagのデータ"}からvalueを取得する
            return val.tag;
        });
        console.log("underscore map");
        console.log(tagvalues);
        return tagvalues;
    }


});
var conf_bookdata = {
    ajaxUrl: {
        addbook: "data/addbook"
    }
}