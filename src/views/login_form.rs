use gpui::{AppContext, Context, Entity, ParentElement, Render, Window};
use gpui_component::{
    form::{Field, Form, field, v_form},
    input::{Input, InputState},
};

pub struct LoginForm {
    username: Entity<InputState>,
}

impl LoginForm {
    // fn submit(window: &mut Window, cx: &mut Context<Self>) {}
    pub fn new(window: &mut Window, cx: &mut Context<Self>) -> Self {
        let username = cx.new(|cx| InputState::new(window, cx));
        Self { username }
    }
}

impl Render for LoginForm {
    fn render(&mut self, window: &mut Window, cx: &mut Context<Self>) -> impl gpui::IntoElement {
        v_form().child(
            field()
                .label("username")
                .required(true)
                .child(Input::new(&self.username)),
        )
    }
}
