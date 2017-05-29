package cynric.visualizingprogrammingtoyblock;

import android.app.Activity;
import android.os.Bundle;
import android.util.DisplayMetrics;
import android.view.View;
import android.webkit.WebView;

public class MainActivity extends Activity {
    private WebView webview;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        DisplayMetrics metric = new DisplayMetrics();
        getWindowManager().getDefaultDisplay().getMetrics(metric);
        int width = metric.widthPixels;     // 屏幕宽度（像素）
        int height = metric.heightPixels;
        //实例化WebView对象
        webview = new WebView(this);
        double scale = width * 1.0 / 1024;
        if (scale > 1) {
            webview.setInitialScale((int) (100 * scale));
        }
        webview.setScrollBarStyle(View.SCROLLBARS_INSIDE_OVERLAY);
        //设置WebView属性，能够执行Javascript脚本
        webview.getSettings().setJavaScriptEnabled(true);
        //加载需要显示的网页
        webview.loadUrl("http://106.15.90.104:3000/mobile");
        //设置Web视图
        setContentView(webview);
    }
}
