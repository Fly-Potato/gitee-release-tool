use gpui::*;
use gpui_component::{
    StyledExt, WindowExt,
    button::Button,
    dialog::DialogButtonProps,
    form::field,
    input::{Input, InputState},
};

use crate::views::login_form::LoginForm;

pub struct ToolBar;

impl ToolBar {
    pub fn new(window: &mut Window, cx: &mut Context<Self>) -> Self {
        Self {}
    }

    fn open_login_dialog(&mut self, _: &ClickEvent, window: &mut Window, cx: &mut Context<Self>) {
        // let username = cx.new(|cx| InputState::new(window, cx));
        let form = cx.new(|cx| LoginForm::new(window, cx));
        window.open_dialog(cx, move |dialog, window, app| {
            // let login_form = app.new(|cx| LoginForm::new(window, cx));
            let form = form.clone();
            dialog.title("Login").v_flex().child(form)
        })
    }
}

impl Render for ToolBar {
    fn render(&mut self, window: &mut Window, cx: &mut Context<Self>) -> impl IntoElement {
        let login_button = Button::new("login-btn")
            .label("login")
            .on_click(cx.listener(Self::open_login_dialog));
        div().child(login_button)
    }
}
