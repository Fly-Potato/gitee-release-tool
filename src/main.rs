use gpui::*;
use gpui_component::{slider::SliderState, *};
use gpui_component_assets::Assets;
pub mod views;

use views::main_view::MainView;

use crate::views::toolbar::ToolBar;

fn main() {
    let app = Application::new().with_assets(Assets);

    app.run(move |cx| {
        // This must be called before using any GPUI Component features.
        gpui_component::init(cx);

        cx.spawn(async move |cx| {
            cx.open_window(WindowOptions::default(), |window, cx| {
                let view = cx.new(|cx| MainView::new(window, cx));

                // This first level on the window, should be a Root.
                cx.new(|cx| Root::new(view, window, cx))
            })?;

            Ok::<_, anyhow::Error>(())
        })
        .detach();
    });
}
