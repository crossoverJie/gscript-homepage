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

func (HttpContext) index(HttpContext ctx){
    string[] features = {"statically", "strongly"};
    GScript gs = GScript("crossoverJie",features, "2022");
    string j = JSON(gs);
    println(j);
    string local = getCurrentTime("Asia/Shanghai","2006-01-02 15:04:05");
    string html = ^
        <html>
            <title>GScript</title>
            <pre>
                 _     _   
 ___ ___ ___ ___|_|___| |_ 
| . |_ -|  _|  _| | . |  _|
|_  |___|___|_| |_|  _|_|  
|___|             |_|   v0.0.7   

^+ j +^
            </pre>
            <h1>current ^+ local +^</h1>
        </html>
    ^;
    ctx.HTML(200, html);
}

httpHandle("GET", "/index", index);
httpRun(":8000");