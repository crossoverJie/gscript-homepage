class GScript{
    string author;
    string[] features;
    string since;

    GScript(string a, string[] f, string s){
        author = a;
        features = f;
        since = s;
    }
}

class RunResponse{
    string body;
    string ast;
    string symbol;
    string error;
}

System s = System();
DateTime d = DateTime();
func (HttpContext) index(HttpContext ctx){
    string[] features = {"statically", "strongly"};
    GScript gs = GScript("crossoverJie",features, "2022");
    string j = JSON(gs);
    println(j);
    string local = d.getCurrentTime("Asia/Shanghai","2006-01-02 15:04:05");
    println("local=" + local);
    string html = ^
        <html>
            <title>GScript</title>
            <pre>
                 _     _   
 ___ ___ ___ ___|_|___| |_ 
| . |_ -|  _|  _| | . |  _|
|_  |___|___|_| |_|  _|_|  
|___|             |_|   v0.0.7   

%s
            </pre>
            <h1>current %s </h1>
            <p><a href="https://github.com/crossoverjie/gscript-homepage">GScript-homepace source code</a></p>
        </html>
    ^;
    html = sprintf(html, j, local);

    ctx.HTML(200, html);
}

func (HttpContext) run(HttpContext ctx) {
    string body = ctx.postFormValue("body");
    string local = d.getCurrentTime("Asia/Shanghai","2006-01-02 15:04:05");
    println("===" + local);
    println(body);
    println("===");
    RunResponse r = RunResponse();
    if (body == ""){
        r.body = "empty code";
        ctx.JSON(200, r);
        return;
    }
    string fileName = d.unix("Asia/Shanghai") + "temp.gs" ;
    s.writeFile(fileName, body, 438);
    string pwd = s.getwd();
    // string res = s.command("gscript", fileName);
    string res = s.command("docker","run","--rm","-v", pwd+":/usr/src/gscript","-w","/usr/src/gscript", "crossoverjie/gscript","gscript", fileName);
    s.remove(fileName);
    r.body = res;
    r.ast = dumpAST(body);
    r.symbol=dumpSymbol(body);
    ctx.JSON(200, r);
}

httpHandle("GET", "/index", index);
httpHandle("POST", "/run", run);
string[] args = s.getOSArgs();
if (len(args) ==3){
    httpRun(":" + args[2]);
}else {
    httpRun(":8000");
}