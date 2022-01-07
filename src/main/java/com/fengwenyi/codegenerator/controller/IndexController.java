package com.fengwenyi.codegenerator.controller;

import com.fengwenyi.codegenerator.Config;
import com.fengwenyi.codegenerator.service.IIndexService;
import com.fengwenyi.codegenerator.utils.PackageZipUtil;
import com.fengwenyi.codegenerator.vo.CodeGeneratorRequestVo;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

/**
 * @author <a href="https://www.fengwenyi.com">Erwin Feng</a>
 * @since 2021-07-12
 */
@Controller
public class IndexController {

    private IIndexService indexService;

    @RequestMapping("/")
    public String index() {
        return "index";
    }

    @PostMapping("/code-generator")
    @ResponseBody
    public void codeGenerator(@RequestBody @Validated CodeGeneratorRequestVo requestVo, HttpServletResponse response) throws IOException {
        indexService.codeGenerator(requestVo,response);

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        PackageZipUtil.toZip(Config.OUTPUT_DIR,outputStream,true);
        byte[] data = outputStream.toByteArray();

        response.reset();
        response.setHeader("Content-Disposition", "attachment; filename=\"code.zip\"");
        response.addHeader("Content-Length", "" + data.length);
        response.setContentType("application/octet-stream; charset=UTF-8");

        IOUtils.write(data, response.getOutputStream());
    }

    @Autowired
    public void setIndexService(IIndexService indexService) {
        this.indexService = indexService;
    }

}
