
layui.use(function() {
    var layer = layui.layer
        ,form = layui.form
        ,laypage = layui.laypage
        ,element = layui.element
        ,laydate = layui.laydate
        ,util = layui.util
        ,jQuery = layui.jquery;


    let ERWIN_FENG = 'jesson';

    let author = getAuthor();
    let dbAddress = getDbAddress();
    let dbUsername = getDbUsername();
    let dbPassword = getDbPassword();
    let dbName = getDbName();
    let outputDir = getOutputDir();

    if (isEmpty(author)) {
        author = ERWIN_FENG;
    }

    jQuery("#author").val(author);
    jQuery("#dbAddress").val(dbAddress);
    jQuery("#dbUsername").val(dbUsername);
    jQuery("#dbPassword").val(dbPassword);
    jQuery("#dbName").val(dbName);
    jQuery("#outputDir").val(outputDir);


    //监听提交
    form.on('submit(formCodeGenerator)', function(data){
        handleFormSubmit(data);
        return false;
    });

    // 处理form提交请求
    function handleFormSubmit(data) {
        let layerIndex;
        let url = "/code-generator";
        let param = JSON.stringify(data.field);
        let xhr = new XMLHttpRequest();
        xhr.open("post",url,true);
        xhr.setRequestHeader("Content-type","application/json;charset=UTF-8");
        xhr.responseType = 'blob';
        xhr.send(param);

        layerIndex = layer.load(0, { shade: 0.1 });
        xhr.onload = function () {
            handleCache(data.field);
            layer.close(layerIndex);
            if (xhr.getResponseHeader("Content-type") === 'application/octet-stream;charset=UTF-8') {
                let url = window.URL.createObjectURL(xhr.response);
                let a = document.createElement("a");
                a.href = url;
                a.style.display = 'none';
                a.download = "code.zip";
                a.click();
                window.URL.revokeObjectURL(url);
                a.remove();

                console.log("url***********"+url)
            }else {
                if (response.success) {
                    alertSuccess(layer, response.message);
                } else {
                    layer.alert(response.msg,{ icon: 5 });//失败的表情
                    alertFail(layer, response.message);
                }
                console.log("reader***********"+reader)
            }
        };
       /* ajaxPost(jQuery, layer, url, param, function (response) {
            handleCache(data.field);
            if (response.getResponseHeader("Content-type") === 'application/octet-stream') {
                /!*let url = window.URL.createObjectURL(response.response);
                let a = document.createElement("a");
                a.href = url;
                a.style.display = 'none'
                a.download = "code.zip";
                a.click();
                window.URL.revokeObjectURL(url);
                a.remove();*!/
                location.href = response;
            }else {
                if (response.success) {
                    alertSuccess(layer, response.message);
                } else {
                    layer.alert(response.msg,{ icon: 5 });//失败的表情
                    alertFail(layer, response.message);
                }
            }
            /!*if (response.success) {
                handleCache(data.field);

                alertSuccess(layer, response.message);

            } else {
                layer.alert(response.msg,{ icon: 5 });//失败的表情
                alertFail(layer, response.message);
            }*!/
        });*/
    }
 /*   function getFile(file){
        let blob = new Blob([file],{type:'text/plain'});
        let btn = document.createElement('btn');
        let url= URL.createObjectURL(blob);
        btn.setAttribute('download','code.zip');
        btn.setAttribute('href',url);
        btn.click()
    }*/
    // 缓存
    function handleCache(formData) {
        setDbAddress(formData.host);
        setDbUsername(formData.username)
        setDbPassword(formData.password)
        setDbName(formData.dbName)
        setAuthor(formData.author)
        setOutputDir(formData.outDir)
    }

});