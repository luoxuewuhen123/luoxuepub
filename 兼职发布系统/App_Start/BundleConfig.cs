using System.Web.Optimization;

namespace 兼职发布系统
{
    public class BundleConfig
    {
        // 有关 Bundling 的详细信息，请访问 http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/Scripts/jquery").Include(
                        "~/Scripts/jquery.js"));

            bundles.Add(new ScriptBundle("~/Scripts/index").Include(
                        "~/Scripts/index.js"));

            bundles.Add(new StyleBundle("~/Content/index").Include("~/Content/index.css"));
        }
    }
}