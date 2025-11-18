use gpui::*;
use gpui_component::{
    button::*,
    input::{Input, InputState},
    *,
};

use crate::views::toolbar::ToolBar;

pub struct MainView {
    toolbar: Entity<ToolBar>,
    input: Entity<InputState>,
}

impl MainView {
    pub fn new(window: &mut Window, cx: &mut Context<Self>) -> Self {
        let toolbar = cx.new(|cx| ToolBar::new(window, cx));
        let input = cx.new(|cx| InputState::new(window, cx));
        Self { toolbar, input }
    }
}

impl Render for MainView {
    fn render(&mut self, window: &mut Window, cx: &mut Context<Self>) -> impl IntoElement {
        div()
            .v_flex()
            .gap_2()
            .size_full()
            .child(self.toolbar.clone())
            .child(Input::new(&self.input))
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
