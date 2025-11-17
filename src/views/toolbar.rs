use gpui::*;

pub struct ToolBar;

impl ToolBar {
    pub fn new() -> Self {
        Self {}
    }
}

impl Render for ToolBar {
    fn render(
        &mut self,
        window: &mut gpui::Window,
        cx: &mut gpui::Context<Self>,
    ) -> impl gpui::IntoElement {
        div().child("toolbar")
    }
}
