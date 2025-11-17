use gpui::*;
use gpui_component::*;
pub mod views;

use views::main_view::MainView;

use crate::views::toolbar::ToolBar;

fn main() {
    let app = Application::new();

    app.run(move |cx| {
        // This must be called before using any GPUI Component features.
        gpui_component::init(cx);

        cx.spawn(async move |cx| {
            cx.open_window(WindowOptions::default(), |window, cx| {
                let tool_bar = ToolBar::new();
                let view = cx.new(|_| MainView::new(Entity::new(tool_bar)));
                // This first level on the window, should be a Root.
                cx.new(|cx| Root::new(view, window, cx))
            })?;

            Ok::<_, anyhow::Error>(())
        })
        .detach();
    });
}
