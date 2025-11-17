use gpui::*;
use gpui_component::{button::*, *};

use crate::views::toolbar::ToolBar;

pub struct MainView {
    tool_bar: Entity<ToolBar>,
}

impl MainView {
    pub fn new(tool_bar: Entity<ToolBar>) -> Self {
        Self { tool_bar }
    }
}

impl Render for MainView {
    fn render(&mut self, window: &mut Window, cx: &mut Context<Self>) -> impl IntoElement {
        div()
            .v_flex()
            .gap_2()
            .size_full()
            .child(self.tool_bar.clone())
            .child(
                Button::new("dialog-btn")
                    .label("dialog-test")
                    .on_click(cx.listener(|_, _, window, cx| {
                        window.open_dialog(cx, |dialog, _, _| {
                            dialog.title("dialog title").child("123")
                        });
                    })),
            )
            .children(Root::render_dialog_layer(window, cx))
    }
}
